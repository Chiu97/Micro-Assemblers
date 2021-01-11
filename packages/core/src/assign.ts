// Data dispatch to corresponsive component, different component should hold their init data.
// It's completely non-sense if you keep all controlled data in a global reposity like redux.Which is simple but might comes with perf problem.
// If you make greate model, the web app should work with low or even no extra code(Extension Code).
// @todo Provide a global data storge api, for those data of big size share requirement.(Even though it's not necessary)

import traverseIterator from './traverse'
import { createComponentContolledState } from "../../pipe/src/index"
import { assertTo, BaseComponentNode, isComponentNode, LayoutNode, StateMachine, WithStateComponentNode, Traversable } from "./Models"
import { fetchDataWithoutParams } from './__mocks__/BasicAPI'
import R from 'ramda'
import { iteratorToArray } from './utils'

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

export const setupComponentNodeMap = (dataSource: LayoutNode) => {

    const attachStateMachine = (node: BaseComponentNode): WithStateComponentNode<any> => {
        const { payload } = node
        const [updateState, stateIn$] = createComponentContolledState(payload)
        let stateMachine: StateMachine<any> = {
            mapState: identity,
            updateState,
            stateIn$
        }
        return {...node, stateMachine}
    }

    const effect_setComponentStateMapGuard = (node: WithStateComponentNode<any>) => {
        const { _id } = node
        componentStateMapGuard.set(_id, node)
    }

    const assertToBaseComponentNode = (node: Traversable) => assertTo<BaseComponentNode>(node)

    const main = R.pipe(
        traverseIterator,
        iteratorToArray,
        R.filter(isComponentNode),
        R.map(assertToBaseComponentNode),
        R.map(attachStateMachine),
        R.map(R.tap(effect_setComponentStateMapGuard))
    )

    return main(dataSource)
}

const TestComponentStateMachineAttatch = async () => {
    const dataSource = await fetchDataWithoutParams()
    setupComponentNodeMap(dataSource)
}

TestComponentStateMachineAttatch()