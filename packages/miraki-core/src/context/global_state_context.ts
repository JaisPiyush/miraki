import { createContext, useContext } from "react";
import { makeAutoObservable } from "mobx";
import {Axios} from 'axios'

export class MirakiGlobalState {
    activeTreeLeafId?: string;
    api?: Axios;
    spaceId?: number;

    constructor(data?: {api?: Axios, spaceId?: number}) {
        makeAutoObservable(this);
        this.api = data?.api;
        this.spaceId = data?.spaceId;
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