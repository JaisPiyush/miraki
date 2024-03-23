import { TreeView } from "@/lib/tree_view";
import { TreeViewComponent } from "./tree_view";
import { miraki } from "@/miraki";

export default {
    'Primary': <TreeViewComponent tree={new TreeView({
       
            name: 'Trello',
            id: 'Trello',
            tooltip: 'Trello board',
            collapsibleState: miraki.TreeView.TreeItemCollapsibleState.Collapsed,
            children: [
                {
                    id: 'Trello-1',
                    name: 'Boar-1',
                }
            ]
        
    })} />,
}