"use client";
import {useEffect,useRef,useState} from "react";
export default function CountUp({to,suffix=""}){
 const r=useRef(null),[n,setN]=useState(0);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();
  const t0=performance.now(),D=1400,f=t=>{const k=Math.min(1,(t-t0)/D);setN(Math.round(to*(1-Math.pow(1-k,3))));k<1&&requestAnimationFrame(f)};requestAnimationFrame(f)},{threshold:.5});
  o.observe(r.current);return()=>o.disconnect()},[to]);
 return <span ref={r}>{n}{suffix}</span>;
}
