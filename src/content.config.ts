import { defineCollection } from 'astro:content';
import allPages from '@queries/allPages';

const { CMS_URL } = import.meta.env

// example loaders
const pages = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: allPages
        }),
      });
    const {data} = await response.json()
    return data.pages.nodes.map(page => ({
      id: page.id,
      ...page
    }))
  }
});

export const collections = { pages };