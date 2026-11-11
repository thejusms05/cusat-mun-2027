"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LaunchPage() {
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  const handleLaunch = () => {
    // 1. Trigger the fade-out animation
    setIsLaunching(true);
    
    // 2. Wait 1 second (1000ms) for the animation to finish, then navigate
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div 
      className={`flex min-h-screen flex-col items-center justify-center bg-ink-900 p-6 text-center text-paper transition-all duration-1000 ease-in-out ${
        isLaunching ? "opacity-0 scale-110 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-none"
      }`}
    >
      
      {/* Logos Section */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-10 md:gap-20">
        <Image
          src="/images/cusat_logo_gold.png" 
          alt="CUSAT Logo"
          width={140}
          height={140}
          className="object-contain drop-shadow-lg"
        />
        <Image
          src="/images/dyf.png" 
          alt="Department of Youth Welfare"
          width={140}
          height={140}
          className="object-contain drop-shadow-lg"
        />
      </div>

      {/* Title Section */}
      <div className="mb-12">
        <h2 className="mb-4 font-mono text-lg uppercase tracking-[0.3em] text-gold-light/80">
          Department of Youth Welfare Presents
        </h2>
        <h1 className="font-serif text-5xl font-bold text-gold-light drop-shadow-2xl md:text-7xl">
          CUSAT MUN 2027
        </h1>
        <p className="mt-6 font-mono text-xl tracking-widest text-paper/80 md:text-2xl">
          OFFICIAL PORTAL LAUNCH
        </p>
      </div>

      {/* Inaugurator Info */}
      <div className="mb-12 flex flex-col items-center">
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-paper/60">
          Inauguration By
        </p>
        <h3 className="font-serif text-3xl font-medium text-gold-light">
          Roji M. John
        </h3>
        <p className="mt-1 font-mono text-sm tracking-widest text-paper/80">
          Minister of Higher Education of Kerala
        </p>
      </div>

      {/* Minister's Launch Button */}
      <button
        onClick={handleLaunch}
        className="group relative overflow-hidden rounded-sm border-2 border-gold-light bg-ink px-12 py-5 font-mono text-2xl font-bold tracking-widest text-gold-light transition-all duration-500 hover:bg-gold-light hover:text-ink-900 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
      >
        <span className="relative z-10">ENTER SITE</span>
      </button>
      
    </div>
  );
}
