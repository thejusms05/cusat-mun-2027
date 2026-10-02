"use client";
import {useEffect,useState} from "react";
import {Lock,Send,CheckCircle2,UserPlus,AlertTriangle,Loader2} from "lucide-react";
import {committees} from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const DEMO_PASSWORD=process.env.NEXT_PUBLIC_ADMIN_PASSWORD||"cusatmun2027";

function Gate({onUnlock}){
 const [pw,setPw]=useState(""),[err,setErr]=useState(false);
 const submit=e=>{e.preventDefault();
  if(pw===DEMO_PASSWORD){sessionStorage.setItem("cusatmun_admin_ok","1");onUnlock();}
  else setErr(true);};
 return(<div className="section flex max-w-sm flex-col items-center text-center">
  <Lock className="text-stamp" size={28}/>
  <h1 className="mt-3 text-2xl font-bold">Admin Console</h1>
  <p className="mt-2 text-sm text-ink/60">Internal use only. Enter the organising-committee password to continue.</p>
  <form onSubmit={submit} className="mt-6 w-full space-y-3">
   <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr(false)}} placeholder="Password" className={`w-full border-2 bg-transparent px-3 py-2.5 font-mono text-sm outline-none ${err?"border-stamp anim-shake":"border-ink/25 focus:border-ink"}`}/>
   {err&&<p className="font-mono text-xs text-stamp">Incorrect password.</p>}
   <button className="btn-ink w-full">Enter</button>
  </form>
  <p className="label-mono mt-6 flex items-center gap-2 text-ink/35"><AlertTriangle size={14}/>Demo gate only — not secure for production</p>
 </div>);
}

