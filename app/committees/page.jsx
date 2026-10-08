import {Suspense} from "react";
import CommitteeGrid from "@/components/CommitteeGrid";
import PageHeader from "@/components/PageHeader";
export default function Committees(){
 return(<>
 <PageHeader eyebrow="The Deck · 8 Cards" title="Committees" sub="Eight cards, eight agendas. Tap a card to turn it over and see your table — open to school, college and individual delegates. UNODC is reserved for school delegations."/>
 <div className="section"><Suspense><CommitteeGrid/></Suspense></div></>);
}
