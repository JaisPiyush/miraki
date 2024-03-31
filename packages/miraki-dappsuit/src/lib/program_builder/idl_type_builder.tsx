import { Input, InputProps } from "@/components/ui/input";
import { BaseProgramBuilder, IdlBuildersWithChildren } from "./base_program_builder";
import { miraki_dappsuit } from "@/miraki_dappsuit";
import React, { FC, MutableRefObject, useEffect, useRef } from "react";
import {BN} from '@project-serum/anchor'
import {web3} from '@project-serum/anchor'
import {decode} from 'bs58';
import { Switch } from "@/components/ui/switch";
import { SwitchProps } from "@radix-ui/react-switch";



export class RequiredInputError extends Error {

}

export class MalformedInputValueError extends Error {}

export class IdlTypeInputBuilder<T = miraki_dappsuit.solana.IdlType, R = unknown>
    extends BaseProgramBuilder<T, InputProps, R> {

        protected inputRef?: React.MutableRefObject<string | number | undefined>
        
        static allowedIdlTypes: miraki_dappsuit.solana.IdlType[] = []

        context?: miraki_dappsuit.BuildContext<InputProps, R>


        transformContext(context: miraki_dappsuit.BuildContext<InputProps, R>){  
            context.props!.type = 'text'
            return context;
        }
    
        toComponent(context: miraki_dappsuit.BuildContext<InputProps, R>): FC {
            this.validateIDL(true);
            context.props = context.props || {required: true}
            context = this.transformContext(context);
            this.context = context;            
            return () => {
        
                useEffect(() => {
                    () => {
                        this.inputRef = undefined;
                    }
                })
                this.inputRef = useRef<string | number | undefined>(context.value as any);
                return <Input {...context.props} value={this.inputRef.current} 
                onChange={(val) => {
                    const value = val.target.value;
                    this.inputRef!.current = value
                }}
            />
            }
        }

        static isSuitableIdlBuilder(idl: unknown): boolean {
            return this.allowedIdlTypes.includes(idl as miraki_dappsuit.solana.IdlType)
        }

        static _fromRefToValue(val: unknown) {
            return val;
        }


        _toValue(): R {
            throw new Error('Method not implemented');
        }
        
        toValue(): R {
            if (this.inputRef === undefined) {
                throw new Error('component not mounted')
            }
            if (this.context && this.context.props && this.context.props.required === true && this.inputRef?.current === undefined || this.inputRef.current === '') {
                throw new RequiredInputError('Input is required');
            }
            return this._toValue();
        }
}

const _allowedIdlTypes: miraki_dappsuit.solana.IdlType[]  = [
    "u8",
    "i8",
    "u16",
    "i16",
    "u32",
    "i32",
    "f32",
    "u64",
    "i64",
    "f64",
    "u128",
    "i128",
] as const

export class NumberTypeBuilder extends
    IdlTypeInputBuilder<typeof _allowedIdlTypes[number], BN | undefined> {


    static allowedIdlTypes = _allowedIdlTypes

    static _fromRefToValue(val: unknown): BN {
        console.log(val)
        return new BN(val);
    }

    _toValue() {
        if (this.inputRef?.current === undefined) return;
        
        return NumberTypeBuilder._fromRefToValue(this.inputRef?.current)
    }

    transformContext(context: miraki_dappsuit.BuildContext<InputProps>): miraki_dappsuit.BuildContext<InputProps> {
        context.props!.type = 'number';
        return context;
    }


        
}

export class StringTypeBuilder extends
        IdlTypeInputBuilder<"string", string | undefined> {

    static allowedIdlTypes: miraki_dappsuit.solana.IdlType[] = [
        "string"
    ]

    constructor(idl?: any) {
        super("string")
    }
    

    _toValue(): string | undefined {
        if (this.inputRef?.current === undefined)
        return this.inputRef?.current;
    }
        
}

export class PublicKeyTypeBuilder extends
    IdlTypeInputBuilder<"publicKey", web3.PublicKey | undefined> {

    static allowedIdlTypes: miraki_dappsuit.solana.IdlType[] =[
        "publicKey"
    ]

    constructor(idl?: any) {
        super("publicKey")
    }

    static _fromRefToValue(val: unknown): web3.PublicKey {
        return new web3.PublicKey(val as string)
    }

    _toValue(): web3.PublicKey | undefined {
        if (this.inputRef?.current === undefined) return;
        return PublicKeyTypeBuilder._fromRefToValue(this.inputRef?.current)
    }
}

