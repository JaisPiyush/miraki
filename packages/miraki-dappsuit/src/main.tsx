import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Axios} from 'axios'

declare global {
  interface Window {
    miraki?: {
      api: Axios,
      spaceId: number
    }

  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
