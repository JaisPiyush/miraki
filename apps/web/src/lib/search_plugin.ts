
import React from "react";
import { IPlugin, PluginStore } from "react-pluggable";
import {ComponentUpdatedEvent} from "@miraki/miraki-core"

export default class MirakiSearchPlugin implements IPlugin {

    pluginStore: PluginStore;
    private componentsMap = new Map<string, React.ReactNode[]>()
    private pluginSearchAdapters = new Map<string, (searchText: string) => void>()
    private currentSearchText?: string;


    getPluginName(): string {
        return 'MirakiSearchPlugin'
    }


    addSearchAdapter(pluginId: string, fn: (searchText: string) => void) {
        this.pluginSearchAdapters.set(pluginId, fn);
    }

    removeSearchAdapter(pluginId: string) {
        this.pluginSearchAdapters.delete(pluginId);
    }

    addPluginSearchResults(pluginId: string, searchText: string, components: React.ReactNode[]) {
        if (searchText === this.currentSearchText) {
            this.componentsMap.set(pluginId, components);
            this.pluginStore.dispatchEvent(new ComponentUpdatedEvent("MirakiSearchPlugin.componentUpdate", "search"))
        }
    }

    removePluginSearchResults(pluginId: string) {
        this.componentsMap.delete(pluginId)
    }

    search(searchText?: string) {
        this.currentSearchText = searchText
        this.clearComponentsMap();
        if (searchText && searchText.length > 0) {
            for (const fn of this.pluginSearchAdapters.values()) {
                fn(this.currentSearchText);
            }
        }
    }

    clearComponentsMap() {
        this.componentsMap.clear()
        this.pluginStore.dispatchEvent(new ComponentUpdatedEvent("MirakiSearchPlugin.componentUpdate", "search"))
    }


    getSearchResults() {
        return this.componentsMap;
    }


    getDependencies(): string[] {
        return []
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }
    activate(): void {
        this.pluginStore.addFunction(
            'MirakiSearchPlugin.addSearchAdapter',
            this.addSearchAdapter.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiSearchPlugin.removeSearchAdapter',
            this.removeSearchAdapter.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiSearchPlugin.search',
            this.search.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiSearchPlugin.addSearchResults',
            this.addPluginSearchResults.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiSearchPlugin.removeSearchResults',
            this.removePluginSearchResults.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiSearchPlugin.getSearchResults',
            this.getSearchResults.bind(this)
        )
    }
    deactivate(): void {
        this.pluginStore.removeFunction(
            'MirakiSearchPlugin.addSearchAdapter'
        );

        this.pluginStore.removeFunction(
            'MirakiSearchPlugin.removeSearchAdapter'
        );

        this.pluginStore.removeFunction(
            'MirakiSearchPlugin.search'
        );

        this.pluginStore.removeFunction(
            'MirakiSearchPlugin.addSearchResults'
        );

        this.pluginStore.removeFunction(
            'MirakiSearchPlugin.removeSearchResults'
        );

        this.pluginStore.removeFunction(
            'MirakiSearchPlugin.getSearchResults'
        )
    }
    
}