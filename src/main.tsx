import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const base = import.meta.env.BASE_URL
const basename = base.startsWith('/') ? base : undefined

// Restore the deep-linked path saved by public/404.html's redirect trick.
const redirect = new URLSearchParams(window.location.search).get('redirect')
if (redirect) {
  window.history.replaceState(null, '', base.replace(/\/$/, '') + redirect)
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
)
