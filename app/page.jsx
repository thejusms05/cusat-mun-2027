import Link from "next/link";
import {Calendar,Landmark,Users,Target,School,GraduationCap,UserCheck} from "lucide-react";
import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Stamp from "@/components/Stamp";
import MunLogo from "@/components/MunLogo";
import Lamp from "@/components/Lamp";
import Pookalam from "@/components/Pookalam";
import SadhyaLeaf from "@/components/SadhyaLeaf";
import {DATES,eligibility} from "@/lib/data";

const stats=[[Calendar,3," Days"],[Landmark,8," Committees"],[Users,500,"+ Delegates"],[Target,1," Mission"]];
const eligIcons=[School,GraduationCap,UserCheck];
const d=ms=>({"--d":ms+"ms"});

export default function Home(){
 return(<>
  {/* ---------- hero ---------- */}
  <section className="relative overflow-hidden bg-paper pb-14 pt-10 sm:pt-14">
   <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" aria-hidden="true">
    <MunLogo theme="dark" variant="full" size={560}/>
   </div>
   <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
    <div className="anim-up border-4 border-gold bg-ink p-7 text-paper shadow-2xl sm:p-10" style={d(0)}>
     <div className="flex flex-wrap items-center gap-3">
      <Stamp text="Issued by CUSAT" sub="2027" rotate={-7} size={72} tone="gold"/>
      <span className="font-malayalam text-xl text-gold-light">സ്വാഗതം</span>
     </div>
     <h1 className="mt-6 text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
      <span className="block">CUSAT</span><span className="block">MUN</span>
     </h1>
     <div className="mt-3 inline-block border-4 border-gold px-3 py-0.5 font-mono text-3xl font-bold text-gold-light sm:text-4xl">2027</div>
     <div className="anim-sweep mt-5 h-0.5 w-32 bg-gold-light"/>
     <p className="label-mono mt-5 text-paper/85">{DATES} · Kochi, Kerala</p>
     <p className="mt-4 max-w-md leading-relaxed text-paper/80">Three days of diplomacy, debate and consensus-building at Cochin University of Science and Technology — open to school, college and individual delegates.</p>
     <div className="mt-8 flex flex-wrap items-center gap-4">
      <Link href="/registration" className="btn-gold anim-ring px-8 py-4 text-lg">Register Now</Link>
      <a href="#sadhya" className="label-mono text-gold-light underline underline-offset-4 hover:text-paper">Or take a seat at the sadhya ↓</a>
     </div>
    </div>
    <div className="anim-up" style={d(300)}>
     <p className="label-mono mb-3 text-ink/70">Opening ceremony — the sadhya is served in</p>
     <Countdown/>
     <div className="mt-8 flex items-end justify-center gap-6 text-gold" aria-hidden="true"><Lamp size={32}/><Lamp size={44}/><Lamp size={32}/></div>
    </div>
   </div>
  </section>
  <div className="kasavu-band"/>

  {/* ---------- the sadhya leaf ---------- */}
  <section id="sadhya" className="relative bg-paper-dark/60 py-16 md:py-20">
   <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <Reveal className="text-center">
     <p className="font-malayalam text-2xl text-stamp">സദ്യ</p>
     <h2 className="mt-1 text-3xl font-bold sm:text-4xl">The Sadhya is served</h2>
     <p className="mx-auto mt-3 max-w-xl text-ink/75">One leaf, many dishes, every guest equal. Pick a dish to begin — each one opens a part of CUSAT MUN 2027.</p>
    </Reveal>
    <Reveal delay={150} className="mt-12 pb-16 lg:pb-8"><SadhyaLeaf/></Reveal>
   </div>
  </section>
  <div className="kasavu-band"/>

  {/* ---------- stats ---------- */}
  <section className="bg-ink py-16">
   <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-4 sm:px-6">
    {stats.map(([I,n,s],i)=>(
     <Reveal key={s} delay={i*120} className="group relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 border-gold bg-paper text-center text-ink shadow-2xl transition hover:-translate-y-2 sm:h-44 sm:w-44">
      <span className="pointer-events-none absolute inset-2 rounded-full border-2 border-dashed border-gold/60"/>
      <I size={26} strokeWidth={1.5} className="text-stamp transition duration-300 group-hover:scale-110"/>
      <div className="mt-1 px-3 font-serif text-lg font-bold leading-tight"><CountUp to={n} suffix={s}/></div>
     </Reveal>
    ))}
   </div>
  </section>
  <div className="kasavu-band"/>

  {/* ---------- theme ---------- */}
  <section className="bg-paper-dark/40">
   <div className="section grid items-center gap-12 lg:grid-cols-2">
    <Reveal className="border-l-4 border-gold pl-6">
     <Lamp size={30} className="mb-3 text-gold"/>
     <h2 className="text-3xl font-bold sm:text-4xl">Bridging divides, building consensus</h2>
     <p className="mt-4 leading-relaxed text-ink/75">This year's theme asks delegates to look past national positions and find workable common ground on the crises that cross borders: conflict, climate, health and inequality.</p>
     <p className="mt-3 leading-relaxed text-ink/75">A sadhya is served on a single leaf: dozens of dishes, each different, all meant to be shared. Each committee is one of those dishes — a different agenda, a different table. Expect rigorous research, sharp rhetoric and resolutions worth defending.</p>
     <Link href="/committees" className="btn-ink mt-6">Unwrap the committees</Link>
    </Reveal>
    <Reveal delay={200} className="relative mx-auto aspect-square w-full max-w-sm">
     <Pookalam className="anim-spin-slow h-full w-full drop-shadow-xl"/>
     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><MunLogo theme="dark" size={48}/></div>
    </Reveal>
   </div>
  </section>
  <div className="kasavu-band"/>

  {/* ---------- who can attend ---------- */}
  <section className="section">
   <Reveal className="text-center">
    <Stamp text="Access Pass" sub="All Welcome" rotate={3} size={86} tone="ink" className="mx-auto mb-4"/>
    <h2 className="text-3xl font-bold sm:text-4xl">Who can attend</h2>
    <p className="mx-auto mt-3 max-w-xl text-ink/75">CUSAT MUN welcomes delegations of every kind — and delegates with no team at all.</p>
   </Reveal>
   <div className="mt-12 flex flex-wrap justify-center gap-8">
    {eligibility.map(([t,desc],i)=>{const I=eligIcons[i];return(
     <Reveal key={t} delay={i*120} className="folder w-64 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light"><I size={26}/></div>
      <h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-ink/75">{desc}</p>
      <div className="label-mono mt-4 border-t border-dashed border-ink/20 pt-3 text-ink/45">Seat No. CUMUN-{String(i+1).padStart(3,"0")}</div>
     </Reveal>);})}
   </div>
  </section>
 </>);
}
