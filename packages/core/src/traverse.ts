
import { Traversable } from "./Models"
import R from 'ramda'

const traverseIterator = function* (node: Traversable): IterableIterator<Traversable> {
    let nextNode = node
    let pending: Traversable[] = [node]

    const first = <T>(arr: T[]) => arr[0]
    const putNodeChildrenToPending = (node: Traversable): [Traversable, Traversable[]] => {
        let nextPending = pending.slice(1)
        if (node&&node.hasOwnProperty('children')) {
            nextPending = nextPending.concat(node['children'])
        }
        return [node, nextPending]
    }
    
    const next = R.pipe(
        first,
        putNodeChildrenToPending
    )

    do {
        [nextNode, pending] = next(pending)
        if (nextNode) {
            yield nextNode
        }
    } while (nextNode)
}

export default traverseIterator