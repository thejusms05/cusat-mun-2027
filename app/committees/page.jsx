import {Suspense} from "react";
import CommitteeGrid from "@/components/CommitteeGrid";
import PageHeader from "@/components/PageHeader";
export default function Committees(){
 return(<>
 <PageHeader eyebrow="Dossier · 8 Files" title="Committees" sub="Eight committees, eight agendas — open to school, college and individual delegates. UNODC is reserved for school delegations."/>
 <div className="section"><Suspense><CommitteeGrid/></Suspense></div></>);
}
