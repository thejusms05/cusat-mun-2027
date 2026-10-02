"use client";
import {useEffect,useState} from "react";
import {ChevronDown,Loader2} from "lucide-react";
import {committees} from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";

function counts(list){
 return {
  available: list.filter(p=>p.status==="available").length,
  pending: list.filter(p=>p.status==="pending").length,
  confirmed: list.filter(p=>p.status==="confirmed").length,
 };
}

export default function PortfolioMatrix(){
 const [open,setOpen]=useState(committees[0]?.id);
 const [portfolios,setPortfolios]=useState({});
 const [loading,setLoading]=useState(true);

 useEffect(()=>{
  fetch("/api/admin/data").then(r=>r.json()).then(json=>{
   const grouped={};
   for(const p of json.portfolios||[]) (grouped[p.committee_id] ||= []).push(p);
   setPortfolios(grouped);
   setLoading(false);
  });
 },[]);

 return(<>
 <PageHeader eyebrow="Live Roster" title="Portfolio Matrix" sub="See which countries and portfolios are open, which are assigned and awaiting payment, and which are fully confirmed — updated as registrations are processed."/>
 {loading?<div className="section flex justify-center"><Loader2 className="animate-spin text-ink" size={28}/></div>:
 <div className="section max-w-3xl space-y-3">
  {committees.map(c=>{
   const list=portfolios[c.id];
   const cnt=list?counts(list):null;
   const isOpen=open===c.id;
   return(
    <div key={c.id} className="border-2 border-ink/15 bg-paper">
     <button onClick={()=>setOpen(isOpen?null:c.id)} aria-expanded={isOpen} className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left">
      <span className="flex items-center gap-3"><span className="font-serif text-lg font-bold">{c.abbr}</span><span className="label-mono text-ink/45">{c.level}</span></span>
      {cnt
       ? <span className="label-mono flex gap-3 text-ink/50"><span>{cnt.available} open</span><span>{cnt.pending} pending</span><span>{cnt.confirmed} confirmed</span></span>
       : <span className="label-mono text-ink/40">No portfolios — apply directly</span>}
      <ChevronDown className={`shrink-0 text-ink transition ${isOpen?"rotate-180":""}`}/>
     </button>
     <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen?"grid-rows-[1fr]":"grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">
       <div className="border-t-2 border-ink/10 px-5 py-4">
        {list
         ? <ul className="grid gap-2 sm:grid-cols-2">
            {list.sort((a,b)=>a.name.localeCompare(b.name)).map(p=><li key={p.id} className="flex items-center justify-between gap-3 border-b border-ink/10 py-2 text-sm">
             <span>{p.name}</span><StatusBadge status={p.status}/>
            </li>)}
           </ul>
         : <p className="font-mono text-sm text-ink/60">{c.abbr} is a press committee and does not carry country or party portfolios — register directly from the Registration page under International Press.</p>}
       </div>
      </div>
     </div>
    </div>
   );
  })}
 </div>}
 </>);
}
