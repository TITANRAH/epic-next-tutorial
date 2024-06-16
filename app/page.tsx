import { FeatureSection } from "@/components/custom/FeatureSection";
import { HeroSection } from "@/components/custom/HeroSection";
import { getHomePageData } from "@/data/loaders";

// block render lo que hace es tomar un block cualquiera de los que vienene n la respuessta de strapi

// luego toma el nombre del block o nombre de la seccion que viene dentro de los blocks 

// si uno se llama como el caso expuesto en el switch llenara con la seccion que le corresponda al componente html

// si no retornara null

export default async function Home() {

  // declaramos la funcion que llenara los componentes
  function blockRenderer(block: any) {
    switch (block.__component) {
      case "layout.hero-section":
        return <HeroSection key={block.id} data={block} />;
      case "layout.features-section":
        return <FeatureSection key={block.id} data={block} />;
      default:
        return null;
    }
  }

  // luego hacemos el llamado http 
  const strapi = await getHomePageData();

  console.log(strapi);

  // extraemos los blocks
  const { blocks } = strapi;

  // si no hay block retorna un mensaje
  if (!blocks) return <div>No blocks found</div>;
  // console.log(blocks);
  
  return (

    // en el main de la page principal hacemos un mapeo de los blocks por que siempre seran un arreglo 
    // y le pasamos el block a la funcion que distrubuye al componente que corresponda
    <main className="">{blocks.map((block: any) => blockRenderer(block))}</main>
  );
}
