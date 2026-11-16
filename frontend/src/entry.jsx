import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { preloadPage } from './lib/pages'
import './i18n'

const render = () =>
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>,
  )

// Download the current page's code first, so the prerendered HTML in #root is replaced by
// the finished page in one go (no blank frame while the page file loads).
preloadPage(window.location.pathname.replace(/(.)\/$/, '$1')).then(render)
