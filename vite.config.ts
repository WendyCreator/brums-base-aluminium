import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Injects canonical + og:url only when VITE_SITE_URL is set, so a build
 * never ships a canonical pointing at the wrong domain.
 */
function siteUrlMeta(siteUrl: string | undefined): Plugin {
  return {
    name: 'site-url-meta',
    transformIndexHtml(html) {
      if (!siteUrl) return html
      const url = siteUrl.replace(/\/$/, '')
      const tags = [
        `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:url" content="${url}/" />`,
      ].join('\n    ')
      return html
        .replace('</head>', `    ${tags}\n  </head>`)
        .replace(/content="\/og\.jpg"/g, `content="${url}/og.jpg"`)
    },
  }
}

/**
 * Emits robots.txt always, and sitemap.xml only when VITE_SITE_URL is set
 * (a sitemap needs absolute URLs, and we never guess the domain).
 * Project detail pages are left out while their content is placeholder.
 */
function seoFiles(siteUrl: string | undefined): Plugin {
  const routes = ['/', '/about', '/solutions', '/projects', '/contact']
  return {
    name: 'seo-files',
    generateBundle() {
      const url = siteUrl?.replace(/\/$/, '')
      const robotsLines = ['User-agent: *', 'Allow: /']
      if (url) robotsLines.push('', `Sitemap: ${url}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsLines.join('\n') + '\n' })

      if (!url) return
      const today = new Date().toISOString().slice(0, 10)
      const entries = routes.map((r) => `  <url><loc>${url}${r}</loc><lastmod>${today}</lastmod></url>`)
      const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...entries, '</urlset>', ''].join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), siteUrlMeta(env.VITE_SITE_URL), seoFiles(env.VITE_SITE_URL)],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-')) return 'motion'
            if (id.includes('node_modules/react')) return 'react'
          },
        },
      },
    },
  }
})
