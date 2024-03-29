import CircularProgressIndicator from "@/components/circular_progress_indicator";
import NavigationHeader from "@/components/navigation_header";
import SpaceCard from "@/components/SpaceCard";
import { useToast } from "@/components/ui/use-toast";
import { fetchAllSpaces } from "@/lib/api/space";
import { Space } from "@/lib/api/types";
import { ProfileSpaceStateContext } from "@/states/profile_space.state";
import { useContext, useEffect, useState } from "react";

export default function SpaceView() {
    const profileSpaceState = useContext(ProfileSpaceStateContext)
    const {toast} = useToast()
    const [showLoading, setShowLoading] = useState(false);
    const [spaces, setSpaces] = useState<Space[]>([])

    useEffect(() => {
        setShowLoading(true)
        fetchAllSpaces()
        .then((spaces) => {
            setSpaces([...spaces])
            setShowLoading(false)
        })
        .catch((err) => {
            toast({
                title: err.response.data.detail
            });
            setShowLoading(false)
        })
    }, [])



    return (
        <div className="w-full h-full">
            <NavigationHeader />
            <div className="w-full h-[90%] bg-background flex justify-center pt-10">
                <div className="w-[45%] h-auto grid grid-cols-4 gap-4">
                    {
                        showLoading
                        ? <CircularProgressIndicator />
                        :spaces.map((space) => <SpaceCard space={space} hasJoinedSpace={false} onJoinClick={profileSpaceState.joinSpace}  />)
                    }
                </div>
            </div>
        </div>
    )
}