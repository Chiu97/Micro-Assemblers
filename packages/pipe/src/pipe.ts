import { Subject } from "rxjs"

// Type alias for Subject, to emphasize tha StateDispatcher is use for component to dispatch an update state request
export type StateDispatcher<T> = Subject<T>
// Type TunnelStateInSubject is where dispatch state flows, you can intercept and change state by providing bizExtend function here.
export type TunnelStateOutSubject<T> = Subject<T>
// Type TunnelStateInSubject is where component finally receive it's controlled state.
export type TunnelStateInSubject<T> = Subject<T>
// Type alias for component state map, for flexibility usage
export type MapAfterDispatchState<T> = (val: T) => T

export function SubjectFactory<T>() {
    return new Subject<T>()
}


export type CreateComponentContolledState = <T>(initailControlledState: T, bizExtend?: MapAfterDispatchState<T>) => [StateDispatcher<T>, TunnelStateInSubject<T>]
const createComponentContolledState: CreateComponentContolledState = <T>(initailControlledState: T, bizExtend?: MapAfterDispatchState<T>) => {
    const stateDispatcher$: StateDispatcher<T> = SubjectFactory()
    const stateOut$: TunnelStateOutSubject<T> = SubjectFactory()
    const stateIn$: TunnelStateInSubject<T> = SubjectFactory()

    stateDispatcher$.subscribe({
        next: v => stateOut$.next(v),
        complete: stateOut$.complete
    })

    stateOut$.subscribe({
        next: v => {
            bizExtend ? stateIn$.next(bizExtend(v)) : stateIn$.next(v)
        },
        complete: stateIn$.complete
    })

    stateDispatcher$.next(initailControlledState)

    return [stateDispatcher$, stateIn$]
}


// not important functions, for testing usage only
// export const getById = <T>(id: string) => document.querySelector(id)
// export const getRXBtn = () => getById('#rxjs-onlyone-button') as HTMLButtonElement
// export const getRXNextBtn = () => getById('#rxjs-next-button') as HTMLButtonElement
// export const getSpan1 = () => getById('#rxjs-span-1') as HTMLSpanElement
// export const getRandomBtn = () => getById('#rxjs-random-button') as HTMLButtonElement

export {
    createComponentContolledState
}
