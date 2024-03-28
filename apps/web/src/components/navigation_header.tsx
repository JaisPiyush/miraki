import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WalletConnectorContext } from "@/context/wallet_context"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import CircularProgressIndicator from "./circular_progress_indicator";




export default function NavigationHeader() {
    const walletConnectorContext = useContext(WalletConnectorContext);
    
    const navigate = useNavigate()

    useEffect(() => {
        if(!walletConnectorContext.isConnected){
            navigate('/login');
        }
    })

    return (
        <div className="w-full h-[4rem] bg-white flex p-2">
            <div className="flex items-center border border-gray-200 p-2 rounded-md bg-gray-100">
                <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="ml-3 text-sm font-semibold cursor-pointer">{walletConnectorContext.address}</p>
            </div>
            <div className="ml-12 flex items-center justify-between">
                <Button variant="ghost"><Link to="/spaces">Spaces</Link></Button>
                <Button variant="ghost"><Link to="/spaces"><Link className="ml" to="/apps">Apps</Link></Link></Button>
            </div>
        </div>
    )
}