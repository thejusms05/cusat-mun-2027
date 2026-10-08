"use client";
import {useEffect,useRef,useState} from "react";
import Image from "next/image";

const ROTS=[-11,0,11];

export default function CardFan({ids=["disec","unhrc","ioic"],startDelay=900,className=""}){
 const ref=useRef(null);
 const [flipped,setFlipped]=useState([]);

 useEffect(()=>{
  const timers=[];
  const o=new IntersectionObserver(([e])=>{
   if(!e.isIntersecting)return;
   o.disconnect();
   ids.forEach((_,i)=>timers.push(setTimeout(()=>setFlipped(f=>[...f,i]),startDelay+i*650)));
  },{threshold:.3});
  o.observe(ref.current);
  return()=>{o.disconnect();timers.forEach(clearTimeout)};
 },[]);

 return(
  <div ref={ref} className={`relative mx-auto flex h-64 w-full max-w-sm items-center justify-center sm:h-72 ${className}`}>
   {ids.map((id,i)=>(
    <div key={id} className="absolute w-28 transition-transform duration-300 hover:-translate-y-3 sm:w-36" style={{transform:`translateX(${(i-1)*60}px) rotate(${ROTS[i]}deg)`,zIndex:i+1}}>
     <div className={`flip-card aspect-[700/980] ${flipped.includes(i)?"flipped":""}`}>
      <div className="flip-inner">
       <div className="flip-face shadow-2xl ring-1 ring-ink/20"><Image src="/images/cards/card-back.jpg" alt="" fill className="object-cover" sizes="150px"/></div>
       <div className="flip-front flip-face shadow-2xl ring-1 ring-ink/20"><Image src={`/images/cards/${id}.jpg`} alt={`${id} committee card`} fill className="object-cover" sizes="150px"/></div>
      </div>
     </div>
    </div>
   ))}
  </div>
 );
}
