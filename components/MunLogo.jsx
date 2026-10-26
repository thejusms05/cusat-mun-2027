import Image from "next/image";

// theme="dark"  -> maroon logo, for light (kasavu cream) backgrounds
// theme="light" -> gold logo, for deep-green backgrounds
// variant="icon" -> seal + laurel only;  variant="full" -> with the CUSAT MUN wordmark
const FILES={
 dark:{icon:"/images/logo-oxblood-icon.png",full:"/images/logo-oxblood-full.png"},
 light:{icon:"/images/logo-gold-icon.png",full:"/images/logo-gold-full.png"},
};
const RATIO={icon:1175/825,full:1175/985};

export default function MunLogo({size=40,theme="dark",variant="icon",className="",priority=false}){
 const h=size, w=Math.round(size*RATIO[variant]);
 return <Image src={FILES[theme][variant]} alt="CUSAT MUN emblem" width={w} height={h} className={className} priority={priority}/>;
}
