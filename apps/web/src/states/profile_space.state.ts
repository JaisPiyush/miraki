import { fetchProfileSpaces, getSpaceIdFromStorage, joinSpace, storeSpaceInStorage } from "@/lib/api/space";
import { Space } from "@/lib/api/types";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class ProfileSpaceState {
    selectedSpace?: Space;
    profileSpaces: Space[] = [];
    showSpaceSelectionModal: boolean = false;

    constructor(){
        makeAutoObservable(this);
    }

    setSelectedSpace(space: Space){
        this.selectedSpace = space;
        storeSpaceInStorage(space.id)
        this.showSpaceSelectionModal = false;
    }

    setProfileSpaces(spaces: Space[]) {
        this.profileSpaces = spaces;
    }

    setShowSpaceSelectionModal(val: boolean) {
        this.showSpaceSelectionModal = val;
    }

    async fetchProfileSpaces() {
        const spaces = await fetchProfileSpaces();
        this.profileSpaces = spaces;
        if (this.profileSpaces.length === 1) {
            this.selectedSpace = spaces[0];
        } else if (getSpaceIdFromStorage() !== null) {
            const spaceId = getSpaceIdFromStorage();
            const filtered = spaces.filter((space) => space.id === spaceId);
            if (filtered.length === 0) {
                this.showSpaceSelectionModal = true;
            }
            this.selectedSpace = filtered[0];
        } else {
            this.showSpaceSelectionModal = true;
        }
    }

    get getProfileSpaceIdMap(): Record<number, Space> {
        const spaceMap = {} as Record<number, Space>;
        for (const space of this.profileSpaces) {
            spaceMap[space.id] = space;
        }
        return spaceMap;
    }

    async joinSpace(spaceId: number) {
        const space = await joinSpace(spaceId);
        this.profileSpaces.push({...space});
    }
}

export const ProfileSpaceStateContext = createContext<ProfileSpaceState>(new ProfileSpaceState())