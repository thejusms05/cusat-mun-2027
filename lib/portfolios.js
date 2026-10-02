// Demo seed data for the portfolio matrix and the admin console.
// In production this table lives in your database (see the Supabase
// instructions) — this file just gives the UI something real to render
// and the admin console something to edit locally before you wire it up.

export const MASTER_COUNTRIES=[
 "United States of America","United Kingdom","People's Republic of China","Russian Federation",
 "France","India","Germany","Japan","Brazil","South Africa","Israel","Iran","Saudi Arabia",
 "Pakistan","Indonesia","Nigeria","Mexico","Australia","Canada","Republic of Korea","Turkiye",
 "Egypt","Kenya","Ukraine",
];

export const AIPPM_PARTIES=[
 "Bharatiya Janata Party (BJP)","Indian National Congress (INC)","Aam Aadmi Party (AAP)",
 "All India Trinamool Congress (AITC)","Dravida Munnetra Kazhagam (DMK)","AIADMK","Shiv Sena",
 "Nationalist Congress Party (NCP)","Samajwadi Party (SP)","Bahujan Samaj Party (BSP)",
 "Janata Dal (United)","Rashtriya Janata Dal (RJD)","CPI (Marxist)","Telugu Desam Party (TDP)",
 "YSR Congress Party","Biju Janata Dal (BJD)","Shiromani Akali Dal (SAD)","J&K National Conference",
];

// status: "available" | "pending" (assigned, payment pending) | "confirmed" (assigned & paid)
function seed(committeeId,list,{confirmed=2,pending=2}={}){
 return list.map((name,i)=>{
  let status="available",assignedTo=null;
  if(i<confirmed){status="confirmed";assignedTo="Delegate on file";}
  else if(i<confirmed+pending){status="pending";assignedTo="Delegate on file";}
  return {id:`${committeeId}-${i}`,committeeId,name,status,assignedTo};
 });
}

// Committees without country/party portfolios (press corps) are left out —
// the Portfolio Matrix page shows a note for those instead.
export const portfolioMatrix={
 disec: seed("disec",MASTER_COUNTRIES.slice(0,18)),
 unhcr: seed("unhcr",[...MASTER_COUNTRIES].reverse().slice(0,18)),
 aippm: seed("aippm",AIPPM_PARTIES),
 unwomen: seed("unwomen",MASTER_COUNTRIES.slice(2,20)),
 unodc: seed("unodc",MASTER_COUNTRIES.slice(0,12),{confirmed:1,pending:1}),
 flagship: seed("flagship",MASTER_COUNTRIES.slice(4,20),{confirmed:3,pending:1}),
};

export function committeeCounts(list){
 return {
  available: list.filter(p=>p.status==="available").length,
  pending: list.filter(p=>p.status==="pending").length,
  confirmed: list.filter(p=>p.status==="confirmed").length,
  total: list.length,
 };
}
