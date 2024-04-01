/* eslint-disable @typescript-eslint/no-explicit-any */
import { miraki_dappsuit } from "@/miraki_dappsuit";
import { BaseProgramBuilder } from "./base_program_builder";
import { FC } from "react";
import { Program } from "@project-serum/anchor";
import { InputProps } from "../ui/input";
import { SwitchProps } from "@radix-ui/react-switch";
import { InstructionTypeBuilder } from "./idl_instruction_builder";
import { v4 as uuidv4 } from 'uuid';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { IdlTypeBuilder } from "./idl_type_builder";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";



interface IdlProgramTypeBuilderProps {
    program?: Program
}


function Events(props: {events: miraki_dappsuit.solana.IdlEvent[]}) {
    return <div className="w-full max-w-screen-lg mt-2 bg-zinc-50 px-4 border pb-4 rounded-md">
        <Collapsible className="w-full">
            <div className="w-full py-2 flex justify-between items-center">
                <p className="text-lg font-semibold">Events</p>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <ChevronDownIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <Accordion type="multiple" className="w-full px-4 py-2 space-y-2">
                    {
                        (props.events).map(event => {
                            return <AccordionItem value={event.name} className="bg-background border px-2 py-2 rounded-md">
                                <AccordionTrigger>{event.name}</AccordionTrigger>
                                <AccordionContent>
                                    <Table className="w-full border px-2 py-2 rounded-md">
                                        <TableHeader className="bg-secondary">
                                            <TableHead>Name</TableHead>
                                            <TableHead>Indexed</TableHead>
                                            <TableHead>Type</TableHead>
                                        </TableHeader>
                                        
                                        <TableBody>
                                            {event.fields.map((field) => {
                                                const idlTypeBuilder = new IdlTypeBuilder(field.type);
                                                idlTypeBuilder.toComponent({})
                                                const repr = idlTypeBuilder.toRepr()
                                                return <TableRow key={uuidv4()}>
                                                    <TableCell>{field.name}</TableCell>
                                                    <TableCell>{field.index ? 'true' : 'false'}</TableCell>
                                                    <TableCell>{repr}</TableCell>
                                                </TableRow>
                                            
                                            })}
                                        </TableBody>

                                    </Table>
                                </AccordionContent>
                            </AccordionItem>
                        })
                    }
                </Accordion>
            </CollapsibleContent>
        </Collapsible>
    </div>
}

function ErrorTable(props: {errors: miraki_dappsuit.solana.IdlErrorCode[]}) {
    return <div className="w-full max-w-screen-lg mt-2 bg-zinc-50 px-4 border pb-4 rounded-md">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="errors">
                        <AccordionTrigger><p className="text-lg font-semibold">Errors</p></AccordionTrigger>
                        <AccordionContent>
                                <Table className="border rounded-md">
                                <TableHeader className="border border-t-0 border-l-0 border-r-0 bg-secondary">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Message</TableHead>
                                </TableHeader>
                                <TableBody>
                                    {
                                        props.errors.map(error => {
                                            return <TableRow key={error.code}>
                                                <TableCell>{error.name}</TableCell>
                                                <TableCell>{error.code}</TableCell>                                    
                                                <TableCell>{error.msg}</TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
}

export class IdlProgramTypeBuilder extends
    BaseProgramBuilder< 
        miraki_dappsuit.solana.Idl,
        InputProps | SwitchProps | IdlProgramTypeBuilderProps
        > {
    
    instructions: InstructionTypeBuilder[] = [];        

    toComponent(context: miraki_dappsuit.BuildContext<InputProps | SwitchProps | IdlProgramTypeBuilderProps, undefined>): FC {
        
        this.instructions = this.idl.instructions.map(inst => new InstructionTypeBuilder(inst));
        
        const constants = (this.idl.constants || []).map((constant) => {
            const builder = new IdlTypeBuilder(constant.type)
            builder.toComponent({})
            const rep = builder.toRepr();
            console.log(rep)
            return [constant.name, rep , constant.value]
        })

        return () => {
            return <div className="w-full h-full flex flex-col">
                <div className="w-full flex justify-center border border-t-0 border-r-0 border-l-0">
                    <div className="w-full py-4 px-4 max-w-screen-lg">
                        <p className="font-semibold text-lg">{this.idl.name} (version {this.idl.version})</p>
                    </div>
                </div>
                <div className="w-full flex flex-col py-4 px-4 pb-10 items-center">
                    <div className="w-full p-4 border border-blue-500 rounded-lg bg-blue-100 max-w-screen-lg">
                        {
                            (this.idl.docs || [])
                            .map(doc => <p className="text-md font-normal" key={uuidv4()}>{doc}</p>)
                        }
                    </div>
                    <div className="w-full max-w-screen-lg mt-2 bg-zinc-50 px-4 border pb-4 rounded-md">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value='constants'>
                            <AccordionTrigger><p className="text-lg font-semibold">Constants</p></AccordionTrigger>
                                <AccordionContent>
                                    <Table className="border rounded-md">
                                        <TableHeader className="border border-t-0 border-l-0 border-r-0 bg-secondary">
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Value</TableHead>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                constants.map(constant => {
                                                    return <TableRow key={constant[0]}>
                                                        <TableCell>{constant[0]}</TableCell>
                                                        <TableCell>{constant[1]}</TableCell>
                                                        <TableCell>{constant[2]}</TableCell>
                                                    </TableRow>
                                                })
                                            }
                                        </TableBody>
                                </Table>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <Events events={this.idl.events || []} />
                    <ErrorTable errors={this.idl.errors || []} />
                    <div className="w-full max-w-screen-lg mt-4 rounded-md bg-zinc-50 px-4 pb-4 border">
                        <div className="w-full py-2">
                            <p className="text-lg font-semibold">Instructions</p>
                        </div>
                        <Accordion type='single' collapsible className="w-full">
                            {
                                this.instructions.map(instruction => {
                                    const InstructionBuilder = instruction.toComponent(context as any)
                                    return <InstructionBuilder key={uuidv4()} />
                                })
                            }
                        </Accordion>
                    </div>
                </div>
            </div>
        }
    }

}