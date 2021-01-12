import { test, describe } from '@jest/globals'
import { fetchDataWithoutParams } from './__mocks__/BasicAPI'
import { setupComponentNodeMap } from './assign'



describe('Test assign module', () => {
    const TestComponentStateMachineAttatch = async () => {
        const dataSource = await fetchDataWithoutParams()
        setupComponentNodeMap(dataSource)
    }

    test('It should no throws any error', async () => {
        await TestComponentStateMachineAttatch()
    })
})