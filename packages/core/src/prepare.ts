const prepare = () => {
    window.__MicroAssemblesNamespace = {
        UI: new Map(),
        componentStateMap: new Map()
    }
}

prepare()

export default prepare