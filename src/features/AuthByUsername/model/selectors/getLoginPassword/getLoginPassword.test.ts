import { StateSchema } from "app/provider/StoreProvider"
import { getLoginPassword } from "./getLoginPassword"

describe('getLoginPassword.test', () => {
    test('return Password' , () => {

        const state: DeepPartial<StateSchema>  = {
            loginForm: {
                password: '123'
            }
        }

        expect(getLoginPassword(state as StateSchema)).toEqual('123')
    })
    test('test without state' , () => {

        const state: DeepPartial<StateSchema>  = {}

        expect(getLoginPassword(state as StateSchema)).toEqual('')
    })
})