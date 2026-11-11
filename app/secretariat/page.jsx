import Polaroid from "@/components/Polaroid";
import PageHeader from "@/components/PageHeader";
const team = [
  ["Secretary-General", "Ganga Pramod", "/images/gp.jpeg"],
  ["Deputy Secretary-General", "Goutham S Nair", "/images/depsecgen.jpeg"],
  ["Director-General", "Karthik Ganesh", "/images/dirgen.jpeg"],
  ["Executive Director", "Yuga Wintz Galaxa", "/images/ywg.jpeg"],
  ["Deputy Director-General", "Yahiya Rasheed", "/images/depdirgen.jpeg"]
];
export default function Secretariat(){
 return(<>
 <PageHeader title="The Secretariat" />
 <div className="section mx-auto flex max-w-5xl flex-wrap justify-center gap-12">{team.map(([r,n,img],i)=>
  <div key={r} className="flex flex-col items-center" style={{transform:`rotate(${i%2?2:-2}deg)`}}>
   <Polaroid src={img} caption={n} rotate={0} tape="tc" className="w-56 md:w-64"/>
   <p className="label-mono mt-3 text-center text-ink/60">{r}</p>
  </div>)}</div></>);
}
