import PageHeader from "@/components/PageHeader";
import { FileSpreadsheet } from "lucide-react"; 

export default function PortfolioMatrix() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PageHeader 
        eyebrow="THE COMMITTEES" 
        title="Portfolio Matrix" 
        sub="Access the complete matrix to see available countries and portfolios." 
      />
      
      <div className="section mx-auto flex max-w-md justify-center px-4 py-16">
        <div className="flex w-full flex-col items-center border-2 border-gold/40 bg-paper p-8 text-center shadow-xl">
          
          {/* Icon Circle */}
          <div className="mb-6 rounded-full bg-ink p-4 text-gold-light">
            <FileSpreadsheet size={32} />
          </div>
          
          <h2 className="mb-2 font-serif text-2xl font-bold text-ink">Master Portfolio Matrix</h2>
          <p className="mb-8 text-sm text-ink/80">
            View the complete, updated list of all committees and their respective portfolios in our live spreadsheet.
          </p>
          
          {/* Button */}
          {/* 
            <a
              href="https://docs.google.com/spreadsheets/d/1kF2yYbmZ58cv_--NxEj2dp9Xe5yQ61EQUvTpP8ULLPQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-ink bg-ink px-6 py-3 font-mono text-sm font-semibold tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              OPEN SPREADSHEET
            </a>
            */}
            
            <span className="flex items-center gap-2 border-2 border-dashed border-ink/30 px-6 py-3 font-mono text-sm font-semibold tracking-widest text-ink/55 cursor-not-allowed">
              OPENING SOON
            </span>

        </div>
      </div>
    </main>
  );
}


