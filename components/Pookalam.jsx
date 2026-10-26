// An Onam pookalam (flower carpet): concentric rings of petals.
const RINGS=[
 {r:168,n:28,rx:11,ry:26,c:"#F2C230"},
 {r:140,n:24,rx:11,ry:24,c:"#E8761B"},
 {r:114,n:20,rx:10,ry:22,c:"#FBF6EA"},
 {r:90,n:16,rx:10,ry:20,c:"#A82A1E"},
 {r:68,n:12,rx:9,ry:18,c:"#4C8F3C"},
 {r:48,n:10,rx:7,ry:14,c:"#F2C230"},
];
export default function Pookalam({className=""}){
 return (
  <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
   <circle cx="200" cy="200" r="197" fill="#EEDFB8" stroke="#C49A2C" strokeWidth="3"/>
   <g transform="translate(200 200)">
    {RINGS.map((ring,ri)=>Array.from({length:ring.n}).map((_,i)=>{
     const a=(360/ring.n)*i+(ri%2?180/ring.n:0);
     return <ellipse key={`${ri}-${i}`} cx="0" cy={-ring.r} rx={ring.rx} ry={ring.ry} fill={ring.c} stroke="rgba(0,0,0,.14)" strokeWidth=".8" transform={`rotate(${a})`}/>;
    }))}
    <circle r="31" fill="#FBF6EA" stroke="#C49A2C" strokeWidth="3"/>
   </g>
  </svg>
 );
}
