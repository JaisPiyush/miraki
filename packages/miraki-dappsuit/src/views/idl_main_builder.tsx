/* eslint-disable @typescript-eslint/no-explicit-any */
import { IdlProgramTypeBuilder } from "@/components/program_builder/idl_program_builder";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { getSolanaIdlProgramById, SolanaProgramIdl } from "@/lib/api";
import { useEffect, useState } from "react";
import {CircleLoader} from 'react-spinners'

interface IdlMainBuilderProps {
    programId: number;
    appId: string;
}

export default function IdlMainBuilder(props: IdlMainBuilderProps) {
    const [showLoading, setShowLoading] = useState(false);
    const [program, setProgram] = useState<SolanaProgramIdl | undefined>();
    const {toast} = useToast()

    useEffect(() => {
        if (window.miraki?.api && window.miraki.spaceId) {
            setShowLoading(true)
            getSolanaIdlProgramById(window.miraki?.api, props.programId)
            .then((_program) => {
                setProgram(_program);
                setShowLoading(false)
            })
            .catch((e) => {
                toast({
                    title: 'Solana Program error',
                    description: (e as any).message
                })
            })
        }
    }, [props.programId, toast])

    if (showLoading &&  program === undefined) {
        return <div className="w-full h-full flex flex-col items-center justify-center">
            <CircleLoader />
        </div>
    } else if (program === undefined) {
        return <div className="w-full h-full"></div>
    }
    const idlProgramBuilder = new IdlProgramTypeBuilder(program);
    const IdlProgramBuilderComponent = idlProgramBuilder.toComponent({});
    return <>
            <IdlProgramBuilderComponent />
            <Toaster />
        </>
}