import ComponentUpdatedEvent from "../../events/ComponentUpdatedEvent";
import useForceUpdate from "../../hooks/useForceUpdate";
import React, { useEffect } from "react";
import { usePluginStore } from "react-pluggable";

import { ScrollArea } from "../../components/ui/scroll-area"

export const MirakiView: React.FC = () => {
    const pluginStore = usePluginStore();
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        const eventListener = (event: ComponentUpdatedEvent) => {
            if (event.position === "view_container") {

                forceUpdate();
            }
        };
        pluginStore.addEventListener('MirakiView.componentUpdated', eventListener);

        return () => {
            pluginStore.removeEventListener('MirakiView.componentUpdated', eventListener);
        }
    }, [pluginStore, forceUpdate]);

    const View: React.ComponentClass | undefined = pluginStore.executeFunction(
        'MirakiView.getView',
    );

    return (
        <ScrollArea className="h-full w-full">
            <div>
                {
                    View !== undefined
                    ? <View />
                    : <></>
                }
            </div>
        </ScrollArea>
    )
}