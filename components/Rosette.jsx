// A beaded rosette ring, after the ear ornament in the design team's artwork.
export default function Rosette({className=""}){
 return (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
   <circle cx="50" cy="50" r="48" fill="#601B0A"/>
   <circle cx="50" cy="50" r="46.5" fill="none" stroke="#C28A36" strokeWidth="2"/>
   <circle cx="50" cy="50" r="40" fill="none" stroke="#ECBB6E" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.01 6.28"/>
   <circle cx="50" cy="50" r="33" fill="none" stroke="#A3240C" strokeWidth="6"/>
   <circle cx="50" cy="50" r="33" fill="none" stroke="#F0E2BC" strokeWidth="4" strokeDasharray="4.2 5.5"/>
   <circle cx="50" cy="50" r="27.5" fill="none" stroke="#C28A36" strokeWidth="1.6"/>
  </svg>
 );
}
