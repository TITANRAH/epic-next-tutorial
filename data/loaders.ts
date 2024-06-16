import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";


// esta funcion dice que si no hay variable de entorno sera el localhost de strapi
// lo que vendra muy bien cuando se pase la variable al servidor
const baseUrl = getStrapiURL();

// esta funcion realiza el fetech por dentro
async function fetchData(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    // el fetch si tiene token ira con los headers si no sera un obkjeto vacio
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();

    // esta funciin aplana la data evitando el anidamiento
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

// essta funcion finalmente devuelve el fetch de arriba que pide el parametro de la url a la cual apuntara
export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);

  //   qs toma este objeto y lo pasa al tipo de quyery que usa strapi con [] y demases
  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });

  //   finalmente esta funcion retorna el fetch de arriba que pide la url a la cual apuntar
  return await fetchData(url.href);
}

export async function getGlobalPageData() {
  noStore();

  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url.href);
}
