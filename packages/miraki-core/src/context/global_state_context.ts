import { createContext, useContext } from "react";
import { action, makeAutoObservable, observable } from "mobx";

export class MirakiGlobalState {
    activeTreeLeafId?: string;

    constructor() {
        makeAutoObservable(this, {
            activeTreeLeafId: observable,
            setActiveTreeLeafId: action,
        });
    }

    setActiveTreeLeafId(id?: string) {
        this.activeTreeLeafId = id;
    }
}


const MirakiGlobalStateContext = createContext<MirakiGlobalState>(new MirakiGlobalState());
export {MirakiGlobalStateContext};
const useMirakiGlobalState  = () => {
    return useContext(MirakiGlobalStateContext);
}

export {useMirakiGlobalState};