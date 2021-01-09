import { StateDispatcher, MapAfterDispatchState, TunnelStateInSubject } from '../../pipe/src/index'

export enum NodeType {
    LAYOUT,
    COMPONENT
}

export interface BaseComponentNode {
    _id: string
    cmpName: string,
    $$type: NodeType.COMPONENT,
    payload?: any
}

export type StateMachine<S> = {
    updateState: StateDispatcher<S>,
    mapState: MapAfterDispatchState<S>,
    stateIn$: TunnelStateInSubject<S>  
}

export interface WithStateComponentNode<S> extends BaseComponentNode {
    stateMachine: StateMachine<S>
}

interface LayoutProps {}

export interface LayoutNode {
    _id: string
    $$type: NodeType.LAYOUT
    layoutName: string
    children: (WithStateComponentNode<any>|BaseComponentNode|LayoutNode)[],
    layoutProps?: LayoutProps
}

export const isComponentNode = (node: unknown) => {
    if (node && typeof node == 'object' && '$$type' in node) {
        return node['$$type']== NodeType.COMPONENT
    }

    return false
}

export const assertTo = <T>(v: unknown) => v as T 

export type Traversable = LayoutNode|BaseComponentNode