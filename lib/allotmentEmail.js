// Builds the allotment email (HTML + plain text). Pure functions, no network.
const C={outer:"#0A140A",bg:"#1F3317",dark:"#0F1C0E",text:"#F0E2BC",gold:"#ECBB6E",white:"#FFFFFF"};
const serif="Georgia,'Times New Roman',serif";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

export function configProblems(config,env){
 const out=[];
 if(!env.GMAIL_USER||!env.GMAIL_APP_PASSWORD) out.push("Email sending isn't set up yet: add GMAIL_USER and GMAIL_APP_PASSWORD to your environment variables.");
 if(!config.contactEmail||/example/i.test(config.contactEmail)) out.push("Replace the placeholder contactEmail in lib/emailConfig.js with your real contact address.");
 return out;
}

const p=(html,extra="")=>`<p style="margin:0 0 16px;font-family:${serif};font-size:16px;line-height:1.55;color:${C.text};${extra}">${html}</p>`;
const btn=(href,label)=>`<a href="${esc(href)}" style="display:inline-block;background:${C.gold};color:${C.bg};font-family:${serif};font-weight:bold;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:4px;">${esc(label)}</a>`;
const h=(t,size=22)=>`<p style="margin:0 0 12px;font-family:${serif};font-size:${size}px;font-weight:bold;color:${C.white};">${esc(t)}</p>`;

