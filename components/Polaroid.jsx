"use client";
import Image from "next/image";
import {Camera} from "lucide-react";

// A scrapbook-style photo frame. Pass `src` once you have a real photo —
// until then it shows a labeled placeholder so the layout stays intact.
export default function Polaroid({src,alt="",caption,rotate=-3,tape="tl",className=""}){
 return (
  <div className={`polaroid ${className}`} style={{"--rot":`${rotate}deg`}}>
   {tape!=="none" && <span className={`tape tape-${tape}`} aria-hidden="true"/>}
   <div className="polaroid-photo">
    {src
     ? <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 50vw, 320px"/>
     : <div className="polaroid-placeholder"><Camera size={26} strokeWidth={1.3}/><span className="label-mono">Add photo</span></div>}
   </div>
   {caption && <p className="polaroid-caption">{caption}</p>}
  </div>
 );
}
