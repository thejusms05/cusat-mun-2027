export default function PageHeader({eyebrow,title,sub}){
 return(
  <header className="relative overflow-hidden border-b-4 border-gold bg-ink pb-14 pt-16 text-center text-paper">
   {eyebrow && <div className="label-mono mx-auto w-fit border-2 border-gold/60 px-3 py-1 text-gold">{eyebrow}</div>}
   <h1 className="anim-up mt-4 text-4xl font-bold sm:text-5xl">{title}</h1>
   <div className="mt-3 text-sm tracking-[0.7em] text-gold/60" aria-hidden="true">♠ ♥ ♦ ♣</div>
   {sub && <p className="mx-auto mt-3 max-w-xl px-4 text-paper/70">{sub}</p>}
  </header>
 );
}
