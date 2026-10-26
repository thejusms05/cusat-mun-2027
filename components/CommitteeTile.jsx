"use client";
import {useState} from "react";
import {GraduationCap} from "lucide-react";
import {iconFor} from "@/components/committeeIcons";

// A committee wrapped in a banana leaf. Tap the leaf and it unwraps.
export default function CommitteeTile({committee,onViewDetails}){
 const [open,setOpen]=useState(false);
 const Icon=iconFor(committee);
 return (
  <div className={`wrap-scene relative h-[23rem] w-full ${open?"wrap-open":""}`}>
   <div className="absolute inset-0 flex flex-col overflow-hidden border-2 border-gold bg-paper text-center shadow-xl">
    <div className="kasavu-band shrink-0"/>
    <div className="flex flex-1 flex-col items-center px-5 pb-5 pt-5">
     <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light ring-2 ring-ink/20"><Icon size={28} strokeWidth={1.6}/></div>
     <h3 className="mt-3 text-2xl font-bold">{committee.abbr}</h3>
     <p className="label-mono mt-1 line-clamp-2">{committee.name}</p>
     <p className="mt-2 line-clamp-3 text-sm text-ink/75">{committee.teaser}</p>
     <p className="label-mono mt-2 inline-flex items-center gap-1.5 border border-ink/20 px-2 py-1"><GraduationCap size={13} className="text-stamp"/>{committee.level}</p>
     <button type="button" tabIndex={open?0:-1} onClick={()=>onViewDetails(committee)} className="btn-ink mt-auto w-full py-2">View Details</button>
    </div>
   </div>
   <button type="button" onClick={()=>setOpen(true)} disabled={open} aria-label={`Unwrap the ${committee.abbr} leaf`} className={`absolute inset-0 z-10 cursor-pointer ${open?"pointer-events-none":""}`}>
    <span className="wrap-flap left"/>
    <span className="wrap-flap right"/>
    <span className="wrap-thread absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-gradient-to-r from-gold via-gold-light to-gold"/>
    <span className="wrap-thread absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 bg-gradient-to-b from-gold via-gold-light to-gold"/>
    <span className="wrap-thread absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-gold bg-paper font-serif text-2xl font-bold text-ink shadow-lg">?</span>
    <span className="wrap-thread label-mono absolute inset-x-0 bottom-3 text-center text-paper/90">Tap to unwrap</span>
   </button>
  </div>
 );
}
