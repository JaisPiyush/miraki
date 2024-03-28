import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ProfileStateContext } from "@/states/profile.state";
import { ProfileSpaceState, ProfileSpaceStateContext } from "@/states/profile_space.state";
import SpaceSelectionDialog from "./SpaceSelectionDialog";
import { observer } from "mobx-react-lite";
import { ChevronDownIcon } from "@radix-ui/react-icons";


const SpaceTile = observer(({profileSpaceState}: {profileSpaceState: ProfileSpaceState}) => {
    return <div onClick={() => {profileSpaceState.setShowSpaceSelectionModal(true)}} className="flex items-center border border-gray-200 py-2 px-4 rounded-md bg-gray-100">
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
        <div className="w-full h-[10%] bg-white flex py-2 px-6 border border-t-0 border-r-0 border-l-0 border-gray-200">
           <SpaceTile profileSpaceState={profileSpaceState} />
            <div className="ml-12 flex items-center justify-between">
            <Button variant="ghost"><Link to="/">Dashboard</Link></Button>
                <Button variant="ghost"><Link to="/spaces">Spaces</Link></Button>
                <Button variant="ghost"><Link className="ml" to="/apps">Apps</Link></Button>
            </div>
            <SpaceSelectionDialog />
        </div>
    )
}