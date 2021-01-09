import faker from 'faker'
import { BaseComponentNode, LayoutNode } from '../Models'
const r_boolean = faker.random.boolean
const r_num = faker.random.number
const r_id = faker.random.uuid
const r_word = faker.random.word
const r_el = faker.random.arrayElement
const r_cmpName = () => r_el(componentNames)
const r_layoutName = () => r_el(layoutNames)
const componentNames = ["Text", "Button", "Dropdown"]
const layoutNames = ["Center", "VCenter", "RCenter", "Default"]
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

const r_dropdownData = (): Object[] => {
    const maxSz = r_num(5)
    const arr = []
    for (let i=0; i<maxSz; i++) {
        arr.push({...r_textData(), id: r_id()})
    }
    return arr
}


const r_cmpModalTree = () => {
    faker.random.arrayElement(componentNames)
    for (let i=0; i<1; i++) {
        console.log(r_layoutNode())
    }
}

const r_layoutNode = (): LayoutNode => {
    const createRandomNumsOfComponentNode = () => Array.from({length: r_num(3)}, () => r_componentNode())
    return {
        _id: r_id(),
        layoutName: r_layoutName(),
        children: createRandomNumsOfComponentNode()
    }
}

const r_componentNode = (): BaseComponentNode => {
    const cmpName = r_cmpName()
    return {
        _id: r_id(),
        cmpName,
        rawData: r_componentRawdataByComponentName(cmpName)
    }
}

const r_componentRawdataByComponentName = (cmpName: string): Object => {
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

export const fetchDataWithoutParams = () => {
    
}

r_cmpModalTree()