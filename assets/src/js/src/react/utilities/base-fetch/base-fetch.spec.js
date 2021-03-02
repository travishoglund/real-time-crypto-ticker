import {baseFetch} from './base-fetch'
import fetch from 'jest-fetch-mock'

global.fetch = fetch

describe('baseFetch', function () {

    afterEach(() => {
        jest.restoreAllMocks()
        fetch.mockClear()
    })

    it('no options provided calls url with default options', () => {
        fetch.mockResponseOnce(JSON.stringify({blah: 'blah'}), {status: 200})
        return baseFetch('blah/blah')
            .then(() => {
                expect(fetch).toHaveBeenCalledWith("blah/blah", {
                    credentials: "same-origin",
                    headers: {Accept: "application/json", "Content-Type": "application/json"}
                })
            })
    })

    it('options provided calls url, overwrites default options, and adds additional ones', () => {
        fetch.mockResponseOnce(JSON.stringify({blah: 'blah'}), {status: 200})
        return baseFetch('blah/blah', {credentials: 'overrides-default', anotherOption: 'blah'})
            .then(() => {
                expect(fetch).toHaveBeenCalledWith("blah/blah", {
                    credentials: "overrides-default",
                    anotherOption: 'blah',
                    headers: {Accept: "application/json", "Content-Type": "application/json"}
                })
            })
    })

    it('stringifies options body if present', function() {
        fetch.mockResponseOnce(JSON.stringify({blah: 'blah'}), {status: 200})
        return baseFetch('blah/blah', {credentials: 'overrides-default', body: {data:'baseData', moreData: true}})
            .then(() => {
                expect(fetch).toHaveBeenCalledWith("blah/blah", {
                    credentials: "overrides-default",
                    body: JSON.stringify({data:'baseData', moreData: true}),
                    headers: {Accept: "application/json", "Content-Type": "application/json"}
                })
            })
    })

    it('parses json from 200 calls', () => {
        fetch.mockResponseOnce(JSON.stringify({blah: 'blah'}), {status: 200})
        return baseFetch('blah/blah')
            .then((response) => {
                expect(response).toEqual({statusCode: 200, responseBody:{blah: 'blah'}})
            })
    })

    it('parses json from non 200 calls', () => {
        fetch.mockResponseOnce(JSON.stringify({blah: 'blah'}), {status: 400})
        return baseFetch('blah/blah')
            .then((response) => {
                expect(response).toEqual({statusCode: 400, responseBody:{blah: 'blah'}})
            })
    })

    it('throws error if response is not json', () => {
        fetch.mockResponseOnce({blah: 'blah'}, {status: 200})
        return baseFetch('blah/blah')
            .then(() => {
                    throw new Error('should have rejected')
                },
                err => {
                    expect(err.message).toEqual("bad json parse - self.body.on is not a function")
                }
            )
    })
    it('redirects the user to the passed redirect url if present on 401 responses', function() {
        const assignSpy  = jest.spyOn(location, 'assign').mockImplementationOnce(()=> undefined)
        window.location = location
        fetch.mockResponseOnce(JSON.stringify({redirectUrl: 'redirectUrl'}), {status: 401})
        return baseFetch('blah/blah')
            .then((response) => {
                expect(assignSpy).toHaveBeenCalledTimes(1)
                expect(assignSpy).toHaveBeenCalledWith('redirectUrl')
                expect(response).toEqual({statusCode: 401, responseBody: {}})
            })
    })
    it('redirects the user to the default cia login page if no redirect url is present on 401 responses', function() {
        const assignSpy = jest.spyOn(location, 'assign').mockImplementationOnce(()=> undefined)
        window.location = location
        fetch.mockResponseOnce(JSON.stringify({redirectUrl: undefined}), {status: 401})
        return baseFetch('blah/blah')
            .then((response) => {
                expect(assignSpy).toHaveBeenCalledTimes(1)
                expect(assignSpy).toHaveBeenCalledWith('/profile/c/myaccount')
                expect(response).toEqual({statusCode: 401, responseBody: {}})
            })
    })
    it('redirects the user to the default cia login page if no response body is present on 401 responses', function() {
        const assignSpy = jest.spyOn(location, 'assign').mockImplementationOnce(()=> undefined)
        window.location = location
        fetch.mockResponseOnce( '' , {status: 401})
        return baseFetch('blah/blah')
            .then((response) => {
                expect(assignSpy).toHaveBeenCalledTimes(1)
                expect(assignSpy).toHaveBeenCalledWith('/profile/c/myaccount')
                expect(response).toEqual({statusCode: 401, responseBody: {}})
            })
    })
})
