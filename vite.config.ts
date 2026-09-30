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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), siteUrlMeta(env.VITE_SITE_URL)],
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
