import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";


export const dynamic = "force-dynamic";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
 
  const {registrationId, portfolioId, committeeId} = await req.json();

  const {data: reg} = await supabase.from("registrations").select("name").eq("id", registrationId).single();
  if (!reg) return NextResponse.json({error: "Registration not found."}, {status: 404});

  await supabase.from("portfolios").update({status: "pending", assigned_registration_id: registrationId}).eq("id", portfolioId);
  await supabase.from("registrations").update({status: "assigned", committee_id: committeeId, portfolio_id: portfolioId}).eq("id", registrationId);

  return NextResponse.json({ok: true});
}


