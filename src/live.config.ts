import { defineLiveCollection } from 'astro:content';
import allPages from '@queries/allPages';

const { CMS_URL } = import.meta.env

const livePages = defineLiveCollection({
  loader: {
    loadCollection: async ({ filter }) => {
      const response = await fetch(CMS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: allPages
          }),
        });
      const {data} = await response.json()
      return { entries: data.pages.nodes }
    },
    loadEntry: async ({ filter }) => {
      return {}
    }
  }
});


export const collections = { livePages };