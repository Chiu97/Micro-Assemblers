// Data dispatch to corresponsive component, different component should hold their init data.
// It's completely non-sense if you keep all controlled data in a global reposity like redux.Which is simple but might comes with perf problem.
// If you make greate model, the web app should work with low or even no extra code(Extension Code).
// @todo Provide a global data storge api, for data that should be share among different components.

import traverseIterator from './traverse'
import { createComponentContolledState } from "../../pipe/src/index"
import { assertTo, BaseComponentNode, LayoutNode, StateMachine, WithStateComponentNode, Traversable } from "./Models"
import * as R from 'ramda'
import { iteratorToArray } from './utils'
import { fetchDataWithoutParams } from './__mocks__/BasicAPI'

const componentStateMap = new Map<string, WithStateComponentNode<any>>()
const componentStateMapGuard = {
    set(_id: string, state: any) {
        if (componentStateMap.has(_id)) {
            throw new Error('Each component should has unique id')
        }
        componentStateMap.set(_id, state)
    },
    get(_id: string) {
        return componentStateMap.get(_id)
    }
}

export const setupComponentNodeMap = (dataSource: LayoutNode) => {

    const attachStateMachine = (node: BaseComponentNode): WithStateComponentNode<any> => {
        const { payload } = node
        const [updateState, stateIn$] = createComponentContolledState(payload)
        let stateMachine: StateMachine<any> = {
            mapState: R.identity,
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
    const componentAttachStatePipeline = R.pipe(
        R.map(assertToBaseComponentNode),
        R.map(attachStateMachine),
        R.map(R.tap(effect_setComponentStateMapGuard))
    )
    
    const treeArray = R.pipe(
        traverseIterator,
        iteratorToArray
    )(dataSource)

    const main = R.pipe(
        componentAttachStatePipeline
    )

    const components = main(treeArray)
    const rootNode= treeArray[0] as LayoutNode
    return {
        components,
        rootNode
    }
}