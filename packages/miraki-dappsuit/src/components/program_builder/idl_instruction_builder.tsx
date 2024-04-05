/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps } from "@/components/ui/input";
import { miraki_dappsuit } from "@/miraki_dappsuit";
import { SwitchProps } from "@radix-ui/react-switch";
import { IdlBuildersWithChildren } from "./base_program_builder";
import { IdlAccountInputBuilder, IdlFieldBuilder } from "./idl_field_builder";
import { FC } from "react";
import { Program } from "@project-serum/anchor";
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
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
    accounts: IdlAccountInputBuilder[] = [];


    toComponent(context: miraki_dappsuit.BuildContext<InputProps | SwitchProps | InstructionTypeBuilderProp, unknown>): FC {
        this.args = (this.idl.args || []).map((arg) => new IdlFieldBuilder(arg))
        this.accounts = (this.idl.accounts || []).map(arg => new IdlAccountInputBuilder(arg));
        let returnRepr = ''
        if (this.idl.returns) {
            const returnType = new IdlTypeBuilder(this.idl.returns)
            returnType.toComponent({});
            returnRepr = `(${returnType.toRepr()})`
        }

        
        
        return () => {
            return <AccordionItem value={this.idl.name} className="border dark:border-background rounded-md px-4 bg-secondary dark:bg-background max-w-screen-lg my-1">
                <AccordionTrigger>
                    <p>{this.idl.name} {returnRepr}</p>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-col">
                        <div className="w-full px-4 py-2 border border-green-400 dark:border-green-600 rounded-md my-2 bg-green-100 dark:bg-green-500">
                            {(this.idl.docs || []).map(c => <p key={uuidv4()} className="text-sm">{c}</p>)}
                            {/* <p className="text-sm">{(this.idl.docs || [])}</p> */}
                        </div>
                        {
                            this.args.map(arg => {
                                const ArgComponent = arg.toComponent(context as any);
                                return <ArgComponent key={uuidv4()} />
                            })
                        }
                        <div className="w-full mt-2 flex flex-col">
                            <Accordion type="single"  className="w-full border rounded-md bg-background">
                                <AccordionTrigger className="px-4">
                                    Accounts
                                </AccordionTrigger>
                                <AccordionContent className="w-full flex flex-col">
                                    {
                                        this.accounts.map(arg => {
                                            const AccountComponent = arg.toComponent({});
                                            return <AccountComponent key={uuidv4()} />
                                        })
                                    }
                                </AccordionContent>
                            </Accordion>
                        </div>
                        <div className="w-full flex flex-row-reverse justify-between items-center px-6 py-6">
                            <Button onClick={() => {console.log('h')}}>Execute</Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        }
    }

    toValue() {
        
    }
    
}