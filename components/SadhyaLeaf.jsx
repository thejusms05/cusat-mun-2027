import Link from "next/link";

/* Dishes are drawn in the flat, outlined, slightly mis-registered print style of the design team's artwork. */
const O="#14230F";           // outline
const SH="#0F1C0E";          // offset print shadow

function Chor(){
 const specks=[[34,50,20],[46,46,-15],[58,50,35],[40,58,-30],[52,58,10],[64,57,-20],[30,60,15],[70,62,25]];
 return (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
   <ellipse cx="54" cy="80" rx="42" ry="12" fill={SH} opacity=".35"/>
   {[0,1,2].map(i=><path key={i} className="steam" style={{animationDelay:`${i*0.9}s`}} d={`M${38+i*12} 26 q-5 -7 0 -12 q5 -6 0 -12`} fill="none" stroke="#F0E2BC" strokeWidth="2.4" strokeLinecap="round" opacity=".7"/>)}
   <path d="M8 70 C6 30 94 30 92 70 C92 86 8 86 8 70Z" fill="#F3E6C3" stroke={O} strokeWidth="1.6" strokeLinejoin="round"/>
   <path d="M8 70 C8 82 92 82 92 70" fill="none" stroke="#D2BC84" strokeWidth="3"/>
   <path d="M22 58 C30 42 70 42 78 58" fill="none" stroke="#FFF7DD" strokeWidth="5" strokeLinecap="round" opacity=".9"/>
   {specks.map(([x,y,r],i)=><ellipse key={i} cx={x} cy={y} rx="2.4" ry="1" fill="#CDB784" transform={`rotate(${r} ${x} ${y})`}/>)}
  </svg>
 );
}

function Aviyal(){
 const strips=[[30,44,22,5,25,"#D14912"],[48,38,20,5,-20,"#8DA84C"],[64,46,22,5,35,"#4A7030"],[38,56,20,5,-35,"#F0DDB0"],[55,58,22,5,15,"#D14912"],[70,58,18,5,-25,"#8DA84C"],[26,58,16,5,45,"#4A7030"],[46,48,18,5,60,"#F3E6C3"],[60,52,16,5,-60,"#F3E6C3"]];
 return (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
   <ellipse cx="54" cy="82" rx="42" ry="12" fill={SH} opacity=".35"/>
   <path d="M12 60 C8 36 34 24 52 26 C74 24 94 40 88 62 C84 82 22 84 12 60Z" fill="#E9C46A" stroke={O} strokeWidth="1.6" strokeLinejoin="round"/>
   <path d="M16 62 C18 76 80 78 84 62" stroke="#C99A3E" fill="none" strokeWidth="3"/>
   {strips.map(([x,y,w,h,r,c],i)=><rect key={i} x={x-w/2} y={y-h/2} width={w} height={h} rx="2.5" fill={c} stroke={O} strokeWidth=".7" transform={`rotate(${r} ${x} ${y})`}/>)}
   {[[40,40],[58,34],[72,52],[34,64],[52,68],[66,66]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill="#FFF8E6"/>)}
   <path d="M60 30 q6 -8 14 -6 q-4 8 -14 6z" fill="#4A7030" stroke={O} strokeWidth=".8"/>
  </svg>
 );
}

function Achar(){
 const piles=[[32,62,24],[64,46,20],[68,72,17]];
 return (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
   {piles.map(([x,y,r],i)=>(
    <g key={i}>
     <ellipse cx={x+3} cy={y+r*.45} rx={r*1.1} ry={r*.45} fill={SH} opacity=".35"/>
     <ellipse cx={x} cy={y} rx={r} ry={r*.78} fill="#8C2A0E" stroke={O} strokeWidth="1.5"/>
     <ellipse cx={x-r*.25} cy={y-r*.25} rx={r*.5} ry={r*.28} fill="#D14912" opacity=".9"/>
     {[[-.4,.1],[.2,.25],[.45,-.1],[-.1,-.35],[.1,.05]].map(([dx,dy],j)=><circle key={j} cx={x+dx*r} cy={y+dy*r} r="1.5" fill={O}/>)}
     <rect x={x+r*.1} y={y-r*.5} width="6" height="3" rx="1.5" fill="#ECBB6E" stroke={O} strokeWidth=".6" transform={`rotate(25 ${x} ${y})`}/>
    </g>
   ))}
  </svg>
 );
}

