
import { Traversable } from "./Models"
import { fetchDataWithoutParams } from "./__mocks__/BasicAPI"

const testData = async () => {
    const dataSource = await fetchDataWithoutParams()
    console.log(dataSource)
    const iterator = traverseIterator(dataSource)

    for (let node of iterator) {
        console.log(node)
    }
}

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

testData()