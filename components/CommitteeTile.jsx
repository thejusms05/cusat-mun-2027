"use client";
import {useState} from "react";
import {GraduationCap} from "lucide-react";
import {iconFor} from "@/components/committeeIcons";

// A committee wrapped in a banana leaf. Tap the leaf and it unwraps.
export default function CommitteeTile({committee, onViewDetails, onReveal, isDiesIrae}){
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
   <button 
      type="button" 
      onClick={() => {
        onReveal?.(committee.id);
        if (committee.id === "bestofbest") {
          onViewDetails(committee);
        } else {
          setOpen(true);
        }
      }}
      className={`absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center border-2 border-gold bg-paper transition-all duration-500 ${open ? "pointer-events-none opacity-0 scale-105" : "opacity-100 scale-100"}`}
    >
      <img
       src={committee.image}
       alt="Committee Figure"
       className={`h-[80%] w-[80%] object-contain drop-shadow-md transition-opacity duration-700 ${isDiesIrae && committee.id !== "flagcom" ? "opacity-0" : "opacity-100"}`}
     />
     <img
       src="/images/flagshiplogo.png"
       alt="Dies Irae Logo"
       className={`absolute h-[65%] w-[65%] object-contain drop-shadow-md transition-opacity duration-700 ${isDiesIrae && committee.id !== "flagcom" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
     />
     <span className={`absolute bottom-4 label-mono text-ink/80 uppercase tracking-wider transition-opacity duration-700 ${isDiesIrae && committee.id !== "flagcom" ? "opacity-0" : "opacity-100"}`}>{committee.navarasa}</span>
    </button>
  </div>
 );
}




