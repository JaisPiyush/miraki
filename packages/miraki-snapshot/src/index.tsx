/* eslint-disable @typescript-eslint/no-unused-vars */
import './index.css'

import {IPlugin, PluginStore} from 'react-pluggable';
import { SpaceView } from './views/spaceMain';
import CreateProposalView from './views/create_proposal';
import { node } from './plugin';
import { TreeNodeAction } from '@miraki/miraki-core';
import { Proposal } from './types';
import { search } from './lib/api';
import { Separator } from './components/ui/separator';



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


    sendSearchResults(searchText: string, proposals: Proposal[]) {
        const components = proposals.map((proposal, index) => 
                            <div key={proposal.id} >
                                <div onClick={() => {this.pluginStore.executeFunction('MirakiSnapshotPlugin.launchProposalView')}} 
                                    
                                    className='w-full p-4 text-sm cursor-pointer hover:bg-secondary'
                                >
                                    <span className='text-muted-foreground'>Proposal: </span>{proposal.title}
                                </div>
                                {index === proposals.length - 1 ? <></>: <Separator />}
                            </div>
                        )
        this.pluginStore.executeFunction(
            'MirakiSearchPlugin.addSearchResults',
            this.getPluginName(),
            searchText,
            components
        )
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
            (node: TreeNodeAction) => {
                this.pluginStore.executeFunction(
                    'MirakiVew.set',
                    () => {
                        // console.log('node setter', node)
                        return <CreateProposalView />
                    }
                )
            }
        );

        this.pluginStore.executeFunction(
            'MirakiSidebarView.add',
            node
        )

        this.pluginStore.executeFunction(
            'MirakiSearchPlugin.addSearchAdapter',
            this.getPluginName(),
            (searchText: string) => {
                const miraki = window.miraki!;
                if (! (miraki.api && miraki.spaceId)) {
                    return;
                }
                search(miraki.api, miraki.spaceId, searchText)
                .then((proposals: Proposal[]) => {
                    this.sendSearchResults(searchText, proposals)
                })
            }
        )
    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiSnapshotPlugin.launchProposalView')
        this.pluginStore.removeFunction('MirakiSnapshotPlugin.launchCreateProposalView')
        this.pluginStore.removeFunction(
            'MirakiSidebarView.remove',
            node
        )
        this.pluginStore.executeFunction(
            'MirakiSearchPlugin.removeSearchAdapter',
            this.getPluginName()
        )

        
    }

}