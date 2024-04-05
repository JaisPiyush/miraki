import React, {  useState } from "react";
import {ChevronDownIcon, ChevronUpIcon, DotsVerticalIcon} from '@radix-ui/react-icons';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible"
import { Button } from "../ui/button";
import { miraki } from "../../miraki";

import { observer } from "mobx-react-lite"
import { getGroupActions, TreeLeaf, TreeNode, TreeNodeAction  } from "../../lib/miraki_tree_view";
import {  useMirakiGlobalState } from "../../context/global_state_context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";
import { ToolTipTextBox } from "./tooltip_box";
import { TreeNodeInlineActionComponent } from "./tree_item_action";
import { usePluginStore } from "react-pluggable";

interface TreeNodeProps {
    key?: string;
    tree: TreeNode | TreeLeaf;
    item_context_actions?: TreeNodeAction[]
}

interface TreeLeafViewProps {
  key?: string;
  item: miraki.TreeNode.TreeLeaf;
  item_context_actions?: TreeNodeAction[];
}


const getClassNamesBasedOnInteraction = (isActive: boolean) => {
  return `${isActive ? "bg-zinc-100 dark:bg-zinc-400" : ""} hover:bg-zinc-100 dark:hover:bg-zinc-500 cursor-pointer`;

}

export const TreeLeafViewComponent: React.FC<TreeLeafViewProps> = (props: TreeLeafViewProps) => {
  const mirakiGlobalState = useMirakiGlobalState();
  const pluginStore = usePluginStore();
  
  const handleClick = () => {
    console.log('on leaf click', props.item)
    if (props.item.command && props.item.command.command) {
      pluginStore.executeFunction(props.item.command.command, props.item);
    }
  }

  return <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div onClick={() => {handleClick()}} className={cn(
          "pl-3 pr-4 py-3 font-mono text-sm shadow-sm flex items-center justify-between",
          getClassNamesBasedOnInteraction(mirakiGlobalState.activeTreeLeafId === props.item.id)
        )}>
            <p className="text-xs font-normal truncate">{props.item.name}</p>
            <div className="flex items-center">
              {getGroupActions((props.item_context_actions || []), "inline").map((action) => {
                return <TreeNodeInlineActionComponent key={action.id} actionNode={action} />
              })}
            </div>
         </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={2}>
        {
          props.item.tooltip !== undefined && props.item.tooltip.length > 0 ?
          <ToolTipTextBox>{props.item.tooltip}</ToolTipTextBox>
          :<></>
        }
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TreeNodeComponent: React.FC<TreeNodeProps> = observer((props: TreeNodeProps) => {

    
    if (props.tree instanceof TreeLeaf) {
      return <div className="w-full pl-2">
        <TreeLeafViewComponent item={props.tree} key={props.tree.id} />
      </div>
    }
    

    const [tree] = useState<TreeNode>(() => (props.tree as TreeNode));

    const mirakiGlobalState = useMirakiGlobalState();
    
    const isCollapsible = tree.collapsibleState !== undefined;
    const isOpen = tree.collapsibleState === miraki.TreeNode.TreeLeafCollapsibleState.Expanded

    const setIsOpen = (open: boolean) => {
      tree.setCollapsibleState(open ? miraki.TreeNode.TreeLeafCollapsibleState.Expanded : miraki.TreeNode.TreeLeafCollapsibleState.Collapsed)
    }

    const getTitleActions = () => {
      if (tree.action && tree.action.title && tree.action.title.length > 0) {
        return (tree.action.title as TreeNodeAction[]);
      }
      return props.item_context_actions || [];
    }

    const getInlineTitleActions = () => {
      return getGroupActions(getTitleActions(), "inline");
    }

    const getNonInlineTitleActions = () => {
      return getGroupActions(getTitleActions())
    }

    const nonInlineTitleActionsLength = getNonInlineTitleActions().length;

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`w-full bg-secondary`}
      >
        <div className={cn(
          "flex items-center pl-1 pr-2 py-1",
          getClassNamesBasedOnInteraction(mirakiGlobalState.activeTreeLeafId === tree.id)
        )}>
            
          <CollapsibleTrigger asChild>
            {
              isCollapsible?
              <Button variant="ghost" size="sm">
              {
                isOpen?
                <ChevronUpIcon className="h-4 w-4" />
                : <ChevronDownIcon className="h-4 w-4" />
              }
              <span className="sr-only">Toggle</span>
            </Button>:
            <></>
            }
          </CollapsibleTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-between w-full">
                  <h4 className="text-xs font-normal truncate ml-1">
                    {props.tree.name}
                  </h4>

                  <div className="flex flex-row-reverse items-center">
                    {
                      nonInlineTitleActionsLength > 0
                      ? <Button variant="ghost" size="sm">
                          <DotsVerticalIcon className="h-3 w-3" />
                        </Button>
                      : <></>
                    }
                    {
                      getInlineTitleActions().map((action) => {
                        return <TreeNodeInlineActionComponent key={action.id} actionNode={action} />
                      })
                    }
                  </div>

                  
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={2}>
                {
                  tree.tooltip !== undefined && tree.tooltip.length > 0 ?
                  <ToolTipTextBox>{tree.tooltip}</ToolTipTextBox>
                  :<></>
                }
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          
        </div>
        <CollapsibleContent className="pl-1">
          {tree.children.map((child) => {
            return <div className="w-full" key={child.id}>
              <TreeNodeComponent  tree={child as any} />
            </div>
          })}
        </CollapsibleContent>
      </Collapsible>
    )
})