import Link from "next/link";
import Image from "next/image";
import {Calendar,Landmark,Users,Target,School,GraduationCap,UserCheck} from "lucide-react";
import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Stamp from "@/components/Stamp";
import MunLogo from "@/components/MunLogo";
import Lamp from "@/components/Lamp";
import Bells from "@/components/Bells";
import BrassLamp from "@/components/BrassLamp";
import Rosette from "@/components/Rosette";
import SadhyaLeaf from "@/components/SadhyaLeaf";
import {DATES,eligibility} from "@/lib/data";

const stats=[[Calendar,3," Days"],[Landmark,8," Committees"],[Users,500,"+ Delegates"],[Target,1," Mission"]];
const eligIcons=[School,GraduationCap,UserCheck];
const d=ms=>({"--d":ms+"ms"});

export default function Home(){
 return(<>
  {/* ---------- hero: the design team's artwork ---------- */}
  <section className="relative isolate overflow-hidden bg-ink-900 text-paper">
   <div className="hero-art absolute inset-0 -z-20" aria-hidden="true"/>
   <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true"/>
   <div className="hero-pad mx-auto flex max-w-6xl px-4 pb-14 sm:px-6 lg:min-h-[46rem] lg:items-center lg:pb-20">
    <div className="max-w-xl">
     <div className="anim-up flex flex-wrap items-center gap-3" style={d(0)}>
      <Stamp text="Issued by CUSAT" sub="2027" rotate={-7} size={68} tone="gold"/>
      <span className="font-malayalam text-xl text-gold-light">സ്വാഗതം</span>
     </div>
     <h1 className="anim-up mt-5 text-6xl font-black leading-[.92] text-paper sm:text-7xl lg:text-8xl" style={{...d(150),textShadow:"0 2px 26px rgba(0,0,0,.6)"}}>
      CUSAT<br/>MUN
     </h1>
     <div className="anim-up mt-4 inline-block border-4 border-gold-light px-3 py-0.5 font-serif text-3xl font-bold text-gold-light sm:text-4xl" style={d(300)}>2027</div>
     <p className="label-mono anim-up mt-5 !text-paper/85" style={d(420)}>{DATES} · Kochi, Kerala</p>
     <p className="anim-up mt-3 max-w-md leading-relaxed text-paper/85" style={d(520)}>Three days of diplomacy, debate and consensus-building at Cochin University of Science and Technology — open to school, college and individual delegates.</p>
     <div className="anim-up mt-7 flex flex-wrap items-center gap-4" style={d(620)}>
      <Link href="/registration" className="btn-gold anim-ring px-8 py-4 text-lg">Register Now</Link>
      <a href="#sadhya" className="label-mono !text-gold-light underline underline-offset-4 hover:!text-paper">Or take a seat at the sadhya ↓</a>
     </div>
     <div className="anim-up mt-10" style={d(760)}>
      <p className="label-mono mb-3 !text-paper/70">Opening ceremony — the sadhya is served in</p>
      <Countdown/>
     </div>
    </div>
   </div>
  </section>
  <div className="kasavu-band"/>

  {/* ---------- the sadhya leaf ---------- */}
  <section id="sadhya" className="relative isolate overflow-hidden bg-paper-dark/70 pb-6 pt-24 md:pt-28">
   <Bells/>
   <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" aria-hidden="true"><MunLogo theme="dark" variant="full" size={520}/></div>
   <BrassLamp className="pointer-events-none absolute bottom-24 left-6 hidden w-24 drop-shadow-xl xl:block 2xl:left-16"/>
   <BrassLamp className="pointer-events-none absolute bottom-24 right-6 hidden w-24 drop-shadow-xl xl:block 2xl:right-16"/>
   <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <Reveal className="text-center">
     <p className="font-malayalam text-2xl text-stamp">സദ്യ</p>
     <h2 className="mt-1 text-3xl font-bold sm:text-4xl">The Sadhya is served</h2>
     <p className="mx-auto mt-3 max-w-xl text-ink/80">One leaf, many dishes, every guest equal. Pick a dish to begin — each one opens a part of CUSAT MUN 2027.</p>
    </Reveal>
    <Reveal delay={150} className="mt-12 pb-16 lg:pb-14"><SadhyaLeaf/></Reveal>
   </div>
  </section>
  <div className="kasavu-band"/>

  {/* ---------- stats ---------- */}
  <section className="bg-ink py-16">
   <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-4 sm:px-6">
    {stats.map(([I,n,s],i)=>(
     <Reveal key={s} delay={i*120} className="group relative h-44 w-44 transition hover:-translate-y-2 sm:h-48 sm:w-48">
      <Rosette className="absolute inset-0 h-full w-full drop-shadow-2xl"/>
      <div className="absolute inset-[19%] flex flex-col items-center justify-center rounded-full bg-paper text-center text-ink">
       <I size={22} strokeWidth={1.6} className="text-stamp transition duration-300 group-hover:scale-110"/>
       <div className="mt-1 px-2 font-serif text-base font-bold leading-tight sm:text-lg"><CountUp to={n} suffix={s}/></div>
      </div>
     </Reveal>
    ))}
   </div>
  </section>
  <div className="kasavu-band"/>

  {/* ---------- theme, with the framed artwork ---------- */}
  <section className="bg-paper-dark/40">
   <div className="section grid items-center gap-12 lg:grid-cols-2">
    <Reveal className="border-l-4 border-gold pl-6">
     <Lamp size={30} className="mb-3 text-gold"/>
     <h2 className="text-3xl font-bold sm:text-4xl">Bridging divides, building consensus</h2>
     <p className="mt-4 leading-relaxed text-ink/80">This year's theme asks delegates to look past national positions and find workable common ground on the crises that cross borders: conflict, climate, health and inequality.</p>
     <p className="mt-3 leading-relaxed text-ink/80">A sadhya is served on a single leaf: dozens of dishes, each different, all meant to be shared. Each committee is one of those dishes — a different agenda, a different table. Expect rigorous research, sharp rhetoric and resolutions worth defending.</p>
     <Link href="/committees" className="btn-ink mt-6">Unwrap the committees</Link>
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
  <div className="kasavu-band"/>

  {/* ---------- who can attend ---------- */}
  <section className="section">
   <Reveal className="text-center">
    <Stamp text="Access Pass" sub="All Welcome" rotate={3} size={86} tone="ink" className="mx-auto mb-4"/>
    <h2 className="text-3xl font-bold sm:text-4xl">Who can attend</h2>
    <p className="mx-auto mt-3 max-w-xl text-ink/80">CUSAT MUN welcomes delegations of every kind — and delegates with no team at all.</p>
   </Reveal>
   <div className="mt-12 flex flex-wrap justify-center gap-8">
    {eligibility.map(([t,desc],i)=>{const I=eligIcons[i];return(
     <Reveal key={t} delay={i*120} className="folder w-64 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light"><I size={26}/></div>
      <h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-ink/80">{desc}</p>
      <div className="label-mono mt-4 border-t border-dashed border-ink/20 pt-3 text-ink/45">Seat No. CUMUN-{String(i+1).padStart(3,"0")}</div>
     </Reveal>);})}
   </div>
  </section>
 </>);
}
