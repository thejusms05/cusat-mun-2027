import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function GET() {
  const {data: portfolios, error: e1} = await supabase.from("portfolios").select("*");
  const {data: registrations, error: e2} = await supabase.from("registrations").select("*").order("created_at", {ascending: false});
  if (e1 || e2) return NextResponse.json({error: "Could not load data."}, {status: 500});
  return NextResponse.json({portfolios, registrations}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
