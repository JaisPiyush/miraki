import AppCard from "@/components/AppCard";
import NavigationHeader from "@/components/navigation_header";
import { AppRepository } from "@/lib/app_repository";
import { ProfileSpaceStateContext } from "@/states/profile_space.state";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const appRepository = new AppRepository();
appRepository.initAppRecord();

function _AppsView() {
    const profileSpaceState = useContext(ProfileSpaceStateContext);
    const apps = appRepository.getApps();
    console.log('rebuilt', profileSpaceState.selectedSpace?.id)

    return <div className="w-full h-full bg-background flex flex-col">
            <NavigationHeader />
            <div className="w-full h-[90%] bg-background flex justify-center pt-10">
                <div className="w-[75%] h-auto grid grid-cols-3 gap-4">
                    {
                        apps.map((app) => <AppCard app={app} key={app.name} />)
                    }
                </div>
            </div>
    </div>
}

const AppsView = observer(_AppsView)
export default AppsView;