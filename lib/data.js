// Dates: update to your confirmed schedule.
export const EVENT_START = "2027-01-22T09:00:00+05:30";
export const DATES = "22–24 January 2027";
const board=["Chairperson Name","Vice-Chair Name","Rapporteur Name"];

// level: who the committee is open to. Used on the committee card and detail view.
export const committees = [
 {id:"disec",abbr:"DISEC",icon:"shield",name:"Disarmament & International Security Committee",level:"College & University",teaser:"Negotiate arms control for an era of emerging military technology.",agenda:"Regulating autonomous weapons systems and the militarization of emerging tech",board},
 {id:"unhrc",abbr:"UNHRC",icon:"scroll",name:"United Nations Human Rights Council",level:"College & University",teaser:"Defend fundamental freedoms and hold states to account.",agenda:"Protecting civil liberties and press freedom in an age of digital surveillance",board},
 {id:"aippm",abbr:"AIPPM",icon:"vote",name:"All India Political Parties Meet",level:"College & University",teaser:"Step into India's multi-party politics and debate national policy.",agenda:"Deliberating a national policy framework for data privacy and AI governance",board},
 {id:"unwomen",abbr:"UN Women",icon:"venus",name:"United Nations Entity for Gender Equality and the Empowerment of Women",level:"College & University",teaser:"Advance gender equality and women's leadership worldwide.",agenda:"Closing the gender gap in digital access and economic participation",board},
 {id:"unodc",abbr:"UNODC",icon:"scale",name:"United Nations Office on Drugs and Crime",level:"School Delegations",teaser:"A school-level committee on transnational crime, drugs and trafficking.",agenda:"Tackling the spread of synthetic drugs and youth-targeted trafficking networks",board},
 {id:"ioic",abbr:"IOIC",icon:"satellite",name:"International Orbital Infrastructure Command",level:"College & University · Advanced",teaser:"The marquee crisis committee of CUSAT MUN, for experienced delegates.",agenda:"Responding to a cascading satellite collision threatening humanity's orbital infrastructure",board},
 {id:"ipjournalism",abbr:"IP Journalism",icon:"newspaper",name:"International Press — Journalism",level:"College & University",teaser:"Report, interview and publish on committee proceedings as they unfold.",agenda:"Covering the conference: reportage, op-eds and press briefings across committees",board},
 {id:"ipphoto",abbr:"IP Photojournalism",icon:"camera",name:"International Press — Photojournalism",level:"College & University",teaser:"Document the conference visually for the official press corps.",agenda:"Visual storytelling of debate, diplomacy and crisis across the conference",board},
];

// Eligibility shown on the Home and Committees pages.
export const eligibility=[
 ["School Delegations","Open to school teams, delegating into UNODC."],
 ["College Delegations","Open to college and university teams across all other committees."],
 ["Individual Delegates","No team required — register solo and we'll place you in a committee."],
];

export const days=[
 {d:"Day 1",t:"Opening & First Sessions",items:[["09:00","Registration & delegate kits"],["10:30","Opening ceremony"],["12:30","Lunch"],["14:00","Committee Session I"],["17:30","Delegate mixer (social)"]]},
 {d:"Day 2",t:"Debate & Drafting",items:[["09:30","Committee Session II"],["12:30","Lunch"],["14:00","Committee Session III: working papers"],["18:00","Cultural evening (social)"]]},
 {d:"Day 3",t:"Resolutions & Closing",items:[["09:30","Committee Session IV: voting"],["12:30","Lunch"],["14:00","Closing ceremony & awards"],["16:00","Farewell tea"]]},
];
export const faqs=[
 ["How does a debate begin?","The Chair opens with roll call, then the committee sets the agenda and the speakers' list. Delegates deliver opening statements in order."],
 ["What is a moderated caucus?","A structured debate on a sub-topic with a fixed total time and speaking time per delegate, managed by the Chair."],
 ["What is an unmoderated caucus?","A timed break where delegates move freely to negotiate, form blocs and draft working papers."],
 ["How are resolutions passed?","A draft resolution needs sponsors and signatories to be introduced. It passes by simple majority in most committees; the UNSC also uses the veto."],
];
