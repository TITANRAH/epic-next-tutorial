import { HeroSectionProps } from "@/interfaces/hero.section.interface";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import qs from "qs";

export async function getStrapi() {
  const homePageQuery = qs.stringify(
    {
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
            populate: true
          }
        },
      },
    },
  }
);

  try {
    // una forma ->
    // const path = '/api/home-page'
    // const url = new URL(path,process.env.NEXT_PUBLIC_BACKEND_URL! )

    //  url.search = homePageQuery

    // console.log(url.href)

    // pero yo prefiero esto:

    console.log(
      `${getStrapiURL()}/api/home-page?${homePageQuery}`
    );

    const resp = await fetch(
      `${getStrapiURL()}/api/home-page?${homePageQuery}`,
      { cache: "no-store" }
    );
    const result = await resp.json();
    const flattenResp = flattenAttributes(result);

    console.log(result);
    console.log(flattenResp);

    return flattenResp;
  } catch (error) {
    console.error(error);
  }
}
