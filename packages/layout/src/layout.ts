import { LayoutNode } from './../../core/src/Models';
import { getLayoutFnByName } from './builtInLayouts'

const setupLayout = (dataSource: LayoutNode) => {

}

const defaultLayout = getLayoutFnByName('Default')()
console.log(defaultLayout)