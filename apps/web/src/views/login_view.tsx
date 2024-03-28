import CircularProgressIndicator from "@/components/circular_progress_indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useToast } from "@/components/ui/use-toast"
import { WalletConnectorContext } from "@/context/wallet_context";
import { login } from "@/lib/api/auth";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {encode} from 'base58-universal';


enum ConnectionState {
    Connected,
    Disconnected,
    Connecting
}

export default function LoginView() {

        const { toast } = useToast();
        const navigate = useNavigate();


        

        const isPhantomInstalled = window.phantom?.solana?.isPhantom;
        const walletConnector = useContext(WalletConnectorContext);

        const [connectionState, setConnectionState] = useState(walletConnector.isConnected ? ConnectionState.Connected: ConnectionState.Disconnected);

        const getProvider = () => {
            if (isPhantomInstalled) {
                if (walletConnector.isConnected) {
                    return walletConnector.provider;
                }
                return window.phantom?.solana;
                
            }
        }

        const handleConnection = useCallback(async () => {
            const provider = getProvider();
            setConnectionState(ConnectionState.Connecting);
            if (!walletConnector.isConnected) {
                try {
                    const resp = await provider.connect();
                    walletConnector.setIsConnected(true);
                    walletConnector.setProvider(provider);
                    const address = resp.publicKey.toString()
                    walletConnector.setAddress(address);
                    const message = `Signing with address ${address} on timestamp ${Date.now()}`;
                    const encodedMessage = new TextEncoder().encode(message);
                    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
                    await login(address, message, encode(signedMessage.signature));
                    setConnectionState(ConnectionState.Connected);
                    navigate('/')


                }catch (e) {
                    walletConnector.setIsConnected(false);
                    walletConnector.setProvider(undefined);
                    walletConnector.setAddress(undefined);
                    setConnectionState(ConnectionState.Disconnected);
                    toast({
                        title: e.message
                    })
                }
            }
        }, [walletConnector, navigate, toast, login])

        


        useEffect(() => {
            if (!isPhantomInstalled) {
                toast({
                    title: 'Phantom is not installed'
                })
            } else {
                handleConnection();
            }
        }, [isPhantomInstalled, toast, handleConnection]);



   
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Login using your phantom wallet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full flex justify-center">
                            {
                                connectionState === ConnectionState.Disconnected
                                ? <Button variant="default" onClick={() => {handleConnection()}}>Connect wallet</Button>
                                : connectionState === ConnectionState.Connecting ?
                                     <Button variant="default" className="py-2 px-6"><CircularProgressIndicator /></Button>
                                     :  <></>
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
}