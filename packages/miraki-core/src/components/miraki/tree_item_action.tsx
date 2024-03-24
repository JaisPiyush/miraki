import { TreeNodeAction } from "@/lib/miraki_tree_view";
import { Button } from "@/components/ui/button";
import { usePluginStore } from "react-pluggable";

interface TreeNodeInlineActionProps {
    actionNode: TreeNodeAction
}

export const TreeNodeInlineActionComponent: React.FC<TreeNodeInlineActionProps> = (props: TreeNodeInlineActionProps) => {
    const pluginStore = usePluginStore();
    const handleAction = () => {
        pluginStore.executeFunction(props.actionNode.command.command, props.actionNode, props.actionNode.command.args);
        
    }
    return <Button variant="ghost" size="sm" onClick={() => {handleAction()}}>
                <img src={props.actionNode.icon} className="h-3 w-3" />
            </Button>
}