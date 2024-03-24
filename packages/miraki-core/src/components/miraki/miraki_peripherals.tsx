import ComponentUpdatedEvent from "@/events/ComponentUpdatedEvent";
import useForceUpdate from "@/hooks/useForceUpdate";
import React, { useEffect } from "react";
import { usePluginStore } from "react-pluggable";

export const MirakiPeripheralsComponent: React.FC = () => {
    const pluginStore = usePluginStore();
    const forceUpdate = useForceUpdate();


    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const eventListener = (event: ComponentUpdatedEvent) => {
            if (event.position === "peripheral") {
                forceUpdate();
            }
        }

        pluginStore.addEventListener('MirakiPeripheralsComponent.componentUpdated', eventListener);

        return () => {
            pluginStore.removeEventListener('MirakiPeripheralsComponent.componentUpdated', eventListener);
        }
    }, [pluginStore, forceUpdate]);

    const DialogComponent: React.FC | undefined = pluginStore.executeFunction(
        'MirakiPeripheralsComponent.getDialogComponent',
    );

    const ToastComponent: React.FC | undefined = pluginStore.executeFunction(
        'MirakiPeripheralsComponent.getToastComponent',
    );

    return (
        <>
            {DialogComponent === undefined ?
                <></>
                : <DialogComponent />
            }
            {ToastComponent}
        </>
    )
    
}