import { AppDetails } from "@/lib/app_repository";
import { Card, CardContent, } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "@/components/ui/switch"
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { ProfileSpaceStateContext } from "@/states/profile_space.state";

interface AppCardProps {
    app: AppDetails
}

function _AppCard(props: AppCardProps) {

    const profileSpaceState = useContext(ProfileSpaceStateContext);

    const handleSwitchValueChange = async (val: boolean) => {
        if (val) {
            await profileSpaceState.addApp(props.app.id);
        } else {
            await profileSpaceState.removeApp(props.app.id);
        }

    }

    const installedApps = profileSpaceState.selectedSpace?.settings?.apps || [];

    return <div className="h-auto w-full">
                <Card >
                    <CardContent className="pt-4 flex items-center h-full justify-between">
                            <Avatar>
                                <AvatarImage  src={props.app.avatar || "https://github.com/shadcn.png"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        <div className="h-full flex flex-col">
                            <p className="text-sm font-semibold">{props.app.name}</p>
                            <p className="text-xs font-light mt-1">{props.app.description}</p>
                        </div>
                        <Switch 
                            id={props.app.name} 
                            checked={installedApps.includes(props.app.id)}
                            onCheckedChange={handleSwitchValueChange}
                        />
                    </CardContent>
                </Card>
    </div>
}

const AppCard = observer(_AppCard);
export default AppCard;