import "./globals.css";
import {Playfair_Display,Inter,Courier_Prime} from "next/font/google";
import {Navbar,Footer} from "@/components/Layout";
import EasterEgg from "@/components/EasterEgg";
const serif=Playfair_Display({subsets:["latin"],weight:["600","700","800","900"],variable:"--font-serif"});
const sans=Inter({subsets:["latin"],variable:"--font-sans"});
const mono=Courier_Prime({subsets:["latin"],weight:["400","700"],variable:"--font-mono"});
export const metadata={title:"CUSAT MUN 2027",description:"Model United Nations conference at Cochin University of Science and Technology, 22–24 January 2027",icons:{icon:"/images/logo-oxblood-icon.png"}};
export default function RootLayout({children}){
 return(<html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
  {/* If you're reading the source: hi. This one's signed — type "thejus" anywhere on the site. */}
  <body><div className="grain"/><Navbar/><main>{children}</main><Footer/><EasterEgg/></body>
 </html>);
}
