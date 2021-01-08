import { Subject, zip, from, interval } from "rxjs"
import { map, take } from "rxjs/operators"

function TestMultiCasting () {
    const sourceProxy$ = new Subject<string>()
    
    const words = ["你好", "我是", "奥特曼"]

    const source$ = zip(
        from(words),
        interval(1000).pipe(map(v => ""+v), take(10)),
    )

    source$.subscribe(v => {
        sourceProxy$.next(`Word: ${v[0]}, Index: ${v[1]}`)
    })

    sourceProxy$.subscribe(v => {
        console.log("observer-1:" + v)
    })

    sourceProxy$.subscribe(v => {
        console.log("observer-2:" + v)
    })
}

TestMultiCasting()