import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function GET() {
  const {data, error} = await supabase.from("portfolios").select("id,committee_id,name,status");
  if (error) return NextResponse.json({error: "Could not load portfolios."}, {status: 500});
  return NextResponse.json({portfolios: data}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
