import 'whatwg-fetch'

export function baseFetch(url, options = {}) {
    const baseOptions = {
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }

    if (options.body) {
        options.body = JSON.stringify(options.body)
    }

    return window.fetch(url, Object.assign({}, baseOptions, options))
        .then(
            (response) => {
                return parseJSON(response)
            }
        )
}

function parseJSON(response) {
    return response.json()
        .then(
            (data) => ({
                statusCode: response.status,
                responseBody: data
            }),
            (error) => {
                throw new Error(`bad json parse - ${error.message}`)
            }
        )
}

