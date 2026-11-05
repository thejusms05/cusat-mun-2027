import * as L from "lucide-react";
import Reveal from "@/components/Reveal";
import {ABOUT} from "@/lib/about";

// (star import so one missing icon name in an older lucide version can't break the build)
const ICONS={airport:L.Plane,train:L.TrainFront||L.Train,metro:L.Train,bus:L.Bus,taxi:L.Car};
const MapPin=L.MapPin, Nav=L.Navigation||L.MapPin, Ext=L.ExternalLink||L.MapPin;

export default function GettingHere(){
 const q=encodeURIComponent(ABOUT.location.query);
 return (
  <section id="getting-here" className="section">
   <Reveal className="text-center">
    <p className="label-mono text-stamp">Find us</p>
    <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Getting to CUSAT</h2>
    <p className="mx-auto mt-3 max-w-xl text-ink/80">The conference is held on the university campus in Kalamassery, Kochi.</p>
   </Reveal>

   <Reveal delay={100} className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
    <div className="overflow-hidden border-4 border-gold bg-paper-dark shadow-xl">
     <iframe
      title="Map showing the location of CUSAT"
      src={`https://www.google.com/maps?q=${q}&output=embed`}
      className="block h-80 w-full border-0 lg:h-full lg:min-h-[26rem]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
     />
    </div>
    <div className="folder flex flex-col justify-center">
     <MapPin className="text-stamp" size={26}/>
     <h3 className="mt-3 text-xl font-bold">Venue</h3>
     <p className="mt-2 text-sm leading-relaxed text-ink/80">{ABOUT.location.address}</p>
     <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer" className="btn-gold mt-5 w-full"><Nav size={16}/>Get directions</a>
     <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-3 w-full"><Ext size={16}/>Open in Google Maps</a>
    </div>
   </Reveal>

   <Reveal delay={150} className="mt-14 text-center">
    <h3 className="text-2xl font-bold">How to get there</h3>
   </Reveal>
   <div className="mt-8 flex flex-wrap justify-center gap-5">
    {ABOUT.routes.map((r,i)=>{
     const I=ICONS[r.id]||MapPin;
     return (
      <Reveal key={r.id} delay={(i%3)*100} className="folder w-full sm:w-[calc(50%-.65rem)] lg:w-[calc(33.333%-.9rem)]">
       <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light"><I size={22} strokeWidth={1.7}/></span>
        <div><h4 className="font-serif text-lg font-bold leading-tight">{r.title}</h4><p className="label-mono !normal-case !tracking-normal">{r.from}</p></div>
       </div>
       <p className="mt-3 text-sm leading-relaxed text-ink/80">{r.text}</p>
      </Reveal>
     );
    })}
   </div>
  </section>
 );
}
