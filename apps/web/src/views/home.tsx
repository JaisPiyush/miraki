import NavigationHeader from "@/components/navigation_header";
import {
    MirakiGlobalState, 
    MirakiGlobalStateContext, 
    MirakiPeripheralsComponent, 
    MirakiSidebarView, 
    MirakiView, 

} from '@miraki/miraki-core';
import { useContext } from "react";
import { ProfileSpaceStateContext } from "@/states/profile_space.state"


import { createPluginStore, PluginProvider } from 'react-pluggable';
import { AppRepository } from "@/lib/app_repository";
import { observer } from "mobx-react-lite";

const appRepository = new AppRepository();





function _HomeView() {

    const profileSpaceState = useContext(ProfileSpaceStateContext);
    const mirakiGlobalState = new MirakiGlobalState();

    appRepository.init();
    const pluginStore = createPluginStore()

    appRepository.installSystemApps(pluginStore)
    appRepository.installAppsInPlugin(pluginStore, profileSpaceState.selectedSpace?.settings?.apps || []);
    console.log('Homer', pluginStore)
    

    return (<div className="w-full h-full">
                <NavigationHeader />
                <div className="w-full h-[90%] flex">
                    <PluginProvider pluginStore={pluginStore}>
                        <MirakiGlobalStateContext.Provider value={mirakiGlobalState}>
                            
                                <div className="h-full w-[20%] bg-background">
                                    <MirakiSidebarView />
                                </div>
                                <div className="h-full w-[80%] bg-background">
                                    <MirakiView />
                                </div>
                            
                            <MirakiPeripheralsComponent />
                        </MirakiGlobalStateContext.Provider>
                    </PluginProvider>
                </div>
            </div>)
}

const HomeView = observer(_HomeView);
export default  HomeView;