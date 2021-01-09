import { StateDispatcher, MapAfterDispatchState, TunnelStateInSubject } from '@micro-assemblers/pipe'
/**
 * @description 元数据的模型, 类似HTML的树型结构
 */
export interface MetaData {
    
}

export interface BaseComponentNode {
    _id: string
    cmpName: string
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
