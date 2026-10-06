import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, portfolioId, delegateIndex} = await req.json();
  if (!registrationId) return NextResponse.json({error: "Missing registrationId."}, {status: 400});

  if (portfolioId) {
    await supabase.from("portfolios")
      .update({status: "available", assigned_registration_id: null, assigned_delegate_index: null})
      .eq("id", portfolioId);
  }

  if (delegateIndex === undefined || delegateIndex === null) {
    await supabase.from("registrations").update({status: "new", committee_id: null, portfolio_id: null}).eq("id", registrationId);
  } else {
    const {data: reg} = await supabase.from("registrations").select("preferences").eq("id", registrationId).single();
    const preferences = [...(reg?.preferences || [])];
    if (preferences[delegateIndex]) {
      const {assigned, ...rest} = preferences[delegateIndex];
      preferences[delegateIndex] = rest;
      await supabase.from("registrations").update({preferences}).eq("id", registrationId);
    }
  }

  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
