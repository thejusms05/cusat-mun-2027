"use client";
import {useState} from "react";
import {Loader2,Send,Mail} from "lucide-react";
import {committees} from "@/lib/data";
import Stamp from "@/components/Stamp";
import PageHeader from "@/components/PageHeader";
const opts=committees.map(c=>c.abbr);
const F=(k,label,type="text",options,required=true)=>({k,label,type,options,required});

function delegateFields(exp){
 const base=[F("name","Full Name"),F("inst","Institution"),F("contact","Contact Info (email)","email"),F("exp","Previous MUN Experience","select",["0","1-3","4+"])];
 const experienceExtra=exp&&exp!=="0"?[
  F("expDetail","Briefly describe your prior MUN experience","textarea"),
  F("awards","Awards or recognitions received","textarea",null,false),
 ]:[];
 const prefs=[F("pref1","Committee Preference 1","select",opts),F("pref2","Committee Preference 2","select",opts),F("pref3","Committee Preference 3","select",opts)];
 return [...base,...experienceExtra,...prefs];
}
const tabsBase={
 delegation:{label:"Delegation (Institutional)",fields:[F("inst","Institution"),F("head","Head Delegate Name"),F("contact","Head Delegate Email","email"),F("size","Delegation Size","number")]},
 press:{label:"International Press",fields:[F("name","Full Name"),F("outlet","Media Outlet"),F("contact","Contact Info (email)","email"),F("port","Portfolio Link","url")]},
};
const tabLabels={delegate:"Delegate Registration",...Object.fromEntries(Object.entries(tabsBase).map(([k,v])=>[k,v.label]))};

function check(f,v,all){
 const s=(v||"").trim();
 if(!s)return f.required===false?"":"This field is required.";
 if(f.type==="email"&&!/^\S+@\S+\.\S+$/.test(s))return"Enter a valid email address.";
 if(f.type==="url"&&!/^https?:\/\/\S+\.\S+/.test(s))return"Enter a full link starting with http.";
 if(f.type==="number"&&+s<2)return"A delegation needs at least 2 delegates.";
 if(f.k.startsWith("pref")&&["pref1","pref2","pref3"].some(o=>o!==f.k&&all[o]===s))return"Choose three different committees.";
 return"";
}

const doneCopy={
 delegate:"We've received your preferences. Our team will assign your country or portfolio and email you — that email will include a secure link to complete payment and confirm your seat.",
 delegation:"We've received your delegation's details. We'll assign portfolios for your team and email your head delegate with next steps and a payment link.",
 press:"We've received your accreditation request. Our team will confirm your press pass by email.",
};

export default function Registration(){
 const [tab,setTab]=useState("delegate"),[vals,setVals]=useState({}),[touched,setTouched]=useState({}),[state,setState]=useState("idle");
 const fields=tab==="delegate"?delegateFields(vals.exp):tabsBase[tab].fields;
 const errs=Object.fromEntries(fields.map(f=>[f.k,check(f,vals[f.k],vals)]));
  const submit=async e=>{e.preventDefault();setTouched(Object.fromEntries(fields.map(f=>[f.k,true])));
  if(Object.values(errs).some(Boolean))return;
  setState("loading");
  try{
   const r=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:tab,...vals})});
   if(!r.ok)throw new Error();
   setState("done");
  }catch{
   setState("error");
  }
 };
 const switchTab=k=>{setTab(k);setVals({});setTouched({});setState("idle")};
 return(<>
 <PageHeader eyebrow="Intake Form" title="Registration" sub="Open to school and college delegations, and to individual delegates. School teams register for UNODC. No payment is needed to apply — see how it works below."/>
 <div className="section max-w-2xl">
  <div className="mb-8 flex items-start gap-3 border-2 border-ink/15 bg-paper-dark/40 p-4">
   <Mail size={20} className="mt-0.5 shrink-0 text-ink"/>
   <p className="font-mono text-sm leading-relaxed text-ink/75">Submit your preferences below — there's nothing to pay right now. Our team reviews every submission, assigns a country or portfolio, and emails you directly with a secure link to complete payment and confirm your seat.</p>
  </div>
  <div role="tablist" className="flex flex-wrap gap-1 border-2 border-ink bg-ink p-1.5">
   {Object.entries(tabLabels).map(([k,label])=><button key={k} role="tab" aria-selected={tab===k} onClick={()=>switchTab(k)} className={`label-mono px-3 py-2.5 transition ${tab===k?"bg-gold text-ink":"text-paper/70 hover:text-paper"}`}>{label}</button>)}
  </div>
  {state==="done"?
  <div className="anim-sheet relative mt-10 overflow-hidden border-2 border-ink/15 bg-paper p-10 text-center">
   <Stamp text="Registration Received" sub="✓" rotate={-9} size={150} tone="ink" className="anim-stamp mx-auto"/>
   <h2 className="mt-4 text-2xl font-bold">Thank you</h2><p className="mx-auto mt-2 max-w-sm text-ink/70">{doneCopy[tab]}</p>
  </div>
  :<form onSubmit={submit} noValidate className="mt-8 space-y-6">
   {fields.map(f=>{const bad=touched[f.k]&&errs[f.k],good=touched[f.k]&&!errs[f.k]&&(vals[f.k]||"").trim();
    const cls=`w-full border-0 border-b-2 bg-transparent px-1 py-2.5 font-mono text-sm outline-none transition ${bad?"border-stamp anim-shake":good?"border-ink":"border-ink/25 hover:border-ink/50 focus:border-ink"}`;
    const p={id:f.k,className:cls,value:vals[f.k]||"",onChange:e=>setVals({...vals,[f.k]:e.target.value}),onBlur:()=>setTouched({...touched,[f.k]:true})};
    return(<div key={f.k}><label htmlFor={f.k} className="label-mono mb-1 block text-ink/60">{f.label}{f.required===false&&<span className="text-ink/35"> (optional)</span>}</label>
     {f.type==="select"?<select {...p}><option value="">Select…</option>{f.options.map(o=><option key={o}>{o}</option>)}</select>
      :f.type==="textarea"?<textarea rows={3} {...p}/>
      :<input type={f.type} {...p}/>}
     {bad&&<p className="mt-1 font-mono text-xs text-stamp">{errs[f.k]}</p>}</div>)})}
        {state==="error"&&<p className="border-2 border-stamp bg-stamp/10 p-3 font-mono text-sm text-stamp">Something went wrong — please check your connection and try again.</p>}
   <button disabled={state==="loading"} className="btn-gold ticket w-full disabled:opacity-70">{state==="loading"?<><Loader2 className="animate-spin" size={18}/>Submitting…</>:<><Send size={18}/>Submit Registration</>}</button>
  </form>}
 </div></>);
}
