import { miraki_dappsuit } from "@/miraki_dappsuit";
import { ComponentClass } from "react";

export class NumberTypeBuilder implements 
    miraki_dappsuit.IProgramBuilder<miraki_dappsuit.solana.IdlType> {

    
    toComponent(context: miraki_dappsuit.BuildContext<miraki_dappsuit.solana.IdlType, unknown>): ComponentClass<{}, any> {
        throw new Error("Method not implemented.");
    }
    validateIDL(raiseError: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    validateInput(raiseError: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    toValue(): miraki_dappsuit.solana.IdlType | miraki_dappsuit.solana.IdlField | miraki_dappsuit.solana.IdlAccountItem | miraki_dappsuit.solana.IdlField[] | miraki_dappsuit.solana.IdlType[] {
        throw new Error("Method not implemented.");
    }
        
}