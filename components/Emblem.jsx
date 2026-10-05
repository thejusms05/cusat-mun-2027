"use client";
import {Shield,Scroll,Vote,Venus,Scale,Crown,Newspaper,Camera,Landmark} from "lucide-react";

const ICONS={shield:Shield,scroll:Scroll,vote:Vote,venus:Venus,scale:Scale,crown:Crown,newspaper:Newspaper,camera:Camera};

// A UN-roundel style badge: concentric rings, a laurel-ish inner ring, and
// a lucide icon standing in for each committee's emblem artwork.
export default function Emblem({icon,size=56,className=""}){
 const Icon=ICONS[icon]||Landmark;
 const s=size;
 return (
  <svg viewBox="0 0 100 100" width={s} height={s} className={className} role="img" aria-hidden="true">
   <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55"/>
   <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
   {Array.from({length:24}).map((_,i)=>{
    const a=(i/24)*2*Math.PI, x1=50+44*Math.cos(a), y1=50+44*Math.sin(a), x2=50+48*Math.cos(a), y2=50+48*Math.sin(a);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.5"/>;
   })}
   <circle cx="50" cy="50" r="30" fill="currentColor" opacity="0.08"/>
   <foreignObject x="27" y="27" width="46" height="46">
    <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
     <Icon size={26} strokeWidth={1.6} color="currentColor"/>
    </div>
   </foreignObject>
  </svg>
 );
}
