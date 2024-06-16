
export interface ImageProps {
    id: number;
    url: string;
    alternativeText: string | null;
  }
  
  export interface LinkProps {
    id: number;
    url: string;
    text: string;
  }
  
  export interface HeroSectionProps {

    data: {

        id: number;
        __component: string;
        heading: string;
        subHeading: string;
        image: ImageProps;
        link: LinkProps;
    }
  }
