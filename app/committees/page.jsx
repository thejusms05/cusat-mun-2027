import {Suspense} from "react";
import CommitteeGrid from "@/components/CommitteeGrid";
import PageHeader from "@/components/PageHeader";
export default function Committees(){
 return(<>
 <PageHeader  title="Committees" sub="Nine committees, nine rasas. Choose a dancer to reveal your committee. Open to school, college and institutional delegates with UNODC exclusively reserved for school students."/>
 <div className="section"><Suspense><CommitteeGrid/></Suspense></div></>);
}
