import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import StoreProvider from '@/context/StoreProvider'
import { loadState } from '@/store/persistence'
import { applyTheme } from '@/theme/applyTheme'
import '@/styles/index.css'

const { settings } = loadState()
applyTheme(settings.theme, settings.custom)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
)