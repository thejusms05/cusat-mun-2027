import {Mail,MapPin} from "lucide-react";
import Stamp from "@/components/Stamp";
import PageHeader from "@/components/PageHeader";
const items=[["Help Desk","helpdesk@cusatmun.example","Logistics, venue and payments"],["Delegate Affairs","delegates@cusatmun.example","Committees, allocations and RoP"]];
export default function Contact(){
 return(<>
 <PageHeader eyebrow="Correspondence" title="Contact" sub="Wish you were here — reach the organising team below."/>
 <div className="section grid max-w-3xl gap-8 sm:grid-cols-2">
  {items.map(([t,e,desc],i)=>
   <a key={t} href={`mailto:${e}`} className={`folder relative ${i?"rotate-1":"-rotate-1"}`}>
    <Stamp text="Air Mail" sub="" rotate={8} size={54} tone="ink" className="absolute right-4 top-4"/>
    <Mail className="text-stamp"/><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="text-sm text-ink/70">{desc}</p>
    <p className="font-mono mt-3 text-lg italic">{e}</p></a>)}
  <div className="folder sm:col-span-2 border-l-4 border-l-ink"><MapPin className="text-stamp"/><p className="mt-2 font-mono text-sm">Cochin University of Science and Technology, Kalamassery, Kochi, Kerala 682022</p></div>
 </div></>);
}
