import {TreeNode} from '@miraki/miraki-core'
import { PluginStore } from 'react-pluggable';

export const node = {
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

const tree = new TreeNode(node);

export const navigateInPlugin = (id: string, pluginStore: PluginStore) => {
    
    const node = tree.getTreeLeafById(id);
    if (node !== undefined && node.command?.command) {
        pluginStore.executeFunction(node.command?.command, node)
    }
}