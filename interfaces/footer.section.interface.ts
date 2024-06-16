export interface SocialLink {
  id: number;
  text: string;
  url: string;
}

export interface FooterProps {
    id: number,
  logoText: {
    id: number;
    text: string;
    url: string;
  };
  text: string;
  socialLink: SocialLink[];
}
