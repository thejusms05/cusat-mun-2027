import Polaroid from "@/components/Polaroid";
import PageHeader from "@/components/PageHeader";
const team = [
  
  ["Secretary-General", "Ganga Pramod", "/images/gp.jpeg", "top"],
  ["Deputy Secretary-General", "Goutham S Nair", "/images/depsecgen.jpeg", "top"],
  ["Director-General", "Karthik Ganesh", "/images/dirgen.jpeg", "center"],
  ["Executive Director", "Yuga Wintz Galaxa", "/images/ywg.jpeg", "center"],
  ["Deputy Director-General", "Yahiya Rasheed", "/images/depdirgen.jpeg", "top 15%"]
];
export default function Secretariat(){
return(<>
  <PageHeader title="The Secretariat" />
  
  {/* Officials Section - Moved to top */}
  <div className="mx-auto mt-12 max-w-6xl px-4 pb-20">
    <h2 className="mb-12 text-center font-serif text-4xl font-bold text-gold-light">
      Officials
    </h2>
    
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {/* Patron 1 */}
      <div className="flex flex-col items-center text-center">
        <Polaroid caption="Prof. (Dr.) M. Junaid Bushiri" className="w-56 md:w-64 mb-4" src="/images/vc.jpeg" tape="tc"/>
        <p className="mt-1 font-mono tracking-widest text-gold-light">PATRON</p>
        <p className="mt-2 text-sm text-ink/70">Vice Chancellor, CUSAT</p>
      </div>

      {/* Patron 2 */}
      <div className="flex flex-col items-center text-center">
        <Polaroid caption="G Priyanka IAS" className="w-56 md:w-64 mb-4" src="/images/collector.jpeg" tape="tc" scale={1.5} position="center" />
        <p className="mt-1 font-mono tracking-widest text-gold-light">PATRON</p>
        <p className="mt-2 text-sm text-ink/70">District Collector, Ernakulam</p>
      </div>

      {/* Registrar */}
      <div className="flex flex-col items-center text-center">
        <Polaroid caption="Dr. Harigovind P. C" className="w-56 md:w-64 mb-4" src="/images/hari.jpeg" tape="tc"/>
        <p className="mt-1 font-mono tracking-widest text-gold-light">REGISTRAR</p>
        <p className="mt-2 text-sm text-ink/70">CUSAT</p>
      </div>

      {/* Convenor */}
      <div className="flex flex-col items-center text-center lg:col-start-1 lg:ml-auto lg:translate-x-1/2">
        <Polaroid caption="Aneesh V Pillai" className="w-56 md:w-64 mb-4" src="/images/aneesh.jpeg" tape="tc"/>
        <p className="mt-1 font-mono tracking-widest text-gold-light">CONVENOR</p>
        <p className="mt-2 text-sm text-ink/70">Associate Professor, School of Legal Studies, CUSAT</p>
      </div>

      {/* Organising Secretary */}
      <div className="flex flex-col items-center text-center lg:col-start-3 lg:-translate-x-1/2 lg:mr-auto">
        <Polaroid caption="Dr. P.K. Baby" className="w-56 md:w-64 mb-4" src="/images/Baby.jpg" tape="tc"/>
        <p className="mt-1 font-mono tracking-widest text-gold-light">ORGANISING SECRETARY</p>
        <p className="mt-2 text-sm text-ink/70">Director, Department of Youth Welfare, CUSAT</p>
      </div>
    </div>
  </div>

  {/* Student Secretariat Polaroids - Moved to bottom */}
  <div className="section mx-auto flex max-w-5xl flex-wrap justify-center gap-12 pb-20">{team.map(([r,n,img,pos],i)=>
    <div key={r} className="flex flex-col items-center">
      <Polaroid src={img} caption={n} rotate={0} position={pos} tape="tc" className="w-56 md:w-64" />
      <p className="label-mono mt-3 text-center text-ink/60">{r}</p>
    </div>)}
  </div>
</>);
}








