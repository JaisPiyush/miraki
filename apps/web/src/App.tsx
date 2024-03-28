
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'

import { browserRouter } from './router'
import {RouterProvider} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster"



import allConnections from './lib/connectors'

const connections: [Connector, Web3ReactHooks][] = allConnections.map(([connector, hooks]) => [connector, hooks])


import './App.css'
import { WalletConnectorContext } from './context/wallet_context';
import { useState } from 'react';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any | undefined>(undefined)

  return (
    <div className='w-screen h-screen bg-zinc-200'>
      <Web3ReactProvider connectors={connections}>
        <WalletConnectorContext.Provider value={{
          isConnected: isConnected,
          address: address,
          provider: provider,
          setIsConnected,
          setAddress,
          setProvider  
        }}>
          <RouterProvider router={browserRouter} />
        </WalletConnectorContext.Provider>
        
        <Toaster />
    </Web3ReactProvider>
    </div>
  )
}

export default App
