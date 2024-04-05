import {IPlugin, miraki} from '@miraki/miraki-core'
import { PluginStore } from 'react-pluggable';
import App from './App';

const node: miraki.TreeNode.TreeNodeOptions = {
    name: 'Board',
    id: 'board',
    tooltip: 'Board: task management app',
    action: {},
    collapsibleState: 0,
    children: [
        {
            id: 'tasks',
            name: 'Tasks',
            command: {
                command: 'MirakiBoardPlugin.launchBoard'
            }
        }
    ]

}

export default class MirakiBoardPlugin implements IPlugin {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pluginStore: any;

    getPluginName(): string {
        return 'MirakiBoardPlugin'
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
            'MirakiBoardPlugin.launchBoard',
            () => {
                this.pluginStore.executeFunction(
                    'MirakiVew.set',
                    () => (
                        <App />
                    )
                )
            }
        );

        this.pluginStore.executeFunction(
            'MirakiSidebarView.add',
            node
        )
    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiBoardPlugin.launchBoard')
        this.pluginStore.removeFunction(
            'MirakiSidebarView.remove',
            node
        )
        
    }

}