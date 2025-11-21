// @ts-check
import { defineConfig } from "astro/config";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

import svgr from "vite-plugin-svgr";

import node from "@astrojs/node";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
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

  adapter: netlify(),

  integrations: [react()],
});