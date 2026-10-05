import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const body = await req.json();

  const email = (body.contact || "").trim();
  const validEmail = /^\S+@\S+\.\S+$/.test(email);
  if (!validEmail) {
    return NextResponse.json({error: "A valid email is required."}, {status: 400});
  }

  const {data, error} = await supabase
    .from("registrations")
    .insert({
      type: body.type || "delegate",
      category: body.category || null,
      name: body.name || body.head || null,
      institution: body.inst || null,
      email,
      experience: body.experience || null,
      experience_detail: body.expDetail || null,
      awards: body.awards || null,
      delegation_size: body.delegationSize || null,
      preferences: body.preferences || [],
      status: "new",
      data: body,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({error: "Could not save registration."}, {status: 500});
  }

  return NextResponse.json({id: data.id});
}
