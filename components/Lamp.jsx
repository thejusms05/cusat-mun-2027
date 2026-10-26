// A small nilavilakku (traditional oil lamp). Takes its colour from the text colour.
export default function Lamp({size=32,className="",flame=true}){
 return (
  <svg viewBox="0 0 40 64" width={size} height={Math.round(size*1.6)} className={className} aria-hidden="true">
   {flame&&<g className="flicker">
    <path d="M20 3 C27 13 27 20 20 25 C13 20 13 13 20 3Z" fill="#E1BC5A"/>
    <path d="M20 11 C23 16 23 19 20 22 C17 19 17 16 20 11Z" fill="#E8761B"/>
   </g>}
   <path d="M7 29 Q20 40 33 29 L31 34 Q20 43 9 34 Z" fill="currentColor"/>
   <rect x="18" y="38" width="4" height="12" rx="1.5" fill="currentColor"/>
   <circle cx="20" cy="44" r="3.2" fill="currentColor"/>
   <path d="M8 60 Q20 46 32 60 Z" fill="currentColor"/>
   <rect x="6" y="59" width="28" height="3" rx="1.5" fill="currentColor"/>
  </svg>
 );
}
