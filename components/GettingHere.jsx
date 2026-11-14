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
    <p className="mx-auto mt-3 max-w-xl text-ink/80">The conference is held at the university campus in Kalamassery, Kochi.</p>
   </Reveal>

   <Reveal delay={100} className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
    <div className="overflow-hidden border-4 border-gold bg-paper-dark shadow-xl">
     <iframe
  title="Map showing the location of CUSAT"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7857.348318956624!2d76.31978059670044!3d10.043723810255644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c377917e985%3A0xb0fd4b1e85a6e51f!2sCochin%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1794669503554!5m2!1sen!2sin"
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
     {/*
<a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer" className="btn-gold mt-5 w-full"><Nav size={16}/>Travel Brochure</a>
*/}
<span className="btn mt-5 w-full cursor-not-allowed border-2 border-dashed border-ink/30 text-ink/55"><Nav size={16}/>Travel Brochure</span>
     <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-3 w-full"><Ext size={16}/>Open in Google Maps</a>
    </div>
   </Reveal>

   
  </section>
 );
}
