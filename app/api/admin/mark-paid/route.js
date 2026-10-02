import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, portfolioId} = await req.json();
  const {error: e1} = await supabase.from("portfolios").update({status: "confirmed"}).eq("id", portfolioId);
  const {error: e2} = await supabase.from("registrations").update({status: "confirmed"}).eq("id", registrationId);
  if (e1 || e2) return NextResponse.json({error: "Update failed."}, {status: 500});
  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
