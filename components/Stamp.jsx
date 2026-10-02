"use client";
import {useId} from "react";

// A rotated, ink-stamp style circular badge with curved text — used
// throughout the site as a decorative "official stamp" motif.
export default function Stamp({text="CUSAT MUN",sub="2027",rotate=-8,size=104,tone="ink",className=""}){
 const id=useId().replace(/[^a-zA-Z0-9]/g,"");
 const col=tone==="stamp"?"#B23A2E":tone==="gold"?"#B8902F":"#1B2A4A";
 return (
  <div className={`stamp ${className}`} style={{"--rot":`${rotate}deg`,color:col}}>
   <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={`${text} ${sub}`}>
    <defs><path id={`p${id}`} d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"/></defs>
    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2.5 3.5" opacity="0.85"/>
    <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    <text fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="2.5" fill="currentColor">
     <textPath href={`#p${id}`} startOffset="2%">{text.toUpperCase()}</textPath>
    </text>
    <text x="60" y={sub?"58":"64"} textAnchor="middle" fontFamily="var(--font-serif)" fontWeight="700" fontSize="17" fill="currentColor">{sub}</text>
    {sub&&<>
     <line x1="34" y1="68" x2="86" y2="68" stroke="currentColor" strokeWidth="1"/>
     <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.5" fill="currentColor">EST. 2027</text>
    </>}
   </svg>
  </div>
 );
}
