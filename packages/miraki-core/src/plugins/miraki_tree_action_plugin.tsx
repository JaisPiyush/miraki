i
import { IPlugin } from "react-pluggable";
import { PluginStore } from "react-pluggable";



export class MirakiSidebarViewPlugin implements IPlugin {

    name = "MirakiSidebarViewPlugin@1.0.0";
    public pluginStore: PluginStore  = new PluginStore();


    getPluginName() {
        return this.name;
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore) {
        this.pluginStore = pluginStore;
    }



    activate(): void {

    }

    deactivate(): void {

    }
    

}