import { atom } from 'nanostores';

interface OpenGraphBasic {
  title: string,
  description: string,
  type: string,
  siteName: string,
  image: string
}

interface OpenGraphImage {
  width: string,
  height: string,
  type: string,
}

interface OpenGraph {
  basic?: OpenGraphBasic,
  image?: OpenGraphImage
}
export interface seoDataValue {
  title?: string,
  description?: string,
  links?: any | [], 
  languageAlternates?: object,
  canonical?: string,
  openGraph?: OpenGraph,
  extend?: object,
  noindex?: boolean,
  nofollow?: boolean
}

export const seoData = atom<seoDataValue>({});

export const getSeoData = (seo: any = {}) => {
  const data = {
    title: seo?.title || "Sitename",
    description: seo?.description,
    openGraph: {
      basic: {
        title: seo?.ogTitle || "Sitename",
        description: seo?.ogDescription,
        type: seo?.ogType,
        siteName: seo?.ogSiteName || "Sitename",
        image: seo?.ogImage?.sourceUrl,
      },
      image: {
        width: seo?.ogImage?.mediaDetails.width,
        height: seo?.ogImage?.mediaDetails.height,
        type: seo?.ogImage?.mimeType,
      },
    },
  };

  if (
    !data.openGraph.basic.title ||
    !data.openGraph.basic.type ||
    !data.openGraph.basic.image
  ) {
    delete data.openGraph;
  }

  return data
}