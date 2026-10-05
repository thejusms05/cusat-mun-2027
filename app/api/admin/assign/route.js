import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, portfolioId, committeeId, delegateIndex} = await req.json();

  const {data: reg} = await supabase.from("registrations").select("*").eq("id", registrationId).single();
  if (!reg) return NextResponse.json({error: "Registration not found."}, {status: 404});

  const {error: ePortfolio} = await supabase.from("portfolios")
    .update({status: "pending", assigned_registration_id: registrationId, assigned_delegate_index: delegateIndex ?? null})
    .eq("id", portfolioId);

  let eReg = null;
  if (delegateIndex === undefined || delegateIndex === null) {
    ({error: eReg} = await supabase.from("registrations")
      .update({status: "assigned", committee_id: committeeId, portfolio_id: portfolioId})
      .eq("id", registrationId));
  } else {
    const preferences = [...(reg.preferences || [])];
    if (!preferences[delegateIndex]) return NextResponse.json({error: "Delegate not found."}, {status: 400});
    preferences[delegateIndex] = {...preferences[delegateIndex], assigned: {committeeId, portfolioId, status: "pending"}};
    ({error: eReg} = await supabase.from("registrations").update({preferences}).eq("id", registrationId));
  }

  if (ePortfolio || eReg) {
    console.error("assign portfolio error:", ePortfolio);
    console.error("assign registration error:", eReg);
    return NextResponse.json({error: "Update failed."}, {status: 500});
  }
  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
