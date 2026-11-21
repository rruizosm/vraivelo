import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { preloadPage } from './lib/pages'
import { langFromPath, stripLang } from './lib/lang'
import { changeLanguage } from './i18n'

const render = () =>
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>,
  )

// The language comes from the URL (/ca/..., /en/..., Spanish at the root). Its texts and the
// current page's code are downloaded first, so the prerendered HTML in #root is replaced by
// the finished page in one go (no blank frame, no flash of Spanish on a Catalan page).
const { pathname } = window.location
Promise.all([
  changeLanguage(langFromPath(pathname)).catch(() => {}),
  preloadPage(stripLang(pathname).replace(/(.)\/$/, '$1')),
]).then(render)
