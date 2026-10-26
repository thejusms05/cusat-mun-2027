import Lamp from "@/components/Lamp";

export default function PageHeader({eyebrow,title,sub}){
 return(
  <header className="relative overflow-hidden bg-ink pt-16 text-center text-paper">
   {eyebrow&&<div className="label-mono mx-auto w-fit border-2 border-gold/60 px-3 py-1 text-gold-light">{eyebrow}</div>}
   <h1 className="anim-up mt-4 px-4 text-4xl font-bold sm:text-5xl">{title}</h1>
   <div className="mt-4 flex items-center justify-center gap-4 text-gold-light" aria-hidden="true">
    <span className="h-px w-14 bg-gold/60"/><Lamp size={22}/><span className="h-px w-14 bg-gold/60"/>
   </div>
   <div className="pb-12 pt-4">{sub&&<p className="mx-auto max-w-xl px-4 text-paper/75">{sub}</p>}</div>
   <div className="kasavu-band"/>
  </header>
 );
}
