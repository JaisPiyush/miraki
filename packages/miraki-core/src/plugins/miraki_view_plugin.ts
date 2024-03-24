import { TreeNode } from '@/lib/miraki_tree_view';
import { miraki } from '@/miraki';
import { IPlugin, PluginStore } from 'react-pluggable';


class MirakiViewPlugin implements IPlugin {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public pluginStore: any;

  getTreeNodeJson(): miraki.TreeNode.TreeNode {
    throw new Error('Method not implemented.');
  }

  getPluginName(): string {
    return 'ShowAlert';
  }

  getDependencies(): string[] {
    return [];
  }

  init(pluginStore: PluginStore): void {
    this.pluginStore = pluginStore;
  }

  marshallTreeNodeJson(): TreeNode {
    const json = this.getTreeNodeJson();
    return new TreeNode(json);
  }

  activateTreeNode(): void {
    // TODO: add tree view activation functions
  }

  activateView(): void {
    // TODO: add view activation functions
  }

  activate(): void {
    this.pluginStore.addFunction('MirakiSidebarTreeNodePlugin.showInputModal', (node: TreeNode, args: miraki.MirakiSidebarTreeNodePlugin.showInputModalArgs) => {
        // TODO: Use this args for rendering modal for input
       console.log(args);
    });
    this.activateTreeNode();
    
    this.activateView();
  }

  deactivate(): void {
    this.pluginStore.removeFunction('sendAlert');
  }
}

export default MirakiViewPlugin;