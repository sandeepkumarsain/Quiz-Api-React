import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Main from './component/Main'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
