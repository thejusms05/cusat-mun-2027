"use client";
import {useEffect,useState} from "react";
import {Loader2,Send,Mail} from "lucide-react";
import {committees} from "@/lib/data";
import Stamp from "@/components/Stamp";
import PageHeader from "@/components/PageHeader";

const SCHOOL_COMMITTEE="UNODC";
const UNIVERSITY_COMMITTEES=committees.map(c=>c.abbr).filter(a=>!["UNODC","IP Journalism","IP Photojournalism"].includes(a));
const idFor=abbr=>committees.find(c=>c.abbr===abbr)?.id;

const CATEGORIES=[
 {id:"school_individual",label:"School — Individual Delegate",school:true,group:false},
 {id:"university_individual",label:"University — Individual Delegate",school:false,group:false},
 {id:"school_delegation",label:"School — Delegation",school:true,group:true},
 {id:"university_delegation",label:"University — Delegation",school:false,group:true},
];

const emptyPrefs=school=>school?[{committee:SCHOOL_COMMITTEE,portfolio:""}]:[{committee:"",portfolio:""},{committee:"",portfolio:""},{committee:"",portfolio:""}];

function PrefsBlock({school,portfolios,value,onChange}){
 const availFor=abbr=>portfolios.filter(p=>p.committee_id===idFor(abbr)&&p.status==="available");
 if(school){
  const v=value[0]||{committee:SCHOOL_COMMITTEE,portfolio:""};
  const avail=availFor(SCHOOL_COMMITTEE);
  return(<div>
   <label className="label-mono mb-1 block text-ink/60">Preferred Portfolio — UNODC</label>
   <select value={v.portfolio} onChange={e=>onChange([{committee:SCHOOL_COMMITTEE,portfolio:e.target.value}])} className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-2.5 font-mono text-sm focus:border-ink">
    <option value="">Select…</option>
    {avail.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
    {avail.length===0&&<option disabled>No portfolios currently available</option>}
   </select>
  </div>);
 }
 const chosen=value.map(v=>v.committee).filter(Boolean);
 return(<div className="space-y-4">
  {value.map((v,i)=>(
   <div key={i}>
    <label className="label-mono mb-1 block text-ink/60">Committee Preference {i+1}</label>
    <div className="grid gap-2 sm:grid-cols-2">
     <select value={v.committee} onChange={e=>{const next=[...value];next[i]={committee:e.target.value,portfolio:""};onChange(next);}} className="border-0 border-b-2 border-ink/25 bg-transparent px-1 py-2.5 font-mono text-sm focus:border-ink">
      <option value="">Select committee…</option>
      {UNIVERSITY_COMMITTEES.filter(o=>o===v.committee||!chosen.includes(o)).map(o=><option key={o}>{o}</option>)}
     </select>
     <select value={v.portfolio} onChange={e=>{const next=[...value];next[i]={...v,portfolio:e.target.value};onChange(next);}} disabled={!v.committee} className="border-0 border-b-2 border-ink/25 bg-transparent px-1 py-2.5 font-mono text-sm focus:border-ink disabled:opacity-40">
      <option value="">Portfolio preference…</option>
      {availFor(v.committee).map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
      {v.committee&&availFor(v.committee).length===0&&<option disabled>No portfolios currently available</option>}
     </select>
    </div>
   </div>
  ))}
 </div>);
}

function DelegateBlock({index,delegate,school,portfolios,onChange}){
 return(<div className="border-2 border-dashed border-ink/20 p-4">
  <p className="label-mono mb-2 text-ink/60">Delegate {index+1}</p>
  <label className="label-mono mb-1 block text-ink/60">Delegate Name</label>
  <input value={delegate.name} onChange={e=>onChange({...delegate,name:e.target.value})} className="w-full border-0 border-b-2 border-ink/25 bg-transparent px-1 py-2.5 font-mono text-sm focus:border-ink"/>
  <div className="mt-4"><PrefsBlock school={school} portfolios={portfolios} value={delegate.prefs} onChange={prefs=>onChange({...delegate,prefs})}/></div>
 </div>);
}

export default function Registration(){
 const [category,setCategory]=useState("");
 const [portfolios,setPortfolios]=useState([]);
 const [basic,setBasic]=useState({name:"",inst:"",contact:""});
 const [exp,setExp]=useState({exp:"",expDetail:"",awards:""});
 const [prefs,setPrefs]=useState([]);
 const [size,setSize]=useState("");
 const [delegates,setDelegates]=useState([]);
 const [attempted,setAttempted]=useState(false);
 const [state,setState]=useState("idle");

 useEffect(()=>{fetch("/api/portfolios",{cache:"no-store"}).then(r=>r.json()).then(j=>setPortfolios(j.portfolios||[]))},[]);

 const cat=CATEGORIES.find(c=>c.id===category);
 const isGroup=cat?.group;
 const isSchool=cat?.school;

 useEffect(()=>{ if(cat) setPrefs(emptyPrefs(isSchool)); },[category]);

 useEffect(()=>{
  const n=Math.max(0,Math.min(25,parseInt(size)||0));
  setDelegates(prev=>{
   const next=prev.slice(0,n);
   while(next.length<n) next.push({name:"",prefs:emptyPrefs(isSchool)});
   return next;
  });
 },[size,isSchool]);

 const basicValid=basic.name.trim()&&basic.inst.trim()&&/^\S+@\S+\.\S+$/.test(basic.contact.trim());
 const prefsValid=list=>list.every(x=>x.committee&&x.portfolio);
 const individualValid=!isGroup?(exp.exp&&(exp.exp==="0"||exp.expDetail.trim())&&prefsValid(prefs)):true;
 const sizeNum=parseInt(size)||0;
 const groupValid=isGroup?(sizeNum>=2&&sizeNum<=25&&delegates.length===sizeNum&&delegates.every(d=>d.name.trim()&&prefsValid(d.prefs))):true;
 const formValid=category&&basicValid&&individualValid&&groupValid;
 const bad=cond=>attempted&&cond;

 const submit=async e=>{
  e.preventDefault();setAttempted(true);
  if(!formValid)return;
  setState("loading");
  try{
   const r=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
    category,type:isGroup?"delegation":"delegate",
    name:basic.name,inst:basic.inst,contact:basic.contact,
    experience:!isGroup?exp.exp:null,expDetail:!isGroup?exp.expDetail:null,awards:!isGroup?exp.awards:null,
    delegationSize:isGroup?sizeNum:null,
    preferences:isGroup?delegates.map(d=>({name:d.name,prefs:d.prefs})):prefs,
   })});
   if(!r.ok)throw new Error();
   setState("done");
  }catch{setState("error")}
 };

 const inputCls=c=>`w-full border-0 border-b-2 bg-transparent px-1 py-2.5 font-mono text-sm outline-none transition ${c?"border-stamp anim-shake":"border-ink/25 hover:border-ink/50 focus:border-ink"}`;

 return(<>
 <PageHeader eyebrow="Intake Form" title="Registration" sub="Open to school and college delegations, and to individual delegates. School teams and individuals register under UNODC. No payment is needed to apply — see how it works below."/>
 <div className="section max-w-2xl">
  <div className="mb-8 flex items-start gap-3 border-2 border-ink/15 bg-paper-dark/40 p-4">
   <Mail size={20} className="mt-0.5 shrink-0 text-ink"/>
   <p className="font-mono text-sm leading-relaxed text-ink/75">Submit your preferences below — there's nothing to pay right now. Our team reviews every submission, assigns a country or portfolio, and emails you directly with a secure link to complete payment and confirm your seat.</p>
  </div>

  <label className="label-mono mb-2 block text-ink/60">I am registering as a…</label>
  <div className="grid gap-2 sm:grid-cols-2">
   {CATEGORIES.map(c=><button key={c.id} type="button" onClick={()=>setCategory(c.id)} className={`label-mono border-2 px-3 py-3 text-left transition ${category===c.id?"border-ink bg-ink text-paper":"border-ink/25 text-ink/70 hover:border-ink"}`}>{c.label}</button>)}
  </div>

  {category&&<form onSubmit={submit} noValidate className="mt-8 space-y-6">
   {state==="done"?
   <div className="anim-sheet relative overflow-hidden border-2 border-ink/15 bg-paper p-10 text-center">
    <Stamp text="Registration Received" sub="✓" rotate={-9} size={150} tone="ink" className="anim-stamp mx-auto"/>
    <h2 className="mt-4 text-2xl font-bold">Thank you</h2>
    <p className="mx-auto mt-2 max-w-sm text-ink/70">We've received your preferences. Our team will assign country/portfolio seats accordingly and email you directly with next steps and a secure payment link.</p>
   </div>
   :<>
    <div>
     <label className="label-mono mb-1 block text-ink/60">{isGroup?"Head Delegate Name":"Full Name"}</label>
     <input value={basic.name} onChange={e=>setBasic({...basic,name:e.target.value})} className={inputCls(bad(!basic.name.trim()))}/>
     {bad(!basic.name.trim())&&<p className="mt-1 font-mono text-xs text-stamp">This field is required.</p>}
    </div>
    <div>
     <label className="label-mono mb-1 block text-ink/60">Institution</label>
     <input value={basic.inst} onChange={e=>setBasic({...basic,inst:e.target.value})} className={inputCls(bad(!basic.inst.trim()))}/>
     {bad(!basic.inst.trim())&&<p className="mt-1 font-mono text-xs text-stamp">This field is required.</p>}
    </div>
    <div>
     <label className="label-mono mb-1 block text-ink/60">Contact Email</label>
     <input type="email" value={basic.contact} onChange={e=>setBasic({...basic,contact:e.target.value})} className={inputCls(bad(!/^\S+@\S+\.\S+$/.test(basic.contact.trim())))}/>
     {bad(!/^\S+@\S+\.\S+$/.test(basic.contact.trim()))&&<p className="mt-1 font-mono text-xs text-stamp">Enter a valid email address.</p>}
    </div>

    {!isGroup&&<>
     <div>
      <label className="label-mono mb-1 block text-ink/60">Previous MUN Experience</label>
      <select value={exp.exp} onChange={e=>setExp({...exp,exp:e.target.value})} className={inputCls(bad(!exp.exp))}>
       <option value="">Select…</option><option>0</option><option>1-3</option><option>4+</option>
      </select>
      {bad(!exp.exp)&&<p className="mt-1 font-mono text-xs text-stamp">This field is required.</p>}
     </div>
     {exp.exp&&exp.exp!=="0"&&<>
      <div>
       <label className="label-mono mb-1 block text-ink/60">Briefly describe your prior MUN experience</label>
       <textarea rows={3} value={exp.expDetail} onChange={e=>setExp({...exp,expDetail:e.target.value})} className={inputCls(bad(!exp.expDetail.trim()))}/>
       {bad(!exp.expDetail.trim())&&<p className="mt-1 font-mono text-xs text-stamp">This field is required.</p>}
      </div>
      <div>
       <label className="label-mono mb-1 block text-ink/60">Awards or recognitions received <span className="text-ink/35">(optional)</span></label>
       <textarea rows={3} value={exp.awards} onChange={e=>setExp({...exp,awards:e.target.value})} className={inputCls(false)}/>
      </div>
     </>}
     <PrefsBlock school={isSchool} portfolios={portfolios} value={prefs} onChange={setPrefs}/>
    </>}

    {isGroup&&<>
     <div>
      <label className="label-mono mb-1 block text-ink/60">Delegation Size</label>
      <input type="number" value={size} onChange={e=>setSize(e.target.value)} className={inputCls(bad(!(sizeNum>=2&&sizeNum<=25)))}/>
      {bad(sizeNum<2)&&<p className="mt-1 font-mono text-xs text-stamp">A delegation needs at least 2 delegates.</p>}
      {bad(sizeNum>25)&&<p className="mt-1 font-mono text-xs text-stamp">For delegations over 25, please email Delegate Affairs directly.</p>}
     </div>
     {delegates.map((d,i)=><DelegateBlock key={i} index={i} delegate={d} school={isSchool} portfolios={portfolios} onChange={nd=>setDelegates(prev=>prev.map((x,j)=>j===i?nd:x))}/>)}
    </>}

    <button disabled={state==="loading"} className="btn-gold ticket w-full disabled:opacity-70">{state==="loading"?<><Loader2 className="animate-spin" size={18}/>Submitting…</>:<><Send size={18}/>Submit Registration</>}</button>
    {state==="error"&&<p className="border-2 border-stamp bg-stamp/10 p-3 font-mono text-sm text-stamp">Something went wrong — please check your connection and try again.</p>}
   </>}
  </form>}
 </div></>);
}