export class BytesTypeBuilder extends
    IdlTypeInputBuilder<"bytes", Uint8Array | undefined> {

    static allowedIdlTypes: miraki_dappsuit.solana.IdlType[] = ["bytes"]

    constructor() {
        super("bytes")
    }

    static _fromRefToValue(value: string): Uint8Array {
        if (value.startsWith('[')) {
            return Uint8Array.from(JSON.parse(value) as number[])
        }
        return decode(value);
    }

    _toValue(): Uint8Array | undefined {
        if (this.inputRef?.current === undefined) return;
        const value = (this.inputRef?.current || '') as string;
        return BytesTypeBuilder._fromRefToValue(value);

    }
}


export class BooleanTypeBuilder extends
    BaseProgramBuilder<"bool", SwitchProps, boolean | undefined> {

    protected inputRef?: MutableRefObject<boolean | undefined> | undefined;

    static allowedIdlTypes: miraki_dappsuit.solana.IdlType[] = ["bool"];

    static isSuitableIdlBuilder(idl: any): boolean {
        return this.allowedIdlTypes.includes(idl);
    }

    transformContext(context: miraki_dappsuit.BuildContext<SwitchProps>) {
        return context;
    }

    constructor(idl?: any) {
        super("bool");
    }


    toComponent(context: miraki_dappsuit.BuildContext<SwitchProps>): FC {
        this.validateIDL(true);
        context.props = context.props || {}
        context = this.transformContext(context);
        return () => {
            useEffect(() => {
                () => {
                    this.inputRef = undefined;
                }
            });
            this.inputRef = useRef<boolean>();
            return <Switch {...context.props} 
                checked={this.inputRef.current}
                onCheckedChange={(val) => {this.inputRef!.current = val}}
            />
        }
    }


    static _fromRefToValue(value: unknown): boolean | undefined {
        if (value === undefined) return;
        if (value === 'false') return false
        return Boolean(value);
    }


    toValue(): boolean | undefined {
        if (this.inputRef === undefined){
            throw new Error("component not mounted");
        }
        return BooleanTypeBuilder._fromRefToValue(this.inputRef?.current);
    }



}

type IdlTypesArrayOutput = BN[] | string[] | web3.PublicKey[];
type IdlTypeOutputTypes = BN | string | web3.PublicKey | IdlTypesArrayOutput;

export class IdlTypeOptionBuilder
    extends IdlBuildersWithChildren<
        miraki_dappsuit.solana.IdlTypeCOption | miraki_dappsuit.solana.IdlTypeOption,
        React.PropsWithChildren,
        IdlTypeOutputTypes | undefined
    > {

    childrenBuildersClass = [
        NumberTypeBuilder,
        StringTypeBuilder,
        PublicKeyTypeBuilder,
        BytesTypeBuilder,
        BooleanTypeBuilder,
        IdlTypeOptionBuilder,
        IdlTypeArrayBuilder
    ]

    static isSuitableIdlBuilder(idl: miraki_dappsuit.solana.IdlTypeCOption | miraki_dappsuit.solana.IdlTypeOption): boolean {
        return (idl as miraki_dappsuit.solana.IdlTypeOption).option !== undefined || (idl as miraki_dappsuit.solana.IdlTypeCOption).coption !== undefined;
    }

    transformContext(context: miraki_dappsuit.BuildContext<React.PropsWithChildren, IdlTypeOutputTypes | undefined>) {
        return context;
    }
    
    toComponent(context: miraki_dappsuit.BuildContext<React.PropsWithChildren, IdlTypeOutputTypes | undefined>): React.FC {
        this.validateIDL(true);
        context.props = context.props || {};
        context = this.transformContext(context);

        const optionIDL = (this.idl as any).coption !== undefined 
            ? (this.idl as miraki_dappsuit.solana.IdlTypeCOption).coption
            : (this.idl as miraki_dappsuit.solana.IdlTypeOption).option;
        // console.log(optionIDL)
        const childComponent = this.getChildBuilder(optionIDL);
        this.child = new childComponent(optionIDL);

        return this.child.toComponent(context);
    }

    toValue() {
        if (this.child === undefined) {
            throw new Error("no child value found")
        }

        try {
            const value =  this.child.toValue();
            if (this.child instanceof NumberTypeBuilder) {
                return Number.isNaN(value) ? undefined: value;
            }

            return value;
        } catch (e) {
            if ((e as any).message === 'Invalid public key input') {
                throw e;
            }
        }
    }


}


