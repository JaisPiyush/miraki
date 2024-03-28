import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ProfileStateContext } from "@/states/profile.state";



export default function NavigationHeader() {

    const navigate = useNavigate()
    const profileState = useContext(ProfileStateContext);

    useEffect(() => {
        if(!profileState.isConnected){
            navigate('/login');
        }
    })

    return (
        <div className="w-full h-[4rem] bg-white flex p-2">
            <div onClick={() => {navigate('/')}} className="flex items-center border border-gray-200 p-2 rounded-md bg-gray-100">
                <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="ml-3 text-sm font-semibold cursor-pointer">{profileState.publicKey}</p>
            </div>
            <div className="ml-12 flex items-center justify-between">
                <Button variant="ghost"><Link to="/spaces">Spaces</Link></Button>
                <Button variant="ghost"><Link className="ml" to="/apps">Apps</Link></Button>
            </div>
        </div>
    )
}