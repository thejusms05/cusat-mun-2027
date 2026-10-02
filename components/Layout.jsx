"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {Menu,X,ChevronDown,Instagram,Linkedin,Twitter,Mail,MapPin} from "lucide-react";
import {committees} from "@/lib/data";
import MunLogo from "@/components/MunLogo";
const links=[["Home","/"],["Portfolio Matrix","/portfolio-matrix"],["Registration","/registration"],["Itinerary","/itinerary"],["Secretariat","/secretariat"],["Contact","/contact"]];

export function Navbar(){
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>10);f();addEventListener("scroll",f);return()=>removeEventListener("scroll",f)},[]);
 const a="label-mono relative px-3 py-2 text-paper/80 transition hover:text-gold after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100";
 return(<header className={`sticky top-0 z-50 border-b-4 border-gold bg-ink transition-shadow ${scrolled?"shadow-xl":""}`}>
  <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
   <Link href="/" className="flex items-center gap-2.5">
    <MunLogo theme="light" size={38}/>
    <span className="font-serif text-lg font-bold leading-none text-paper">CUSAT MUN<span className="label-mono mt-0.5 block font-normal text-gold">Est. 2027 · Kochi</span></span>
   </Link>
   <div className="hidden items-center gap-1 md:flex">
    <Link href="/" className={a}>Home</Link>
    <div className="group relative">
     <Link href="/committees" className={a+" inline-flex items-center gap-1"}>Committees<ChevronDown size={13}/></Link>
     <div className="invisible absolute left-0 top-full w-72 border-2 border-gold/30 bg-ink p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
      {committees.map(c=><Link key={c.id} href={`/committees?c=${c.id}`} className="block rounded-sm px-3 py-2 text-sm text-paper/80 hover:bg-paper/10 hover:text-gold"><b className="font-mono">{c.abbr}</b> — {c.name.slice(0,26)}</Link>)}
     </div>
    </div>
    {links.slice(1).map(([l,h])=><Link key={h} href={h} className={a}>{l}</Link>)}
   </div>
   <button aria-label="Menu" className="rounded-sm border-2 border-paper/25 p-2 text-paper md:hidden" onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
  </nav>
  {open&&<div className="space-y-1 border-t-2 border-paper/15 bg-ink px-4 pb-4 pt-2 md:hidden">
   {[["Home","/"],["Committees","/committees"],...links.slice(1)].map(([l,h])=><Link key={h} href={h} onClick={()=>setOpen(false)} className="label-mono block border-b border-paper/10 py-3 text-paper/80">{l}</Link>)}
  </div>}
 </header>);
}

export function Footer(){
 const s=[[Instagram,"Instagram"],[Linkedin,"LinkedIn"],[Twitter,"X"]];
 return(<footer className="relative bg-ink-900 text-paper/85">
  <div className="torn-top h-4 w-full bg-paper" aria-hidden="true"/>
  <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
   <div>
    <div className="flex items-center gap-2.5">
     <MunLogo theme="light" size={34}/>
     <h3 className="font-serif text-xl font-bold text-paper">CUSAT MUN 2027</h3>
    </div>
    <p className="label-mono mt-4 flex gap-2 text-paper/55"><MapPin size={16} className="mt-0.5 shrink-0 text-gold"/>Cochin University of Science and Technology, Kalamassery, Kochi, Kerala 682022</p>
   </div>
   <div><h3 className="label-mono text-gold">Quick Links</h3><ul className="mt-3 space-y-2 text-sm">
    {[["Committees","/committees"],["Portfolio Matrix","/portfolio-matrix"],["Registration","/registration"],["Itinerary","/itinerary"]].map(([l,h])=><li key={h}><Link href={h} className="transition hover:text-gold">{l}</Link></li>)}</ul></div>
   <div><h3 className="label-mono text-gold">Reach Us</h3>
    <ul className="mt-3 space-y-2 text-sm">{[["Help Desk","helpdesk@cusatmun.example"],["Delegate Affairs","delegates@cusatmun.example"]].map(([l,e])=><li key={e}><a href={`mailto:${e}`} className="flex items-center gap-2 transition hover:text-gold"><Mail size={16} className="text-gold"/>{l}: {e}</a></li>)}</ul>
    <div className="mt-4 flex gap-2">{s.map(([I,l])=><a key={l} href="#" aria-label={l} className="rounded-sm border-2 border-paper/20 p-2 transition hover:border-gold hover:text-gold"><I size={18}/></a>)}</div>
   </div>
  </div>
  <p className="label-mono border-t border-paper/10 py-5 text-center text-paper/40">File Closed · © 2027 CUSAT MUN · All Rights Reserved</p>
 </footer>);
}
