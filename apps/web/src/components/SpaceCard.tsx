import { Space } from "@/lib/api/types";
import { Card, CardContent, } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import CircularProgressIndicator from "./circular_progress_indicator";
import { useToast } from "./ui/use-toast";

interface SpaceCardProp{
    space: Space;
    hasJoinedSpace: boolean;
    onJoinClick:  (spaceId: number) => Promise<void>;
}

export default function SpaceCard(props: SpaceCardProp) {

    const [showLoading, setShowLoading] = useState(false)
    const {toast} = useToast()

    const handleOnJoinClick = async () => {
        try {
            setShowLoading(true)
            await props.onJoinClick(props.space.id);
            setShowLoading(false)
        } catch (err) {
            setShowLoading(false)
            toast({
                title: err.response.data.detail
            })
        }
    }
    return <Card className="h-[12rem]">
        <CardContent>
            <div className="w-full flex flex-col items-center pt-10">
                <Avatar className="cursor-pointer">
                            <AvatarImage  src={props.space.avatar || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-xs mt-4">{props.space.name}</p>
                {
                    props.hasJoinedSpace
                    ? <></>
                    :showLoading
                        ? <Button variant="outline"><CircularProgressIndicator/></Button>
                        :<Button onClick={() => {handleOnJoinClick()}} variant="outline" className="mt-4">Join</Button>
                }
            </div>
        </CardContent>
    </Card>
}