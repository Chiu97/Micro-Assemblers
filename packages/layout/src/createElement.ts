import { Traversable, isLayoutNode, LayoutNode } from './../../core/src/Models';
import { getLayoutFnByName } from './builtInLayouts';
import * as R from 'ramda'

export const createEl = (tagName: string) => {
    return document.createElement(tagName)
}

/**
 * @description create element for <layoutNode> and set it as <layoutNode> domEl attribute
 */
export const effect_createLayoutElement = (node: Traversable): HTMLElement|null => {
    if (!isLayoutNode(node)) return null

    let layoutNode = node as LayoutNode
    const layoutEl = getLayoutFnByName(layoutNode.layoutName)(layoutNode.layoutProps)
    layoutNode.domEl = layoutEl
    const parentDomEl = R.path(['parent', 'domEl'], layoutNode) as HTMLElement
    if (parentDomEl) {
        console.log({
            parentDomEl
        })
        parentDomEl.appendChild(layoutEl)
    }

    return layoutEl
}
