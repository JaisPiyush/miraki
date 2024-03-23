import React, {  useState } from "react";
import {ChevronDownIcon, ChevronUpIcon} from '@radix-ui/react-icons';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button";
import { miraki } from "@/miraki";

import { observer } from "mobx-react-lite"
import { TreeView } from "@/lib/tree_view";
import {  useMirakiGlobalState } from "@/context/global_state_context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { ToolTipTextBox } from "./tooltip_box";

interface TreeViewProps {
    key?: string;
    tree: TreeView;
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
          "pl-10 pr-4 py-2 font-mono text-sm shadow-sm flex items-center",
          getClassNamesBasedOnInteraction(mirakiGlobalState.activeTreeItemId === props.item.id)
        )}>
            <p className="text-sm font-normal truncate">{props.item.name}</p>
         </div>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={2}>
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

    const [tree] = useState(() => props.tree);
    const mirakiGlobalState = useMirakiGlobalState();
    
    const isCollapsible = tree.collapsibleState !== undefined;
    const isOpen = tree.collapsibleState === miraki.TreeView.TreeItemCollapsibleState.Expanded

    const setIsOpen = (open: boolean) => {
      tree.collapsibleState = open ? miraki.TreeView.TreeItemCollapsibleState.Expanded : miraki.TreeView.TreeItemCollapsibleState.Collapsed;
    }
    
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`w-[22%] border border-gray-200`}
      >
        <div className={cn(
          "flex items-center  px-4 py-1",
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
          <h4 className="text-xs font-normal truncate">
            @peduarte starred 3 repositories arotra penjato maganu
          </h4>
        </div>
        <CollapsibleContent className="">
          {tree.children.map((child) => {
            return <TreeItemViewComponent key={child.id} item={child} />
          })}
        </CollapsibleContent>
      </Collapsible>
    )
})