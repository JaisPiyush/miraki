import { InputProps } from "@/components/ui/input";
import { miraki_dappsuit } from "@/miraki_dappsuit";
import { SwitchProps } from "@radix-ui/react-switch";
import { IdlBuildersWithChildren } from "./base_program_builder";
import { IdlFieldBuilder } from "./idl_field_builder";
import { FC } from "react";
import { Program } from "@project-serum/anchor";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { IdlTypeBuilder } from "./idl_type_builder";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";

interface InstructionTypeBuilderProp {
    program?: Program
}

export class InstructionTypeBuilder extends
    IdlBuildersWithChildren<
        miraki_dappsuit.solana.IdlInstruction, 
        InputProps | SwitchProps> {
    
    childrenBuildersClass = [
        IdlFieldBuilder,
    ];

    args: IdlFieldBuilder[] = [];


    toComponent(context: miraki_dappsuit.BuildContext<InputProps | SwitchProps | InstructionTypeBuilderProp, unknown>): FC {
        this.args = (this.idl.args || []).map((arg) => new IdlFieldBuilder(arg))
        let returnRepr = ''
        if (this.idl.returns) {
            const returnType = new IdlTypeBuilder(this.idl.returns)
            returnType.toComponent({});
            returnRepr = `(${returnType.toRepr()})`
        }
        
        
        return () => {
            return <AccordionItem value={this.idl.name} className="border rounded-md px-4 bg-secondary max-w-screen-md">
                <AccordionTrigger>
                    <div className="w-full flex justify-between items-center pr-10">
                        <p>{this.idl.name} {returnRepr}</p>
                        <Button>Execute</Button>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-col">
                        <div className="w-full px-4 py-2 border border-green-400 rounded-md my-2 bg-green-100">
                            {(this.idl.docs || []).map(c => <p className="text-sm">{c}</p>)}
                            {/* <p className="text-sm">{(this.idl.docs || [])}</p> */}
                        </div>
                        {
                            this.args.map(arg => {
                                const ArgComponent = arg.toComponent(context as any);
                                return <ArgComponent key={uuidv4()} />
                            })
                        }
                    </div>
                </AccordionContent>
            </AccordionItem>
        }
    }

    toValue() {
        
    }
    
}