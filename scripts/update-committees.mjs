// Run from the project folder:  node scripts/update-committees.mjs
// 1) sets every committee's agenda to "Coming soon"
// 2) adds the "Best of the Best" committee if it isn't there yet
// It only touches those two things in lib/data.js, so any other edits you've made are kept.
import fs from "node:fs";

const path = process.argv[2] || "lib/data.js";
if (!fs.existsSync(path)) { console.error(`Can't find ${path} — run this from the project folder.`); process.exit(1); }

let s = fs.readFileSync(path, "utf8");
const before = s;

let agendas = 0;
s = s.replace(/agenda:"[^"]*"/g, () => { agendas++; return 'agenda:"Coming soon"'; });

let added = false;
if (!s.includes('id:"bestofbest"')) {
  const start = s.indexOf("export const committees");
  const end = start >= 0 ? s.indexOf("\n];", start) : -1;
  if (end < 0) { console.error("Couldn't find the end of the committees list in lib/data.js. Nothing was changed."); process.exit(1); }
  const line = `\n {id:"bestofbest",abbr:"Best of the Best",icon:"trophy",name:"Best of the Best",level:"To be announced",teaser:"Details about this committee are coming soon.",agenda:"Coming soon",board},`;
  s = s.slice(0, end) + line + s.slice(end);
  added = true;
}

if (s === before) { console.log("Already up to date — nothing to change."); process.exit(0); }
fs.writeFileSync(path, s);
console.log(`Done. Agendas set to "Coming soon": ${agendas}. "Best of the Best" ${added ? "added" : "was already there"}.`);
