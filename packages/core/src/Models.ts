import { StateDispatcher, MapAfterDispatchState, TunnelStateInSubject } from '../../pipe/src/index'

export enum NodeType {
    LAYOUT,
    COMPONENT
}

export interface BaseComponentNode {
    _id: string
    cmpName: string,
    $$type: NodeType.COMPONENT,
    payload?: any,
    parent?: LayoutNode,
    el?: HTMLElement
}

export type StateMachine<S> = {
    updateState: StateDispatcher<S>,
    mapState: MapAfterDispatchState<S>,
    stateIn$: TunnelStateInSubject<S>  
}

export interface WithStateComponentNode<S> extends BaseComponentNode {
    stateMachine: StateMachine<S>
}

export interface LayoutNode {
    _id: string
    $$type: NodeType.LAYOUT
    layoutName: string
    children: (WithStateComponentNode<any>|BaseComponentNode|LayoutNode)[],
    domEl?: HTMLElement,
    layoutProps?: any,
    parent?: LayoutNode|null
}

export const isComponentNode = (node: unknown) => {
    if (node && typeof node == 'object' && node.hasOwnProperty('$$type')) {
        return (node as any)['$$type'] == NodeType.COMPONENT
    }

    return false
}

export const isLayoutNode = (node: unknown) => {
    if (node && typeof node == 'object' && node.hasOwnProperty('$$type')) {
        return (node as any)['$$type'] == NodeType.LAYOUT
    }

    return false
}

export const assertTo = <T>(v: unknown) => v as T 

export type Traversable = LayoutNode|BaseComponentNode