export class IdlTypeArrayBuilder extends
    IdlTypeInputBuilder<
        miraki_dappsuit.solana.IdlTypeArray
        | miraki_dappsuit.solana.IdlTypeVec,
        IdlTypesArrayOutput | undefined> {


        childTypes = [
            NumberTypeBuilder,
            StringTypeBuilder,
            BytesTypeBuilder,
            BooleanTypeBuilder,

        ]


        static isSuitableIdlBuilder(idl: any): boolean {
            return idl.vec !== undefined || (idl.array !== undefined && idl.array.length === 2);
        }

        getTypeAndSize(): [miraki_dappsuit.solana.IdlType, number | undefined] {
            return (this.idl as any).vec !== undefined
            ? [(this.idl as miraki_dappsuit.solana.IdlTypeVec).vec, undefined]
            : (this.idl as miraki_dappsuit.solana.IdlTypeArray).array
        }

        _toValue(): IdlTypesArrayOutput | undefined {
            if (this.inputRef?.current === undefined) return;
            const value = this.inputRef?.current as string;
            const [type, size] = this.getTypeAndSize();
            if (! (value.startsWith('[') && value.endsWith(']'))) {
                throw new MalformedInputValueError('array is not in correct format. must be contained ins []')
            }
            // Array within array is not supported
            const trimmedValue = value.trim().replace('[', '').replace(']', '');
            const valuesIter = trimmedValue.split(',');
            if (size !== undefined && valuesIter.length > size) {
                throw new MalformedInputValueError(`array should be of size ${size}`)
            }

            const childBuilders = this.childTypes.filter(c => c.isSuitableIdlBuilder(type));
            const childBuilder = childBuilders[0]
            const transformedValues = valuesIter.map(childBuilder._fromRefToValue)
            return transformedValues;

        }

}

// export class IdlTypeArrayBuilder
//     extends IdlBuildersWithChildren<
//         miraki_dappsuit.solana.IdlTypeArray 
//         | miraki_dappsuit.solana.IdlTypeVec,
//         React.PropsWithChildren,
//         IdlTypeOutputTypes | undefined
//     > {

//     childrenBuildersClass = [
//         NumberTypeBuilder,
//         StringTypeBuilder,
//         PublicKeyTypeBuilder,
//         BytesTypeBuilder,
//         BooleanTypeBuilder,
//         IdlTypeOptionBuilder,
//         IdlTypeArrayBuilder
//     ]

//     static isSuitableIdlBuilder(idl: any): boolean {
//         return idl.vec !== undefined || (idl.array !== undefined && idl.array.length === 2);
//     }

//     transformContext(context: miraki_dappsuit.BuildContext<React.PropsWithChildren, IdlTypeOutputTypes | undefined>) {
//         return context;
//     }


//     getTypeAndSize(): [miraki_dappsuit.solana.IdlType, number | undefined] {
//         return (this.idl as any).vec !== undefined
//         ? [(this.idl as miraki_dappsuit.solana.IdlTypeVec).vec, undefined]
//         : (this.idl as miraki_dappsuit.solana.IdlTypeArray).array
//     }
    
//     toComponent(context: miraki_dappsuit.BuildContext<React.PropsWithChildren, IdlTypeOutputTypes | undefined>): React.FC {
//         this.validateIDL(true);
//         context.props = context.props || {};
//         context = this.transformContext(context);

//         const [type, size] = this.getTypeAndSize();

//         const childComponent = this.getChildBuilder(type);
//         this.child = new childComponent(type);
//         return this.child.toComponent(context);
//     }

//     toValue() {
//         if (this.child === undefined) {
//             throw new Error("no child value found")
//         }

//         try {
//             const value =  this.child.toValue();
//             if (this.child instanceof NumberTypeBuilder) {
//                 return Number.isNaN(value) ? undefined: value;
//             }

//             return value;
//         } catch (e) {
//             if ((e as any).message === 'Invalid public key input') {
//                 throw e;
//             }
//         }
//     }


// }