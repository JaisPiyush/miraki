import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { miraki } from "@/miraki"
import React, { useState } from "react"

interface MirakiSingleInputDialogProps {
    showInputModalArgs: miraki.MirakiSidebarTreeNodePlugin.showInputModalArgs;
}


export const MirakiSingleInputDialog: React.FC<MirakiSingleInputDialogProps> =
    (props: MirakiSingleInputDialogProps) => {

        const [open, setOpen] = useState(true);
        const [value, setValue] = useState(props.showInputModalArgs.value || '');

        const handleOnNextClick = () => {
            props.showInputModalArgs.onSubmit(value);
            handleClose();
        }

        const handleClose = () => {
            setOpen(false);
            // if (open && props.showInputModalArgs.onClose) {
            //     props.showInputModalArgs.onClose();
            // }
        }

        return <Dialog open={open} onOpenChange={() => {  
           handleClose();
            
        }} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.showInputModalArgs.title || ''}</DialogTitle>
                    <DialogDescription>{props.showInputModalArgs.description || ''}</DialogDescription>
                </DialogHeader>
                <div className="py-4 flex flex-col gap-4">
                    <Input value={value} 
                        type={props.showInputModalArgs.inputDecorators?.type}
                        placeholder={props.showInputModalArgs.inputDecorators?.placeholder || ''}
                        onChange={(e) => {setValue(e.target.value)}}

                    />
                </div>
                <DialogFooter>
                    <Button onClick={() => {handleOnNextClick()}} type="submit">{props.showInputModalArgs.modalDecorators?.nextButtonName || 'Next'}</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    }