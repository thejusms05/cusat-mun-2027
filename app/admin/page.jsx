"use client";
import {useEffect,useState} from "react";
import {Lock,CheckCircle2,UserPlus,AlertTriangle,Loader2,Pencil,Trash2,Save,X} from "lucide-react";
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

function AssignRow({onAssign,pick,setPick,committeeOptions,availablePortfolios,busy,buttonLabel="Assign"}){
 return(<div className="flex flex-wrap items-end gap-2">
  <select value={pick.committeeId||""} onChange={e=>setPick({committeeId:e.target.value,portfolioId:""})} className="border-2 border-ink/25 bg-transparent px-2 py-1.5 font-mono text-xs">
   <option value="">Committee…</option>
   {committeeOptions.map(cid=><option key={cid} value={cid}>{committees.find(c=>c.id===cid)?.abbr||cid}</option>)}
  </select>
  <select value={pick.portfolioId||""} onChange={e=>setPick({...pick,portfolioId:e.target.value})} disabled={!pick.committeeId} className="border-2 border-ink/25 bg-transparent px-2 py-1.5 font-mono text-xs disabled:opacity-40">
   <option value="">Portfolio…</option>
   {availablePortfolios?.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
  </select>
  <button onClick={onAssign} disabled={!pick.committeeId||!pick.portfolioId||busy} className="btn-ink py-1.5 text-xs disabled:opacity-40">{busy?<Loader2 className="animate-spin" size={14}/>:<UserPlus size={14}/>}{buttonLabel}</button>
 </div>);
}

// Shared panel for "not assigned yet" / "assigned, payment pending" / "confirmed" —
// used for both an individual delegate's own assignment and each delegate inside a delegation.
function AssignmentPanel({status,label,pick,setPick,committeeOptions,availablePortfolios,onAssign,onUnassign,onMarkPaid,busyAssign,busyUnassign,busyPaid}){
 if(status==="new"){
  return <AssignRow onAssign={onAssign} pick={pick} setPick={setPick} committeeOptions={committeeOptions} availablePortfolios={availablePortfolios} busy={busyAssign}/>;
 }
 return(<div className="space-y-3">
  <div className="flex flex-wrap items-center gap-3">
   <p className="font-mono text-sm">{status==="confirmed"?"Confirmed":"Assigned"}: <b>{label}</b></p>
   {status==="pending"&&<button onClick={onMarkPaid} disabled={busyPaid} className="btn-ghost py-1.5 text-xs disabled:opacity-40">{busyPaid?<Loader2 className="animate-spin" size={14}/>:<CheckCircle2 size={14}/>}Mark as Paid</button>}
   <button onClick={onUnassign} disabled={busyUnassign} className="btn-ghost border-stamp/40 py-1.5 text-xs text-stamp hover:border-stamp disabled:opacity-40">{busyUnassign?<Loader2 className="animate-spin" size={14}/>:<Trash2 size={14}/>}Remove Assignment</button>
  </div>
  <div>
   <p className="label-mono mb-1 text-ink/40">Reassign to a different portfolio</p>
   <AssignRow onAssign={onAssign} pick={pick} setPick={setPick} committeeOptions={committeeOptions} availablePortfolios={availablePortfolios} busy={busyAssign} buttonLabel="Reassign"/>
  </div>
 </div>);
}

export default function Admin(){
 const [unlocked,setUnlocked]=useState(false);
 const [regs,setRegs]=useState([]);
 const [portfolios,setPortfolios]=useState({});
 const [picks,setPicks]=useState({});
 const [busy,setBusy]=useState(null);
 const [loading,setLoading]=useState(true);
 const [editing,setEditing]=useState(null);
 const [editDraft,setEditDraft]=useState({});

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
 const rowKey=(reg,delegateIndex)=>delegateIndex==null?reg.id:`${reg.id}-${delegateIndex}`;
 const setPick=(key,patch)=>setPicks(p=>({...p,[key]:{...p[key],...patch}}));

 const assign=async(reg,delegateIndex=null)=>{
  const rk=rowKey(reg,delegateIndex);
  const pick=picks[rk];
  if(!pick?.committeeId||!pick?.portfolioId)return;
  setBusy(`${rk}:assign`);
  const r=await fetch("/api/admin/assign",{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({registrationId:reg.id,portfolioId:pick.portfolioId,committeeId:pick.committeeId,delegateIndex})});
  if(!r.ok){const err=await r.json().catch(()=>({}));alert("Assign failed: "+(err.error||r.status));}
  setPicks(p=>({...p,[rk]:{}}));
  await load();
  setBusy(null);
 };
 const unassign=async(reg,delegateIndex=null,portfolioId=null)=>{
  const rk=rowKey(reg,delegateIndex);
  setBusy(`${rk}:unassign`);
  const r=await fetch("/api/admin/unassign",{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({registrationId:reg.id,portfolioId,delegateIndex})});
  if(!r.ok){const err=await r.json().catch(()=>({}));alert("Remove failed: "+(err.error||r.status));}
  await load();
  setBusy(null);
 };
 const markPaid=async(reg,delegateIndex=null,portfolioId=null)=>{
  const rk=rowKey(reg,delegateIndex);
  setBusy(`${rk}:paid`);
  const r=await fetch("/api/admin/mark-paid",{method:"POST",headers:{"Content-Type":"application/json"},
   body:JSON.stringify({registrationId:reg.id,portfolioId,delegateIndex})});
  if(!r.ok){const err=await r.json().catch(()=>({}));alert("Mark as paid failed: "+(err.error||r.status));}
  await load();
  setBusy(null);
 };

 const startEdit=reg=>{
  setEditDraft({
   name:reg.name||"",institution:reg.institution||"",email:reg.email||"",
   experience:reg.experience||"",experienceDetail:reg.experience_detail||"",awards:reg.awards||"",
   delegateNames:(reg.preferences||[]).map(d=>d.name||""),
  });
  setEditing(reg.id);
 };
 const saveEdit=async reg=>{
  setBusy(`edit-${reg.id}`);
  const isDelegation=reg.type==="delegation";
  const patch={name:editDraft.name,institution:editDraft.institution,email:editDraft.email};
  if(!isDelegation){patch.experience=editDraft.experience;patch.experienceDetail=editDraft.experienceDetail;patch.awards=editDraft.awards;}
  else{patch.delegateNames=editDraft.delegateNames;}
  const r=await fetch("/api/admin/edit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({registrationId:reg.id,patch})});
  if(!r.ok){const err=await r.json().catch(()=>({}));alert("Save failed: "+(err.error||r.status));}
  setEditing(null);
  await load();
  setBusy(null);
 };
 const deleteReg=async reg=>{
  if(!confirm(`Delete registration for "${reg.name||"this entry"}"? This cannot be undone, and will free up any portfolios assigned to them.`))return;
  setBusy(`delete-${reg.id}`);
  const r=await fetch("/api/admin/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({registrationId:reg.id})});
  if(!r.ok){const err=await r.json().catch(()=>({}));alert("Delete failed: "+(err.error||r.status));}
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
 <PageHeader eyebrow="Internal Use Only" title="Admin Console" sub="Assign, reassign, unassign or edit registrations — reads and writes your real Supabase database."/>
 <div className="section max-w-5xl space-y-5">
  {regs.length===0&&<p className="font-mono text-sm text-ink/50">No registrations yet.</p>}
  {regs.map(reg=>{
   const committee=committees.find(c=>c.id===reg.committee_id);
   const portfolio=reg.committee_id?portfolios[reg.committee_id]?.find(p=>p.id===reg.portfolio_id):null;
   const isDelegation=reg.type==="delegation";
   const indivStatus=reg.status==="new"?"new":reg.status==="assigned"?"pending":"confirmed";
   const indivRk=rowKey(reg,null);
   return(
    <div key={reg.id} className="border-2 border-ink/15 bg-paper p-5">
     <div className="flex flex-wrap items-start justify-between gap-3">
      {editing===reg.id?(
       <div className="w-full max-w-md space-y-2">
        <input value={editDraft.name} onChange={e=>setEditDraft({...editDraft,name:e.target.value})} placeholder="Name" className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-1.5 font-mono text-sm focus:border-ink"/>
        <input value={editDraft.institution} onChange={e=>setEditDraft({...editDraft,institution:e.target.value})} placeholder="Institution" className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-1.5 font-mono text-sm focus:border-ink"/>
        <input value={editDraft.email} onChange={e=>setEditDraft({...editDraft,email:e.target.value})} placeholder="Email" className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-1.5 font-mono text-sm focus:border-ink"/>
        {!isDelegation&&<>
         <select value={editDraft.experience} onChange={e=>setEditDraft({...editDraft,experience:e.target.value})} className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-1.5 font-mono text-sm focus:border-ink">
          <option value="">Experience…</option><option>0</option><option>1-3</option><option>4+</option>
         </select>
         <textarea rows={2} value={editDraft.experienceDetail} onChange={e=>setEditDraft({...editDraft,experienceDetail:e.target.value})} placeholder="Experience detail" className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-1.5 font-mono text-sm focus:border-ink"/>
         <textarea rows={2} value={editDraft.awards} onChange={e=>setEditDraft({...editDraft,awards:e.target.value})} placeholder="Awards" className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-1.5 font-mono text-sm focus:border-ink"/>
        </>}
        {isDelegation&&editDraft.delegateNames.map((n,i)=>(
         <input key={i} value={n} onChange={e=>{const next=[...editDraft.delegateNames];next[i]=e.target.value;setEditDraft({...editDraft,delegateNames:next});}} placeholder={`Delegate ${i+1} name`} className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-1.5 font-mono text-sm focus:border-ink"/>
        ))}
        <div className="flex gap-2 pt-1">
         <button onClick={()=>saveEdit(reg)} disabled={busy===`edit-${reg.id}`} className="btn-ink py-1.5 text-xs disabled:opacity-40">{busy===`edit-${reg.id}`?<Loader2 className="animate-spin" size={14}/>:<Save size={14}/>}Save</button>
         <button onClick={()=>setEditing(null)} className="btn-ghost py-1.5 text-xs"><X size={14}/>Cancel</button>
        </div>
       </div>
      ):(
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
      )}
      <div className="flex items-center gap-2">
       <StatusBadge status={isDelegation?delegationBadgeStatus(reg):(reg.status==="new"?"available":reg.status==="assigned"?"pending":"confirmed")}/>
       {editing!==reg.id&&<>
        <button onClick={()=>startEdit(reg)} title="Edit" className="rounded-sm border-2 border-ink/20 p-1.5 text-ink/60 transition hover:border-ink hover:text-ink"><Pencil size={14}/></button>
        <button onClick={()=>deleteReg(reg)} disabled={busy===`delete-${reg.id}`} title="Delete" className="rounded-sm border-2 border-stamp/40 p-1.5 text-stamp transition hover:border-stamp disabled:opacity-40">{busy===`delete-${reg.id}`?<Loader2 className="animate-spin" size={14}/>:<Trash2 size={14}/>}</button>
       </>}
      </div>
     </div>

     {!isDelegation&&(
      <div className="mt-4 border-t-2 border-dashed border-ink/15 pt-4">
       <AssignmentPanel
        status={indivStatus}
        label={`${portfolio?.name||"—"} — ${committee?.abbr||"—"}`}
        pick={picks[indivRk]||{}}
        setPick={patch=>setPick(indivRk,patch)}
        committeeOptions={committeesWithPortfolios}
        availablePortfolios={(picks[indivRk]?.committeeId?portfolios[picks[indivRk].committeeId]:[])?.filter(p=>p.status==="available")}
        onAssign={()=>assign(reg)}
        onUnassign={()=>unassign(reg,null,reg.portfolio_id)}
        onMarkPaid={()=>markPaid(reg,null,reg.portfolio_id)}
        busyAssign={busy===`${indivRk}:assign`}
        busyUnassign={busy===`${indivRk}:unassign`}
        busyPaid={busy===`${indivRk}:paid`}
       />
      </div>
     )}

     {isDelegation&&(
      <div className="mt-4 space-y-4 border-t-2 border-dashed border-ink/15 pt-4">
       {(reg.preferences||[]).map((d,i)=>{
        const rk=rowKey(reg,i);
        const assignedCommittee=d.assigned&&committees.find(c=>c.id===d.assigned.committeeId);
        const assignedPortfolio=d.assigned&&portfolios[d.assigned.committeeId]?.find(p=>p.id===d.assigned.portfolioId);
        const dStatus=!d.assigned?"new":d.assigned.status;
        return(
         <div key={i} className="border-2 border-ink/10 p-3">
          <p className="font-serif font-bold">{d.name||`Delegate ${i+1}`}</p>
          {d.experience&&<p className="font-mono text-xs text-ink/60">Experience: {d.experience}{d.expDetail?` — ${d.expDetail}`:""}</p>}
          {d.awards&&<p className="font-mono text-xs text-ink/60">Awards: {d.awards}</p>}
          <ol className="mt-1 space-y-0.5 font-mono text-xs text-ink/60">
           {(d.prefs||[]).map((p,j)=><li key={j}>{j+1}. {p.committee} — {(p.portfolios||[]).filter(Boolean).join(" / ")||"(no portfolios chosen)"}</li>)}
          </ol>
          <div className="mt-2">
           <AssignmentPanel
            status={dStatus}
            label={`${assignedPortfolio?.name||"—"} — ${assignedCommittee?.abbr||"—"}`}
            pick={picks[rk]||{}}
            setPick={patch=>setPick(rk,patch)}
            committeeOptions={committeesWithPortfolios}
            availablePortfolios={(picks[rk]?.committeeId?portfolios[picks[rk].committeeId]:[])?.filter(p=>p.status==="available")}
            onAssign={()=>assign(reg,i)}
            onUnassign={()=>unassign(reg,i,d.assigned?.portfolioId)}
            onMarkPaid={()=>markPaid(reg,i,d.assigned?.portfolioId)}
            busyAssign={busy===`${rk}:assign`}
            busyUnassign={busy===`${rk}:unassign`}
            busyPaid={busy===`${rk}:paid`}
           />
          </div>
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
