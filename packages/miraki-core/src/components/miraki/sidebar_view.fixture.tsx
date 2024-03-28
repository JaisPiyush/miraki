import { MirakiSidebarViewPlugin } from "@/plugins/sidebar_view_plugin";
import { createPluginStore, PluginProvider } from "react-pluggable";
import { miraki } from "@/miraki";
import { TreeNodeOptions } from "@/lib/miraki_tree_view";
import { MirakiSidebarView } from "./sidebar_view";
import { MirakiPeripheralsPlugin } from "@/plugins/miraki_peripherals_plugin";
import { MirakiPeripheralsComponent } from "./miraki_peripherals";

const pluginStore = createPluginStore();
const sidebarViewPlugin = new MirakiSidebarViewPlugin();
const mirakiPeripheralsPlugin = new MirakiPeripheralsPlugin();

pluginStore.install(mirakiPeripheralsPlugin);
pluginStore.install(sidebarViewPlugin);

const node: TreeNodeOptions = {
    name: 'Trello',
    id: 'Trello',
    tooltip: 'Trello board',
    collapsibleState: miraki.TreeNode.TreeLeafCollapsibleState.Collapsed,
    children: [
        {
            id: 'Trello-1',
            name: 'Boar-1',
            collapsibleState: miraki.TreeNode.TreeLeafCollapsibleState.Collapsed,
            tooltip: 'Trello board',
            children: [
                {
                    id: 'Creat',
                    name: 'Create',
                    tooltip: 'Create a new board',
                }
            ]
        },
        {
            id: 'Trello-12',
            name: 'Boar-2',
            collapsibleState: miraki.TreeNode.TreeLeafCollapsibleState.Collapsed,
            tooltip: 'Trello board',
            children: [
                {
                    id: 'Creat2',
                    name: 'Create',
                    tooltip: 'Create a new board',
                }
            ]
        },
        {
            id: 'Trello-13',
            name: 'Boar-13',
            collapsibleState: miraki.TreeNode.TreeLeafCollapsibleState.Collapsed,
            tooltip: 'Trello board',
            children: [
                {
                    id: 'Creat3',
                    name: 'Create',
                    tooltip: 'Create a new board',
                    collapsibleState: miraki.TreeNode.TreeLeafCollapsibleState.Collapsed,
                    children: [
                        {
                            id: 'Creat4',
                            name: 'Create',
                            tooltip: 'Create a new board',
                        }
            ]
                }
            ]
        }
    ],
    action: {
        title: [
            {
                id: 'edit',
                title: 'Edit',
                command: {
                    command: 'MirakiSidebarView.addLeaf'
                },
                group: 'inline',
                icon: 'https://firebasestorage.googleapis.com/v0/b/miraki-aa05f.appspot.com/o/public%2Fpencil-1.svg?alt=media&token=498bb45c-2576-4cb6-8fea-b0b91ce0bd8a'
            }
        ]
    }

}

sidebarViewPlugin.addToNodes(node);

export default {
    'Primary': <PluginProvider pluginStore={pluginStore}>
        <MirakiPeripheralsComponent />
        <MirakiSidebarView />
    </PluginProvider>
}