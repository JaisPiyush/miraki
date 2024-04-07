import {MagnifyingGlassIcon} from '@radix-ui/react-icons'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppRepository } from "@/lib/app_repository";
import SearchRenderer from "./search_renderer";
import { usePluginStore } from "react-pluggable";
import { Separator } from "./ui/separator";



export default function SearchView(props: {app: AppRepository}) {
    const [searchText, setSearchText] = useState('')
    const pluginStore = usePluginStore();

    const handleOnSearchClick = () => {
        if (searchText && searchText.length > 0) {
            pluginStore.executeFunction('MirakiSearchPlugin.search', searchText);
        }
    }

    return <div className="w-full h-full flex flex-col px-2">
                <div className="w-full flex py-4 px-4 justify-center">
                        <div className="w-full max-w-screen-lg flex items-center">
                                <Input 
                                    value={searchText} 
                                    onChange={(e) => {setSearchText(e.target.value)}} 
                                    type="text" 
                                    placeholder="Search"
                                    className="max-w-screen-md mr-4"
                                />
                                <Button variant="default" onClick={() => {handleOnSearchClick()}}>
                                    <MagnifyingGlassIcon className="w-4 h-4" />
                                </Button>
                    </div>
                </div>
                <Separator />
                <SearchRenderer app={props.app} />
            </div>
}