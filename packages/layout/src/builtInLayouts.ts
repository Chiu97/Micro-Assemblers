import * as R from 'ramda'

const createEl = <T>(tagName) => {
    const el = document.createElement(tagName) as T
    return el
}

const effect_addCls = (classes: string[], el: HTMLElement) => {
    classes.forEach(cls => el.classList.add(cls))
}

const c_addCls = R.curry(effect_addCls)

interface LayoutGenerator<T> {
    (): T
}

type DIVLayout = LayoutGenerator<HTMLDivElement>

const BaseElGenerator = <T>(classes: string[], tagName='div') => {
    const defaultCls = R.tap(c_addCls(classes))
    const defaultLayout = R.pipe(
        createEl,
        defaultCls
    )
    return defaultLayout(tagName) as T
}

const Default: DIVLayout = () => BaseElGenerator(['Layout__Default'])

const Center: DIVLayout = () => BaseElGenerator(['Layout__Center'])

interface Layouter {
    [key: string]: () => HTMLElement
}

const LayoutConfig = {
    Default, Center
}

const Layouts: Layouter = {}
for (let key in LayoutConfig) {
    Layouts[key] = LayoutConfig[key]
}

export const getLayoutFnByName = (layoutname: string) => R.prop(layoutname, Layouts) || Layouts["Default"]

export default Layouts