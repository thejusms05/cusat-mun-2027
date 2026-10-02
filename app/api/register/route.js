import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";


export const dynamic = "force-dynamic";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  
export async function POST(req) {
  const body = await req.json();

  // Basic safety check — never trust data from the browser blindly.
  const email = (body.contact || "").trim();
  const validEmail = /^\S+@\S+\.\S+$/.test(email);
  if (!validEmail) {
    return NextResponse.json({error: "A valid email is required."}, {status: 400});
  }

  const preferences = [body.pref1, body.pref2, body.pref3].filter(Boolean);

  const {data, error} = await supabase
    .from("registrations")
    .insert({
      type: body.type || "delegate",
      name: body.name || body.head || null,
      institution: body.inst || null,
      email,
      experience: body.exp || null,
      preferences,
      status: "new",
      data: body, // full backup of everything submitted
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({error: "Could not save registration."}, {status: 500});
  }

  return NextResponse.json({id: data.id});
}
