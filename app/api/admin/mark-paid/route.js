import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, portfolioId, delegateIndex} = await req.json();

  await supabase.from("portfolios").update({status: "confirmed"}).eq("id", portfolioId);

  if (delegateIndex === undefined || delegateIndex === null) {
    await supabase.from("registrations").update({status: "confirmed"}).eq("id", registrationId);
  } else {
    const {data: reg} = await supabase.from("registrations").select("preferences").eq("id", registrationId).single();
    const preferences = [...(reg?.preferences || [])];
    if (preferences[delegateIndex]?.assigned) {
      preferences[delegateIndex] = {...preferences[delegateIndex], assigned: {...preferences[delegateIndex].assigned, status: "confirmed"}};
      await supabase.from("registrations").update({preferences}).eq("id", registrationId);
    }
  }

  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
