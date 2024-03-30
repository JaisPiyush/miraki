import './index.css'

import {IPlugin, PluginStore} from 'react-pluggable';
import { SpaceView } from './views/spaceMain';


const node = {
    name: 'Snapshot',
    id: 'snapshot',
    tooltip: 'Snapshot: voting app for DAOs',
    collapsibleState: 0,
    children: [
        {
            id: 'fetch_proposals',
            name: 'Proposals',
            tooltip: 'View all proposals in the space',
            command: {
                command: 'MirakiSnapshotPlugin.launchProposalView'
            }

        },
        {
            id: 'create_proposal',
            name: 'Create Proposal',
            command: {
                command: 'MirakiSnapshotPlugin.launchCreateProposalView'
            }
        }
    ],
    actions: {}
}

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

        // TODO: Add Create proposal

        this.pluginStore.executeFunction(
            'MirakiSidebarView.add',
            node
        )
    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiSnapshotPlugin.launchProposalView')
        this.pluginStore.removeFunction(
            'MirakiSidebarView.remove',
            node
        )
    }

}