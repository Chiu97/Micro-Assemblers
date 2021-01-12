import * as R from 'ramda'

export const iteratorToArray = <T>(iter: IterableIterator<T>) => {
    let cv = iter.next().value
    let res: T[] = []
    while (cv) {
        res.push(cv)
        cv = iter.next().value
    }

    return res
}

export const getComponentStateMap = () => window.__MicroAssemblesNamespace.componentStateMap

export const getUI = () => window.__MicroAssemblesNamespace.UI

const __appendChild = (container: HTMLElement, el: HTMLElement) => {
    container.appendChild(el)
}

export const appendChild = R.curry(__appendChild)