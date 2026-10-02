"use client";
import {useEffect,useState} from "react";
import {EVENT_START} from "@/lib/data";
export default function Countdown(){
 const [t,setT]=useState(null);
 useEffect(()=>{const f=()=>setT(Math.max(0,new Date(EVENT_START)-Date.now()));f();const i=setInterval(f,1000);return()=>clearInterval(i)},[]);
 const v=t===null?["--","--","--","--"]:[Math.floor(t/864e5),Math.floor(t/36e5)%24,Math.floor(t/6e4)%60,Math.floor(t/1e3)%60];
 const labels=["Days","Hrs","Min","Sec"];
 return(<div className="inline-flex gap-1.5 border-2 border-ink bg-ink p-2 shadow-xl" aria-label="Countdown to opening ceremony">
  {labels.map((l,i)=>(
   <div key={l} className="flex flex-col items-center">
    <div className="relative w-[3rem] overflow-hidden rounded-[2px] bg-ink-900 text-center sm:w-16">
     <div key={v[i]} className="anim-tick py-2 font-mono text-2xl font-bold text-gold sm:text-3xl">{String(v[i]).padStart(2,"0")}</div>
     <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/70"/>
    </div>
    <span className="label-mono mt-1.5 text-paper/60">{l}</span>
   </div>
  ))}
 </div>);
}
