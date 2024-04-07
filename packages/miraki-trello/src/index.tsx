import {IPlugin, miraki} from '@miraki/miraki-core'
import { PluginStore } from 'react-pluggable';
import App from './App';
import { Separator } from './components/ui/separator';
import { searchTasks } from './lib/searchTasks';
import { Badge } from './components/ui/badge';
import { cn } from './lib/utils';

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

    sendSearchResults(searchText: string, todos: Todo[]) {

        const getStyleForBadge = (tag: TypedColumn) => {
            switch(tag) {
                case "todo":
                    return 'border-red-200 text-red-400'
                case "inprogress":
                    return 'border-yellow-200 text-yellow-400'
                case "done":
                    return 'border-green-200 text-green-400'
            }
        }

        const components = todos.map((todo, index) => 
                            <div key={todo.$id} >
                                <div onClick={() => {this.pluginStore.executeFunction('MirakiBoardPlugin.launchBoard')}} 
                                    
                                    className='w-full p-4 text-sm cursor-pointer hover:bg-secondary'
                                >
                                    <span className='text-muted-foreground'>Task: </span>{todo.title}
                                    <span className={cn('px-2 py-1 rounded-md ml-2 border text-sm font-bold', getStyleForBadge(todo.status))}>{todo.status}</span>
                                </div>
                                {index === todos.length - 1 ? <></>: <Separator />}
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

        this.pluginStore.executeFunction(
            'MirakiSearchPlugin.addSearchAdapter',
            this.getPluginName(),
            (searchText: string) => {
                searchTasks(searchText)
                .then((todos: Todo[]) => {
                    this.sendSearchResults(searchText, todos)
                })
            }
        )
    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiBoardPlugin.launchBoard')
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