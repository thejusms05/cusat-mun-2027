import Link from "next/link";
import {Users,GraduationCap,User,ExternalLink,Hourglass,Megaphone} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {FORMS} from "@/lib/forms";

const OPTIONS=[
 {key:"delegation",icon:Users,title:"Delegation Registration",who:"For Institutional delegations (colleges and non-institutional delegations)",cta:"Register a delegation"},
 {key:"cusatians",icon:GraduationCap,title:"Internal Registration",who:"For CUSATians only",cta:"Register as a CUSATian"},
 {key:"individual",icon:User,title:"Individual Registration",who:"For delegates registering on their own irrespective of school or college.",cta:"Register as an individual"},
 {key:"ambassador",icon:Megaphone,title:"Campus Ambassador Registration",who:"For students wishing to be CUSATMUN Campus Ambassadors in their respective institutions.",cta:"Apply as an Ambassador"}
];

export default function Registration(){
 return(<>
 <PageHeader  title="Registration" sub="Registration is done through a Google Form. Choose the one that fits you and fill it in."/>
 <div className="section max-w-5xl">
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
   {OPTIONS.map(({key,icon:I,title,who,cta},i)=>{
    const href = key === "ambassador" ? FORMS[key] : null;
    return(
     <Reveal key={key} delay={i*120} className="folder flex flex-col text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-gold bg-ink text-gold-light"><I size={28} strokeWidth={1.6}/></div>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">{who}</p>
      {href
       ?<a href={href} target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 w-full">{cta}<ExternalLink size={16}/></a>
       :<span aria-disabled="true" className="btn mt-6 w-full cursor-not-allowed border-2 border-dashed border-ink/30 text-ink/55"><Hourglass size={16}/>Opening soon</span>}
     </Reveal>
    );
   })}
  </div>
  <p className="mt-10 text-center text-sm text-ink/70">Not sure which form to use? <Link href="/contact" className="font-semibold text-stamp underline underline-offset-4 hover:text-ink">Get in touch</Link> and we'll point you to the right one.</p>
 </div></>);
}


