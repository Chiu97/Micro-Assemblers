import * as R from 'ramda'

export const createEl = (tagName: string) => {
    return document.createElement(tagName)
}

const addClassList = (classes: string[], el: HTMLElement) => {
    classes.forEach(cls => el.classList.add(cls))
    return el
}

export const BaseElGenerator = <T>(classes: string[] = [], tagName='div') => {
    const _addCls = R.curry(addClassList)(classes)
    const main = R.pipe(
        createEl,
        _addCls
    )

    return main(tagName)
}
