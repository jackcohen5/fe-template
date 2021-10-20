import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { accessTokenSelector } from 'flux/ducks/auth'

export class APIError extends Error {
    constructor(message, body, status) {
        super()
        this.message = message
        this.body = body
        this.status = status
    }
}

export const useFetch = () => {
    const accessToken = useSelector(accessTokenSelector)
    return useCallback(({ body, method, query, path, url }) =>
        Fetch({
            accessToken,
            body,
            method,
            path,
            query,
            url,
        }),
    )
}

const Fetch = ({ accessToken, body, method, path, query, url }) => {
    let completeUrl = url ?? `${window.location.origin}/api${path}`

    if (query) {
        completeUrl = `${completeUrl}?${Object.keys(query)
            .map((k) => `${k}=${encodeURIComponent(query[k])}`)
            .join('&')}`
    }

    return fetch(completeUrl, {
        body: JSON.stringify(body),
        method,
        headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((body) => {
                throw new APIError(
                    `Request failed with status ${response.status}`,
                    body,
                    response.status,
                )
            })
        }
        return response.json()
    })
}
export default Fetch
