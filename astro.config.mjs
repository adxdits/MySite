import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    devToolbar: {
        enabled: false
    },
    site: 'https://adxdits.github.io/MySite',
    base: '/MySite',
    integrations: [
        mdx(),
        sitemap(),
        tailwind({
            applyBaseStyles: false
        })
    ]
});
import { defineConfig } from 'astro/config';
