import * as R from 'ramda'
import Button from './Button'
import Text from './Text'
import DropDown from './DropDown'

const COMPONENTS = [
    { name: 'Button', h: Button },
    { name: 'Text', h: Text },
    { name: 'DropDown', h: DropDown }
]

R.forEach(v => {
    window.__MicroAssemblesNamespace.UI.set(v.name, v.h)
}, COMPONENTS)
