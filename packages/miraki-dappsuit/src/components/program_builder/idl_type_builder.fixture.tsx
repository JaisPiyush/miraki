/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '../../index.css'
import { useState } from "react";
import { BooleanTypeBuilder, BytesTypeBuilder, IdlTypeArrayBuilder, IdlTypeOptionBuilder, NumberTypeBuilder, PublicKeyTypeBuilder } from "./idl_type_builder"
import { BaseProgramBuilder } from "./base_program_builder";

import { web3 } from "@project-serum/anchor";
import { Button } from '@/components/ui/button';
import { IdlFieldBuilder } from './idl_field_builder';
import { InstructionTypeBuilder } from './idl_instruction_builder';
import { Accordion } from '@/components/ui/accordion';
import * as idl from './idl.json'
import { IdlProgramTypeBuilder } from './idl_program_builder';

function BuilderPreviewer(props: {builder: BaseProgramBuilder, func: (val: any) => any}) {
    const [state, setState] = useState<any>()
    const BuilderComponent = props.builder.toComponent({});
    const handleClick = () => {
        const value = props.func(props.builder.toValue());
        console.log(value)
        setState(value)
    }

    return <div className='flex flex-col p-4 w-[600px] h-[400px] justify-between'>
            <BuilderComponent />
            <Button variant={"default"} onClick={() => {handleClick()}}>Click</Button>
            <p>{state}</p>
    </div>
}

const instructions = [
    {
        "name": "createXnft",
        "discriminator": [232, 16, 8, 240, 20, 109, 214, 66],
        "docs": [
          "Creates all parts of an xNFT instance.",
          "",
          "* Master mint (supply 1).",
          "* Master token.",
          "* Master metadata PDA associated with the master mint.",
          "* Master edition PDA associated with the master mint.",
          "* xNFT PDA associated with the master edition.",
          "",
          "Once this is invoked, an xNFT exists and can be \"installed\" by users."
        ],
        "accounts": [
          {
            "name": "masterMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "masterToken",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "masterMetadata",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "masterEdition",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "xnft",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "payer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "publisher",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "metadataProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "bool"
          },
          {
            "name": "curator",
            "type": {
              "option": "publicKey"
            }
          },
        ],
        "returns": "bool"
      }
]

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
    },
    'IdlFieldBuilder': () => {
        const booleanTypeBuilder = new IdlFieldBuilder({
            name: 'frozenName',
            docs: ['Name for forzen account'],
            type: {
                vec: 'u128'
            }
        });
        return <BuilderPreviewer
                    builder={booleanTypeBuilder}
                    func={(val: number[]) => val.toString()}
                />
    },
    'IdlInstructions': () => {
        const idlInstructionBuilder = new InstructionTypeBuilder(instructions[0] as any)
        const InstructionComponent = idlInstructionBuilder.toComponent({});
        return <Accordion type='single' collapsible className="w-full px-4">
                <InstructionComponent />
        </Accordion>
    },
    'IdlProgramBuilder': () => {
      const idlProgramBuilder = new IdlProgramTypeBuilder(idl as any);
      const ProgramBuilder = idlProgramBuilder.toComponent({})
      return <ProgramBuilder />
    }
}