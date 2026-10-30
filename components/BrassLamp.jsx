// A tall brass nilavilakku with lit wicks (motif from the design team's art).
export default function BrassLamp({className=""}){
 const O="#5A3414";
 return (
  <svg viewBox="0 0 100 270" className={className} aria-hidden="true">
   <defs><linearGradient id="brassG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7A4219"/><stop offset=".3" stopColor="#ECBB6E"/><stop offset=".55" stopColor="#C28A36"/><stop offset="1" stopColor="#6E3A15"/></linearGradient></defs>
   {[16,33,67,84].map((x,i)=>(
    <g key={x}>
     <ellipse cx={x} cy="57" rx="6.5" ry="2.6" fill="url(#brassG)" stroke={O} strokeWidth=".8"/>
     <g className="flicker" style={{animationDelay:`${i*.4}s`}}>
      <path d={`M${x} 38 C${x+5} 46 ${x+5} 52 ${x} 56 C${x-5} 52 ${x-5} 46 ${x} 38Z`} fill="#FFD27A"/>
      <path d={`M${x} 46 C${x+2.5} 50 ${x+2.5} 53 ${x} 55 C${x-2.5} 53 ${x-2.5} 50 ${x} 46Z`} fill="#E8761B"/>
     </g>
    </g>
   ))}
   <path d="M50 4 C54 14 56 22 52 30 L56 36 L56 44 L60 50 L40 50 L44 44 L44 36 L48 30 C44 22 46 14 50 4Z" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <ellipse cx="50" cy="64" rx="48" ry="9" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <path d="M6 66 Q50 94 94 66 L88 75 Q50 100 12 75Z" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <ellipse cx="50" cy="96" rx="16" ry="10" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <rect x="44" y="104" width="12" height="20" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <ellipse cx="50" cy="132" rx="24" ry="12" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <rect x="45" y="141" width="10" height="26" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <ellipse cx="50" cy="180" rx="12" ry="15" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <path d="M30 250 Q50 198 70 250Z" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <rect x="14" y="248" width="72" height="9" rx="3" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
   <ellipse cx="50" cy="262" rx="42" ry="7" fill="url(#brassG)" stroke={O} strokeWidth="1"/>
  </svg>
 );
}
