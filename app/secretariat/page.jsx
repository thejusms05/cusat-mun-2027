import Polaroid from "@/components/Polaroid";
import PageHeader from "@/components/PageHeader";
const team=[["Secretary-General","Name Surname"],["Deputy Secretary-General","Name Surname"],["Director-General","Name Surname"]];
export default function Secretariat(){
 return(<>
 <PageHeader eyebrow="File · Personnel" title="Secretariat" sub="The organising delegation behind CUSAT MUN 2027."/>
 <div className="section grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{team.map(([r,n],i)=>
  <div key={r} className="flex flex-col items-center" style={{transform:`rotate(${i%2?2:-2}deg)`}}>
   <Polaroid caption={n} rotate={0} tape="tc" className="w-44"/>
   <p className="label-mono mt-3 text-center text-ink/60">{r}</p>
  </div>)}</div></>);
}
