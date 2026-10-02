import Link from "next/link";
import {Calendar,Landmark,Users,Target,PlaneTakeoff,School,GraduationCap,UserCheck} from "lucide-react";
import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Stamp from "@/components/Stamp";
import Polaroid from "@/components/Polaroid";
import MunLogo from "@/components/MunLogo";
import {DATES,eligibility} from "@/lib/data";
const stats=[[Calendar,3," Days"],[Landmark,8," Committees"],[Users,500,"+ Delegates"],[Target,1," Mission"]];
const eligIcons=[School,GraduationCap,UserCheck];
const d=ms=>({"--d":ms+"ms"});
export default function Home(){
 return(<>
  <section className="relative overflow-hidden border-b-2 border-ink/15 bg-paper pb-16 pt-12 sm:pt-16">
   {/* large watermark of the full CUSAT MUN emblem */}
   <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" aria-hidden="true">
    <MunLogo theme="dark" variant="full" size={560}/>
   </div>
   <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
    <div className="anim-up border-4 border-ink bg-ink p-7 text-paper shadow-2xl sm:p-10" style={d(0)}>
     <div className="flex flex-wrap items-center gap-3">
      <Stamp text="Issued by CUSAT" sub="2027" rotate={-7} size={72} tone="gold"/>
      <span className="label-mono text-paper/50">File No. CUMUN/2027/01</span>
     </div>
     <h1 className="mt-6 text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
      <span className="block">CUSAT</span><span className="block">MUN</span>
     </h1>
     <div className="mt-3 inline-block border-4 border-gold px-3 py-0.5 font-mono text-3xl font-bold text-gold sm:text-4xl">2027</div>
     <div className="anim-sweep mt-5 h-0.5 w-32 bg-gold"/>
     <p className="label-mono mt-5 text-paper/80">{DATES} · Kochi, Kerala</p>
     <p className="mt-4 max-w-md leading-relaxed text-paper/75">Three days of diplomacy, debate and consensus-building at Cochin University of Science and Technology — open to school, college and individual delegates.</p>
     <div className="mt-8 flex flex-wrap items-center gap-4">
      <Link href="/registration" className="btn-gold anim-ring px-8 py-4 text-lg">Register Now</Link>
      <span className="label-mono inline-flex items-center gap-2 text-paper/50"><PlaneTakeoff size={16}/>Boarding opens soon</span>
     </div>
    </div>
    <div className="anim-up" style={d(300)}>
     <p className="label-mono mb-3 text-ink/60">Opening ceremony departs in</p>
     <Countdown/>
     <div className="mt-10 flex items-end gap-6">
      <Polaroid caption="Delegates" rotate={-6} tape="tl" className="w-36 sm:w-44"/>
      <Polaroid caption="In session" rotate={4} tape="tr" className="-mt-6 w-32 sm:w-40"/>
     </div>
    </div>
   </div>
  </section>

  <section className="border-b-2 border-ink/15 bg-ink py-16">
   <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-10 px-4 sm:px-6">
    {stats.map(([I,n,s],i)=><Reveal key={s} delay={i*120} className={`group ticket w-40 border-2 border-dashed border-paper/30 bg-paper px-4 py-6 text-center text-ink transition hover:-translate-y-1 ${i%2?"rotate-1":"-rotate-1"}`} style={{"--notch-bg":"#1B2A4A"}}>
     <I size={26} strokeWidth={1.5} className="mx-auto text-stamp transition duration-300 group-hover:scale-110"/>
     <div className="mt-2 font-serif text-2xl font-bold"><CountUp to={n} suffix={s}/></div>
     <div className="label-mono mt-1 text-ink/45">Stat No. {String(i+1).padStart(2,"0")}</div>
    </Reveal>)}
   </div>
  </section>

  <section className="border-b-2 border-ink/15 bg-paper-dark/40">
   <div className="section grid items-center gap-12 lg:grid-cols-2">
    <Reveal className="border-l-4 border-ink pl-6">
     <Stamp text="Confidential Briefing" sub="2027" rotate={-5} size={90} tone="ink" className="mb-4"/>
     <h2 className="text-3xl font-bold sm:text-4xl">Bridging divides, building consensus</h2>
     <p className="mt-4 font-mono text-sm leading-relaxed text-ink/70">This year's theme asks delegates to look past national positions and find workable common ground on the crises that cross borders: conflict, climate, health and inequality.</p>
     <p className="mt-3 font-mono text-sm leading-relaxed text-ink/70">Each committee tackles an agenda where compromise is hard and the stakes are real. Expect rigorous research, sharp rhetoric and resolutions worth defending.</p>
     <Link href="/committees" className="btn-ink mt-6">Open the committee files</Link>
    </Reveal>
    <Reveal delay={200} className="flex justify-center gap-6">
     <Polaroid caption="Opening ceremony" rotate={-4} tape="tc" className="w-40 sm:w-48"/>
     <Polaroid caption="Working papers" rotate={5} tape="tc" className="-mt-8 w-36 sm:w-44"/>
    </Reveal>
   </div>
  </section>

  <section className="section">
   <Reveal className="text-center">
    <Stamp text="Access Pass" sub="All Welcome" rotate={3} size={86} tone="ink" className="mx-auto mb-4"/>
    <h2 className="text-3xl font-bold sm:text-4xl">Who can attend</h2>
    <p className="mx-auto mt-3 max-w-xl text-ink/70">CUSAT MUN welcomes delegations of every kind — and delegates with no team at all.</p>
   </Reveal>
   <div className="mt-12 flex flex-wrap justify-center gap-8">
    {eligibility.map(([t,desc],i)=>{const I=eligIcons[i];return(
     <Reveal key={t} delay={i*120} className={`folder w-64 border-dashed text-center ${i%2?"rotate-1":"-rotate-1"}`}>
      <div className="mx-auto -mt-10 h-7 w-7 rounded-full border-2 border-ink/25 bg-paper" aria-hidden="true"/>
      <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-gold"><I size={26}/></div>
      <h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-ink/70">{desc}</p>
      <div className="label-mono mt-4 border-t border-dashed border-ink/20 pt-3 text-ink/40">ID No. CUMUN-{String(i+1).padStart(3,"0")}</div>
     </Reveal>);})}
   </div>
  </section>
 </>);
}