export default function Admin(){
 const [unlocked,setUnlocked]=useState(false);
 const [regs,setRegs]=useState([]);
 const [portfolios,setPortfolios]=useState({});
 const [picks,setPicks]=useState({});
 const [loading,setLoading]=useState(true);
 const [busy,setBusy]=useState(null);

 const load=async()=>{
  setLoading(true);
  const r=await fetch("/api/admin/data");
  const json=await r.json();
  const grouped={};
  for(const p of json.portfolios||[]) (grouped[p.committee_id] ||= []).push(p);
  setPortfolios(grouped);
  setRegs(json.registrations||[]);
  setLoading(false);
 };

 useEffect(()=>{ if(unlocked) load(); },[unlocked]);

 if(!unlocked) return <Gate onUnlock={()=>setUnlocked(true)}/>;
 if(loading) return <div className="section flex justify-center"><Loader2 className="animate-spin text-ink" size={28}/></div>;

 const committeesWithPortfolios=Object.keys(portfolios);
 const setPick=(regId,patch)=>setPicks(p=>({...p,[regId]:{...p[regId],...patch}}));

 const assign=async reg=>{
  const pick=picks[reg.id];
  if(!pick?.committeeId||!pick?.portfolioId)return;
  setBusy(reg.id);
  await fetch("/api/admin/assign",{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({registrationId:reg.id,portfolioId:pick.portfolioId,committeeId:pick.committeeId})});
  await load();
  setBusy(null);
 };
 const markPaid=async reg=>{
  setBusy(reg.id);
  await fetch("/api/admin/mark-paid",{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({registrationId:reg.id,portfolioId:reg.portfolio_id})});
  await load();
  setBusy(null);
 };
 const paymentMailto=reg=>{
  const committee=committees.find(c=>c.id===reg.committee_id);
  const portfolio=portfolios[reg.committee_id]?.find(p=>p.id===reg.portfolio_id);
  const subject=`CUSAT MUN 2027 — Your portfolio: ${portfolio?.name||""} (${committee?.abbr||""})`;
  const body=`Dear ${reg.name},\n\nYou have been assigned ${portfolio?.name||"your portfolio"} in ${committee?.name||""} for CUSAT MUN 2027.\n\nTo confirm your seat, please complete payment using the link below within 48 hours:\n[PAYMENT LINK HERE]\n\nSee you at CUSAT MUN 2027!\n\n— Organising Committee`;
  return `mailto:${reg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 };

 return(<>
 <PageHeader eyebrow="Internal Use Only" title="Admin Console" sub="Assign portfolios and send payment emails — this now reads and writes your real Supabase database."/>
 <div className="section max-w-5xl space-y-5">
  {regs.length===0&&<p className="font-mono text-sm text-ink/50">No registrations yet.</p>}
  {regs.map(reg=>{
   const committee=committees.find(c=>c.id===reg.committee_id);
   const portfolio=reg.committee_id?portfolios[reg.committee_id]?.find(p=>p.id===reg.portfolio_id):null;
   const pick=picks[reg.id]||{};
   const availableForPick=pick.committeeId?portfolios[pick.committeeId]?.filter(p=>p.status==="available"):[];
   const isBusy=busy===reg.id;
   return(
    <div key={reg.id} className="border-2 border-ink/15 bg-paper p-5">
     <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
       <p className="font-serif text-lg font-bold">{reg.name||"(no name)"}</p>
       <p className="label-mono text-ink/50">{reg.type} · {reg.institution} · {reg.email}</p>
       {reg.preferences?.length>0&&<p className="mt-1 font-mono text-xs text-ink/60">Preferences: {reg.preferences.join(", ")}</p>}
       {reg.experience&&<p className="font-mono text-xs text-ink/60">Experience: {reg.experience}</p>}
      </div>
      <StatusBadge status={reg.status==="new"?"available":reg.status==="assigned"?"pending":"confirmed"}/>
     </div>

     {reg.status==="new"&&(
      <div className="mt-4 flex flex-wrap items-end gap-3 border-t-2 border-dashed border-ink/15 pt-4">
       <div>
        <label className="label-mono mb-1 block text-ink/50">Committee</label>
        <select value={pick.committeeId||""} onChange={e=>setPick(reg.id,{committeeId:e.target.value,portfolioId:""})} className="border-2 border-ink/25 bg-transparent px-2 py-2 font-mono text-sm">
         <option value="">Select…</option>
         {committeesWithPortfolios.map(cid=><option key={cid} value={cid}>{committees.find(c=>c.id===cid)?.abbr||cid}</option>)}
        </select>
       </div>
       <div>
        <label className="label-mono mb-1 block text-ink/50">Portfolio</label>
        <select value={pick.portfolioId||""} onChange={e=>setPick(reg.id,{portfolioId:e.target.value})} disabled={!pick.committeeId} className="border-2 border-ink/25 bg-transparent px-2 py-2 font-mono text-sm disabled:opacity-40">
         <option value="">Select…</option>
         {availableForPick?.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
       </div>
       <button onClick={()=>assign(reg)} disabled={!pick.committeeId||!pick.portfolioId||isBusy} className="btn-ink py-2 disabled:opacity-40">{isBusy?<Loader2 className="animate-spin" size={16}/>:<UserPlus size={16}/>}Assign</button>
      </div>
     )}

     {reg.status==="assigned"&&(
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t-2 border-dashed border-ink/15 pt-4">
       <p className="font-mono text-sm">Assigned: <b>{portfolio?.name}</b> — {committee?.abbr}</p>
       <a href={paymentMailto(reg)} className="btn-gold py-2"><Send size={16}/>Send Payment Email</a>
       <button onClick={()=>markPaid(reg)} disabled={isBusy} className="btn-ghost py-2 disabled:opacity-40">{isBusy?<Loader2 className="animate-spin" size={16}/>:<CheckCircle2 size={16}/>}Mark as Paid</button>
      </div>
     )}

     {reg.status==="confirmed"&&committee&&(
      <p className="mt-4 border-t-2 border-dashed border-ink/15 pt-4 font-mono text-sm text-ink/60">Confirmed: {portfolio?.name} — {committee.abbr}</p>
     )}
    </div>
   );
  })}
 </div>
 </>);
}
