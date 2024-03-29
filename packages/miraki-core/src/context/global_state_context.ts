import { createContext, useContext } from "react";
import { action, makeAutoObservable, observable } from "mobx";
import {Axios} from 'axios'

export class MirakiGlobalState {
    activeTreeLeafId?: string;
    api?: Axios;

    constructor(data?: {api?: Axios}) {
        this.api = data?.api;
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