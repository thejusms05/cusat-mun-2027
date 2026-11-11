import Image from "next/image";
import PageHeader from "@/components/PageHeader"; 

export default function GalleryPage() {
  const photos = Array.from({ length: 24}, (_, i) => `/images/gallery${i + 1}.jpeg`);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <PageHeader  
        title="Gallery"  
      />
      
      {/* FEATURED MOMENT: LOGO LAUNCH */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex flex-col gap-6 border-2 border-gold/40 bg-paper p-4 shadow-xl sm:p-8">
          
          {/* Image spans full width on top */}
          <div className="w-full overflow-hidden border-2 border-gold/20 bg-ink-900/5">
  <Image 
    src="/images/gallerylogolaunch.jpeg" 
    alt="Logo launch of CUSAT MUN 2027 by Shri Abdul Gafoor" 
    width={2000}
    height={800}
    className="h-auto w-full transition-transform hover:scale-[1.02]"
    priority
  />
</div>
          
          {/* Text section centered below */}
          <div className="flex flex-col items-center justify-center px-2 text-center md:px-6 md:py-4">
            <p className="label-mono mb-2 text-sm uppercase tracking-widest text-ink/60">
              Featured Highlight
            </p>
            <h2 className="mb-4 font-serif text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              Official Logo Launch
            </h2>
            <div className="mb-4 h-px w-16 bg-gold/70"></div>
            <p className="max-w-3xl text-base leading-relaxed text-ink/80 sm:text-lg">
              The official logo launch of CUSAT MUN 2027, proudly inaugurated by <b>Shri Abdul Gafoor</b>, Minister for Fisheries, Harbour Engineering and Social Justice.
            </p>
          </div>

        </div>
      </section>

      {/* STANDARD GALLERY GRID */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="relative aspect-square w-full overflow-hidden border-2 border-gold/40 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Image 
                src={photo} 
                alt={`CUSAT MUN Gallery Image ${index + 1}`} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