function allotmentBlock(items,isDelegation){
 if(!isDelegation&&items.length===1){
  const it=items[0];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 22px;">
   <tr><td align="right" valign="top" style="width:38%;padding:8px 12px;font-family:${serif};font-size:18px;font-weight:bold;color:${C.white};">Committee :</td>
       <td valign="top" style="padding:8px 12px;font-family:${serif};font-size:20px;font-weight:bold;color:${C.gold};">${esc(it.committeeAbbr)}<br><span style="font-size:13px;font-weight:normal;color:${C.text};">${esc(it.committeeName)}</span></td></tr>
   <tr><td align="right" valign="top" style="padding:8px 12px;font-family:${serif};font-size:18px;font-weight:bold;color:${C.white};">Portfolio :</td>
       <td valign="top" style="padding:8px 12px;font-family:${serif};font-size:20px;font-weight:bold;color:${C.gold};">${esc(it.portfolio)}</td></tr>
  </table>`;
 }
 const th=t=>`<td style="padding:8px 10px;border-bottom:2px solid ${C.gold};font-family:${serif};font-size:13px;letter-spacing:1px;text-transform:uppercase;color:${C.white};">${t}</td>`;
 const td=(t,gold)=>`<td valign="top" style="padding:10px;border-bottom:1px solid rgba(241,232,210,.25);font-family:${serif};font-size:15px;color:${gold?C.gold:C.text};${gold?"font-weight:bold;":""}">${t}</td>`;
 return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 22px;">
  <tr>${th("Delegate")}${th("Committee")}${th("Portfolio")}</tr>
  ${items.map(it=>`<tr>${td(esc(it.delegate||"—"))}${td(`${esc(it.committeeAbbr)}<br><span style="font-size:12px;color:${C.text};font-weight:normal;">${esc(it.committeeName)}</span>`,true)}${td(esc(it.portfolio),true)}</tr>`).join("")}
 </table>`;
}

function paymentBlock(config,allPaid){
 if(allPaid) return p(`<b style="color:${C.gold};">We have received your payment — your seat is confirmed.</b> Further details will follow closely.`);
 const hasFees=(config.fees||[]).length>0, hasPay=!!config.paymentUrl, hasAcc=!!config.accommodationUrl;
 if(!hasFees&&!hasPay&&!hasAcc) return "";
 const left=hasFees?`${h("Fee Structure")}${config.fees.map(f=>`<p style="margin:0 0 10px;font-family:${serif};font-size:15px;font-style:italic;color:${C.text};">${esc(f.label)} : <b>${esc(f.amount)}</b></p>`).join("")}`:"";
 const right=[hasPay?`${h("Payment")}<p style="margin:0 0 20px;">${btn(config.paymentUrl,"Payment Form")}</p>`:"",hasAcc?`${h("Accommodation")}<p style="margin:0;">${btn(config.accommodationUrl,"Accommodation Form")}</p>`:""].join("");
 const intro=hasPay?p("Please complete the Payment Form below to confirm your seat."):"";
 const cells=left&&right
  ?`<td valign="top" width="50%" style="padding:0 10px 0 0;">${left}</td><td valign="top" width="50%" align="center" style="padding:0 0 0 10px;">${right}</td>`
  :`<td valign="top" align="${left?"left":"center"}">${left||right}</td>`;
 return `${intro}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 20px;"><tr>${cells}</tr></table>${config.feeNote?p(esc(config.feeNote)):""}`;
}

export function buildAllotmentEmail({name,items,isDelegation,allPaid,config}){
 const who=esc(name||"Delegate");
 const subject=`${config.eventName} — Your committee and portfolio allotment`;
 const logo=`${config.siteUrl}/images/logo-gold-full.png`;
 const intro=p(`We are delighted to confirm ${isDelegation?"your delegation's":"your"} participation in <b style="color:${C.white};">${esc(config.eventName)}</b>, scheduled for <b style="color:${C.white};">${esc(config.dateText)}</b> at <b style="color:${C.gold};">${esc(config.venue)}</b>.`);
 const schedule=config.scheduleNote?p(esc(config.scheduleNote)):"";
 const lead=p(isDelegation?"Your delegation's committee and portfolio allotments are as follows:":"Your committee and portfolio allotment is as follows:");
 const deadline=(!allPaid&&config.paymentDeadline)?p(`We request you to confirm your portfolio by completing the payment on or before <b style="color:${C.white};">${esc(config.paymentDeadline)}</b>.`):"";
 const extras=(config.extraParagraphs||[]).map(t=>p(esc(t))).join("");
 const help=p("Should you have any questions or require assistance, please do not hesitate to contact us via email.");
 const wish=p(`We look forward to seeing you at the conference and wish you the very best in your preparations!`);
 const da=(config.delegateAffairs||[]).length?`<p style="margin:18px 0 0;text-align:center;font-family:${serif};font-size:15px;line-height:1.6;color:${C.text};">In case of any queries, do not hesitate to contact Delegate Affairs:<br>${config.delegateAffairs.map(d=>`<b style="color:${C.white};">${esc(d.name)}</b>: ${esc(d.phone)}`).join(" &nbsp;|&nbsp; ")}</p>`:"";
 const contacts=(config.contacts||[]).length?`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;"><tr>${config.contacts.map(c=>`<td valign="top" align="center" style="padding:0 6px;font-family:${serif};font-size:14px;line-height:1.5;color:${C.text};"><b style="color:${C.white};">${esc(c.name)}</b><br>${esc(c.role)}<br>${esc(c.phone)}</td>`).join("")}</tr></table>`:"";

 const html=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.outer};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.outer};"><tr><td align="center" style="padding:24px 12px;">
 <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
  <tr><td align="center" style="background:${C.bg};padding:30px 24px 6px;border-radius:8px 8px 0 0;"><img src="${esc(logo)}" width="190" alt="${esc(config.eventName)}" style="display:block;border:0;max-width:100%;height:auto;"></td></tr>
  <tr><td style="background:${C.bg};padding:10px 28px 30px;">
   <p style="margin:6px 0 22px;text-align:center;font-family:${serif};font-size:28px;font-weight:bold;color:${C.gold};">Greetings, ${who}!</p>
   ${intro}${schedule}${lead}
   ${allotmentBlock(items,isDelegation)}
   ${paymentBlock(config,allPaid)}
   ${deadline}${extras}${help}${wish}${da}
  </td></tr>
  <tr><td style="background:${C.dark};padding:26px 28px 30px;border-radius:0 0 8px 8px;">
   <p style="margin:0 0 14px;text-align:center;font-family:${serif};font-size:28px;font-weight:bold;color:${C.gold};">Contact us</p>
   <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td align="center" style="font-family:${serif};font-size:15px;color:${C.text};"><a href="mailto:${esc(config.contactEmail)}" style="color:${C.text};text-decoration:none;">${esc(config.contactEmail)}</a></td>
    ${config.instagram?`<td align="center" style="font-family:${serif};font-size:15px;color:${C.text};">${esc(config.instagram)}</td>`:""}
   </tr></table>
   ${contacts}
  </td></tr>
 </table>
</td></tr></table></body></html>`;

 const text=[
  `Greetings, ${name||"Delegate"}!`,"",
  `We are delighted to confirm ${isDelegation?"your delegation's":"your"} participation in ${config.eventName}, scheduled for ${config.dateText} at ${config.venue}.`,"",
  isDelegation?"Your delegation's allotments:":"Your allotment:",
  ...items.map(it=>`${isDelegation?`${it.delegate||"—"}: `:""}Committee: ${it.committeeAbbr} (${it.committeeName}) | Portfolio: ${it.portfolio}`),"",
  allPaid?"We have received your payment — your seat is confirmed.":(config.paymentUrl?`Payment: ${config.paymentUrl}`:""),
  (!allPaid&&config.paymentDeadline)?`Please pay on or before ${config.paymentDeadline}.`:"",
  ...(config.extraParagraphs||[]),"",
  `Questions? Write to ${config.contactEmail}`,
 ].join("\n");

 return {subject,html,text};
}
