import { miraki } from "@/miraki";
import { action, computed, makeObservable, observable } from "mobx";

interface TreeViewOptions extends miraki.TreeView.TreeItem {
    children?: miraki.TreeView.TreeView['children'];
    collapsibleState?: miraki.TreeView.TreeItemCollapsibleState;
    action?: miraki.TreeView.TreeView['action'];

}




export class TreeItemAction implements miraki.TreeView.TreeItemAction {
    command: miraki.TreeView.Command;
    title: string;
    actions: miraki.TreeView.TreeItemAction[];
    group?: 'navigation' | 'inline';
    icon?: string | undefined;
    id: string;


    constructor(options: miraki.TreeView.TreeItemAction) {
        this.command = options.command;
        this.title = options.title;
        this.actions = options.actions;
        this.group = options.group;
        this.icon = options.icon;
        this.id = options.id;
    }
}

export class BaseTreeView implements miraki.TreeView.TreeView {
    collapsibleState?: miraki.TreeView.TreeItemCollapsibleState;
    _children: miraki.TreeView.TreeView['children'];
    command?: miraki.TreeView.Command;
    description?: string;
    icon?: string;
    id: string;
    label?: string;
    tooltip?: string;
    name: string;
    action: miraki.TreeView.TreeView['action'];

    constructor(options: TreeViewOptions) {
        this.command = options.command;
        this.description = options.description;
        this.icon = options.icon;
        this.id = options.id;
        this.label = options.label;
        this.tooltip = options.tooltip;
        this.name = options.name;
        this.collapsibleState = options.collapsibleState;
        this._children = options.children || [];
        this.action = options.action;
    }


    addChild(child: miraki.TreeView.TreeItem) {
        this._children.push(child);
    }


    removeChild(index: number) {
        this._children = this._children.filter((c, i) => i !== index);
    }

    setChild(index: number, child: miraki.TreeView.TreeView | miraki.TreeView.TreeItem): void {
        this._children[index] = child;
    }

    setCollapsibleState(state: miraki.TreeView.TreeItemCollapsibleState): void {
        this.collapsibleState = state;
    }


    get children() {
        return this._children;
    }
}

export class TreeItem extends BaseTreeView {
    constructor(options: miraki.TreeView.TreeItem) {
        super(options);
    }
}

export class TreeView extends BaseTreeView {

    showInputBox = false;

    constructor(options: TreeViewOptions) {
        super(options);
        this._children = this.__castChildren(options.children || []);
        if (this.action) {
            if (this.action['view/title']) {
                this.action['view/title'] = this.__castActions(this.action['view/title']);
            }
            if (this.action['view/item/context']) {
                this.action['view/item/context'] = this.__castActions(this.action['view/item/context']);
            }
        }
        makeObservable(this,{
            addChild: action,
            collapsibleState: observable,
            setCollapsibleState: action,
            removeChild: action,
            setChild: action,
            children: computed,
            showInputBox: observable,
        });
    }

    __castActions(actions: miraki.TreeView.TreeItemAction[]): TreeItemAction[] {
        return actions.map(action => {
            if (action instanceof TreeItemAction) {
                return action;
            }
            return new TreeItemAction(action);
        })
    }

    __castChildren(children: miraki.TreeView.TreeView['children']): (TreeView | TreeItem)[] {
        return children.map(child => {
            if (child instanceof BaseTreeView) {
                return child;
            }
            if ((child as miraki.TreeView.TreeView).children !== undefined) {
                return new TreeView(child as TreeViewOptions);
            }
            return new TreeItem(child);
        })
    }

    addChild(child: TreeItem | TreeView): void {
        const [_child] = this.__castChildren([child]);
        this._children.push(_child);
    }

    get children(): (TreeView | TreeItem)[] {
        return this.__castChildren(this._children);
    }

    getTreeItemById(id: string): TreeItem | TreeView | undefined {
        if (this.id === id) {
            return this;
        }
        for (const child of this.children) {
            if (child.id === id) {
                return child;
            }
        }
    }


}