import Image from "next/image";

// The real CUSAT MUN emblem (your design), cropped two ways:
//  - "icon": just the circular seal + laurel, no wordmark — for small spots
//    (navbar, footer, favicon) where the type would be illegible anyway.
//  - "full": the complete lockup with "CUSAT MUN / MODEL UNITED NATIONS" —
//    for large, legible placements (the hero watermark).
// theme="dark" (navy ink) is for light/paper backgrounds; theme="light"
// (white) is for navy backgrounds.
const FILES={
 dark:{icon:"/images/logo-navy-transparent-icon.png",full:"/images/logo-navy-transparent-full.png"},
 light:{icon:"/images/logo-white-transparent-icon.png",full:"/images/logo-white-transparent-full.png"},
};
const RATIO={icon:3936/2739,full:3936/3282};

export default function MunLogo({size=40,theme="dark",variant="icon",className="",priority=false}){
 const h=size, w=Math.round(size*RATIO[variant]);
 return <Image src={FILES[theme][variant]} alt="CUSAT MUN emblem" width={w} height={h} className={className} priority={priority}/>;
}
