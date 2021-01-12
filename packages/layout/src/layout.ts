import { LayoutNode } from './../../core/src/Models';
import { getLayoutFnByName } from './builtInLayouts'
import * as R from 'ramda'

const setupLayout = (dataSource: LayoutNode) => {

}

const defaultLayout = getLayoutFnByName('Default')()
console.log(defaultLayout)