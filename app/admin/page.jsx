"use client";
import {useEffect,useState} from "react";
import {Lock,CheckCircle2,UserPlus,AlertTriangle,Loader2} from "lucide-react";
import {committees} from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

const DEMO_PASSWORD=process.env.NEXT_PUBLIC_ADMIN_PASSWORD||"cusatmun2027";
const CATEGORY_LABELS={school_individual:"School · Individual",university_individual:"University · Individual",school_delegation:"School · Delegation",university_delegation:"University · Delegation"};

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

function AssignRow({onAssign,pick,setPick,committeeOptions,availablePortfolios,busy}){
 return(<div className="flex flex-wrap items-end gap-2">
  <select value={pick.committeeId||""} onChange={e=>setPick({committeeId:e.target.value,portfolioId:""})} className="border-2 border-ink/25 bg-transparent px-2 py-1.5 font-mono text-xs">
   <option value="">Committee…</option>
   {committeeOptions.map(cid=><option key={cid} value={cid}>{committees.find(c=>c.id===cid)?.abbr||cid}</option>)}
  </select>
  <select value={pick.portfolioId||""} onChange={e=>setPick({...pick,portfolioId:e.target.value})} disabled={!pick.committeeId} className="border-2 border-ink/25 bg-transparent px-2 py-1.5 font-mono text-xs disabled:opacity-40">
   <option value="">Portfolio…</option>
   {availablePortfolios?.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
  </select>
  <button onClick={onAssign} disabled={!pick.committeeId||!pick.portfolioId||busy} className="btn-ink py-1.5 text-xs disabled:opacity-40">{busy?<Loader2 className="animate-spin" size={14}/>:<UserPlus size={14}/>}Assign</button>
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
  const r=await fetch("/api/admin/data",{cache:"no-store"});
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
 const setPick=(key,patch)=>setPicks(p=>({...p,[key]:{...p[key],...patch}}));

 const assign=async(reg,delegateIndex=null)=>{
  const key=delegateIndex==null?reg.id:`${reg.id}-${delegateIndex}`;
  const pick=picks[key];
  if(!pick?.committeeId||!pick?.portfolioId)return;
  setBusy(key);
  const r=await fetch("/api/admin/assign",{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({registrationId:reg.id,portfolioId:pick.portfolioId,committeeId:pick.committeeId,delegateIndex})});
  if(!r.ok){const err=await r.json().catch(()=>({}));alert("Assign failed: "+(err.error||r.status));}
  await load();
  setBusy(null);
 };
 const markPaid=async(reg,delegateIndex=null,portfolioId=null)=>{
  const key=delegateIndex==null?reg.id:`${reg.id}-${delegateIndex}`;
  setBusy(key);
  const r=await fetch("/api/admin/mark-paid",{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({registrationId:reg.id,portfolioId:portfolioId||reg.portfolio_id,delegateIndex})});
  if(!r.ok){const err=await r.json().catch(()=>({}));alert("Mark as paid failed: "+(err.error||r.status));}
  await load();
  setBusy(null);
 };

 const delegationBadgeStatus=reg=>{
  const list=reg.preferences||[];
  const assigned=list.filter(d=>d.assigned);
  if(assigned.length>0&&assigned.every(d=>d.assigned.status==="confirmed")&&assigned.length===list.length)return"confirmed";
  if(assigned.length>0)return"pending";
  return"available";
 };

 return(<>
 <PageHeader eyebrow="Internal Use Only" title="Admin Console" sub="Assign portfolios and track registrations — reads and writes your real Supabase database."/>
 <div className="section max-w-5xl space-y-5">
  {regs.length===0&&<p className="font-mono text-sm text-ink/50">No registrations yet.</p>}
  {regs.map(reg=>{
   const committee=committees.find(c=>c.id===reg.committee_id);
   const portfolio=reg.committee_id?portfolios[reg.committee_id]?.find(p=>p.id===reg.portfolio_id):null;
   const isDelegation=reg.type==="delegation";
   return(
    <div key={reg.id} className="border-2 border-ink/15 bg-paper p-5">
     <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
       <p className="font-serif text-lg font-bold">{reg.name||"(no name)"}</p>
       <p className="label-mono text-ink/50">{reg.type} · {CATEGORY_LABELS[reg.category]||reg.category||"—"} · {reg.institution} · {reg.email}</p>
       {isDelegation&&<p className="mt-1 font-mono text-xs text-ink/60">{reg.delegation_size} delegates</p>}
       {!isDelegation&&reg.experience&&<p className="mt-1 font-mono text-xs text-ink/60">Experience: {reg.experience}{reg.experience_detail?` — ${reg.experience_detail}`:""}</p>}
       {!isDelegation&&reg.awards&&<p className="font-mono text-xs text-ink/60">Awards: {reg.awards}</p>}
       {!isDelegation&&reg.preferences?.length>0&&
        <ol className="mt-1 space-y-0.5 font-mono text-xs text-ink/60">
         {reg.preferences.map((p,i)=><li key={i}>{i+1}. {p.committee} — {(p.portfolios||[]).filter(Boolean).join(" / ")||"(no portfolios chosen)"}</li>)}
        </ol>}
      </div>
      <StatusBadge status={isDelegation?delegationBadgeStatus(reg):(reg.status==="new"?"available":reg.status==="assigned"?"pending":"confirmed")}/>
     </div>

     {!isDelegation&&reg.status==="new"&&(
      <div className="mt-4 border-t-2 border-dashed border-ink/15 pt-4">
       <AssignRow
        onAssign={()=>assign(reg)}
        pick={picks[reg.id]||{}}
        setPick={patch=>setPick(reg.id,patch)}
        committeeOptions={committeesWithPortfolios}
        availablePortfolios={(picks[reg.id]?.committeeId?portfolios[picks[reg.id].committeeId]:[])?.filter(p=>p.status==="available")}
        busy={busy===reg.id}
       />
      </div>
     )}
     {!isDelegation&&reg.status==="assigned"&&(
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t-2 border-dashed border-ink/15 pt-4">
       <p className="font-mono text-sm">Assigned: <b>{portfolio?.name}</b> — {committee?.abbr}</p>
       <button onClick={()=>markPaid(reg)} disabled={busy===reg.id} className="btn-ghost py-2 disabled:opacity-40">{busy===reg.id?<Loader2 className="animate-spin" size={16}/>:<CheckCircle2 size={16}/>}Mark as Paid</button>
      </div>
     )}
     {!isDelegation&&reg.status==="confirmed"&&committee&&(
      <p className="mt-4 border-t-2 border-dashed border-ink/15 pt-4 font-mono text-sm text-ink/60">Confirmed: {portfolio?.name} — {committee.abbr}</p>
     )}

     {isDelegation&&(
      <div className="mt-4 space-y-4 border-t-2 border-dashed border-ink/15 pt-4">
       {(reg.preferences||[]).map((d,i)=>{
        const key=`${reg.id}-${i}`;
        const assignedCommittee=d.assigned&&committees.find(c=>c.id===d.assigned.committeeId);
        const assignedPortfolio=d.assigned&&portfolios[d.assigned.committeeId]?.find(p=>p.id===d.assigned.portfolioId);
        return(
         <div key={i} className="border-2 border-ink/10 p-3">
          <p className="font-serif font-bold">{d.name||`Delegate ${i+1}`}</p>
          {d.experience&&<p className="font-mono text-xs text-ink/60">Experience: {d.experience}{d.expDetail?` — ${d.expDetail}`:""}</p>}
          {d.awards&&<p className="font-mono text-xs text-ink/60">Awards: {d.awards}</p>}
          <ol className="mt-1 space-y-0.5 font-mono text-xs text-ink/60">
           {(d.prefs||[]).map((p,j)=><li key={j}>{j+1}. {p.committee} — {(p.portfolios||[]).filter(Boolean).join(" / ")||"(no portfolios chosen)"}</li>)}
          </ol>
          {!d.assigned?(
           <div className="mt-2">
            <AssignRow
             onAssign={()=>assign(reg,i)}
             pick={picks[key]||{}}
             setPick={patch=>setPick(key,patch)}
             committeeOptions={committeesWithPortfolios}
             availablePortfolios={(picks[key]?.committeeId?portfolios[picks[key].committeeId]:[])?.filter(p=>p.status==="available")}
             busy={busy===key}
            />
           </div>
          ):d.assigned.status==="pending"?(
           <div className="mt-2 flex items-center gap-2">
            <p className="font-mono text-xs">Assigned: {assignedPortfolio?.name} — {assignedCommittee?.abbr}</p>
            <button onClick={()=>markPaid(reg,i,d.assigned.portfolioId)} disabled={busy===key} className="btn-ghost py-1.5 text-xs disabled:opacity-40">{busy===key?<Loader2 className="animate-spin" size={14}/>:<CheckCircle2 size={14}/>}Mark Paid</button>
           </div>
          ):(
           <p className="mt-2 font-mono text-xs text-ink/60">Confirmed: {assignedPortfolio?.name} — {assignedCommittee?.abbr}</p>
          )}
         </div>
        );
       })}
      </div>
     )}
    </div>
   );
  })}
 </div>
 </>);
}
