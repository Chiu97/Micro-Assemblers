
import { isLayoutNode, LayoutNode, Traversable } from "./Models"
import { effect_createLayoutElement } from '../../layout/src/createElement'
import * as R from 'ramda'

const traverseIterator = function* (node: Traversable): IterableIterator<Traversable> {
    let nextNode = node
    let pending: Traversable[] = [node]

    const first = <T>(arr: T[]) => arr[0]

    const nextPending = (node: Traversable) => {
        let nextPending = pending.slice(1)
        return [node, nextPending]
    }

    const pullLayoutChildren = (node: Traversable): [Traversable, Traversable[]] => {
        let layoutPNode = node as LayoutNode
        const { children } = layoutPNode
        const childrenPending: Traversable[] = children.map(cNode => ({
            ...cNode,
            parent: layoutPNode
        }))
        const nextPending = pending.slice(1).concat(childrenPending)
        return [node, nextPending]
    }

    const generateNextPendingAndNode = R.ifElse(
        isLayoutNode,
        pullLayoutChildren,
        nextPending
    )
    
    const next = R.pipe(
        first,
        generateNextPendingAndNode
    )

    do {
        [nextNode, pending] = next(pending)
        if (nextNode) {
            effect_createLayoutElement(nextNode)
            yield nextNode
        }
    } while (nextNode)
}

export default traverseIterator