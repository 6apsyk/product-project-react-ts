import { StateSchema } from "app/providers/StoreProvider"
import { getLoginError } from "./getLoginError"

describe('getLoginError.test', () => {
    test('return error' , () => {

        const state: DeepPartial<StateSchema>  = {
            loginForm: {
                error: 'error'
            }
        }

        expect(getLoginError(state as StateSchema)).toEqual('error')
    })
    test('test without state' , () => {

        const state: DeepPartial<StateSchema>  = {}

        expect(getLoginError(state as StateSchema)).toEqual('')
    })
})