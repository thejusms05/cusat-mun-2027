// Text for the home page "About" and "Getting here" sections. Edit here, save, push.
// Distances and routes are approximate — please have someone local double-check them.

export const ABOUT = {
  mun: {
    paragraphs: [
      "CUSAT MUN 2027 is the Model United Nations conference of the Cochin University of Science and Technology, held from 22 to 24 January 2027 in Kochi, Kerala.",
      "Delegates from schools and colleges — in delegations or on their own — step into the roles of countries, parties and journalists across nine committees. They research, debate, draft resolutions and negotiate their way towards consensus.",
    ],
    facts: [["Dates","22–24 January 2027"],["Venue","CUSAT, Kalamassery, Kochi"],["Committees","Nine"],["Open to","Schools, colleges & individuals"]],
  },
  cusat: {
    paragraphs: [
      "The Cochin University of Science and Technology (CUSAT) is a public university in Kochi, Kerala, founded in 1971.",
      "Its campus in Kalamassery brings together students from across the country, with programmes spanning science, engineering, technology, management, law and the humanities.",
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
