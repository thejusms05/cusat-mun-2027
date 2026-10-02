const STYLES={
 available:{label:"Available",cls:"border-ink/25 bg-paper text-ink/70"},
 pending:{label:"Assigned · Payment Pending",cls:"border-gold bg-gold/15 text-ink"},
 confirmed:{label:"Assigned · Confirmed",cls:"border-ink bg-ink text-paper"},
};
export default function StatusBadge({status,className=""}){
 const s=STYLES[status]||STYLES.available;
 return <span className={`label-mono inline-block whitespace-nowrap border px-2 py-1 ${s.cls} ${className}`}>{s.label}</span>;
}
