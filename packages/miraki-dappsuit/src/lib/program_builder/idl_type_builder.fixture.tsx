/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../index.css'
import { useState } from "react";
import { BooleanTypeBuilder, BytesTypeBuilder, IdlTypeArrayBuilder, IdlTypeOptionBuilder, NumberTypeBuilder, PublicKeyTypeBuilder } from "./idl_type_builder"
import { BaseProgramBuilder } from "./base_program_builder";

import { web3 } from "@project-serum/anchor";
import { Button } from '@/components/ui/button';

function BuilderPreviewer(props: {builder: BaseProgramBuilder, func: (val: any) => any}) {
    const [state, setState] = useState<any>()
    const BuilderComponent = props.builder.toComponent({});
    const handleClick = () => {
        const value = props.func(props.builder.toValue());
        console.log(value)
        setState(value)
    }

    return <div className='flex flex-col p-4 w-[400px] h-[400px] justify-between'>
            <BuilderComponent />
            <Button variant={"default"} onClick={() => {handleClick()}}>Click</Button>
            <p>{state}</p>
    </div>
}

export default {
    'NumberTypeBuilder': () => {
        const numberTypeBuilder = new NumberTypeBuilder('i16');
        return <BuilderPreviewer builder={numberTypeBuilder} func={(val) => Number(val).toString()} />
    },

    'PublicKeyBuilder': () => {
        const publicKeyBuilder = new PublicKeyTypeBuilder();
        return <BuilderPreviewer builder={publicKeyBuilder} func={(val: web3.PublicKey) => val.toBase58()} />
    },

    'BytesTypeBuilder': () => {
        const bytesTypeBuilder = new BytesTypeBuilder();
        return <BuilderPreviewer builder={bytesTypeBuilder} func={(val: Uint8Array) => val.toString()} />
    },
    'BooleanTypeBuilder': () => {
        const booleanTypeBuilder = new BooleanTypeBuilder();
        return <BuilderPreviewer
                    builder={booleanTypeBuilder}
                    func={(val: boolean) => val ? 'true': 'false'}
                />
    },
    'IdlTypeOptionBuilder': () => {
        const booleanTypeBuilder = new IdlTypeOptionBuilder({
            option: 'bool'
        });
        return <BuilderPreviewer
                    builder={booleanTypeBuilder}
                    func={(val: boolean) => val ? 'true': 'false'}
                />
    },
    'IdlTypeArrayBuilder': () => {
        const booleanTypeBuilder = new IdlTypeArrayBuilder({
            vec: 'string'
        });
        return <BuilderPreviewer
                    builder={booleanTypeBuilder}
                    func={(val: number[]) => val.toString()}
                />
    }
}