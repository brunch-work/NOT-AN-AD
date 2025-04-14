// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    experimental: {
        svg: true,
    },

    integrations: [sanity({
        projectId: '1mbwx7rb',
        dataset: 'production',
        useCdn: false, // `false` if you want to ensure fresh data
        token: process.env.SANITY_API_TOKEN, // Only if you want to use the token for authenticated requests
    }), react()],
});