import useForceUpdate from "@/hooks/useForceUpdate";
import React, { useEffect } from "react";
import { usePluginStore } from "react-pluggable";

export const MirakiSidebarView: React.FC = () => {
    const pluginStore = usePluginStore();
    const forceUpdate = useForceUpdate();

    // useEffect(() => {
    //     const eventListener = (event: Component)
    // })
}