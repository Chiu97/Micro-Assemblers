import { fromEvent } from "rxjs"
import { sample } from "lodash"
import { getSpan1, getRandomBtn, createComponentContolledState } from "../src/pipe"


function TestCreateComponentContolledState() {
    const spanEl = getSpan1()
    const randomBtn = getRandomBtn()
    if (!spanEl||!randomBtn) return
    console.log('TestCreateComponentContolledState')

    const words = ["hello", "world", "way", "to", "fix", "bugs"]
    const initailControlledState = {
        msg: sample(words)
    }
    const [randomTextCmpStateDispatcher, randomTextCmpStateIn$] = createComponentContolledState(initailControlledState)
    
    fromEvent(randomBtn, 'click').subscribe(
        () => {
            console.log('random button click')
            randomTextCmpStateDispatcher.next({
                msg: sample(words)
            })
        }
    )

    randomTextCmpStateIn$.subscribe(v => {
        spanEl.innerText = v.msg
    })
}

TestCreateComponentContolledState()