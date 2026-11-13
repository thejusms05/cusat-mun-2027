'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// We define your new spots, URLs, and coordinates directly here
const NEW_SPOTS = [
  { id: 'registration', name: 'Registrations', label: 'Register Now', href: '/registration', pos: { h: { top: '55%', left: '12%' }, v: { top: '47%', left: '18%' } } },
  { id: 'contact', name: 'Contacts', label: 'Get in Touch', href: '/contact', pos: { h: { top: '55%', left: '45%' }, v: { top: '25%', left: '22%' } } },
  { id: 'committees', name: 'Committees', label: 'View Committees', href: '/committees', pos: { h: { top: '40%', left: '63%' }, v: { top: '31%', left: '45%' } } },
  { id: 'executive-board', name: 'Executive Board', label: 'Meet the EB', href: '/executive-board', pos: { h: { top: '65%', left: '85%' }, v: { top: '66%', left: '46%' } } },
  { id: 'secretariat', name: 'Secretariat', label: 'The Team', href: '/secretariat', pos: { h: { top: '89%', left: '67%' }, v: { top: '88%', left: '59%' } } },
  { id: 'itinerary', name: 'Itinerary', label: 'Schedule', href: '/itinerary', pos: { h: { top: '82%', left: '43.5%' }, v: { top: '86%', left: '34%' } } },
  { id: 'portfolio-matrix', name: 'Portfolio Matrix', label: 'Allotments', href: '/portfolio-matrix', pos: { h: { top: '40%', left: '83%' }, v: { top: '15%', left: '40%' } } },
];

function Collage({ layout, className }) {
  const [active, setActive] = useState(null);
  
  // Selects the correct image based on the layout prop
  const isDesktop = layout === 'h';
  const imgSrc = isDesktop ? '/images/collage2horizontal.jpeg' : '/images/collage2vertical.jpeg';
  
  const cur = NEW_SPOTS.find(s => s.id === active);

  return (
    <div className={`relative mx-auto select-none ${className}`}>
      {/* Background image without highlighting */}
      <img 
        src={imgSrc} 
        alt="Collage of Kerala" 
        className="w-full h-auto rounded-lg"
        onClick={() => setActive(null)} // Click anywhere else on image to close pop-up
      />

      {/* The interactive pulsing buttons */}
      {NEW_SPOTS.map((s) => (
        <button
          key={s.id}
          onClick={(e) => {
            e.stopPropagation(); // Stops the background image click from firing
            setActive(active === s.id ? null : s.id); // Toggles the pop-up
          }}
          className="absolute z-10 w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none cursor-pointer"
          style={{ top: s.pos[layout].top, left: s.pos[layout].left }}
          aria-label={s.name}
        >
          {/* Button Styling */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-70"></span>
          <span className="relative block h-4 w-4 rounded-full border-2 border-ink-900 bg-gold-light shadow-lg"></span>
        </button>
      ))}

      {/* The pop-up label that redirects to the page */}
      {cur && (
        <Link 
          href={cur.href} 
          className="anim-fade absolute z-20 block" 
          style={{ 
            left: cur.pos[layout].left, 
            top: cur.pos[layout].top, 
            transform: 'translate(15px, -50%)' // Shifts the pop-up slightly to the right of the button
          }}
        >
          <span className="flex items-center gap-3 whitespace-nowrap rounded-sm border-2 border-gold-light bg-ink-900/95 px-3.5 py-2 text-paper shadow-2xl">
            <span className="flex flex-col">
              <span className="label-mono block text-gold-light">{cur.name}</span>
              <span className="block font-serif text-lg font-bold leading-tight text-paper">{cur.label}</span>
              <span className="label-mono mt-0.5 block text-paper/70">Tap to open</span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-gold-light" />
          </span>
        </Link>
      )}
    </div>
  );
}

// Horizontal collage on laptops, vertical collage on phones and tablets
export default function CollageMenu() {
  return (
    <>
      <Collage layout="h" className="hidden max-w-[1200px] lg:block" />
      <Collage layout="v" className="mx-auto lg:hidden max-w-md" />
    </>
  );
}
