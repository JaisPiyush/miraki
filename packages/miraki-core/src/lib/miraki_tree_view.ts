import { miraki } from "@/miraki";
import { action, computed, makeObservable, observable } from "mobx";
import React from "react";

export type TreeNodeOptions = miraki.TreeNode.TreeNodeOptions;





export class TreeNodeAction implements miraki.TreeNode.TreeNodeAction {
    command: miraki.TreeNode.Command;
    title: string;
    group?: miraki.TreeNode.TreeNodeAction['group'];
    icon?: string | undefined | React.ReactNode;
    id: string;

    baseTreeNode?: BaseTreeNode;


    constructor(options: miraki.TreeNode.TreeNodeAction) {
        this.command = options.command;
        this.title = options.title;
        this.group = options.group;
        this.icon = options.icon;
        this.id = options.id;
    }

    attach(node: BaseTreeNode) {
        this.baseTreeNode = node;
    }
    
    getParent(): BaseTreeNode | undefined {
        return this.baseTreeNode;
    }
}

export class BaseTreeNode implements miraki.TreeNode.TreeNode {
    collapsibleState?: miraki.TreeNode.TreeLeafCollapsibleState;
    _children = new Map<string, miraki.TreeNode.TreeNode | miraki.TreeNode.TreeLeaf>();
    command?: miraki.TreeNode.Command;
    description?: string;
    icon?: string;
    id: string;
    label?: string;
    tooltip?: string;
    name: string;
    action: miraki.TreeNode.TreeNode['action'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parentNode?: BaseTreeNode;

    constructor(options: TreeNodeOptions) {
        this.command = options.command;
        this.description = options.description;
        this.icon = options.icon;
        this.id = options.id;
        this.label = options.label;
        this.tooltip = options.tooltip;
        this.name = options.name;
        this.collapsibleState = options.collapsibleState;
        // this._children = options.children || [];
        if (options.children) {
            for (const child of options.children) {
                this._children.set(child.id, child)
            }
        }
        this.action = options.action;
    }


    attach(node: BaseTreeNode): void {
        this.parentNode = node;
    }

    getParent(): miraki.TreeNode.TreeNode | undefined {
        return this.parentNode;
    }

    addChild(child: miraki.TreeNode.TreeLeaf) {
        this._children.set(child.id, child);
    }


    removeChild(child: BaseTreeNode) {
        // this._children = this._children.filter((c) => c !== child);
        this._children.delete(child.id)
    }

    setCollapsibleState(state: miraki.TreeNode.TreeLeafCollapsibleState): void {
        this.collapsibleState = state;
    }


    get children() {
        return Array.from(this._children.values());
    }
}

export class TreeLeaf extends BaseTreeNode {
    constructor(options: miraki.TreeNode.TreeLeaf) {
        super(options);
    }
}

export class TreeNode extends BaseTreeNode {

    showInputBox = false;

    constructor(options: TreeNodeOptions) {
        super(options);
        if (options.id === 'dappsuit'){
            console.log(options.children)
        }   
        this._children = this.__castChildren(options.children || []);
        
        if (this.action) {
            if (this.action.title) {
                this.action.title = this.__castActions(this.action.title);
            }
            if (this.action.item_context) {
                this.action.item_context = this.__castActions(this.action.item_context);
            }
        }
        makeObservable(this,{
            addChild: action,
            collapsibleState: observable,
            setCollapsibleState: action,
            removeChild: action,
            children: computed,
            showInputBox: observable,
            _children: observable
        });
    }

    __castActions(actions: miraki.TreeNode.TreeNodeAction[]): TreeNodeAction[] {
        return actions.map(action => {
            if (action instanceof TreeNodeAction) {
                action.attach(this);
                return action;
            }
            const _action = new TreeNodeAction(action);
            _action.attach(this);
            return _action;
        })
    }

    __castChildren(children: miraki.TreeNode.TreeNode['children']) {
        const childrenMap = new Map<string, TreeNode | TreeLeaf>()
        children.forEach(child => {
            if (child instanceof BaseTreeNode) {
                child.attach(this);
                childrenMap.set(child.id, child);
                return;
            }
            child.id = `${this.id}.${child.id}`
            let tree_node_cls = TreeLeaf;
            if ((child as miraki.TreeNode.TreeNode).children !== undefined && (child as miraki.TreeNode.TreeNode).children !== null) {
                tree_node_cls = TreeNode;
            }
            const leaf =  new tree_node_cls(child);
            leaf.attach(this);
            // return leaf;
            childrenMap.set(leaf.id, leaf)
        })
        return childrenMap
    }

    addChild(child: TreeLeaf | TreeNode): void {
        const childrenMap = this.__castChildren([child]);
        for (const [key, value] of childrenMap.entries()) {
            this._children.set(key, value)
        }

    }


    getFlattenIdsOfChildren(): string[] {
        return Array.from(this._children.keys());
    }

    getTreeLeafById(id: string): TreeLeaf | TreeNode | undefined {
        const idParts = id.split('.')
        if (idParts[0] !== this.id) {
            return;
        }
        if (idParts.length === 1) {
            return this;
        }
        const restOfIdParts = idParts.slice(1).join('.');
        for (const child of this.children) {
            if (child instanceof TreeLeaf && child.id === restOfIdParts) {
                return child
            } else if(child instanceof TreeNode && child.getTreeLeafById(restOfIdParts)){
                return child;
            }
        }
    }




}

export const getGroupActions = (actions: TreeNodeAction[], group?: miraki.TreeNode.TreeNodeAction['group']): TreeNodeAction[] => {
    return actions.filter(action => action.group === group);
}
