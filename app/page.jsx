import Link from "next/link";
import {Calendar,Landmark,Users,Target,School,GraduationCap,UserCheck} from "lucide-react";
import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Stamp from "@/components/Stamp";
import MunLogo from "@/components/MunLogo";
import Bells from "@/components/Bells";
import Rosette from "@/components/Rosette";
import CollageMenu from "@/components/CollageMenu";
import AboutCusatMun from "@/components/AboutCusatMun";
import AboutCusat from "@/components/AboutCusat";
import GettingHere from "@/components/GettingHere";
import {DATES,eligibility} from "@/lib/data";

const stats=[[Calendar,3," Days"],[Landmark,9," Committees"],[Users,500,"+ Delegates"],[Target,1," Mission"]];
const eligIcons=[School,GraduationCap,UserCheck];
const d=ms=>({"--d":ms+"ms"});

export default function Home(){
 return(<main className="animate-fade-in">
  {/* ---------- hero: the design team's artwork ---------- */}
 <section className="bg-ink-900 text-paper">
      
      {/* 1. Banners (With Floating Register Button & Gradient Fade) */}
      <div className="relative w-full">
        <img 
          src="/images/verticalbannerfinal.png" 
          alt="CUSAT MUN 2027" 
          className="h-auto w-full object-cover md:hidden" 
        />
        <img 
          src="/images/horizontalbannerfinal.jpg" 
          alt="CUSAT MUN 2027" 
          className="hidden h-auto w-full object-cover md:block" 
        />
        
        {/* Floating Register Button - Positioned in the gap */}
        <div className="absolute bottom-[31%] left-1/2 z-20 -translate-x-1/2 md:bottom-[25%] lg:-bottom-[8%]">
          <Link href="/registration" className="btn-gold anim-ring px-6 py-3 text-base shadow-2xl drop-shadow-xl">
            Register Now
          </Link>
        </div>

        {/* The Magic Fade */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-ink-900 to-transparent sm:h-32 md:h-48 lg:h-56"></div>
      </div>

      {/* 2. Hero Content (Pulled up slightly to overlap the fade) */}
      <div className="relative z-10 -mt-4 mx-auto flex max-w-4xl flex-col items-center px-4 pb-12 text-center sm:-mt-8 sm:px-6 lg:mt-20 lg:pb-20">
        
        
        
        <p className="label-mono anim-up mt-8 !text-paper/85 md:mt-10" style={d(420)}>
          {DATES} · Kochi, Kerala
        </p>
        
        <p className="anim-up mt-4 max-w-2xl leading-relaxed text-paper/85" style={d(520)}>
          Three days of diplomacy, debate and consensus-building at Cochin University of Science and Technology - open to school, college and individual delegates.
        </p>
        
        {/* Action Buttons (Now just the Step into Kerala link, perfectly centered) */}
        <div className="anim-up mt-8 flex flex-col items-center justify-center" style={d(620)}>
          <a href="#explore" className="label-mono !text-gold-light underline underline-offset-4 hover:!text-paper">
            Step into Kerala ↓
          </a>
        </div>

        {/* Countdown Timer */}
        <div className="anim-up mt-12 flex flex-col items-center" style={d(760)}>
          <p className="label-mono mb-4 !text-paper/70">Opening ceremony begins in</p>
          <Countdown/>
        </div>
        
      </div>
    </section>
  <div className="kasavu-band"/>
  <AboutCusat/>
  <div className="kasavu-band"/>
  <AboutCusatMun/>
  <div className="kasavu-band"/>
  {/* ---------- the collage menu ---------- */}
  <section id="explore" className="relative isolate overflow-hidden bg-paper pb-14 pt-24 md:pt-28">
   <Bells/>
   <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <Reveal className="text-center">
     <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Step into Kerala</h2>
     <p className="mx-auto mt-3 max-w-xl text-ink/80">Every piece of this picture tells a different story; make your way through the collage to find out. </p>
    </Reveal>
    <Reveal delay={150} className="mt-8"><CollageMenu/></Reveal>
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

  {/* ---------- about, location ---------- */}
 
  <GettingHere/>
  <div className="kasavu-band"/>

  {/* ---------- who can attend ---------- */}
  <section className="relative isolate overflow-hidden">
   <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" aria-hidden="true"><MunLogo theme="dark" variant="full" size={520}/></div>
   <div className="section">
   <Reveal className="text-center">
    <Stamp text="Access Pass" sub="All Welcome" rotate={3} size={86} tone="ink" className="mx-auto mb-4"/>
    <h2 className="text-3xl font-bold sm:text-4xl">Who can attend</h2>
    <p className="mx-auto mt-3 max-w-xl text-ink/80">CUSAT MUN welcomes delegations of every kind - and delegates with no team at all.</p>
   </Reveal>
   <div className="mt-12 flex flex-wrap justify-center gap-8">
    {eligibility.map(([t,desc],i)=>{const I=eligIcons[i];return(
     <Reveal key={t} delay={i*120} className="folder w-64 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light"><I size={26}/></div>
      <h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-ink/80">{desc}</p>
      <div className="label-mono mt-4 border-t border-dashed border-ink/20 pt-3 text-ink/45">Seat No. CUMUN-{String(i+1).padStart(3,"0")}</div>
     </Reveal>);})}
   </div>
   </div>
  </section>
 </main>);
}
