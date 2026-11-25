import Link from "next/link";
import {Users,GraduationCap,User,ExternalLink,Hourglass,Megaphone} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {FORMS} from "@/lib/forms";

const OPTIONS=[
 {key:"delegation",icon:Users,title:"Delegation Registration",who:"For colleges, schools and non institutional delegations",cta:"Register a delegation"},
 {key:"cusatians",icon:GraduationCap,title:"Internal Registration",who:"For CUSATians only",cta:"Register as a CUSATian"},
 {key:"individual",icon:User,title:"Individual Registration",who:"For delegates registering on their own irrespective of school or college.",cta:"Register as an individual"},
 {key:"ambassador",icon:Megaphone,title:"Ambassador Registration",who:"For students wishing to be CUSATMUN Ambassadors in their respective institutions.",cta:"Apply as an Ambassador"}
];

export default function Registration(){
 return(<>
 <PageHeader  title="Registration" sub="Registration is done through a Google Form. Choose the one that fits you and fill it in."/>
 <div className="section max-w-5xl">
 <div className="mb-10 rounded-sm border-2 border-gold bg-paper-dark/60 p-6 text-center shadow-sm">
  <p className="label-mono text-stamp font-semibold tracking-widest">Internal Registrations — Round 1 Closed</p>
  <p className="mt-2 text-sm leading-relaxed text-ink/90">
    Due to the overwhelming number of Internal Registrations, Round 1 of Internal Registrations have closed.
    If you did not get a chance to register, do not worry. Round 2 will open on a later date. Details about the next round will be announced later. Stay tuned on our Instagram page for the updates.
  </p>
  <p className="mt-3 text-sm">
    <a href="https://www.instagram.com/cusatmun_official" target="_blank" rel="noopener noreferrer" className="font-semibold text-stamp underline underline-offset-4 hover:text-ink">
      www.instagram.com/cusatmun_official
    </a>
  </p>
  <p className="mt-3 text-xs text-ink/75">
    Kindly contact the Delegate Affairs team if you have any queries:{" "}
    <a href="tel:+919497107085" className="font-semibold text-ink hover:underline">+91 94971 07085</a> (Lakshmi Bijumohan) ·{" "}
    <a href="tel:+918089010825" className="font-semibold text-ink hover:underline">+91 80890 10825</a> (Ishita Sudhir)
  </p>
</div>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
   {OPTIONS.map(({key,icon:I,title,who,cta},i)=>{
    const isClosed = key === "cusatians";
    const href = isClosed ? null : FORMS[key];
    return(
     <Reveal key={key} delay={i*120} className="folder flex flex-col text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light"><I size={28} strokeWidth={1.6}/></div>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">{who}</p>
      {href
       ?<a href={href} target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 w-full">{cta}<ExternalLink size={16}/></a>
       :<span aria-disabled="true" className="btn mt-6 w-full cursor-not-allowed border-2 border-dashed border-ink/30 text-ink/55"><Hourglass size={16}/>{isClosed ? "Round 1 Closed" : "Opening soon"}</span>}
     </Reveal>
    );
   })}
  </div>
  <p className="mt-10 text-center text-sm text-ink/70">Not sure which form to use? <Link href="/contact" className="font-semibold text-stamp underline underline-offset-4 hover:text-ink">Get in touch</Link> and we'll point you to the right one.</p>
 </div></>);
}




