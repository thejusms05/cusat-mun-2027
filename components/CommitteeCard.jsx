"use client";
import {useState} from "react";
import Image from "next/image";

export default function CommitteeCard({committee,onViewDetails,className=""}){
 const [flipped,setFlipped]=useState(false);
 return (
  <div
   className={`flip-card aspect-[700/980] w-full cursor-pointer select-none ${flipped?"flipped":""} ${className}`}
   onClick={()=>setFlipped(true)}
   role="button"
   tabIndex={0}
   aria-label={flipped?`${committee.abbr} card`:`Reveal ${committee.abbr} card`}
   onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setFlipped(true);}}}
  >
   <div className="flip-inner">
    <div className="flip-face shadow-xl ring-1 ring-ink/15">
     <Image src="/images/cards/card-back.jpg" alt="" fill className="object-cover" sizes="(max-width:768px) 45vw, 260px"/>
    </div>
    <div className="flip-front flip-face shadow-xl ring-1 ring-ink/15">
     <Image src={`/images/cards/${committee.id}.jpg`} alt={`${committee.abbr} — ${committee.name}`} fill className="object-cover" sizes="(max-width:768px) 45vw, 260px"/>
     {flipped&&
      <button
       onClick={e=>{e.stopPropagation();onViewDetails(committee);}}
       className="label-mono absolute inset-x-3 bottom-3 border-2 border-paper bg-ink/90 py-2 text-paper backdrop-blur transition hover:bg-ink"
      >View Details</button>}
    </div>
   </div>
  </div>
 );
}
