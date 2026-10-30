// Temple bells hanging from the top edge, each swinging gently (motif from the design team's art).
const BELLS=[
 {x:5,len:46,s:.8,dur:5.2,del:-.4,always:false},
 {x:13,len:96,s:1,dur:6.1,del:-2.1,always:true},
 {x:22,len:30,s:.7,dur:4.6,del:-1.3,always:false},
 {x:78,len:34,s:.7,dur:5.6,del:-3,always:false},
 {x:87,len:100,s:1,dur:6.4,del:-.9,always:true},
 {x:95,len:52,s:.85,dur:4.9,del:-2.4,always:false},
];
function BellShape(){
 return (
  <svg viewBox="0 0 40 50" className="h-full w-full" aria-hidden="true">
   <path d="M20 1.5c2.2 0 3.5 1.4 3.5 3.3v2.2c7.6 1.8 10.7 9.4 10.7 19.3v4.2l3.8 5.2H2l3.8-5.2v-4.2C5.8 16.4 8.9 8.8 16.5 7V4.8c0-1.9 1.3-3.3 3.5-3.3z" fill="url(#bellG)" stroke="#5A3414" strokeWidth="1"/>
   <path d="M8.5 24 Q20 29 31.5 24" fill="none" stroke="#5A3414" strokeWidth=".8" opacity=".6"/>
   <ellipse cx="20" cy="40.2" rx="17" ry="2.2" fill="#8C4D21"/>
   <circle cx="20" cy="44.5" r="3.6" fill="#C28A36" stroke="#5A3414" strokeWidth=".8"/>
   <path d="M13 12 Q11 20 11.5 28" fill="none" stroke="#FFE9B0" strokeWidth="1.6" strokeLinecap="round" opacity=".7"/>
  </svg>
 );
}
export default function Bells({className=""}){
 return (
  <div className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-0 ${className}`} aria-hidden="true">
   <svg width="0" height="0" className="absolute"><defs>
    <linearGradient id="bellG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8C4D21"/><stop offset=".35" stopColor="#ECBB6E"/><stop offset=".62" stopColor="#C28A36"/><stop offset="1" stopColor="#7A4219"/></linearGradient>
   </defs></svg>
   {BELLS.map((b,i)=>(
    <div key={i} className={`swing absolute top-0 flex-col items-center ${b.always?"flex":"hidden sm:flex"}`} style={{left:`${b.x}%`,animationDuration:`${b.dur}s`,animationDelay:`${b.del}s`}}>
     <span className="block w-px bg-gold/70" style={{height:`${b.len}px`}}/>
     <span className="block" style={{width:`${28*b.s}px`,height:`${35*b.s}px`}}><BellShape/></span>
    </div>
   ))}
  </div>
 );
}
