"use client";
import {useEffect,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {SPOTS,COLLAGE} from "@/lib/collage";

const clip=poly=>`polygon(${poly.map(([x,y])=>`${x}% ${y}%`).join(",")})`;
const pts=poly=>poly.map(p=>p.join(",")).join(" ");
const dim=poly=>`M0 0H100V100H0Z M${poly.map(([x,y],i)=>`${i?"L":""}${x} ${y}`).join(" ")}Z`;

function Collage({layout,className=""}){
 const [active,setActive]=useState(null);
 const [touch,setTouch]=useState(false);
 useEffect(()=>{setTouch(window.matchMedia("(hover: none)").matches)},[]);
 const c=COLLAGE[layout];
 const cur=SPOTS.find(s=>s.id===active);
 const tx=cur?(cur.anchor[layout][0]<25?"0%":cur.anchor[layout][0]>75?"-100%":"-50%"):"-50%";
 return (
  <div className={`relative mx-auto select-none ${className}`} onMouseLeave={()=>setActive(null)} onKeyDown={e=>{if(e.key==="Escape")setActive(null)}}>
   <Image src={c.src} alt="A collage of Kerala: a Kathakali artist, a sadya on a banana leaf, a KSRTC bus, an elephant, a pookalam, jasmine, payasam, a snake boat and palms" width={c.w} height={c.h} sizes={layout==="h"?"(min-width:1024px) 1100px, 100vw":"(max-width:1023px) 512px, 100vw"} className="h-auto w-full"/>

   {/* background layer: moving onto it clears the highlight */}
   <div className="absolute inset-0" onPointerEnter={e=>{if(e.pointerType==="mouse")setActive(null)}} onClick={()=>setActive(null)}/>

   {/* dim everything except the active element, and outline it */}
   {cur&&(
    <svg className="anim-fade pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
     <path d={dim(cur.poly[layout])} fill="rgba(15,28,14,.6)" fillRule="evenodd"/>
     <polygon points={pts(cur.poly[layout])} fill="none" stroke="#ECBB6E" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{filter:"drop-shadow(0 0 8px rgba(236,187,110,.95))"}}/>
    </svg>
   )}

   {/* one clickable region per element, cut to its outline */}
   {SPOTS.map(s=>(
    <Link
     key={s.id}
     href={s.href}
     aria-label={`${s.name} — ${s.label}`}
     className="absolute inset-0 cursor-pointer focus:outline-none"
     style={{clipPath:clip(s.poly[layout])}}
     onPointerEnter={e=>{if(e.pointerType==="mouse")setActive(s.id)}}
     onFocus={()=>setActive(s.id)}
     onClick={e=>{if(touch&&active!==s.id){e.preventDefault();setActive(s.id)}}}
    />
   ))}

   {/* little pulsing hints, until something is touched */}
   {!active&&SPOTS.map(s=>(
    <span key={s.id} className="pointer-events-none absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2" style={{left:`${s.anchor[layout][0]}%`,top:`${s.anchor[layout][1]}%`}} aria-hidden="true">
     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-70"/>
     <span className="relative block h-4 w-4 rounded-full border-2 border-ink-900 bg-gold-light shadow-lg"/>
    </span>
   ))}

   {/* the pop-up label */}
   {cur&&(
    <Link href={cur.href} className="anim-fade absolute z-30 block" style={{left:`${cur.anchor[layout][0]}%`,top:`${cur.anchor[layout][1]}%`,transform:`translate(${tx},-50%)`}}>
     <span className="flex items-center gap-3 whitespace-nowrap rounded-sm border-2 border-gold-light bg-ink-900/95 px-3.5 py-2 text-paper shadow-2xl sm:px-4 sm:py-2.5">
      <span>
       <span className="label-mono block !text-gold-light">{cur.name}</span>
       <span className="block font-serif text-lg font-bold leading-tight sm:text-2xl">{cur.label}</span>
       {touch&&<span className="label-mono mt-0.5 block !text-paper/60">Tap to open</span>}
      </span>
      <ArrowRight size={20} className="shrink-0 text-gold-light"/>
     </span>
    </Link>
   )}
  </div>
 );
}

// Horizontal collage on laptops, vertical collage on phones and tablets.
export default function CollageMenu(){
 return (<>
  <Collage layout="h" className="hidden max-w-6xl lg:block"/>
  <Collage layout="v" className="max-w-lg lg:hidden"/>
 </>);
}
