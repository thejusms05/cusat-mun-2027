// Text for the home page "About" and "Getting here" sections. Edit here, save, push.
// Distances and routes are approximate — please have someone local double-check them.

export const ABOUT = {
  mun: {
    paragraphs: [
      "Hosted by Cochin University of Science and Technology in Kochi, Kerala, CUSAT MUN 2027 will take place from 22nd to 24th January 2027.  Welcoming Individual and institutional delegations from schools and colleges alike, the conference aims to bring the spirit of Diplomacy and Debate to life across eight exemplary committees. Take your seat as a diplomat, political representative, or journalist to tackle pressing global challenges, craft bold resolutions, and turn fierce debate into meaningful consensus.",
    ],
    facts: [["Dates","22–24 January 2027"],["Venue","CUSAT, Kalamassery, Kochi"],["Committees","Nine"],["Open to","Schools, colleges & individuals"]],
  },
  cusat: {
    paragraphs: [
      "Located in Kochi, Kerala, the Cochin University of Science and Technology is a premier public institution, established in the year 1971. Its vibrant Kalamassery Campus unites students from across India, in disciplines ranging from science, engineering, and technology to management, law, and humanities. Known for fostering critical thinking and lively student-led forums, CUSAT serves as an ideal backdrop for debate, discussions, and diplomatic discourse.",
    
    ],
    facts: [["Founded","1971"],["Location","Kochi, Kerala"],["Type","Public university"]],
    photo: "",   // e.g. "/images/campus.jpg" — put a photo in public/images and set the path to show it
  },
  location: {
    query: "Cochin University of Science and Technology, Kalamassery, Kochi",
    address: "Cochin University of Science and Technology, Kalamassery, Kochi, Kerala 682022",
  },
  routes: [
    {id:"airport",title:"By air",from:"Cochin International Airport (COK), Nedumbassery",text:"The nearest airport, roughly 15–20 km from the campus — about 40–60 minutes by road depending on traffic. Taxis and app cabs are available outside arrivals."},
    {id:"train",title:"By train",from:"Ernakulam Junction / Ernakulam Town / Aluva",text:"Kochi's main railway stations are about 10–12 km from the campus. From any of them, continue by Kochi Metro, taxi or auto."},
    {id:"metro",title:"By metro",from:"Kochi Metro — Cochin University station",text:"Take the Kochi Metro (Aluva–Thrippunithura line) and get off at Cochin University station, a short ride from the campus."},
    {id:"bus",title:"By bus",from:"Ernakulam – Aluva route",text:"KSRTC and private buses on the Ernakulam–Aluva route stop at Kalamassery, near the university. Ask the conductor for the CUSAT stop."},
    {id:"taxi",title:"By taxi",from:"App cabs & local taxis",text:"Cabs and autos are easy to find across Kochi. From Ernakulam it is roughly 12–15 km (30–45 minutes); from the airport allow 40–60 minutes."},
  ],
};
