// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

import svgr from "vite-plugin-svgr";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  experimental: {
    svg: true,
  },
  vite: {
    plugins: [
      svgr({
        svgrOptions: {
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
              },
              {
                name: "removeTitle",
              },
              {
                name: "removeDesc",
              },
              {
                name: "cleanupIds",
              },
            ],
          },
        },
      }),
    ],
  },
});