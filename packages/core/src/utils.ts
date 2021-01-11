export const iteratorToArray = <T>(iter: IterableIterator<T>) => {
    let cv = iter.next().value
    let res: T[] = []
    while (cv) {
        res.push(cv)
        cv = iter.next().value
    }

    return res
}