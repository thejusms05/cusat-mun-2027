"use client";
import {useEffect,useState} from "react";
import Stamp from "@/components/Stamp";

// Type "thejus" anywhere on the site. That's the whole feature.
export default function EasterEgg(){
 const [show,setShow]=useState(false);
 useEffect(()=>{
  let buf="";
  const onKey=e=>{
   buf=(buf+e.key.toLowerCase()).slice(-6);
   if(buf==="thejus"){setShow(true);setTimeout(()=>setShow(false),3200);}
  };
  addEventListener("keydown",onKey);
  return()=>removeEventListener("keydown",onKey);
 },[]);
 if(!show)return null;
 return(
  <div className="pointer-events-none fixed bottom-6 right-6 z-[999]" aria-hidden="true">
   <Stamp text="Approved by the Architect" sub="Thejus" rotate={-14} size={128} tone="stamp" className="anim-stamp drop-shadow-xl"/>
  </div>
 );
}
