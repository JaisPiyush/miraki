/* eslint-disable @typescript-eslint/no-unused-vars */
import { miraki_dappsuit } from "@/miraki_dappsuit";
import { FC } from "react";



export class BaseProgramBuilder<T = unknown, P = unknown, R = unknown> implements 
    miraki_dappsuit.IProgramBuilder<T, P, R> {


    readonly idl: T;

    constructor(idl: T) {
        this.idl = idl;
    }


    static isSuitableIdlBuilder(idl: unknown): boolean {
        throw new Error('Method not implemented')
    }


    toComponent(context: miraki_dappsuit.BuildContext<P>): FC {
        throw new Error("Method not implemented.");
    }
    validateIDL(raiseError: boolean): boolean {
        return true
    }
    validateInput(value: T, raiseError: boolean): boolean {
        return true
    }
    toValue(): R {
        throw new Error("Method not implemented.");
    }

}


export interface BaseProgramBuilderStaticInterface<T = any, P = any, R = any> {
    isSuitableIdlBuilder(idl: unknown): boolean;
    new (idl?: T): BaseProgramBuilder<T,P,R>;
}


export class IdlBuildersWithChildren<T = unknown, P = unknown, R = unknown>
    extends BaseProgramBuilder<T, P, R> {

    childrenBuildersClass: BaseProgramBuilderStaticInterface[] = [];
    child?: BaseProgramBuilder;

    getChildBuilder(idl: unknown) {
        for (const builder of this.childrenBuildersClass) {
            if (builder.isSuitableIdlBuilder(idl)) {
                return builder;
            }
        }
        throw new Error('no children builder found')
    }

}