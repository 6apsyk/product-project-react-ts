import { StateSchema } from "app/provider/StoreProvider"
import { getLoginIsLoading } from "./getLoginIsLoading"

describe('getLoginIsLoading.test', () => {
    test('return isLoading' , () => {

        const state: DeepPartial<StateSchema>  = {
            loginForm: {
                isLoading: true
            }
        }

        expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
    })
    test('test without state' , () => {

        const state: DeepPartial<StateSchema>  = {}

        expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
    })
})