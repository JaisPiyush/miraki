import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App';

declare global {
  interface Window {
    phantom?: {
      solana?: any
    }
  }
}

function Main() {
  return (
    <>
      <App />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
