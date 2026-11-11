import {Suspense} from "react";
import CommitteeGrid from "@/components/CommitteeGrid";
import PageHeader from "@/components/PageHeader";
export default function Committees(){
 return(<>
 <PageHeader  title="Committees" sub="Nine committees, each represented by a unique classical dancer. Click a figure to reveal your table - open to school, college and individual delegates. UNODC is reserved for school delegations."/>
 <div className="section"><Suspense><CommitteeGrid/></Suspense></div></>);
}
