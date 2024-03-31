import { miraki_dappsuit } from "@/miraki_dappsuit";
import { IdlBuildersWithChildren } from "./base_program_builder";
import { IdlTypeBuilder, RequiredInputError } from "./idl_type_builder";
import { FC } from "react";
import { InputProps } from "@/components/ui/input";
import { SwitchProps } from "@radix-ui/react-switch";
import { Label } from "@/components/ui/label";
import { web3 } from "@project-serum/anchor";


export class IdlFieldBuilder extends
    IdlBuildersWithChildren<miraki_dappsuit.solana.IdlField> {

        childrenBuildersClass = [
            IdlTypeBuilder
        ];

        static isSuitableIdlBuilder(idl: any): boolean {
            return idl.name !== undefined && idl.type !== undefined;
        }


        toComponent(context: miraki_dappsuit.BuildContext<InputProps | SwitchProps>): FC {
            this.validateIDL(true);
            const childClass = this.getChildBuilder(this.idl.type);
            this.child = new childClass(this.idl.type);
            const ChildComponent = this.child.toComponent(context);
            const dType = this.child.toRepr();
            return () => {
                return <div className="w-full flex items-center justify-between px-4 py-4 border bg-background">
                    <Label className="mr-4">{this.idl.name}({dType})</Label>
                    <ChildComponent />
                </div>
            }

        }

        toValue() {
            if (this.child === undefined) {
                throw new Error('child is not mounted.')
            }
            try {
                return this.child.toValue();
            } catch (e) {

                if (e instanceof RequiredInputError) {
                    //TODO: add error reporting 
                }
            }
        }
}


export class IdlAccountInputBuilder extends
    IdlBuildersWithChildren<
        miraki_dappsuit.solana.IdlAccountItem,
        InputProps,
        web3.PublicKey
    > {
    
    field?: IdlFieldBuilder;
    
    toComponent(context: miraki_dappsuit.BuildContext<InputProps, unknown>): FC {
        const fieldIdl: miraki_dappsuit.solana.IdlField = {
            name: this.idl.name,
            docs: this.idl.docs,
            type: 'publicKey'
        }
        this.field = new IdlFieldBuilder(fieldIdl)

    }

}