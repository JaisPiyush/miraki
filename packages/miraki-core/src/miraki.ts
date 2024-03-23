/* eslint-disable @typescript-eslint/no-namespace */
export namespace miraki {
    export namespace TreeView {
        export enum TreeItemCollapsibleState {
            Collapsed = 0,
            Expanded = 1
        }
    
        export interface Command {
            command: string;
        }
    
        export interface TreeItemAction {
            group?: 'navigation' | 'inline'
            command: Command;
            title: string;
            actions: TreeItemAction[];
            icon?: string;
            id: string;
        }
        
        export interface TreeItem  {
            command?: Command;
            description?: string;
            icon?: string;
            id: string;
            label?: string;
            tooltip?: string;
            name: string;

        }
    
        export interface TreeView extends TreeItem {
            children: (TreeItem | TreeView)[];
            collapsibleState?: TreeItemCollapsibleState;
            addChild(child: TreeItem | TreeView): void;
            removeChild(index: number): void;
            setChild(index: number, child: TreeItem | TreeView): void;
            // dragChild(from: number, to: number): void;
            action?: {
                'view/title': TreeItemAction[],
                'view/item/context': TreeItemAction[],
            };
            setCollapsibleState(state: TreeItemCollapsibleState): void;

        }

    }

}