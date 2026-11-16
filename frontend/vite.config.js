import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Netlify applies public/_redirects in production; mirror its simple "from to 301" lines in
// `vite dev` so legacy image URLs (e.g. /giant/tcr/advanced_2.jpg) still resolve locally.
function netlifyRedirectsInDev() {
  return {
    name: 'netlify-redirects-dev',
    apply: 'serve',
    configureServer(server) {
      const file = path.resolve(__dirname, 'public/_redirects')
      if (!fs.existsSync(file)) return
      const map = new Map()
      for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
        const [from, to, status] = line.trim().split(/\s+/)
        if (from && to && !from.startsWith('#') && /^30[12]$/.test(status || '')) map.set(from, to)
      }
      server.middlewares.use((req, res, next) => {
        const to = map.get(decodeURIComponent((req.url || '').split('?')[0]))
        if (!to) return next()
        res.statusCode = 301
        res.setHeader('Location', to)
        res.end()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), netlifyRedirectsInDev()],
  build: {
    rollupOptions: {
      output: {
        // libraries change rarely: separate files the browser keeps cached across deploys.
        // Everything that needs React at load time stays in the 'react' file; splitting
        // react-i18next out made the two files load in the wrong order (blank page).
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|react-helmet-async|i18next|react-i18next|use-sync-external-store)[\\/]/.test(id)) return 'react'
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
          if (/[\\/]node_modules[\\/]@supabase[\\/]/.test(id)) return 'supabase'
          return undefined
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  }
})
