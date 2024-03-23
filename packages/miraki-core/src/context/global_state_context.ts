import { createContext, useContext } from "react";
import { action, makeAutoObservable, observable } from "mobx";

export class MirakiGlobalState {
    activeTreeItemId?: string;

    constructor() {
        makeAutoObservable(this, {
            activeTreeItemId: observable,
            setActiveTreeItemId: action,
        });
    }

    setActiveTreeItemId(id?: string) {
        this.activeTreeItemId = id;
    }
}


const MirakiGlobalStateContext = createContext<MirakiGlobalState>(new MirakiGlobalState());
export {MirakiGlobalStateContext};
const useMirakiGlobalState  = () => {
    return useContext(MirakiGlobalStateContext);
}

export {useMirakiGlobalState};