import { BaseElGenerator } from './utils'
import * as R from 'ramda'

const tmpl = (data: Pick<IProps, 'value'|'title'>) => (
    `
        <span>Title: ${data.title}</span>
        <span>Value: ${data.value}</span>
    `
)

interface CP_Text {
    value: string,
    title: string
}

interface IProps extends CP_Text {}

const Text = (props: IProps) => {
    const TextWrapper = BaseElGenerator(['Micro_Text'])
    TextWrapper.innerHTML = tmpl(R.pick(['value', 'title'], props))

    return TextWrapper
}

export default Text