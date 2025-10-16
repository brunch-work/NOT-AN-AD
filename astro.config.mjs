// @ts-check
import { defineConfig } from "astro/config";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

import svgr from "vite-plugin-svgr";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
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

  adapter: node({
    mode: "standalone",
  }),
});
