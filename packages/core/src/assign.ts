// Data dispatch to corresponsive component, different component should hold their init data.
// It's completely non-sense if you keep all controlled data in a global reposity like redux.Which is simple but might comes with perf problem.
// If you make greate model, the web app should work with low or even no extra code(Extension Code).
// @todo Provide a global data storge api, for those data of big size share requirement.(Even though it's not necessary)

import { fetchDataWithoutParams } from "./__mocks__/BasicAPI"

const testData = async () => {
    const dataSource = await fetchDataWithoutParams()
    console.log(dataSource)
}

testData()