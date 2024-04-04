/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useFilePicker } from 'use-file-picker';
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

interface IdlUploadDialogProps {
    onFilSelected?: (content: string) => Promise<void>;
    open?: boolean;
}


export default function IdlUploadDialog(props: IdlUploadDialogProps) {

    const [open, setOpen] = useState<boolean>(props.open || true)
    const {toast} = useToast()

    const {openFilePicker, loading} = useFilePicker({
        accept: '.json',
        onFilesSuccessfullySelected: async (data: any) => {
            if (props.onFilSelected) {
                try {
                    await props.onFilSelected(data.filesContent[0].content)
                } catch (e) {
                    toast({
                        title: 'Error while uploading your Idl',
                        description: (e as any).message
                    })
                }
            }
            setOpen(false);
        }
    })

    // TODO: Add api for idl upload (add error class to automatically contain response error from axios)
    // TODO: Add function for calling to add leaf
    // TODO: Add IdlMainBuilder for fetching the Idl and providing functions for updating and removing IDL
    // TODO: Finish plugin

    return <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger><Button variant="outline">Edit Profile</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Idl</DialogTitle>
                </DialogHeader>
                <div className="w-full flex justify-center py-2">
                    {
                        !loading
                        ? <Button variant={'outline'} onClick={() => openFilePicker()}>Select Idl</Button>
                        : <div className="w-full flex flex-col px-4 py-2 pt-4 items-center rounded-md space-y-2 border bg-green-100">
                            <Skeleton className="w-full h-[20px]" />
                            <p className="text-sm">Working on your file</p>
                        </div>
                    }
                </div>
            </DialogContent>
            <Toaster />
    </Dialog>
}