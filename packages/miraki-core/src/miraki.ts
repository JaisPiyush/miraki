
/* eslint-disable @typescript-eslint/no-namespace */
export namespace miraki {
    export namespace TreeNode {
        export enum TreeLeafCollapsibleState {
            Collapsed = 0,
            Expanded = 1
        }
    
        export interface Command {
            command: string;
            args?: unknown[]
        }
    
        export interface TreeNodeAction {
            group?: 'navigation' | 'inline'
            command: Command;
            title: string;
            icon?: string;
            id: string;
        }
        
        export interface TreeLeaf  {
            command?: Command;
            description?: string;
            icon?: string;
            id: string;
            label?: string;
            tooltip?: string;
            name: string;

        }
    
        export interface TreeNode extends TreeLeaf {
            children: (TreeLeaf | TreeNode)[];
            collapsibleState?: TreeLeafCollapsibleState;
            addChild(child: TreeLeaf | TreeNode): void;
            removeChild(child: TreeLeaf | TreeNode): void;
            setChild(index: number, child: TreeLeaf | TreeNode): void;
            // dragChild(from: number, to: number): void;
            action?: {
                title?: TreeNodeAction[],
                item_context?:  TreeNodeAction[],
            };
            setCollapsibleState(state: TreeLeafCollapsibleState): void;
            getParent(): TreeNode | undefined;

        }

    }

    export namespace MirakiSidebarTreeNodePlugin {
        export interface showInputModalArgs {
            title?: string;
            description?: string;
            onSubmit: (value: string) => void;
            onClose?: () => void;
        }
    }

}