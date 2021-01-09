import { StateDispatcher, MapAfterDispatchState, TunnelStateInSubject } from '@micro-assemblers/pipe'

export interface BaseComponentNode {
    _id: string
    cmpName: string,
    rawData?: any
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
    layoutName: string
    children: (WithStateComponentNode<any>|BaseComponentNode)[],
    layoutProps?: LayoutProps
}
