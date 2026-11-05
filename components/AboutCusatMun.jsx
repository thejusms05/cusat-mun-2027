import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Lamp from "@/components/Lamp";
import {ABOUT} from "@/lib/about";

export default function AboutCusatMun(){
 return (
  <section id="about-mun" className="bg-paper-dark/40">
   <div className="section grid items-center gap-12 lg:grid-cols-2">
    <Reveal className="border-l-4 border-gold pl-6">
     <Lamp size={30} className="mb-3 text-gold"/>
     <p className="label-mono text-stamp">About</p>
     <h2 className="mt-1 text-3xl font-bold sm:text-4xl">CUSAT MUN</h2>
     {ABOUT.mun.paragraphs.map((p,i)=><p key={i} className="mt-4 leading-relaxed text-ink/80">{p}</p>)}
     <blockquote className="mt-5 border-l-2 border-stamp/50 pl-4 font-serif text-xl italic text-ink">Bridging divides, building consensus.</blockquote>
     <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
      {ABOUT.mun.facts.map(([k,v])=><div key={k}><dt className="label-mono">{k}</dt><dd className="font-semibold text-ink">{v}</dd></div>)}
     </dl>
     <Link href="/committees" className="btn-ink mt-7">Meet the committees</Link>
    </Reveal>
    <Reveal delay={200} className="mx-auto w-full max-w-xs sm:max-w-sm">
     <div className="rotate-2 border-4 border-gold bg-paper p-2.5 shadow-2xl">
      <div className="relative aspect-[900/1198] overflow-hidden bg-ink-900">
       <Image src="/images/hero-portrait.webp" alt="Illustration of a Theyyam artist in full ornament, framed by banana leaves, brass lamps and jasmine garlands" fill sizes="(max-width:768px) 80vw, 384px" className="object-cover"/>
      </div>
     </div>
    </Reveal>
   </div>
  </section>
 );
}
