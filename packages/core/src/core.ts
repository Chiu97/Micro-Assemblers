import { renderRoot } from './../../layout/src/render';
import { setupComponentNodeMap } from "./assign"
import { LayoutNode } from "./Models"
import { fetchDataWithoutParams } from "./__mocks__/BasicAPI"

const start = async (dataSource: LayoutNode) => {
    const { rootNode } = setupComponentNodeMap(dataSource)
    renderRoot(rootNode)
}

const TestComponentStateMachineAttatch = async () => {
    const dataSource = await fetchDataWithoutParams()
    start(dataSource)
}

TestComponentStateMachineAttatch()