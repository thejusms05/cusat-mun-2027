// Stand-in for rows your /api/register endpoint would insert into Supabase.
// status: "new" (just submitted, no portfolio yet) | "assigned" (portfolio
// given, payment link sent, awaiting payment) | "confirmed" (paid)
export const initialRegistrations=[
 {id:"r1",type:"delegate",name:"Aarav Menon",institution:"St. Xavier's College",email:"aarav.menon@example.com",experience:"4+",preferences:["DISEC","Flagship Committee","UNHCR"],status:"new",committeeId:null,portfolioId:null},
 {id:"r2",type:"delegate",name:"Diya Nair",institution:"Govt. Model HSS",email:"diya.nair@example.com",experience:"0",preferences:["UNODC"],status:"new",committeeId:null,portfolioId:null},
 {id:"r3",type:"delegate",name:"Kabir Das",institution:"Rajagiri College",email:"kabir.das@example.com",experience:"1-3",preferences:["AIPPM","UN Women","DISEC"],status:"assigned",committeeId:"aippm",portfolioId:"aippm-2"},
 {id:"r4",type:"delegation",name:"Meera Pillai (Head Delegate)",institution:"Bishop Moore College",email:"meera.pillai@example.com",experience:null,preferences:[],status:"new",committeeId:null,portfolioId:null},
 {id:"r5",type:"press",name:"Rohan Varma",institution:"Independent",email:"rohan.varma@example.com",experience:null,preferences:[],status:"confirmed",committeeId:null,portfolioId:null},
];
