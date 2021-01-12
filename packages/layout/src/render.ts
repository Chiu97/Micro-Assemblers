import { LayoutNode } from "../../core/src/Models"


type RenderRoot = (node: LayoutNode, container?: HTMLElement) => void

export const renderRoot: RenderRoot = (node, container) => {
    const mountNode = container || document.body
    mountNode.appendChild(node.domEl)
}