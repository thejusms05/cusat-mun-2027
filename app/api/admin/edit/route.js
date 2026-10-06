import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, patch} = await req.json();
  if (!registrationId || !patch) return NextResponse.json({error: "Missing data."}, {status: 400});

  const update = {};
  if (patch.name !== undefined) update.name = patch.name;
  if (patch.institution !== undefined) update.institution = patch.institution;
  if (patch.email !== undefined) {
    if (!/^\S+@\S+\.\S+$/.test(patch.email.trim())) return NextResponse.json({error: "Invalid email."}, {status: 400});
    update.email = patch.email.trim();
  }
  if (patch.experience !== undefined) update.experience = patch.experience;
  if (patch.experienceDetail !== undefined) update.experience_detail = patch.experienceDetail;
  if (patch.awards !== undefined) update.awards = patch.awards;

  if (patch.delegateNames) {
    const {data: reg} = await supabase.from("registrations").select("preferences").eq("id", registrationId).single();
    const preferences = (reg?.preferences || []).map((d, i) => ({...d, name: patch.delegateNames[i] ?? d.name}));
    update.preferences = preferences;
  }

  const {error} = await supabase.from("registrations").update(update).eq("id", registrationId);
  if (error) {
    console.error("edit error:", error);
    return NextResponse.json({error: "Update failed."}, {status: 500});
  }
  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
