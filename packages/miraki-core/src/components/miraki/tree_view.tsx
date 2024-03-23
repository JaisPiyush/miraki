import React, {  useState } from "react";
import {ChevronDownIcon, ChevronUpIcon, DotsVerticalIcon} from '@radix-ui/react-icons';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button";
import { miraki } from "@/miraki";

import { observer } from "mobx-react-lite"
import { TreeItem, TreeView  } from "@/lib/meraki_tree_view";
import {  useMirakiGlobalState } from "@/context/global_state_context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { ToolTipTextBox } from "./tooltip_box";

interface TreeViewProps {
    key?: string;
    tree: miraki.TreeView.TreeItem | miraki.TreeView.TreeView;
}

interface TreeItemViewProps {
  key?: string;
  item: miraki.TreeView.TreeItem;
}


const getClassNamesBasedOnInteraction = (isActive: boolean) => {
  return `${isActive ? "bg-gray-200" : ""} hover:bg-gray-100 cursor-pointer`;

}

export const TreeItemViewComponent: React.FC<TreeItemViewProps> = (props: TreeItemViewProps) => {
  const mirakiGlobalState = useMirakiGlobalState();
  

  return <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(
          "px-4 py-3 font-mono text-sm shadow-sm flex items-center",
          getClassNamesBasedOnInteraction(mirakiGlobalState.activeTreeItemId === props.item.id)
        )}>
            <p className="text-xs font-normal truncate">{props.item.name}</p>
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
export const TreeViewComponent: React.FC<TreeViewProps> = observer((props: TreeViewProps) => {

    

    if (props.tree instanceof TreeItem) {
      return <TreeItemViewComponent item={props.tree} />
    }

    const [tree] = useState<TreeView>(() => (props.tree as TreeView));
    const mirakiGlobalState = useMirakiGlobalState();
    
    const isCollapsible = tree.collapsibleState !== undefined;
    const isOpen = tree.collapsibleState === miraki.TreeView.TreeItemCollapsibleState.Expanded

    const setIsOpen = (open: boolean) => {
      tree.setCollapsibleState(open ? miraki.TreeView.TreeItemCollapsibleState.Expanded : miraki.TreeView.TreeItemCollapsibleState.Collapsed)
    }
    
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`w-full`}
      >
        <div className={cn(
          "flex items-center px-2 py-1",
          getClassNamesBasedOnInteraction(mirakiGlobalState.activeTreeItemId === tree.id)
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
                  <h4 className="text-xs font-normal truncate">
                    {props.tree.name}
                  </h4>

                  <Button variant="ghost" size="sm">
                    <DotsVerticalIcon className="h-4 w-4" />
                  </Button>
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
        <CollapsibleContent className="">
          {tree.children.map((child) => {
            return <div className="w-full pl-2">
              <TreeViewComponent key={child.id} tree={child} />
            </div>
          })}
        </CollapsibleContent>
      </Collapsible>
    )
})