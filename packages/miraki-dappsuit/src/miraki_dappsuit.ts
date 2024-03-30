import React from "react";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace miraki_dappsuit {
    export namespace solana {
        export type IdlType =
                | "bool"
                | "u8"
                | "i8"
                | "u16"
                | "i16"
                | "u32"
                | "i32"
                | "f32"
                | "u64"
                | "i64"
                | "f64"
                | "u128"
                | "i128"
                | "bytes"
                | "string"
                | "publicKey"
                | IdlTypeDefined
                | IdlTypeOption
                | IdlTypeCOption
                | IdlTypeVec
                | IdlTypeArray;

        export type IdlTypeDefined = {
            defined: string;
        };

        export type IdlTypeOption = {
            option: IdlType;
        };

        export type IdlTypeCOption = {
            coption: IdlType;
        };

        export type IdlTypeVec = {
            vec: IdlType;
        };

        export type IdlTypeArray = {
            array: [idlType: IdlType, size: number];
        };

        export type IdlField = {
            name: string;
            docs?: string[];
            type: IdlType;
        };
        
        export type IdlEnumVariant = {
            name: string;
            fields?: IdlEnumFields;
        };
        
        export type IdlEnumFields = IdlEnumFieldsNamed | IdlEnumFieldsTuple;
        
        export type IdlEnumFieldsNamed = IdlField[];
        
        export type IdlEnumFieldsTuple = IdlType[];

        export type IdlTypeDef = {
            name: string;
            docs?: string[];
            type: IdlTypeDefTy;
        };
        
        export type IdlTypeDefTyStruct = {
            kind: "struct";
            fields: IdlTypeDefStruct;
        };
        
        export type IdlTypeDefTyEnum = {
            kind: "enum";
            variants: IdlEnumVariant[];
        };
        
        export type IdlTypeDefTy = IdlTypeDefTyEnum | IdlTypeDefTyStruct;
        
        export type IdlTypeDefStruct = Array<IdlField>;
        export type IdlConstant = {
            name: string;
            type: IdlType;
            value: string;
        };
        export type IdlAccountDef = {
            name: string;
            discriminator: number[];
            docs?: string[];
            type: IdlTypeDefTyStruct; // FIXME: add enum structs
            // FIXME: add account discriminator
        };
        /**
         * Errors produced by the program.
         */
        export type IdlErrorCode = {
            /**
             * Errors are identified by their code number.
             *
             * Errors may not be described twice in the IDL.
             */
            code: number;
            /**
             * Name of the Error
             *
             * Names may be overloaded.
             */
            name: string;
            /**
             * Message to be shown
             */
            msg?: string;
        };
        /**
         * Event information that should be indexed by the program
         */
        export type IdlEvent = {
            /**
             * Name of the Event being described.
             *
             * Names may be overloaded.
             *
             * Events are identified by their discriminator
             */
            name: string;
            discriminator: number[];
            fields: IdlEventField[];
        };
        
        export type IdlEventField = {
            name: string;
            type: IdlType;
            /**
             * If index is true, then this information should be saved
             */
            index: boolean;
        };

        export type IdlInstruction = {
            /**
             * Name of the instruction
             *
             * Names can be overloaded by having different instruction args
             */
            name: string;
            /**
             * Sighash discriminator of the isntruction
             */
            discriminator: number[];
            /**
             * Developer documentation for the instruction
             */
            docs?: string[];
            /**
             * Accounts required by the instruction execution
             */
            accounts: IdlAccountItem[];
            /**
             * Instruction arguments required for the instruction execution.
             *
             * Remaining bytes beyond what is specified in the InstructionArgs
             * may be used for other processing.
             */
            args: IdlField[];
            returns?: IdlType;
          };
          
          /**
           * This describes an Instruction Account, not a program-defined
           * account for parsing on-chain state.
           */
          export type IdlAccount = {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            docs?: string[];
            // FIXME: add documentation on what these do
            relations?: string[];
            pda?: IdlPda;
          };
          
          // A nested/recursive version of IdlAccount.
          export type IdlAccounts = {
            name: string;
            docs?: string[];
            accounts: IdlAccountItem[];
          };
          
          export type IdlAccountItem = IdlAccount | IdlAccounts;
          
          // FIXME: add documentation on what these do
          export type IdlPda = {
            seeds: IdlSeed[];
            programId?: IdlSeed;
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          export type IdlSeed = any; 
        /**
         * Metadata for IDL origination and program identification
         */
        export type IdlMetadata = {
            origin?: string;
            deployments?: IdlMetadataDeployments[];
        };
        
        /**
         * Information related to where the relevant program is
         */
        export type IdlMetadataDeployments = {
            chainId: string;
            address: string;
            slot?: number;
        };
        export type IdlState = {
            struct: IdlTypeDef;
            methods: IdlStateMethod[];
          };
          
        export type IdlStateMethod = IdlInstruction;
        /**
         * Describes how to construct instructions, interpret state
         * and index logged events for a program executing on the
         * Solana Virtual Machine (Sealevel runtime).
         *
         * Documentation for named types is provided in their files
         */
        export type Idl = {
            /**
             * Version of the contract
             */
            version: string;
            /**
             * Name of the program described by this IDL
             */
            name: string;
            /**
             * Developer docs for interacting with this program
             */
            docs?: string[];
            instructions: IdlInstruction[];
            state?: IdlState;
            accounts?: IdlAccountDef[];
            types?: IdlTypeDef[];
            events?: IdlEvent[];
            errors?: IdlErrorCode[];
            constants?: IdlConstant[];
            metadata?: IdlMetadata;
        };
    }

    export interface BuildContext<I = unknown, P = unknown> extends Record<string, unknown> {
        props?: React.PropsWithChildren<P>;
        idl: I
    }

    export interface IProgramBuilder<T = unknown, P = unknown> {
        toComponent(context: BuildContext<T,P>): React.ComponentClass;
        validateIDL(raiseError: boolean): boolean;
        validateInput(raiseError: boolean): boolean;
        toValue(): solana.IdlField | solana.IdlField[] | solana.IdlType | solana.IdlType[] | solana.IdlAccountItem
    }

}