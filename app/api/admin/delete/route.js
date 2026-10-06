import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId} = await req.json();
  if (!registrationId) return NextResponse.json({error: "Missing registrationId."}, {status: 400});

  // Free up any portfolios this registration was holding, so they go back to "available"
  const {error: eFree} = await supabase.from("portfolios")
    .update({status: "available", assigned_registration_id: null, assigned_delegate_index: null})
    .eq("assigned_registration_id", registrationId);

  const {error: eDel} = await supabase.from("registrations").delete().eq("id", registrationId);

  if (eFree || eDel) {
    console.error("delete portfolios error:", eFree);
    console.error("delete registration error:", eDel);
    return NextResponse.json({error: "Delete failed."}, {status: 500});
  }
  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
