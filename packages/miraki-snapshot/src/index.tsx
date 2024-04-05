/* eslint-disable @typescript-eslint/no-unused-vars */
import './index.css'

import {IPlugin, PluginStore} from 'react-pluggable';
import { SpaceView } from './views/spaceMain';
import CreateProposalView from './views/create_proposal';
import { node } from './plugin';



export default class MirakiSnapshotPlugin implements IPlugin {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pluginStore: any;

    getPluginName(): string {
        return 'MirakiSnapshotPlugin'
    }

    getDependencies(): string[] {
        return []
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }

    activate(): void {
        // Create functions
        this.pluginStore.addFunction(
            'MirakiSnapshotPlugin.launchProposalView',
            () => {
                this.pluginStore.executeFunction(
                    'MirakiVew.set',
                    () => (
                        <SpaceView />
                    )
                )
            }
        );

        this.pluginStore.addFunction(
            'MirakiSnapshotPlugin.launchCreateProposalView',
            (node: any) => {
                this.pluginStore.executeFunction(
                    'MirakiVew.set',
                    () => {
                        console.log('node setter', node)
                        return <CreateProposalView />
                    }
                )
            }
        );

        this.pluginStore.executeFunction(
            'MirakiSidebarView.add',
            node
        )
    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiSnapshotPlugin.launchProposalView')
        this.pluginStore.removeFunction('MirakiSnapshotPlugin.launchCreateProposalView')
        this.pluginStore.removeFunction(
            'MirakiSidebarView.remove',
            node
        )
        
    }

}