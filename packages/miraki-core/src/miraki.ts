/* eslint-disable @typescript-eslint/no-namespace */
export namespace miraki {
    export namespace TreeItemDataProvider {
        export enum TreeItemCollapsibleState {
            None = 0,
            Collapsed = 1,
            Expanded = 2
        }
    
        export interface Command {
            command: string;
            title: string;
            arguments?: unknown[];
        }
    
        export interface TreeItemAction {
            group?: 'navigation' | 'inline'
            command: Command;
        }
    
        export interface TreeItem {
            collapsibleState?: TreeItemCollapsibleState;
            command?: Command;
            description?: string;
            icon?: string;
            id: string;
            label: string;
            tooltip?: string;
            name: string;

        }
    
        export interface TreeItemDataProvider extends TreeItem {
            children: TreeItem[];
            actions: TreeItemAction[];
    
        }

    }

}