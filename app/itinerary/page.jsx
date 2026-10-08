"use client";
import {useState} from "react";
import {ChevronDown,Download} from "lucide-react";
import {days,faqs} from "@/lib/data";
import PageHeader from "@/components/PageHeader";
function Acc({title,sub,children,open,onToggle,mono}){
 return(<div className="border-2 border-ink/15 bg-paper transition hover:border-ink">
  <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
   <span className="flex items-center gap-3">{mono&&<span className="shrink-0 text-base text-ink">♠</span>}<span className="font-serif text-lg font-bold">{title}</span>{sub&&<span className="label-mono text-ink/50">{sub}</span>}</span>
   <ChevronDown className={`shrink-0 text-ink transition ${open?"rotate-180":""}`}/></button>
  <div className={`grid transition-[grid-template-rows] duration-300 ${open?"grid-rows-[1fr]":"grid-rows-[0fr]"}`}><div className="overflow-hidden"><div className="px-5 pb-5">{children}</div></div></div></div>);
}
export default function Itinerary(){
 const [d,setD]=useState(0),[f,setF]=useState(0);
 return(<>
 <PageHeader eyebrow="Order of Play · 22–24 Jan 2027" title="Itinerary & Resources"/>
 <section className="section max-w-3xl"><h2 className="text-3xl font-bold">Schedule</h2>
  <div className="mt-6 space-y-3">{days.map((x,i)=><Acc key={x.d} title={x.d} sub={x.t} open={d===i} onToggle={()=>setD(d===i?-1:i)} mono>
   <ol className="ml-2 space-y-4 border-l-2 border-dashed border-ink/50 pl-5">{x.items.map(([t,e])=><li key={t+e} className="relative"><span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-paper"/><span className="font-mono font-semibold">{t}</span><span className="ml-3 text-ink/80">{e}</span></li>)}</ol></Acc>)}</div></section>
 <section className="border-y-2 border-ink/15 bg-ink text-paper"><div className="section max-w-3xl"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-3xl font-bold">Rules of Procedure</h2>
  <a href="#" className="btn-gold"><Download size={18}/>Download Rulebook</a></div>
  <div className="mt-6 space-y-3">{faqs.map(([q,a],i)=><div key={q} className="border-2 border-paper/20 bg-ink">
   <button onClick={()=>setF(f===i?-1:i)} aria-expanded={f===i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
    <span className="font-serif text-lg font-bold">{q}</span>
    <ChevronDown className={`shrink-0 text-gold transition ${f===i?"rotate-180":""}`}/></button>
   <div className={`grid transition-[grid-template-rows] duration-300 ${f===i?"grid-rows-[1fr]":"grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="px-5 pb-5 font-mono text-sm leading-relaxed text-paper/75">{a}</p></div></div>
  </div>)}</div></div></section></>);
}
