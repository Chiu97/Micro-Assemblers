declare global {
    interface Window {
        __MicroAssemblesNamespace: {
            UI: Map<string, Map<string, (params?: any) => HTMLElement>>
        }
    }
}

export {}