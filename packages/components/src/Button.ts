import * as R from 'ramda'
import { BaseElGenerator } from './utils'
const tmpl = (data: Pick<IProps, 'title'|'type'>) => (
    `<button>${data.title}</button>`
)

interface CP_Button {
    title: string,
    type: "Primary"|"Secondary" 
}

interface IProps extends CP_Button{}

function Button (props: IProps) {
    const buttonWrapper = BaseElGenerator(['micro-button'])
    buttonWrapper.innerHTML = tmpl(R.pick(['title', 'type'], props))
    return buttonWrapper
}

export default Button