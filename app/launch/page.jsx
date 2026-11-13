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
      className={`flex min-h-screen items-center justify-center bg-ink-900 p-6 text-paper transition-all duration-1000 ease-in-out ${
        isLaunching ? "opacity-0 scale-110 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-none"
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-16">
        
        {/* Left Side: Portrait & Name */}
        <div className="flex w-64 shrink-0 flex-col items-center text-center sm:w-72 lg:w-80">
          <img 
            src="/images/roji.jpg" 
            alt="Roji M. John" 
            className="h-auto w-full rounded-sm border border-gold-light/30 object-cover shadow-lg"
          />
          <div className="mt-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
              Inauguration By
            </p>
            <h3 className="font-serif text-2xl font-medium text-gold-light sm:text-3xl">
              Roji M. John
            </h3>
            <p className="mt-1 font-mono text-sm tracking-widest text-paper/80">
              Minister of Higher Education of Kerala
            </p>
          </div>
        </div>

        {/* Right Side: Text & Button */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Logos Section */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:justify-start">
            <Image src="/images/cusat_logo_gold.png" alt="CUSAT Logo" width={120} height={120} className="object-contain" />
            <Image src="/images/dyf.png" alt="Department of Youth Welfare" width={120} height={120} className="object-contain" />
          </div>

          {/* Title Section */}
          <div className="mb-12">
            <h2 className="mb-4 font-mono text-base uppercase tracking-[0.3em] text-gold-light/80">
              Department of Youth Welfare Presents
            </h2>
            <h1 className="font-serif text-5xl font-bold text-gold-light drop-shadow-xl md:text-6xl lg:text-7xl">
              CUSAT MUN 2027
            </h1>
            <p className="mt-4 font-mono text-lg tracking-widest text-paper/80 md:text-xl">
              OFFICIAL PORTAL LAUNCH
            </p>
          </div>

          {/* Launch Button */}
          <button 
            onClick={handleLaunch} 
            className="group relative overflow-hidden rounded-sm border-2 border-gold-light bg-ink px-10 py-4 font-mono text-xl font-bold tracking-widest text-gold-light transition-colors duration-300 hover:bg-gold-light hover:text-ink-900"
          >
            <span className="relative z-10">ENTER SITE</span>
          </button>
        </div>
        
      </div>
      </div>
  );
}
