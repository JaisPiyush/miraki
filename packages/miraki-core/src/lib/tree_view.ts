import { miraki } from "@/miraki";
import { action, computed, makeObservable, observable } from "mobx";

interface TreeViewOptions extends miraki.TreeView.TreeItem {
    children?: miraki.TreeView.TreeItem[];
    collapsibleState?: miraki.TreeView.TreeItemCollapsibleState;
    action?: miraki.TreeView.TreeView['action'];

}

class _TreeView implements miraki.TreeView.TreeView {
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

export class TreeItem extends _TreeView {
    constructor(options: miraki.TreeView.TreeItem) {
        super(options);
    }
}

export class TreeView extends _TreeView {
    constructor(options: TreeViewOptions) {
        super(options);
        this._children = this.__castChildren(options.children || []);
        makeObservable(this,{
            addChild: action,
            collapsibleState: observable,
            setCollapsibleState: action,
            removeChild: action,
            setChild: action,
            children: computed,
        });
    }

    __castChildren(children: miraki.TreeView.TreeView['children']): (TreeView | TreeItem)[] {
        return children.map(child => {
            if (child instanceof _TreeView) {
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

}