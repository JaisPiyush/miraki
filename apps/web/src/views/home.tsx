import NavigationHeader from "@/components/navigation_header";
import {MirakiGlobalState, MirakiGlobalStateContext, MirakiPeripheralsComponent, MirakiPeripheralsPlugin, MirakiSidebarView, MirakiSidebarViewPlugin, MirakiView, MirakiViewPlugin} from '@miraki/miraki-core';

import { createPluginStore, PluginProvider } from 'react-pluggable';

const pluginStore = createPluginStore()
pluginStore.install(new MirakiPeripheralsPlugin())
const sidebarViewPlugin = new MirakiSidebarViewPlugin()
pluginStore.install(new MirakiViewPlugin())
pluginStore.install(sidebarViewPlugin)


export default function HomeView() {
    const mirakiGlobalState = new MirakiGlobalState();
    return (<div className="w-full h-full">
                <NavigationHeader />
                <div className="w-full h-[90%] flex">
                    <PluginProvider pluginStore={pluginStore}>
                        <MirakiGlobalStateContext.Provider value={mirakiGlobalState}>
                            
                                <div className="h-full w-[20%] bg-white">
                                    <MirakiSidebarView />
                                </div>
                                <div className="h-full w-[80%] bg-white">
                                    <MirakiView />
                                </div>
                            
                            <MirakiPeripheralsComponent />
                        </MirakiGlobalStateContext.Provider>
                    </PluginProvider>
                </div>
            </div>)
}