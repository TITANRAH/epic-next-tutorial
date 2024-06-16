import { HeroSectionProps } from "@/interfaces/hero.section.interface";
import Image from "next/image";
import Link from "next/link";
import { StrapiImage } from "./StrapiImage";




export function HeroSection(props: HeroSectionProps) {

    const {data} = props;

    console.log(data);
    

    const {heading, subHeading, link, image} = data;
    console.log(heading)
    console.log(image);
    
//   console.dir(data, { depth: null });
  return (
    <header className="relative h-[600px] w-full overflow-hidden">
      <StrapiImage
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full "
        height={1080}
        src={`${image.url}`}
        // style={{

        // }}
        width={1920}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
        {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          {subHeading}
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={link.url}
        >
          {link.text}
        </Link>
      </div>
    </header>
  );
}
