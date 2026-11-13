import Image from "next/image";
import Reveal from "@/components/Reveal";
import Rosette from "@/components/Rosette";
import {ABOUT} from "@/lib/about";

export default function AboutCusat(){
 const c=ABOUT.cusat;
 return (
  <section id="about-cusat" className="bg-[#3b0404] text-paper">
   <div className="section grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
    <Reveal>
     <p className="label-mono !text-gold-light">About</p>
     <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Cochin University of Science and Technology</h2>
     {c.paragraphs.map((p,i)=><p key={i} className="mt-4 leading-relaxed text-paper/85">{p}</p>)}
     <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
      {c.facts.map(([k,v])=><div key={k}><dt className="label-mono !text-gold-light">{k}</dt><dd className="font-serif text-xl font-bold">{v}</dd></div>)}
     </dl>
    </Reveal>
    <Reveal delay={200} className="mx-auto w-full max-w-48">
     {c.photo
      ?<div className="rotate-2 border-4 border-gold-light bg-paper p-2 shadow-2xl"><div className="relative aspect-[4/5] overflow-hidden"><Image src={c.photo} alt="The CUSAT campus" fill sizes="320px" className="object-cover"/></div></div>
      :<img src="/images/cusat_logo_gold.png" alt="CUSAT Logo Gold" className="h-auto w-full max-w-48 mx-auto drop-shadow-2xl" />}
    </Reveal>
   </div>
  </section>
 );
}
