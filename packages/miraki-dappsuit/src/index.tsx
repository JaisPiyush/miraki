/* eslint-disable @typescript-eslint/no-explicit-any */
import {IPlugin, miraki, TreeNode, TreeNodeAction} from '@miraki/miraki-core'
import { PluginStore } from 'react-pluggable';
import IdlMainBuilder from './views/idl_main_builder';
import { createSolanaIdlProgram, fetchSidebarNodes } from './lib/api';
import IdlUploadDialog from './components/idl_upload_dialog';
import { PlusIcon } from '@radix-ui/react-icons';


import {Axios} from 'axios'

declare global {
  interface Window {
    miraki?: {
      api?: Axios,
      spaceId?: number
    }

  }
}

const node: miraki.TreeNode.TreeNodeOptions = {
    name: 'DappSuit',
    id: 'dappsuit',
    tooltip: 'Solana smart contract docs generator',
    action: {
        title: [
            {
                id: 'add-program',
                title: 'Add new program',
                group: "inline",
                command: {
                    command: 'MirakiDappSuitPlugin.addNewProgram'
                },
                icon: <PlusIcon className='w-4 h-4' />
            }
        ]
    },
    collapsibleState: 0,
    children: []

}



export default class MirakiDappSuitPlugin implements IPlugin {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pluginStore: any;
    _node = node;

    

    getPluginName(): string {
        return 'MirakiDappSuitPlugin'
    }

    getDependencies(): string[] {
        return []
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;

    }


    async preFetch() {
        try {
            
            if (window.miraki && window.miraki.api && window.miraki.spaceId) {
                const children = await fetchSidebarNodes(window.miraki.api, window.miraki.spaceId, this.getPluginName());
                this._node.children = children 
            }
        } catch {
            return;
        }
    }


    onFileSelected(node: TreeNode) {
        return async (content: string) => {
            if (window.miraki && window.miraki.api && window.miraki.spaceId) {
                const space = {
                    space: window.miraki.spaceId,
                    ...(JSON.parse(content))
                }
                const [, programNode] = await createSolanaIdlProgram(
                    window.miraki.api,
                    this.getPluginName(),
                    space
                );

                node.addChild(programNode as any)


            }
        } 
    }

    activate(): void {

        const appId = this.getPluginName();
        // Create functions
        this.pluginStore.addFunction(
            'MirakiDappSuitPlugin.launchIdlProgramPage',
            (node: TreeNode) => {
                console.log("from plug click", node)
                this.pluginStore.executeFunction(
                    'MirakiVew.set',
                    () => {
                        console.log(node, node.command, node.command)
                        if (node.command && node.command.kwargs && node.command.kwargs.programId) {
                            return <IdlMainBuilder 
                                programId={node.command.kwargs.programId as number}
                                appId={appId}
                                />
                        }
                    }
                )
            }
        );

        this.pluginStore.executeFunction(
            'MirakiSidebarView.add',
            this._node 
        ) as TreeNode
        if (window.miraki && window.miraki.api && window.miraki.spaceId) {
            this.pluginStore.addFunction(
                'MirakiDappSuitPlugin.addNewProgram',
                (action: TreeNodeAction) => {
                    const node = action.getParent() as TreeNode;
                    const onFileSelectedCallback = this.onFileSelected(node);
                    this.pluginStore.executeFunction(
                        'MirakiPeripheralsComponent.setDialogComponent',
                        () =>  {
                            return <IdlUploadDialog 
                                onFilSelected={async (content) => {await onFileSelectedCallback(content)}}
                            />
                        }
                    )
                }
            )
        }

        
    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiDappSuitPlugin.launchIdlProgramPage')
        this.pluginStore.removeFunction(
            'MirakiSidebarView.remove',
            node
        )
        this.pluginStore.removeFunction('MirakiDappSuitPlugin.addNewProgram')
        
    }

}
