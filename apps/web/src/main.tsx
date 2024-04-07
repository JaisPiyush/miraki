import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App';
import { Axios } from 'axios';

declare global {
  interface Window {
    phantom?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      solana?: any
    },
    miraki?: {
      api?: Axios,
      spaceId?: number;
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
