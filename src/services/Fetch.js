import { useCallback } from 'react'

export const useFetch = () => {
    return useCallback(({ body, method, query, path, url }) =>
        Fetch({
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
            throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
    })
}
export default Fetch
