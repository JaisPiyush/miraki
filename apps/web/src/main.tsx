import React from 'react'
import ReactDOM from 'react-dom/client'
import { browserRouter } from './router'
import {RouterProvider} from "react-router-dom";
import './index.css'

import './index.css'
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'

import allConnections from './lib/connectors'

const connections: [Connector, Web3ReactHooks][] = allConnections.map(([connector, hooks]) => [connector, hooks])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connections}>
      <RouterProvider router={browserRouter} />
    </Web3ReactProvider>
  </React.StrictMode>,
)
