import CircularProgressIndicator from "@/components/circular_progress_indicator";
import NavigationHeader from "@/components/navigation_header";
import SpaceCard from "@/components/SpaceCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fetchAllSpaces } from "@/lib/api/space";
import { Space } from "@/lib/api/types";
import { ProfileSpaceStateContext } from "@/states/profile_space.state";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateSpaceDialogContent from "@/components/create_space_dialog_content";

function _SpaceView() {
    
    const profileSpaceState = useContext(ProfileSpaceStateContext)
    console.log('rebuilt', profileSpaceState.selectedSpace?.id)
    const {toast} = useToast()
    const [showLoading, setShowLoading] = useState(false);
    const [spaces, setSpaces] = useState<Space[]>([])
    const [showDialog, setShowDialog] = useState(false)

    const loadSpaces = async () => {
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
    }

    useEffect(() => {
        loadSpaces().then();
    }, [])

    const joinedSpaces = (profileSpaceState.profileSpaces || []).map(space => space.id)

    const handleOnCreateSpace = () => {
        setShowDialog(false);
        loadSpaces().then()
    }
    

    return (
        <div className="w-full h-full">
            <NavigationHeader />
            <div className="w-full h-[90%] bg-background flex flex-col items-center pt-4 space-y-4">
                <div className="w-[45%] py-2 flex justify-center">
                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                        <DialogTrigger>
                            <Button><PlusIcon className="w-4 h-4 mr-2" /> Space</Button>
                        </DialogTrigger>
                        <CreateSpaceDialogContent close={() => {setShowDialog(false)}} onCreate={handleOnCreateSpace} />
                    </Dialog>
                </div>
                <div className="w-[45%] h-auto grid grid-cols-4 gap-4 pt-10">
                    {
                        showLoading
                        ? <CircularProgressIndicator />
                        :spaces.map((space) => <SpaceCard space={space} key={space.id} hasJoinedSpace={joinedSpaces.includes(space.id)} onJoinClick={profileSpaceState.joinSpace}  />)
                    }
                </div>
            </div>
        </div>
    )
}

const SpaceView = observer(_SpaceView);
export default SpaceView;