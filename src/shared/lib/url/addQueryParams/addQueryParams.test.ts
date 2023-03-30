import { getQueryParams } from "./addQueryParams"

describe('shared/url/addQueryParams', () => {
    test('one parameter', () => {
        const params = getQueryParams({
            test: 'value'
        })
        expect(params).toBe('?test=value')
    })
    test('multiple parameters', () => {
        const params = getQueryParams({
            test: 'value',
            second: '2'
        })
        expect(params).toBe('?test=value&second=2')
    })
    test('test with undefined', () => {
        const params = getQueryParams({
            test: 'value',
            second: undefined
        })
        expect(params).toBe('?test=value')
    })
})