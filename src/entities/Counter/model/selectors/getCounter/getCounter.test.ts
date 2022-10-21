import { DeepPartial } from "@reduxjs/toolkit"
import { StateSchema } from "app/provider/StoreProvider/config/StateSchema"
import { getCounter } from "../getCounter/getCounter"

describe('getCounterValue.test', () => {
    test('should return counter value' , () => {
        const state: DeepPartial<StateSchema> = {
            counter: {value: 10}
        }
        expect(getCounter(state as StateSchema)).toEqual({value: 10})
    })
})