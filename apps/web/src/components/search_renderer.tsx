import { AppRepository } from "@/lib/app_repository";
import { ProfileSpaceStateContext } from "@/states/profile_space.state";
import { ComponentUpdatedEvent, useForceUpdate } from "@miraki/miraki-core";
import React, { useEffect, useContext } from "react";
import { usePluginStore } from "react-pluggable";
import {v4 as uuidv4} from 'uuid';
import SearchResultSection from "./search_result_section";
import {CircleLoader} from 'react-spinners'

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
            if (event.position === "sidebar") {
                forceUpdate();
            }
        };
        pluginStore.addEventListener('MirakiSearchPlugin.componentUpdate', eventListener);

        return () => {
            pluginStore.removeEventListener('MirakiSearchPlugin.componentUpdate', eventListener);
        }
    }, [pluginStore, forceUpdate]);

    const searchResults = pluginStore
            .executeFunction('MirakiSearchPlugin.getSearchResults') as Map<string, React.FC[]>
    
    const results = Array.from(searchResults.entries())
                    .map(([appId, components]) => {
                        const appDetails = props.app.getAppById(appId);
                        const navigationTrace = [spaceName, appDetails.name];

                        return <SearchResultSection key={appId}
                            resultNavigationTrace={navigationTrace}
                            >
                                {
                                    components.map((Component) => <Component key={uuidv4()} />)
                                }
                            </SearchResultSection>

                    })
    return <>
            {
                results.length === 0
                ? <CircleLoader />
                : results
            }
        </>
}

