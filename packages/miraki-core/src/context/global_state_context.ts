import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export class MirakiGlobalState {
    constructor() {
        makeAutoObservable(this);
    }
}


const MirakiGlobalStateContext = createContext<MirakiGlobalState>(new MirakiGlobalState());
export {MirakiGlobalStateContext};