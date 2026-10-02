import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, portfolioId, committeeId} = await req.json();

  const {data: reg} = await supabase.from("registrations").select("name").eq("id", registrationId).single();
  if (!reg) return NextResponse.json({error: "Registration not found."}, {status: 404});

  const {error: e1} = await supabase.from("portfolios").update({status: "pending", assigned_registration_id: registrationId}).eq("id", portfolioId);
  const {error: e2} = await supabase.from("registrations").update({status: "assigned", committee_id: committeeId, portfolio_id: portfolioId}).eq("id", registrationId);

  if (e1 || e2) {
    console.error("assign portfolios error:", e1);
    console.error("assign registrations error:", e2);
    return NextResponse.json({error: "Update failed.", e1, e2}, {status: 500});
  }

  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
