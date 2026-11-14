"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {Menu,X,ChevronDown,Instagram,Linkedin,Twitter,Mail,MapPin, Phone} from "lucide-react";
import {committees} from "@/lib/data";
import {SITE} from "@/lib/siteInfo";
import MunLogo from "@/components/MunLogo";
import Lamp from "@/components/Lamp";

const links=[["Home","/"],["Portfolio Matrix","/portfolio-matrix"],["Registration","/registration"],["Itinerary","/itinerary"],["Executive Board","/executive-board"],["Secretariat","/secretariat"],["Gallery", "/gallery"],["Contact","/contact"]];

export function Navbar(){
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 const [showComingSoon, setShowComingSoon] = useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>10);f();addEventListener("scroll",f);return()=>removeEventListener("scroll",f)},[]);
 const a="label-mono relative px-2.5 py-2 text-paper/85 transition hover:text-gold-light after:absolute after:bottom-1 after:left-2.5 after:right-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-light after:transition-transform hover:after:scale-x-100";
 return(<header className={`sticky top-0 z-50 bg-ink transition-shadow ${scrolled?"shadow-xl":""}`}>
  <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
   <Link href="/" className="flex items-center gap-2.5">
    <div className="flex shrink-0 items-center gap-3">
  <img 
    src="/images/cusat_logo_gold.png" 
    alt="CUSAT Logo" 
    className="h-11 w-auto object-contain" 
  />
  <img 
    src="/images/dyf.png" 
    alt="Department of Youth Welfare" 
    className="h-11 w-auto object-contain" 
  />
</div>
    <span className="font-serif text-lg font-bold leading-none text-paper">CUSAT MUN<span className="label-mono mt-0.5 block font-normal text-gold-light">Kochi · 2027</span></span>
   </Link>
   <div className="hidden items-center lg:flex">
    <Link href="/" className={a}>Home</Link>
    <div className="group relative">
     <Link href="/committees" className={a+" inline-flex items-center gap-1"}>Committees<ChevronDown size={13}/></Link>
     <div className="invisible absolute left-0 top-full w-72 border-2 border-gold/40 bg-ink p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
      {committees.map(c => 
  c.id === 'bestofbest' ? (
    <button key={c.id} onClick={() => setShowComingSoon(true)} className="block w-full text-left rounded-sm px-3 py-2 text-sm text-paper/85 hover:bg-paper/10 hover:text-gold-light">
      <b>{c.abbr}</b>
    </button>
  ) : (
    <Link key={c.id} href={`/committees?c=${c.id}`} className="block rounded-sm px-3 py-2 text-sm text-paper/85 hover:bg-paper/10 hover:text-gold-light">
      <b>{c.abbr}</b>
    </Link>
  )
)}
     </div>
    </div>
    {links.slice(1).map(([l,h])=><Link key={h} href={h} className={a}>{l}</Link>)}
   </div>
   <button aria-label="Menu" className="rounded-sm border-2 border-paper/25 p-2 text-paper lg:hidden" onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
  </nav>
  {open&&<div className="space-y-1 border-t-2 border-paper/15 bg-ink px-4 pb-4 pt-2 lg:hidden">
   {[["Home","/"],["Committees","/committees"],...links.slice(1)].map(([l,h])=><Link key={h} href={h} onClick={()=>setOpen(false)} className="label-mono block border-b border-paper/10 py-3 text-paper/85">{l}</Link>)}
  </div>}
  <div className="kasavu-band"/>
  {showComingSoon && (
  <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/80 p-4 backdrop-blur-sm transition-opacity">
    <div className="relative w-full max-w-sm border-2 border-gold-light bg-paper p-8 text-center shadow-2xl">
      <h3 className="mb-3 font-serif text-3xl font-bold text-gold-light">
  {showComingSoon === "flagcom" ? "Committee X" : "Coming Soon!"}
</h3>
      <p className="mb-6 leading-relaxed text-ink/80">
  {showComingSoon === "flagcom" 
    ? "The agenda and details of Committee X will be revealed closer to the conference."
    : "👀?"}
</p>
      <button 
        onClick={() => setShowComingSoon(false)}
        className="border border-ink bg-ink px-6 py-2 font-mono text-sm font-semibold tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        CLOSE
      </button>
    </div>
  </div>
)}
 </header>);
}

export function Footer(){
 const s=[[Instagram,"Instagram","https://www.instagram.com/cusatmun_official?exln=YzlqbGJvZnB4MDl2%22"]];
 return(<footer className="relative isolate overflow-hidden bg-ink-900 text-paper/85">
  <div className="art-foot absolute inset-0 -z-20 hidden opacity-45 md:block" aria-hidden="true"/>
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/80 via-ink-900/85 to-ink-900/95" aria-hidden="true"/>
  <div className="kasavu-band"/>
  <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
   <div>
    <div className="flex items-center gap-2.5">
     <MunLogo theme="light" size={34}/>
     <h3 className="font-serif text-xl font-bold text-paper">CUSAT MUN 2027</h3>
    </div>
    <p className="label-mono mt-4 flex gap-2 text-paper/60"><MapPin size={16} className="mt-0.5 shrink-0 text-gold-light"/>{SITE.address}</p>
   </div>
   <div><h3 className="label-mono text-gold-light">Quick Links</h3><ul className="mt-3 space-y-2 text-sm">
    {[["Committees","/committees"],["Portfolio Matrix","/portfolio-matrix"],["Registration","/registration"],["Itinerary","/itinerary"],["Executive Board","/executive-board"]].map(([l,h])=><li key={h}><Link href={h} className="transition hover:text-gold-light">{l}</Link></li>)}</ul></div>
   <div><h3 className="label-mono text-gold-light">Reach Us</h3>
    <ul className="mt-3 space-y-2 text-sm">
  {[["E-mail","cusatmun@cusat.ac.in"]].map(([l,e])=><li key={l}><a href={`mailto:${e}`} className="flex items-center gap-2 transition hover:text-gold-light"><Mail size={16} className="text-gold-light"/>{l}: {e}</a></li>)}
  <li>
    <a href="tel:+919008831934" className="flex items-center gap-2 transition hover:text-gold-light">
      <Phone size={16} className="text-gold-light"/>
      Secretary-General : +91 90088 31934
    </a>
  </li>
  <li>
    <a href="tel:+919400272535" className="flex items-center gap-2 transition hover:text-gold-light">
      <Phone size={16} className="text-gold-light"/>
      Dep. Secretary-General: +91 94002 72535
    </a>
  </li>
</ul>
    <div className="mt-4 flex gap-2">{s.map(([I,l,h])=><a key={l} href={h} aria-label={l} className="rounded-sm border-2 border-paper/20 p-2 transition hover:border-gold-light hover:text-gold-light"><I size={18}/></a>)}</div>
   </div>
  </div>
  <div className="flex items-center justify-center gap-3 border-t border-paper/10 py-5 text-gold-light/70">
   <Lamp size={14} flame={false}/>
   <p className="label-mono text-paper/45">Served on one leaf, from Kochi · © 2027 CUSAT MUN · All rights reserved</p>
   <Lamp size={14} flame={false}/>
  </div>
 </footer>);
}
