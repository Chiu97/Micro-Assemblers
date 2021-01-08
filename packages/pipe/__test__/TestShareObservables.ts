import { interval } from "rxjs"
import { take, filter, share } from "rxjs/operators"
const getRXBtn = () => document.querySelector('#rxjs-onlyone-button') as HTMLButtonElement|null

function TestShareObservables() {
    const MockPolling = interval(1000).pipe(
        take(10),
        filter((v) => {
            console.log('receive from interval, value:' + v)
            return (v&1) == 0
        })
    )
    const shareSource$ = MockPolling.pipe(share())

    // shareSource$.subscribe(v => console.log('Static receive value:' + v))
    const btn = getRXBtn()
    if (!btn) return
    btn.addEventListener('click', () => {
        shareSource$.subscribe(v => {
            console.log(`Dynamic subscribe from button, value:${v}`)
        })
    })
}

TestShareObservables()