
import { Traversable } from "./Models"

const traverseIterator = function* (node: Traversable): IterableIterator<Traversable> {
    let nextNode = node
    let pending = []
    
    while (nextNode) {
        yield nextNode
        if (nextNode.hasOwnProperty('children')) {
            pending.push(...nextNode['children'])
        }
        if (pending.length==0) return 
        nextNode = pending.shift()
    }
}

export default traverseIterator