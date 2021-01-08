import { Subject, fromEvent } from "rxjs"
import { scan } from "rxjs/operators"
import { SubjectFactory } from "../src/pipe"
// Type alias for Subject, to emphasize tha StateDispatcher is use for component to dispatch an update state request
type StateDispatcher<T> = Subject<T>
// Type alias for component state transport tunnel, component dispose and accept controllable state to/from tuunel
type TunnelSubject<T> = Subject<T>
// Type alias for component state map, for flexibility usage
type ExtendMap<T> = (val: T) => T
const getRXNextBtn = () => document.querySelector('#rxjs-next-button') as HTMLButtonElement|null

function TestExtendMechanism() {
    const btn = getRXNextBtn()
    if (!btn) return
    const extendMap: ExtendMap<number> = (v: number) => v*2
    const stateOut$: TunnelSubject<number> = SubjectFactory()
    const stateIn$: TunnelSubject<number> = SubjectFactory()

    let stateDispatcher$: StateDispatcher<number> = new Subject()

    stateDispatcher$.subscribe(val => {
        stateOut$.next(val)
    })

    let btnSource$ = fromEvent(btn, 'click').pipe(scan((acc) => acc+1, 0))
    btnSource$.subscribe(v => {
        console.log('Trigger Button Click')
        stateDispatcher$.next(v)
    })

    stateOut$.subscribe((v) => {
        console.log('component tunnel receive:' + v)
        const extendedValue = extendMap(v)
        stateIn$.next(extendedValue)
    })

    const componentStateSubscriptionA = stateIn$.subscribe(v => {
        console.log('component-A finally receive state:' + v)
    })

    const componentStateSubscriptionB = stateIn$.subscribe(v => {
        console.log('component-B finally receive state:' + v)
    })
}

TestExtendMechanism()