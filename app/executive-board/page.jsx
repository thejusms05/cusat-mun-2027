import Link from "next/link";
import {User} from "lucide-react";
import {committees} from "@/lib/data";
import {iconFor} from "@/components/committeeIcons";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const ROLES=["Chairperson","Vice-Chairperson","Rapporteur"];
const isPlaceholder=n=>/^(chairperson|vice-chair(person)?|rapporteur)\s*name$/i.test((n||"").trim());

export default function ExecutiveBoard(){
 return(<>
 <PageHeader eyebrow="Aviyal · A Little of Everything" title="Executive Board" sub="The chairs who guide every committee — many ingredients, one dish. Names are announced as each board is finalised."/>
 <div className="section space-y-8">
  {committees.map((c,ci)=>{
   const Icon=iconFor(c);
   return(
    <Reveal key={c.id} as="section" delay={(ci%2)*80} className="border-2 border-gold/60 bg-paper">
     <div className="kasavu-band"/>
     <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
       <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light"><Icon size={24} strokeWidth={1.6}/></div>
        <div><h2 className="text-2xl font-bold">{c.abbr}</h2><p className="label-mono">{c.name}</p></div>
       </div>
       <Link href={`/committees?c=${c.id}`} className="btn-ghost py-2 text-sm">View committee</Link>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
       {c.board.map((name,i)=>(
        <div key={i} className="text-center">
         <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gold bg-paper-dark text-ink/40"><User size={30}/></div>
         <p className="label-mono mt-3 text-stamp">{ROLES[i]||"Board Member"}</p>
         <p className="mt-1 font-serif text-lg font-bold">{isPlaceholder(name)?"To be announced":name}</p>
        </div>
       ))}
      </div>
     </div>
    </Reveal>
   );
  })}
  <p className="text-center text-ink/70">Looking for the organising team? <Link href="/secretariat" className="font-semibold text-stamp underline underline-offset-4 hover:text-ink">Meet the Secretariat</Link></p>
 </div></>);
}
