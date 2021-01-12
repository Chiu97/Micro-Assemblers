import * as R from 'ramda'
import { createEl } from './createElement'

const effect_addCls = (classes: string[], el: HTMLElement) => {
    classes.forEach(cls => el.classList.add(cls))
}

const c_addCls = R.curry(effect_addCls)

interface LayoutGenerator<T> {
    (params?: any): T
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

const Root: DIVLayout = () => BaseElGenerator(['Layout__Root'])

const Default: DIVLayout = () => BaseElGenerator(['Layout__Default'])

const Center: DIVLayout = () => BaseElGenerator(['Layout__Center'])

interface Layouter {
    [key: string]: (params?: any) => HTMLElement
}

const LayoutConfig: Layouter  = {
    Default, Center, Root
}

const Layouts: Layouter = {}
for (let key in LayoutConfig) {
    Layouts[key] = LayoutConfig[key]
}

export const getLayoutFnByName = (layoutname: string) => R.prop(layoutname, Layouts) || Layouts["Default"]

export default Layouts