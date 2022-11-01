import { DeepPartial } from "@reduxjs/toolkit"
import { StateSchema } from "app/provider/StoreProvider"
import { getLoginUsername } from "./getLoginUsername"

describe('getLoginUsername.test', () => {
    test('return Username' , () => {

        const state: DeepPartial<StateSchema>  = {
            loginForm: {
                username: '123'
            }
        }

        expect(getLoginUsername(state as StateSchema)).toEqual('123')
    })
    test('test without state' , () => {

        const state: DeepPartial<StateSchema>  = {}

        expect(getLoginUsername(state as StateSchema)).toEqual('')
    })
})