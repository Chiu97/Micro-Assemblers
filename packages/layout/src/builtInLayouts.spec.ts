import Layouts, { getLayoutFnByName } from './builtInLayouts'
import { expect, test, describe } from '@jest/globals';

describe('Layout Testing', () => {
    const DEFAULT_LAYOUT = 'Default'
    test('It should get layout when name is in builtin layouts', () => {
        const layoutName = 'Center'
        const elFn = getLayoutFnByName(layoutName)
        expect(elFn).toBe(Layouts[layoutName])
        const el = elFn()
    })

    test('It should returns element with correct classname', () => {
        const layoutName = 'Center'
        const el = getLayoutFnByName(layoutName)()
        expect(el.classList.contains('Layout__Center')).toBe(true)
    })

    test('It should return default layout when pass non exist layoutname', () => {
        const LayoutName = 'Not_Exist'
        expect(getLayoutFnByName(LayoutName)).toEqual(Layouts[DEFAULT_LAYOUT])
    })
})