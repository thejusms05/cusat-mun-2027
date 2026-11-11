"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import Stamp from "@/components/Stamp";

// Type "thejus", "tamanna", or "secgen" anywhere on the site.
export default function EasterEgg() {
  const [activeEgg, setActiveEgg] = useState(null);

  useEffect(() => {
    let buf = "";
    const onKey = (e) => {
      // Buffer stays at -7 to accommodate the longest word ("tamanna")
      buf = (buf + e.key.toLowerCase()).slice(-7);
      
      if (buf.endsWith("thejus")) {
        setActiveEgg("thejus");
        setTimeout(() => setActiveEgg(null), 3200);
      } else if (buf.endsWith("tamanna")) {
        setActiveEgg("tamanna");
        setTimeout(() => setActiveEgg(null), 3200);
      } else if (buf.endsWith("secgen")) {
        setActiveEgg("secgen");
        setTimeout(() => setActiveEgg(null), 4000); // Gives them a little longer to read the meme
      } else if (buf.endsWith("sonu")) {
        setActiveEgg("sonu");
        setTimeout(() => setActiveEgg(null), 3200);
      }
    };
    
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!activeEgg) return null;

  return (
    <div 
      className={`pointer-events-none fixed z-[999] drop-shadow-2xl ${
        activeEgg === "secgen" 
          ? "inset-0 flex items-center justify-center bg-black/40" // Centers it and adds a slight dark backdrop
          : "bottom-6 right-6" // Keeps the others in the bottom corner
      }`} 
      aria-hidden="true"
    >
      {activeEgg === "thejus" && (
        <Stamp text="Approved by the Architect" sub="Thejus" rotate={-14} size={128} tone="stamp" className="anim-stamp" />
      )}
      
      {activeEgg === "tamanna" && (
        <div className="anim-stamp flex rotate-6 flex-col items-center justify-center rounded-sm border-2 border-gold bg-paper p-3 shadow-xl">
          <Image
  src="/images/tamanna.jpg"
  alt="Tamanna"
  width={128}
  height={128}
  className="h-32 w-32 object-cover drop-shadow-md"
/>
          <p className="mt-3 font-serif text-xl font-bold text-ink">Hello Hayati!</p>
        </div>
      )}

      {activeEgg === "secgen" && (
        <div className="flex flex-col items-center justify-center rounded-sm border-4 border-gold bg-paper p-3 shadow-2xl transition-all duration-300">
          <Image
  src="/images/secgen-meme.png"
  alt="Sec Gen Meme"
  width={320}
  height={256}
  className="max-h-64 max-w-xs object-contain drop-shadow-md"
/>
        </div>
      )}
      {activeEgg === "sonu" && (
        <div className="flex flex-col items-center justify-center animate-fade-in">
          <Image 
            src="/images/sonu.jpeg" 
            alt="Sonu" 
            width={400} 
            height={400} 
            className="rounded-lg border-4 border-gold-light object-cover drop-shadow-2xl" 
          />
          <div className="mt-6 rounded-sm border-2 border-gold-light bg-ink px-6 py-3">
            <p className="font-mono text-3xl font-bold tracking-widest text-gold-light">
              hello chonky boi!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


