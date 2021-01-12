import * as faker from 'faker'
import { BaseComponentNode, LayoutNode, NodeType } from '../Models'
const r_boolean = faker.random.boolean
const r_num = faker.random.number
const r_id = faker.random.uuid
const r_word = faker.random.word
const r_el = faker.random.arrayElement
const r_cmpName = () => r_el(componentNames)
const r_layoutName = () => r_el(layoutNames)
const componentNames = ["Text", "Button", "Dropdown"]
const layoutNames = ["Center", "Default"]
const buttonTypes = ["Primary", "Secendary"]

const r_textData = () => {
    return {
        value: r_word(),
        title: r_word()
    }
}

const r_buttonData = () => {
    return {
        title: faker.random.word(),
        type: faker.random.arrayElement(buttonTypes)
    }
}

const r_dropdownData = () => Array.from({length: r_num(3)+1}, () => ({...r_textData(), id: r_id(), isSelected: r_boolean()}))

const r_cmpModalTree = () => {
    const sz = r_num(3) + 1
    const rootChildren = Array.from({length: sz}, () => r_layoutNode())
    const rootLayout: LayoutNode = {
        _id: r_id(),
        $$type: NodeType.LAYOUT,
        layoutName: 'RootLayoutNode',
        children: rootChildren
    }
    return rootLayout
}

const r_layoutNode = (): LayoutNode => {
    const createRandomNumsOfComponentNode = () => Array.from({length: r_num(3)+1}, () => r_componentNode())
    return {
        _id: r_id(),
        $$type: NodeType.LAYOUT,
        layoutName: r_layoutName(),
        children: createRandomNumsOfComponentNode()
    }
}

const r_componentNode = (): BaseComponentNode => {
    const cmpName = r_cmpName()
    return {
        _id: r_id(),
        cmpName,
        $$type: NodeType.COMPONENT,
        payload: r_componentpayloadByComponentName(cmpName)
    }
}

const r_componentpayloadByComponentName = (cmpName: string): Object => {
    switch (cmpName) {
        case 'Text':
            return r_textData()
        case 'Button':
            return r_buttonData()
        case 'Dropdown':
            return r_dropdownData()
        default:
            return {}
    }
}

export const fetchDataWithoutParams = (ms=0) => {
    return new Promise<LayoutNode>(res => {
        setTimeout(() => res(r_cmpModalTree()), ms)
    })
}

