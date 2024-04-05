import { IPlugin } from "react-pluggable";
import { PluginStore } from "react-pluggable";
import ComponentUpdatedEvent from "../events/ComponentUpdatedEvent";
import { MirakiView } from "../components/miraki/miraki_view";
import React from "react";



export class MirakiViewPlugin implements IPlugin {

    name = "MirakiViewPlugin@1.0.0";
    public pluginStore: PluginStore  = new PluginStore();
    private view?: React.ComponentClass


    getPluginName() {
        return this.name;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore) {
        this.pluginStore = pluginStore;
    }


    setView(view: React.ComponentClass) {
        this.view = view;
        this.pluginStore.dispatchEvent(new ComponentUpdatedEvent('MirakiView.componentUpdated', "view_container"));
    }

    removeView() {
        this.view = undefined;
        this.pluginStore.dispatchEvent(new ComponentUpdatedEvent('MirakiView.componentUpdated', "view_container"));
    }

    getComponent() {
        return MirakiView;
    }


    activate(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        // const self = this;
        this.pluginStore.addFunction(
            'MirakiView.getView',
            () => {
                return this.view
            }
        );

        this.pluginStore.addFunction(
            'MirakiVew.set',
            this.setView.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiView.remove',
            this.removeView.bind(this)
        )


    }

    deactivate(): void {
        this.pluginStore.removeFunction('MirakiView.getView');
        this.pluginStore.removeFunction('MirakiView.set');
        this.pluginStore.removeFunction('MirakiView.remove');
    }
    

}