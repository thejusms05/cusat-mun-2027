import {Mail,MapPin, Phone} from "lucide-react";
import Stamp from "@/components/Stamp";
import PageHeader from "@/components/PageHeader";
const items=[["Help Desk","cusatmun@cusat.ac.in"]];
export default function Contact(){
 return(<>
 <PageHeader eyebrow="Correspondence" title="Contact"/>
 <div className="section mx-auto flex max-w-lg flex-col gap-8">
  {items.map(([t,e,desc],i)=>
   <a key={t} href={`mailto:${e}`} className={`folder relative ${i?"rotate-1":"-rotate-1"}`}>
    <Stamp text="Air Mail" sub="" rotate={8} size={54} tone="ink" className="absolute right-4 top-4"/>
    <Mail className="text-stamp"/><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="text-sm text-ink/70">{desc}</p>
    <p className="font-mono mt-3 text-lg italic">{e}</p></a>)}
    <a href="tel:+919008831934" className="folder relative rotate-1">
  <Stamp text="Air Mail" sub="" rotate={8} size={54} tone="ink" className="absolute right-4 top-4"/>
  <Phone className="text-stamp"/><h3 className="mt-3 text-xl font-bold">Secretary-General</h3>
  <p className="mt-1 text-sm font-medium text-ink/80">Ganga Pramod</p>
  <p className="font-mono mt-3 text-lg italic">+91 90088 31934</p>
</a>

<a href="tel:+919400272535" className="folder relative -rotate-1">
  <Stamp text="Air Mail" sub="" rotate={8} size={54} tone="ink" className="absolute right-4 top-4"/>
  <Phone className="text-stamp"/><h3 className="mt-3 text-xl font-bold">Deputy Secretary-General</h3>
  <p className="mt-1 text-sm font-medium text-ink/80">Gautham S Nair</p>
  <p className="font-mono mt-3 text-lg italic">+91 94002 72535</p>
</a>
<a href="tel:+917994062209" className="folder relative -rotate-1">
  <Stamp text="Air Mail" sub="" rotate={8} size={54} tone="ink" className="absolute right-4 top-4"/>
  <Phone className="text-stamp"/><h3 className="mt-3 text-xl font-bold">Director General</h3>
  <p className="mt-1 text-sm font-medium text-ink/80">Karthik Ganesh</p>
  <p className="font-mono mt-3 text-lg italic">+91 79940 62209</p>
</a>
<a href="tel:+917012985139" className="folder relative -rotate-1">
  <Stamp text="Air Mail" sub="" rotate={8} size={54} tone="ink" className="absolute right-4 top-4"/>
  <Phone className="text-stamp"/><h3 className="mt-3 text-xl font-bold">Executive Director</h3>
  <p className="mt-1 text-sm font-medium text-ink/80">Yuga Wintz Galaxa</p>
  <p className="font-mono mt-3 text-lg italic">+91 70129 85139</p>
</a>

<a href="tel:+919645356542" className="folder relative -rotate-1">
  <Stamp text="Air Mail" sub="" rotate={8} size={54} tone="ink" className="absolute right-4 top-4"/>
  <Phone className="text-stamp"/><h3 className="mt-3 text-xl font-bold">Deputy Director General</h3>
  <p className="mt-1 text-sm font-medium text-ink/80">Yahiya Rasheed</p>
  <p className="font-mono mt-3 text-lg italic">+91 96453 56542</p>
</a>
  <div className="folder border-l-4 border-l-ink"><MapPin className="text-stamp"/><p className="mt-2 font-mono text-sm">2nd Floor, CUSATMUN Office, Department of Youth Welfare, Amenity Centre, Cochin University of Science and Technology, Kalamassery, Kochi, Kerala 682022</p></div>
 </div></>);  
}
