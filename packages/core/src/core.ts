import { renderRoot } from './../../layout/src/render';
import { setupComponentNodeMap } from "./assign"
import { LayoutNode, WithStateComponentNode } from "./Models"
import { fetchDataWithoutParams } from "./__mocks__/BasicAPI"
import * as R from 'ramda'
import { appendChild, getComponentStateMap, getUI } from './utils';

const start = async (dataSource: LayoutNode) => {

    const main = R.pipe(
        setupComponentNodeMap,
        R.prop('rootNode'),
        R.tap(renderRoot)
    )

    main(dataSource)

    setTimeout(process_renderComponents)
}

const process_renderComponents = async () => {
    const mapTypeForEach = <V, K>(forEach: (node: V, key: K) => void,map: Map<K, V>) => {
        map.forEach((val, key) => {
            forEach(val, key)
        })
        return map
    }

    const process_renderComponent = (node: WithStateComponentNode<any>) => {
        renderComponent(node)
    }

    const main = R.pipe(
        getComponentStateMap,
        R.curry(mapTypeForEach)(process_renderComponent)
    )

    main()
}

const renderComponent = (node: WithStateComponentNode<any>) => {
    const { parent: { domEl: container }, cmpName, payload } = node
    const UIComponent = getUI().get(cmpName)
    if (!UIComponent) return
    const containerAppendChild = appendChild(container)
    const render = R.pipe(
        UIComponent,
        containerAppendChild
    )

    render(payload)
}

const TestComponentStateMachineAttatch = async () => {
    const dataSource = await fetchDataWithoutParams()
    start(dataSource)
}

TestComponentStateMachineAttatch()