import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useToast } from "@/components/ui/use-toast"

import { useContext } from "react";
import { useNavigate } from "react-router-dom";


import {observer} from 'mobx-react-lite'
import { ProfileStateContext } from "@/states/profile.state";
import { ConnectionStatus } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import CircularProgressIndicator from "@/components/circular_progress_indicator";


const  LoginFormButton = observer((props: {connectionStatus: ConnectionStatus, onClick: () => void;}) => {

    if (props.connectionStatus === ConnectionStatus.Connected) {
        return <></>;
    } else if(props.connectionStatus === ConnectionStatus.Connecting) {
        return <Button variant="default" className="py-3 px-8">
            <CircularProgressIndicator />
        </Button>
    }
    return <Button variant="default" onClick={() => {props.onClick()}}>Connect wallet</Button>
})



function _LoginView() {

        const { toast } = useToast();
        const navigate = useNavigate();

        const profileState = useContext(ProfileStateContext);

        const handleOnConnectClick = async() => {
            try {
                await profileState.login();
                navigate('/')
            } catch(err) {
                toast({
                    title: err.message
                })
            }
        }
   
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
                                <LoginFormButton connectionStatus={profileState.connectionStatus} onClick={() => {
                                    handleOnConnectClick()
                                }} />
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
}

const LoginView = _LoginView
export default LoginView;