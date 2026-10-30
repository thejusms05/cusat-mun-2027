import Lamp from "@/components/Lamp";
import Bells from "@/components/Bells";

// Header band cropped from the design team's artwork. The crops are chosen so the face is never in frame.
export default function PageHeader({eyebrow,title,sub}){
 const v=[...String(title||"")].reduce((a,c)=>a+c.charCodeAt(0),0)%2;
 return(
  <header className="relative isolate overflow-hidden bg-ink-900 pt-20 text-center text-paper">
   <div className={`absolute inset-0 -z-20 ${v?"art-band-b":"art-band-a"}`} aria-hidden="true"/>
   <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/60 via-ink-900/75 to-ink-900/95" aria-hidden="true"/>
   <Bells/>
   {eyebrow&&<div className="label-mono relative mx-auto w-fit border-2 border-gold/70 bg-ink-900/40 px-3 py-1 text-gold-light backdrop-blur-sm">{eyebrow}</div>}
   <h1 className="anim-up relative mt-4 px-4 text-4xl font-bold sm:text-5xl" style={{textShadow:"0 2px 18px rgba(0,0,0,.55)"}}>{title}</h1>
   <div className="relative mt-4 flex items-center justify-center gap-4 text-gold-light" aria-hidden="true">
    <span className="h-px w-14 bg-gold/70"/><Lamp size={22}/><span className="h-px w-14 bg-gold/70"/>
   </div>
   <div className="relative pb-12 pt-4">{sub&&<p className="mx-auto max-w-xl px-4 text-paper/85">{sub}</p>}</div>
   <div className="kasavu-band relative"/>
  </header>
 );
}
