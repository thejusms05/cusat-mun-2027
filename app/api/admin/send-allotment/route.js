import nodemailer from "nodemailer";
import {createClient} from "@supabase/supabase-js";
import {NextResponse} from "next/server";
import {committees} from "@/lib/data";
import {EMAIL_CONFIG} from "@/lib/emailConfig";
import {buildAllotmentEmail,configProblems} from "@/lib/allotmentEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export async function POST(req) {
  const {registrationId, preview} = await req.json();
  if (!registrationId) return NextResponse.json({error: "Missing registrationId."}, {status: 400});

  const {data: reg} = await supabase.from("registrations").select("*").eq("id", registrationId).single();
  if (!reg) return NextResponse.json({error: "Registration not found."}, {status: 404});

  const {data: portfolios} = await supabase.from("portfolios").select("id,committee_id,name");
  const portfolioName = id => portfolios?.find(p => p.id === id)?.name || "—";
  const describe = (committeeId, portfolioId) => {
    const c = committees.find(x => x.id === committeeId);
    return {committeeAbbr: c?.abbr || committeeId, committeeName: c?.name || "", portfolio: portfolioName(portfolioId)};
  };

  const isDelegation = reg.type === "delegation";
  let items = [], allPaid = false;
  if (isDelegation) {
    const assigned = (reg.preferences || []).filter(d => d.assigned);
    items = assigned.map(d => ({delegate: d.name, ...describe(d.assigned.committeeId, d.assigned.portfolioId)}));
    allPaid = assigned.length > 0 && assigned.every(d => d.assigned.status === "confirmed");
  } else if (reg.committee_id && reg.portfolio_id) {
    items = [{delegate: reg.name, ...describe(reg.committee_id, reg.portfolio_id)}];
    allPaid = reg.status === "confirmed";
  }
  if (!items.length) return NextResponse.json({error: "Assign a portfolio before sending the email."}, {status: 400});

  const {subject, html, text} = buildAllotmentEmail({name: reg.name, items, isDelegation, allPaid, config: EMAIL_CONFIG});
  const problems = configProblems(EMAIL_CONFIG, process.env);

  if (preview) return NextResponse.json({subject, html, problems});
  if (problems.length) return NextResponse.json({error: problems.join(" ")}, {status: 400});

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", port: 465, secure: true,
      auth: {user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD},
    });
    await transporter.sendMail({
      from: `"${EMAIL_CONFIG.eventName}" <${process.env.GMAIL_USER}>`,
      to: reg.email,
      replyTo: EMAIL_CONFIG.contactEmail,
      subject, html, text,
    });
  } catch (err) {
    console.error("send-allotment error:", err);
    return NextResponse.json({error: `Email failed (${err.responseCode || err.code || "unknown"}). Check GMAIL_USER and GMAIL_APP_PASSWORD.`}, {status: 500});
  }

  await supabase.from("registrations").update({allotment_email_sent_at: new Date().toISOString()}).eq("id", registrationId);
  return NextResponse.json({ok: true}, {headers: {"Cache-Control": "no-store, max-age=0"}});
}
