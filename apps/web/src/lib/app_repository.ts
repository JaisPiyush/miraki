/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPlugin, PluginStore } from "react-pluggable";
import {
    MirakiPeripheralsPlugin,  
    MirakiSidebarViewPlugin, 
    MirakiViewPlugin
} from '@miraki/miraki-core';
import MirakiSnapshotPlugin from "@miraki/miraki-snapshot";
import MirakiBoardPlugin from "@miraki/miraki-trello";
import MirakiDappSuitPlugin from "@miraki/miraki-dappsuit";

export interface AppDetails {
    avatar?: string;
    name: string;
    description?: string;
    app: IPlugin
    id: string;
}

export class AppRepository {
    private appsRecord = new Map<string, AppDetails>()

    private systemAppsRecord: Record<string, AppDetails> = {
    }

    getPluginName(plugin: IPlugin) {
        const [pluginName, ] = plugin.getPluginName().split('@')
        return pluginName;
    }

    initAppRecord() {
        const mirakiSnapshotPlugin = new MirakiSnapshotPlugin();
        const mirakiBoardPlugin = new MirakiBoardPlugin();
        const mirakiDappSuitPlugin = new MirakiDappSuitPlugin();

        this.appsRecord.set(this.getPluginName(mirakiSnapshotPlugin),{
            name: 'Snapshot',
            app: mirakiSnapshotPlugin,
            avatar: 'https://avatars.githubusercontent.com/u/72904068?s=280&v=4',
            description: 'Voting dapp for DAOs',
            id: this.getPluginName(mirakiSnapshotPlugin)
        })
        this.appsRecord.set(this.getPluginName(mirakiBoardPlugin), {
            name: 'Board',
            app: mirakiBoardPlugin,
            avatar: 'https://miro.medium.com/v2/resize:fit:820/1*f79oBRpVEEB9-RrGMTk_5Q.jpeg',
            description: 'Task management app',
            id: this.getPluginName(mirakiBoardPlugin)
        })

        this.appsRecord.set(
            this.getPluginName(mirakiDappSuitPlugin),
            {
             name: 'DappSuit',
             app: mirakiDappSuitPlugin,
             avatar: 'https://avatars.githubusercontent.com/u/99892494?s=200&v=4',
             description: 'Solana program docs generator',
             id: this.getPluginName(mirakiDappSuitPlugin)
            }
        )

        
    }

    initSystemAppsRecord() {
        const mirakiPeripheralsPlugin = new MirakiPeripheralsPlugin()
        const sidebarViewPlugin = new MirakiSidebarViewPlugin()
        const mirakiViewPlugin = new MirakiViewPlugin()
        

        this.systemAppsRecord = {
            [this.getPluginName(mirakiPeripheralsPlugin)]: {
                id: this.getPluginName(mirakiPeripheralsPlugin),
                name: mirakiPeripheralsPlugin.getPluginName(),
                app: mirakiPeripheralsPlugin
            },
            [this.getPluginName(sidebarViewPlugin)]: {
                id: MirakiSidebarViewPlugin.name,
                name: sidebarViewPlugin.getPluginName(),
                app: sidebarViewPlugin
            },
            [this.getPluginName(mirakiViewPlugin)]: {
                id: this.getPluginName(mirakiViewPlugin),
                name: mirakiViewPlugin.getPluginName(),
                app: mirakiViewPlugin
            }
        }
    }

    init() {
        this.initAppRecord();
        this.initSystemAppsRecord();
    }

    getApps(): AppDetails[] {
        console.log(this.appsRecord.values())
        return Array.from(this.appsRecord.values())
    }

    installSystemApps(pluginStore: PluginStore) {
        for (const app of Object.values(this.systemAppsRecord)) {
            if (!(pluginStore as any).pluginMap.has(app.id)) {
                pluginStore.install(app.app);
            }
            
        }
    }

    installAppsInPlugin(pluginStore: PluginStore, appIds: string[]) {
        for (const appId of appIds) {
            if (this.appsRecord.has(appId) && !(pluginStore as any).pluginMap.has(appId)) {
                // pluginStore.install(this.appsRecord.get(appId).app);
                const app = this.appsRecord.get(appId).app
                if ((app as any).preFetch !== undefined){
                    (app as any).preFetch()
                    .then(() => {
                        pluginStore.install(app);
                    })
                } else {
                    pluginStore.install(this.appsRecord.get(appId).app);
                }
                
            }
        }
    }

    uninstallAppsInPlugin(pluginStore: PluginStore, appIds: string[]) {
        for (const appId of appIds) {
            if (this.appsRecord.has(appId) && (pluginStore as any).pluginMap.has(appId)) {
                pluginStore.uninstall(appId);
            }
        }
    }

    synchronizeApps(pluginStore: PluginStore, appIds: string[]) {

        const systemApps = Object.keys(this.systemAppsRecord);
        this.installAppsInPlugin(pluginStore, appIds);
        const installedApps: string[] = Array.from((pluginStore as any).pluginMap.keys());
        for (const appId of installedApps) {
            if (!(systemApps.includes(appId) || appIds.includes(appId))) {
                pluginStore.uninstall(appId)
            }
        }

    }


}