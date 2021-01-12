import { WithStateComponentNode } from "./Models";

declare global {
    interface Window {
        __MicroAssemblesNamespace: {
            UI: Map<string, (params: any) => HTMLElement>,
            componentStateMap: Map<string, WithStateComponentNode<any>>,
        }
    }
}

export {}