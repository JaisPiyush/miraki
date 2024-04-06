import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { CreateSpace } from "@/lib/api/types";
import { createSpace } from "@/lib/api/space";

export default function CreateSpaceDialogContent(props: {close: () => void, onCreate: () => void}) {

    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [about, setAbout] = useState<string | null>(null);

    const handleCreateSpace = async () => {
        const space: CreateSpace = {
            name,
            private: isPrivate,
            about: about === null || about.length === 0? undefined:about
        }
        if (name.length === 0) return
        const res = await createSpace(space);
        props.onCreate();
    }

    return <DialogContent className="w-[400px]">
                <DialogHeader>
                    <DialogTitle>New Space</DialogTitle>
                </DialogHeader>
                <div className="w-full flex flex-col py-4 space-y-6">
                    <div className="w-full flex items-center justify-between">
                        <Label>Name</Label>
                        <Input type="text" 
                            className="w-[70%]" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}} 
                            required={true}
                        />
                    </div>
                    <div className="w-full flex items-center space-x-8">
                        <Label>Private Space</Label>
                        <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <Label>About</Label>
                        <Input type="text" 
                            className="w-[70%]" 
                            value={about} 
                            onChange={(e) => {setAbout(e.target.value)}} 
                        />
                    </div>
                    <Button onClick={() => {handleCreateSpace()}}>Continue</Button>
                </div>
    </DialogContent>
}