function Payasam(){
 const cashews=[[40,42,20],[56,40,-30],[34,56,50],[50,52,0],[64,54,-50],[44,64,30],[58,66,-20]];
 const raisins=[[46,46],[60,48],[38,60],[54,60],[66,62]];
 return (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
   <defs><radialGradient id="payG" cx="50%" cy="45%" r="60%"><stop offset="0" stopColor="#F3D9A0"/><stop offset="1" stopColor="#D39040"/></radialGradient></defs>
   <ellipse cx="54" cy="90" rx="40" ry="8" fill={SH} opacity=".35"/>
   <circle cx="50" cy="52" r="42" fill="#8C4D21" stroke={O} strokeWidth="1.6"/>
   <circle cx="50" cy="52" r="38" fill="#ECBB6E"/>
   <circle cx="50" cy="52" r="32" fill="url(#payG)" stroke="#8C4D21" strokeWidth="1"/>
   <path d="M22 44 A30 30 0 0 1 50 22" fill="none" stroke="#FFF7DD" strokeWidth="3" strokeLinecap="round" opacity=".55"/>
   {cashews.map(([x,y,r],i)=><ellipse key={i} cx={x} cy={y} rx="4.2" ry="2" fill="#F8E7BE" stroke="#B8955A" strokeWidth=".5" transform={`rotate(${r} ${x} ${y})`}/>)}
   {raisins.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.9" fill="#601B0A"/>)}
  </svg>
 );
}

function Chips(){
 const pos=[[30,36],[52,30],[70,40],[38,56],[60,56],[78,60],[26,66],[48,72],[68,74]];
 return (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
   {pos.map(([x,y],i)=>(
    <g key={i} transform={`rotate(${i*40} ${x} ${y})`}>
     <circle cx={x+1.5} cy={y+2} r="13" fill={SH} opacity=".3"/>
     <circle cx={x} cy={y} r="13" fill="#ECBB6E" stroke="#8C4D21" strokeWidth="1.5"/>
     <circle cx={x} cy={y} r="8" fill="none" stroke="#D39040" strokeWidth="1"/>
     <circle cx={x-3} cy={y-3} r="1.2" fill="#8C4D21"/>
    </g>
   ))}
  </svg>
 );
}

function Papadam(){
 const dots=[[28,44],[40,60],[52,40],[30,66],[46,72],[58,60],[70,36],[74,52],[62,70],[48,52]];
 return (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
   <circle cx="44" cy="60" r="32" fill={SH} opacity=".3"/>
   <circle cx="40" cy="56" r="32" fill="#F0DDB0" stroke="#B8955A" strokeWidth="1.8"/>
   <circle cx="62" cy="46" r="30" fill="#F6E8C2" stroke="#B8955A" strokeWidth="1.8"/>
   <ellipse cx="30" cy="62" rx="9" ry="6" fill="#D39040" opacity=".55"/>
   <ellipse cx="68" cy="38" rx="8" ry="5" fill="#D39040" opacity=".5"/>
   {dots.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.1" fill="#3A2A14"/>)}
  </svg>
 );
}

function Parippu(){
 return (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
   <ellipse cx="54" cy="82" rx="42" ry="11" fill={SH} opacity=".35"/>
   <path d="M12 64 C10 36 90 36 88 64 C88 82 12 82 12 64Z" fill="#E0A93A" stroke={O} strokeWidth="1.6" strokeLinejoin="round"/>
   <path d="M12 64 C12 78 88 78 88 64" stroke="#B8802A" strokeWidth="3" fill="none"/>
   <ellipse cx="44" cy="52" rx="20" ry="7" fill="#F3D27A" opacity=".85"/>
   <ellipse cx="62" cy="58" rx="9" ry="4" fill="#FFF0B8" opacity=".95"/>
   <path d="M60 40 q6 -9 15 -7 q-4 9 -15 7z" fill="#4A7030" stroke={O} strokeWidth=".8"/>
  </svg>
 );
}

/* where each dish sits: [x%, y%, size%] of the leaf box.  h = horizontal leaf (large screens), v = vertical leaf (phones & tablets) */
const DISHES=[
 {id:"chor",href:"/registration",name:"Chor",ml:"ചോറ്",to:"Registration",Art:Chor,h:[57.5,62.5,19],v:[31.3,78.9,32.8]},
 {id:"aviyal",href:"/executive-board",name:"Aviyal",ml:"അവിയൽ",to:"Executive Board",Art:Aviyal,h:[58,23.4,15],v:[71.1,29.7,23.4]},
 {id:"achar",href:"/contact",name:"Achar",ml:"അച്ചാർ",to:"Contact",Art:Achar,h:[34.5,25.8,13],v:[29.7,29.7,21.9]},
 {id:"payasam",href:"/committees",name:"Payasam",ml:"പായസം",to:"Reveal Committees",Art:Payasam,h:[83.5,71.1,15],v:[73.4,81.3,23.4]},
 {id:"upperi",href:"/portfolio-matrix",name:"Upperi",ml:"ഉപ്പേരി",to:"Portfolio Matrix",Art:Chips,h:[17,50,10],v:[50,10.2,14.1]},
 {id:"pappadam",href:"/itinerary",name:"Pappadam",ml:"പപ്പടം",to:"Itinerary",Art:Papadam,h:[37,67,12.5],v:[29.7,53.9,20.3]},
 {id:"parippu",href:"/secretariat",name:"Parippu",ml:"പരിപ്പ്",to:"Secretariat",Art:Parippu,h:[79,33.6,12.5],v:[71.1,53.9,20.3]},
];

function LeafArt({vertical}){
 const k=vertical?"v":"h";
 const d=vertical
  ?"M 320 16 C 175 105 48 240 40 500 L 40 1198 Q 40 1240 82 1240 L 558 1240 Q 600 1240 600 1198 L 600 500 C 592 240 465 105 320 16 Z"
  :"M 18 320 C 110 175 250 48 520 40 L 935 40 Q 975 40 975 82 L 975 558 Q 975 600 935 600 L 520 600 C 250 592 110 465 18 320 Z";
 const veins=[];
 if(vertical){
  for(let y=70;y<=1230;y+=26){veins.push(<line key={`a${y}`} x1="320" y1={y} x2="40" y2={y+70}/>);veins.push(<line key={`b${y}`} x1="320" y1={y} x2="600" y2={y+70}/>);}
 }else{
  for(let x=50;x<=960;x+=26){veins.push(<line key={`a${x}`} x1={x} y1="320" x2={x+70} y2="40"/>);veins.push(<line key={`b${x}`} x1={x} y1="320" x2={x+70} y2="600"/>);}
 }
 const center=vertical?"320 640":"500 320";
 return (
  <svg viewBox={vertical?"0 0 640 1280":"0 0 1000 640"} preserveAspectRatio="none" className={`absolute inset-0 h-full w-full drop-shadow-2xl ${vertical?"lg:hidden":"hidden lg:block"}`} aria-hidden="true">
   <defs>
    <linearGradient id={`leafG-${k}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5C8A3C"/><stop offset="1" stopColor="#2F5222"/></linearGradient>
    <clipPath id={`leafClip-${k}`}><path d={d}/></clipPath>
   </defs>
   <path d={d} fill={`url(#leafG-${k})`} stroke="#0F1C0E" strokeWidth="6"/>
   <g clipPath={`url(#leafClip-${k})`} stroke="#B6D987" strokeOpacity=".22" strokeWidth="1.5">{veins}</g>
   <path d={d} fill="none" stroke="#ECBB6E" strokeOpacity=".45" strokeWidth="2" transform={`translate(${center.split(" ")[0]} ${center.split(" ")[1]}) scale(.962) translate(-${center.split(" ")[0]} -${center.split(" ")[1]})`}/>
   {vertical
    ?<g stroke="#ECBB6E" strokeOpacity=".65"><line x1="320" y1="16" x2="320" y2="1240" strokeWidth="4"/><line x1="332" y1="40" x2="332" y2="1240" strokeWidth="1.2"/></g>
    :<g stroke="#ECBB6E" strokeOpacity=".65"><line x1="18" y1="320" x2="975" y2="320" strokeWidth="4"/><line x1="40" y1="332" x2="975" y2="332" strokeWidth="1.2"/></g>}
  </svg>
 );
}

export default function SadhyaLeaf(){
 return (
  <div className="relative mx-auto aspect-[640/1280] w-full max-w-[28rem] lg:aspect-[1000/640] lg:max-w-5xl">
   <LeafArt vertical/>
   <LeafArt/>
   {DISHES.map(({id,href,name,ml,to,Art,h,v},i)=>(
    <Link
     key={id}
     href={href}
     aria-label={`${name} — ${to}`}
     className="group absolute left-[var(--vx)] top-[var(--vy)] z-10 aspect-square w-[var(--vs)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:z-20 hover:scale-110 focus-visible:z-20 focus-visible:scale-110 focus-visible:outline-none lg:left-[var(--lx)] lg:top-[var(--ly)] lg:w-[var(--ls)]"
     style={{"--vx":`${v[0]}%`,"--vy":`${v[1]}%`,"--vs":`${v[2]}%`,"--lx":`${h[0]}%`,"--ly":`${h[1]}%`,"--ls":`${h[2]}%`}}
    >
     <Art/>
     <span className={`absolute left-1/2 top-full mt-1 w-max max-w-[8.5rem] -translate-x-1/2 rounded-sm border border-ink-900/70 bg-paper px-2 py-1 text-center shadow-md transition group-hover:bg-gold-light group-focus-visible:bg-gold-light group-focus-visible:ring-2 group-focus-visible:ring-ink-900 ${i%2?"rotate-1":"-rotate-1"}`}>
      <b className="block font-serif text-sm font-bold leading-tight text-ink lg:text-base">{name}</b>
      <span className="block font-malayalam text-[11px] leading-tight text-stamp">{ml}</span>
      <span className="label-mono block text-[8px] leading-tight lg:text-[9px]">{to}</span>
     </span>
    </Link>
   ))}
  </div>
 );
}
