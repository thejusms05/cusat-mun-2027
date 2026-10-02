import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";


export const dynamic = "force-dynamic";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, portfolioId} = await req.json();
  await supabase.from("portfolios").update({status: "confirmed"}).eq("id", portfolioId);
  await supabase.from("registrations").update({status: "confirmed"}).eq("id", registrationId);
  return NextResponse.json({ok: true});
}
