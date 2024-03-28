import { IPlugin } from "react-pluggable";
import { PluginStore } from "react-pluggable";
import { MirakiPeripheralsComponent } from "../components/miraki/miraki_peripherals";
import React from "react";
import { miraki } from "@/miraki";
import { MirakiSingleInputDialog } from "@/components/miraki/input_dialog";
import ComponentUpdatedEvent from "@/events/ComponentUpdatedEvent";

export class MirakiPeripheralsPlugin implements IPlugin {
    public pluginStore: PluginStore = new PluginStore();
    private componentMap = new Map<string, React.ReactNode>();

    getPluginName(): string {
        return 'MirakiPeripheralsPlugin@1.0.0';
    }

    getDependencies(): string[] {
        return [];
    }

    init(pluginStore: PluginStore): void {
        this.pluginStore = pluginStore;
    }

    setComponent(key: string, node: React.ReactNode): void {
        this.componentMap.set(key, node);
        this.pluginStore.dispatchEvent(
            new ComponentUpdatedEvent('MirakiPeripheralsComponent.componentUpdated', "peripheral")
        );
    }

    removeComponent(key: string): void {
        this.componentMap.delete(key);
        console.log('removing')
        this.pluginStore.dispatchEvent(
            new ComponentUpdatedEvent('MirakiPeripheralsComponent.componentUpdated', "peripheral")
        );
    }

    setDialogComponent(node: React.ReactNode): void {
        this.setComponent('dialog', node);
    }

    removeDialogComponent(): void {
        this.removeComponent('dialog');
    }

    setToastComponent(node: React.ReactNode): void {
        this.setComponent('toast', node);
    }

    removeToastComponent(): void {
        this.removeComponent('toast');
    }

    getDialogComponent(): React.ReactNode | undefined {
        return this.componentMap.get('dialog');
    }

    getToastComponent(): React.ReactNode | undefined {
        return this.componentMap.get('toast');
    }

    getComponent() {
        return MirakiPeripheralsComponent;
    }

    activate(): void {
        this.pluginStore.addFunction(
            'MirakiPeripheralsComponent.getDialogComponent',
            this.getDialogComponent.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiPeripheralsComponent.getToastComponent',
            this.getToastComponent.bind(this)
        );
        this.pluginStore.addFunction(
            'MirakiPeripheralsComponent.setDialogComponent',
            this.setDialogComponent.bind(this)
        );
        this.pluginStore.addFunction(
            'MirakiPeripheralsComponent.removeDialogComponent',
            this.removeDialogComponent.bind(this)
        );
        this.pluginStore.addFunction(
            'MirakiPeripheralsComponent.setToastComponent',
            this.setToastComponent.bind(this)
        );
        this.pluginStore.addFunction(
            'MirakiPeripheralsComponent.removeToastComponent',
            this.removeToastComponent.bind(this)
        );

        this.pluginStore.addFunction(
            'MirakiPeripheralsComponent.showSingleInputModal',
            (args: miraki.MirakiSidebarTreeNodePlugin.showInputModalArgs) => {
                args.onClose = () => {
                    this.removeDialogComponent();
                    if (args.onClose) {
                        args.onClose();
                    }
                }
                this.pluginStore.executeFunction(
                    'MirakiPeripheralsComponent.setDialogComponent',
                    () => {
                        return <MirakiSingleInputDialog showInputModalArgs={args} />
                    }
                )
            }
        )
    }



    deactivate(): void {
        this.pluginStore.removeFunction('MirakiPeripheralsComponent.getDialogComponent');
        this.pluginStore.removeFunction('MirakiPeripheralsComponent.getToastComponent');
        this.pluginStore.removeFunction('MirakiPeripheralsComponent.setDialogComponent');
        this.pluginStore.removeFunction('MirakiPeripheralsComponent.removeDialogComponent');
        this.pluginStore.removeFunction('MirakiPeripheralsComponent.setToastComponent');
        this.pluginStore.removeFunction('MirakiPeripheralsComponent.removeToastComponent');
        this.pluginStore.removeFunction('MirakiPeripheralsComponent.showSingleInputModal');
        
    }

}

