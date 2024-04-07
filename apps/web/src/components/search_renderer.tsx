import { AppRepository } from "@/lib/app_repository";
import { ProfileSpaceStateContext } from "@/states/profile_space.state";
import { ComponentUpdatedEvent, useForceUpdate } from "@miraki/miraki-core";
import React, { useEffect, useContext } from "react";
import { usePluginStore } from "react-pluggable";
import SearchResultSection from "./search_result_section";
import {CircleLoader} from 'react-spinners'
import { ScrollArea } from "./ui/scroll-area";

interface SearchRendererProps {
    app: AppRepository;
}


export default function SearchRenderer(props: SearchRendererProps) {
    const pluginStore = usePluginStore();
    const forceUpdate = useForceUpdate();
    const profileSpaceState = useContext(ProfileSpaceStateContext);
    const spaceName = profileSpaceState.selectedSpace.name

    useEffect(() => {
        const eventListener = (event: ComponentUpdatedEvent) => {
            if (event.position === "search") {
                forceUpdate();
            }
        };
        pluginStore.addEventListener('MirakiSearchPlugin.componentUpdate', eventListener);

        return () => {
            pluginStore.removeEventListener('MirakiSearchPlugin.componentUpdate', eventListener);
        }
    }, [pluginStore, forceUpdate]);

    const searchResults = pluginStore
            .executeFunction('MirakiSearchPlugin.getSearchResults') as Map<string, React.ReactNode[]>
    
    const results = Array.from(searchResults.entries())
                    .map(([appId, components]) => {
                        const appDetails = props.app.getAppById(appId);
                        const navigationTrace = [spaceName, appDetails.name];

                        return <SearchResultSection key={appId}
                            resultNavigationTrace={navigationTrace}
                            >
                                {
                                    components
                                }
                            </SearchResultSection>

                    })
    return <ScrollArea className="w-full h-full mt-4 px-6 flex flex-col space-y-2">
                   
            {
                results.length === 0
                ? <CircleLoader />
                : results
            }
            </ScrollArea>
        
}

