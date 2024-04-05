import { DialogContent, DialogHeader } from "./ui/dialog";
import {MagnifyingGlassIcon} from '@radix-ui/react-icons'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import SearchResultSection from "./search_result_section";



export default function SearchDialogContent() {
    const [searchText, setSearchText] = useState('')

    const handleOnSearchClick = () => {

    }

    return <DialogContent className="w-full max-w-screen-md">
                <DialogHeader>
                    <div className="flex space-x-2 items-center max-w-screen-sm">
                        <Input 
                            value={searchText} 
                            onChange={(e) => {setSearchText(e.target.value)}} 
                            type="text" 
                            placeholder="Search" 
                        />
                        <Button variant="default" onClick={() => {handleOnSearchClick()}}>
                            <MagnifyingGlassIcon className="w-4 h-4" />
                        </Button>
                    </div> 
                </DialogHeader>
                <ScrollArea className="w-full h-[500px] mt-4 flex flex-col space-y-2">
                    <SearchResultSection resultNavigationTrace={['Personal workspace 1', 'Snapshot', 'Proposals']}></SearchResultSection>
                </ScrollArea>
            </DialogContent>
}