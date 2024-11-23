// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://cesar-mejia-blog.vercel.app',
  integrations: [mdx(), sitemap()],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
})
