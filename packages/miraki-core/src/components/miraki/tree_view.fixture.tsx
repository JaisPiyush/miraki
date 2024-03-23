import { TreeNode } from "@/lib/meraki_tree_view";
import { TreeNodeComponent } from "./tree_view";
import { miraki } from "@/miraki";

export default {
    'Primary': <TreeNodeComponent tree={new TreeNode({
       
            name: 'Trello',
            id: 'Trello',
            tooltip: 'Trello board',
            collapsibleState: miraki.TreeNode.TreeLeafCollapsibleState.Collapsed,
            children: [
                {
                    id: 'Trello-1',
                    name: 'Boar-1',
                    collapsibleState: miraki.TreeNode.TreeLeafCollapsibleState.Collapsed,
                    tooltip: 'Trello board',
                    children: [
                        {
                            id: 'Creat',
                            name: 'Create',
                            tooltip: 'Create a new board',
                        }
                    ]
                }
            ],
            action: {
                title: [
                    {
                        id: 'edit',
                        title: 'Edit',
                        command: {
                            command: 'TreeNode.addEntry'
                        },
                        group: 'inline',
                        icon: 'https://firebasestorage.googleapis.com/v0/b/miraki-aa05f.appspot.com/o/public%2Fpencil-1.svg?alt=media&token=498bb45c-2576-4cb6-8fea-b0b91ce0bd8a'
                    }
                ]
            }
        
    })} />,
}