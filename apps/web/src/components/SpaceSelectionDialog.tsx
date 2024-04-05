import { useContext } from "react";
import { Dialog, DialogHeader, DialogContent } from "./ui/dialog";
import { ProfileSpaceStateContext } from "@/states/profile_space.state";
import SpaceListItem from "./SpaceListItem";
import { observer } from "mobx-react-lite";
import { ScrollArea } from "./ui/scroll-area";

function _SpaceSelectionDialog() {
    const profileSpaceState = useContext(ProfileSpaceStateContext);
    return <Dialog open={profileSpaceState.showSpaceSelectionModal} onOpenChange={(val) => {profileSpaceState.setShowSpaceSelectionModal(val)}}>
        <DialogContent>
            <DialogHeader>Select space</DialogHeader>
            <ScrollArea>
                <div className="w-full flex flex-col">
                    <ol className="w-full">
                        {profileSpaceState.profileSpaces.map((space) => <SpaceListItem space={space} key={space.id} onSelect={(space) => {
                            profileSpaceState.setSelectedSpace(space);
                        }} />)}
                    </ol>
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
}

const SpaceSelectionDialog = observer(_SpaceSelectionDialog);
export default SpaceSelectionDialog;