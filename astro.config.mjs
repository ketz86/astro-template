// @ts-check
import { defineConfig } from 'astro/config';
import integr from './integr.js';

import vue from '@astrojs/vue';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

const { VITE_TARGET } = import.meta.env

// https://astro.build/config
export default defineConfig({
  integrations: [
    integr(),
    vue({ appEntrypoint: '/src/_app' }),
  ],

  trailingSlash: 'never',

  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  output: VITE_TARGET == 'preview' ? 'server' : 'static',

  ...(VITE_TARGET == 'preview' ? {
      adapter: netlify()
  } : {}),

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      preserveSymlinks: true
    }
  },
});