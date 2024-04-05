import { Space } from "@/lib/api/types";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "./ui/button";

interface SpaceListItemProp {
    space: Space;
    selectedSpaceId?: number;
    onSelect?: (space: Space) => void;
}

export default function SpaceListItem(props: SpaceListItemProp) {



    return <div onClick={() => {
        if (props.onSelect) {
            props.onSelect(props.space);
        }
    }} className="w-full flex items-center border  rounded-md p-4 mt-4">
                <Avatar className="cursor-pointer">
                        <AvatarImage src={props.space.avatar || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="ml-4 cursor-default">{props.space.name}</p>
                {
                    props.selectedSpaceId === props.space.id
                    ? <Button variant="ghost" className="text-green-400">Connected</Button>
                    : <></>
                }

    </div>
}