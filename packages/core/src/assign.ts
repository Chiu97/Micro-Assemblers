// Data dispatch to corresponsive component, different component should hold their init data.
// It's completely non-sense if you keep all controlled data in a global reposity like redux.Which is simple but might comes with perf problem.
// If you make greate model, the web app should work with low or even no extra code(Extension Code).
// @todo Provide a global data storge api, for those data of big size share requirement.(Even though it's not necessary)

import { fetchDataWithoutParams } from "./__mocks__/BasicAPI"
import traverseIterator from './traverse'
import { createComponentContolledState } from "../../pipe/src/index"
import { assertTo, BaseComponentNode, isComponentNode, LayoutNode, StateMachine, WithStateComponentNode } from "./Models"

const identity = (v: unknown) => v
const componentStateMap = new Map<string, WithStateComponentNode<any>>()
const componentStateMapGuard = {
    set(_id, state: any) {
        if (componentStateMap.has(_id)) {
            throw new Error('Each component should has unique id')
        }
        componentStateMap.set(_id, state)
    },
    get(_id) {
        return componentStateMap.get(_id)
    }
}

export const componentStateMachineAttatch = (dataSource: LayoutNode) => {
    const nodeIterator = traverseIterator(dataSource)

    for (let node of nodeIterator) {
        if (isComponentNode(node)) {
            const _node = assertTo<BaseComponentNode>(node)
            const { _id, payload } = _node
            const [updateState, stateIn$] = createComponentContolledState(payload)
            let stateMachine: StateMachine<any>
            stateMachine = {
                mapState: identity,
                updateState,
                stateIn$
            }
            const componentNodeWithStateMachine: WithStateComponentNode<any> = {
                ..._node,
                stateMachine
            }

            componentStateMapGuard.set(_id, componentNodeWithStateMachine)
        }
    }
}

// const TestComponentStateMachineAttatch = async () => {
//     const dataSource = await fetchDataWithoutParams()
//     componentStateMachineAttatch(dataSource)
// }

// TestComponentStateMachineAttatch()