import { StateSchema } from "app/providers/StoreProvider"
import { Country } from "entities/Country"
import { Currency } from "entities/Currency"
import { getProfileData } from "./getProfileData"

describe('getProfileData.test', () => {
    test('return data' , () => {

        const data = {
            age: 33,
            city: 'sddfsfd',
            country: Country.Armenia,
            currency: Currency.EUR,
            first: 'dfsdfds',
            lastname: 'dfsdfs',
            username: 'dfsdfds' 
        }

        const state: DeepPartial<StateSchema>  = {
            profile: {
                data : {
                    age: 33,
                    city: 'sddfsfd',
                    country: Country.Armenia,
                    currency: Currency.EUR,
                    first: 'dfsdfds',
                    lastname: 'dfsdfs',
                    username: 'dfsdfds'
                }
            }
        }

        expect(getProfileData(state as StateSchema)).toEqual(data)
    })
    test('test without state' , () => {

        const state: DeepPartial<StateSchema>  = {}

        expect(getProfileData(state as StateSchema)).toEqual(undefined)
    })
})