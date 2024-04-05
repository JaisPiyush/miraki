import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ProfileStateContext } from "@/states/profile.state";
import { ProfileSpaceState, ProfileSpaceStateContext } from "@/states/profile_space.state";
import SpaceSelectionDialog from "./SpaceSelectionDialog";
import { observer } from "mobx-react-lite";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import mirakiLogoUrl from '/miraki.svg'


const SpaceTile = observer(({profileSpaceState}: {profileSpaceState: ProfileSpaceState}) => {
    return <div onClick={() => {profileSpaceState.setShowSpaceSelectionModal(true)}} 
    className="flex items-center border  py-2 px-4 rounded-md bg-secondary">
                <Avatar className="cursor-pointer">
                    <AvatarImage src={profileSpaceState.selectedSpace?.avatar || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="ml-3 text-sm font-semibold cursor-pointer">{profileSpaceState.selectedSpace?.name || ''}</p>
                <ChevronDownIcon className="w-4 h-4 ml-6" />
            </div>
})



export default function NavigationHeader() {

    const navigate = useNavigate()
    const profileState = useContext(ProfileStateContext);
    const profileSpaceState = useContext(ProfileSpaceStateContext);



    useEffect(() => {
        if(!profileState.isConnected){
            navigate('/login');
        }
        if (profileSpaceState.selectedSpace === undefined) {
            profileSpaceState.fetchProfileSpaces();
        }

    })

    return (
        <div className="w-full h-[10%] bg-background flex py-2 px-6 border border-t-0 border-r-0 border-l-0">
           <SpaceTile profileSpaceState={profileSpaceState} />
            <div className="ml-12 flex items-center justify-between">
            <Button variant="ghost"><Link to="/">Dashboard</Link></Button>
                <Button variant="ghost"><Link to="/spaces">Spaces</Link></Button>
                <Button variant="ghost"><Link className="ml" to="/apps">Apps</Link></Button>
            </div>
            <img src={mirakiLogoUrl} className="fixed top-1 left-1/2 transform -translate-x-1/2 w-16 h-16" />
            <SpaceSelectionDialog />
        </div>
    )
}