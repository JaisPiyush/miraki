import { IPlugin } from "react-pluggable";
import { PluginStore } from "react-pluggable";
import { MirakiSidebarView } from "@/components/miraki/sidebar_view";
import ComponentUpdatedEvent from "@/events/ComponentUpdatedEvent";
import { miraki } from "@/miraki";
import { BaseTreeNode, TreeLeaf, TreeNode, TreeNodeAction, TreeNodeOptions } from "@/lib/miraki_tree_view";


export class MirakiSidebarViewPlugin implements IPlugin {

    name = "MirakiSidebarViewPlugin@1.0.0";
    public pluginStore: PluginStore  = new PluginStore();
    private nodes: miraki.TreeNode.TreeNode[] = [];


    getPluginName() {
        return this.name;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore) {
        this.pluginStore = pluginStore;
    }

    addToNodes(
        node: TreeNodeOptions
    ) {
        this.nodes.push(new TreeNode(node));
        this.pluginStore.dispatchEvent(new ComponentUpdatedEvent('MirakiSidebarView.componentUpdated', "sidebar"));
    }

    removeFromNodes(
        node: miraki.TreeNode.TreeNode
    ) {
        this.nodes = this.nodes.filter((n) => n !== node);
        this.pluginStore.dispatchEvent(new ComponentUpdatedEvent('MirakiSidebarView.componentUpdated', "sidebar"));
    }

    getComponent() {
        return MirakiSidebarView;
    }

    addLeafInNode(node: BaseTreeNode | TreeNodeAction, command?: miraki.TreeNode.Command, icon?: string): void {
        if (node instanceof TreeLeaf || node instanceof TreeNodeAction) {
            node = node.getParent() as TreeNode;
        }
        this.pluginStore.executeFunction(
            'MirakiPeripheralsComponent.showSingleInputModal',
            {
                title: 'New File',
                onSubmit: (value: string) => {
                    if (value.length > 0) {
                        const ids = (node as TreeNode).getFlattenIdsOfChildren();
                        if (ids.includes(value)) {
                            const splittedName = value.split('.');
                            value = [`${splittedName[0]} (1)`, ...splittedName.slice(1)].join('.')
                        }
                        const leaf = new TreeLeaf({
                            name: value,
                            id: value,
                            tooltip: value,
                            command,
                            icon
                        });
                        node.addChild(leaf);
                    }
                }
            }
        )
    }

    activate(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        this.pluginStore.addFunction(
            'MirakiSidebarView.getNodes', () => {
            return self.nodes;
        });

        this.pluginStore.addFunction(
            'MirakiSidebarView.add', 
            this.addToNodes.bind(this)    
        );

        this.pluginStore.addFunction(
            'MirakiSidebarView.remove', 
            this.removeFromNodes.bind(this)    
        );


        this.pluginStore.addFunction(
            'MirakiSidebarView.getComponent', 
            this.getComponent.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiSidebarView.addLeaf',
            this.addLeafInNode.bind(this) 
        )
    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiSidebarView.getNodes');

        // this.pluginStore.removeFunction('MirakiSidebarView.add');

        // this.pluginStore.removeFunction('MirakiSidebarView.remove');

        this.pluginStore.removeFunction('MirakiSidebarView.getComponent');

        this.pluginStore.removeFunction('MirakiSidebarView.addLeaf');
    }
    

}