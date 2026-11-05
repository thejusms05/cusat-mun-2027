import {Shield,Scroll,Vote,Venus,Scale,Satellite,Newspaper,Camera,Trophy,Landmark} from "lucide-react";
const ICONS={shield:Shield,scroll:Scroll,vote:Vote,venus:Venus,scale:Scale,satellite:Satellite,newspaper:Newspaper,camera:Camera,trophy:Trophy};
export const iconFor=c=>ICONS[c?.icon]||Landmark;
