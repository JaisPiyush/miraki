import { TreeNodeAction } from "../../lib/miraki_tree_view";
import { Button } from "../../components/ui/button";
import { usePluginStore } from "react-pluggable";
import React from "react";

interface TreeNodeInlineActionProps {
    actionNode: TreeNodeAction
}

export const TreeNodeInlineActionComponent: React.FC<TreeNodeInlineActionProps> = (props: TreeNodeInlineActionProps) => {
    const pluginStore = usePluginStore();
    const handleAction = () => {
        pluginStore.executeFunction(props.actionNode.command.command, props.actionNode);
        
    }

    const icon = typeof props.actionNode.icon === 'string'
                    ? <img src={props.actionNode.icon} className="h-3 w-3 text-foreground" />
                    : props.actionNode.icon
    return <Button variant="ghost" size="sm" onClick={() => {handleAction()}}>
                {
                    icon
                }
            </Button>
}