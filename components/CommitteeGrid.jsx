"use client";
import {useEffect,useState} from "react";
import {useSearchParams} from "next/navigation";
import {Download,X,User,GraduationCap} from "lucide-react";
import {committees} from "@/lib/data";
import Reveal from "@/components/Reveal";
import Emblem from "@/components/Emblem";
export default function CommitteeGrid(){
 const q=useSearchParams().get("c");
 const [sel,setSel]=useState(null);
 useEffect(()=>{setSel(committees.find(c=>c.id===q)||null)},[q]);
 useEffect(()=>{const f=e=>e.key==="Escape"&&setSel(null);addEventListener("keydown",f);return()=>removeEventListener("keydown",f)},[]);
 return(<>
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
   {committees.map((c,i)=><Reveal as="article" delay={(i%4)*90} key={c.id} className={`folder group flex flex-col border-ink/20 ${i%2?"rotate-1":"-rotate-1"}`}>
    <div className="label-mono absolute -top-3 left-4 bg-ink px-2 py-0.5 text-paper">File {String(i+1).padStart(2,"0")}</div>
    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink/15 bg-paper-dark text-ink transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:text-stamp">
     <Emblem icon={c.icon} size={44}/></div>
    <h3 className="mt-4 text-xl font-bold">{c.abbr}</h3><p className="label-mono text-ink/50">{c.name}</p>
    <p className="mt-3 flex-1 text-sm text-ink/70">{c.teaser}</p>
    <p className="label-mono mt-3 inline-flex w-fit items-center gap-1.5 border border-ink/20 px-2 py-1 text-ink/60"><GraduationCap size={13} className="text-stamp"/>{c.level}</p>
    <button onClick={()=>setSel(c)} className="btn-ghost mt-5 w-full py-2">Open File</button></Reveal>)}
  </div>
  {sel&&<div className="fixed inset-0 z-[60] flex items-end justify-center anim-fade bg-ink/80 p-0 sm:items-center sm:p-4" onClick={()=>setSel(null)} role="dialog" aria-modal="true">
   <div onClick={e=>e.stopPropagation()} className="anim-sheet max-h-[92vh] w-full max-w-2xl overflow-y-auto border-2 border-ink/20 bg-paper p-6 sm:p-8">
    <div className="relative">
     <div className="label-mono absolute -left-2 -top-2 -rotate-6 border-2 border-stamp px-2 py-0.5 text-stamp">Classified</div>
     <button aria-label="Close" onClick={()=>setSel(null)} className="absolute right-0 top-0 rounded-sm border-2 border-ink/20 p-1.5 transition hover:bg-ink/5"><X size={18}/></button>
     <div className="flex items-start gap-4 pt-10">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-ink/15 bg-paper-dark text-ink"><Emblem icon={sel.icon} size={46}/></div>
      <div><h2 className="text-3xl font-bold">{sel.abbr}</h2><p className="text-ink/70">{sel.name}</p>
       <p className="label-mono mt-1 inline-flex items-center gap-1.5 border border-ink/20 px-2 py-1 text-ink/60"><GraduationCap size={13} className="text-stamp"/>{sel.level}</p></div>
     </div>
    </div>
    <h3 className="label-mono mt-6 text-stamp">Agenda</h3><p className="mt-1 font-mono text-sm leading-relaxed">{sel.agenda}</p>
    <h3 className="label-mono mt-6 text-stamp">Executive Board</h3>
    <div className="mt-3 grid grid-cols-3 gap-4">{sel.board.map(n=><div key={n} className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-ink/25 bg-paper-dark text-ink/40"><User size={26}/></div><p className="font-mono mt-2 text-sm italic">{n}</p></div>)}</div>
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
     <a href="#" className="btn-gold"><Download size={18}/>Background Guide</a>
     <a href="#" className="btn-ink"><Download size={18}/>Country Matrix</a></div>
   </div></div>}
 </>);
}
