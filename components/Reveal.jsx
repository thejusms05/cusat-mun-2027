"use client";
import {useEffect,useRef,useState} from "react";
export default function Reveal({as:T="div",delay=0,className="",children,style={},...p}){
 const r=useRef(null),[on,setOn]=useState(false);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);o.disconnect()}},{threshold:.15});o.observe(r.current);return()=>o.disconnect()},[]);
 return <T ref={r} className={`reveal ${on?"in":""} ${className}`} style={{"--d":`${delay}ms`,...style}} {...p}>{children}</T>;
}
