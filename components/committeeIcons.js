import {Shield,Scroll,Vote,Venus,Scale,Satellite,Newspaper,Camera,Landmark} from "lucide-react";
const ICONS={shield:Shield,scroll:Scroll,vote:Vote,venus:Venus,scale:Scale,satellite:Satellite,newspaper:Newspaper,camera:Camera};
export const iconFor=c=>ICONS[c?.icon]||Landmark;
