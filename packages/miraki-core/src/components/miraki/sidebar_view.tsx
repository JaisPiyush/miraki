import ComponentUpdatedEvent from "../../events/ComponentUpdatedEvent";
import useForceUpdate from "../../hooks/useForceUpdate";
import React, { useEffect } from "react";
import { usePluginStore } from "react-pluggable";
import { TreeNodeComponent } from "./tree_view";
import { BaseTreeNode } from "../../lib/miraki_tree_view";
import { ScrollArea } from "../../components/ui/scroll-area"

export const MirakiSidebarView: React.FC = () => {
    const pluginStore = usePluginStore();
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        const eventListener = (event: ComponentUpdatedEvent) => {
            if (event.position === "sidebar") {
                forceUpdate();
            }
        };
        pluginStore.addEventListener('MirakiSidebarView.componentUpdated', eventListener);

        return () => {
            pluginStore.removeEventListener('MirakiSidebarView.componentUpdated', eventListener);
        }
    }, [pluginStore, forceUpdate]);

    const nodes = pluginStore.executeFunction(
        'MirakiSidebarView.getNodes',
    );

    return (
        <ScrollArea className="h-full w-full bg-background border border-t-0 border-b-0 border-l-0">
            <div>
            {
                nodes.map((node: BaseTreeNode) => 
                <TreeNodeComponent key={node.id} tree={node} />
                )
            }
            </div>
        </ScrollArea>
    )
}