import { useCallback } from "react"
import { getAuth } from "firebase/auth"

export class APIError extends Error {
    constructor(message, body, status) {
        super()
        this.message = message
        this.body = body
        this.status = status
    }
}

export const useFetch = () => {
    return useCallback(
        ({ body, method, query, path, url }) =>
            Fetch({
                body,
                method,
                path,
                query,
                url,
            }),
        []
    )
}

const fetchSuccessHandler = (response) => {
    if (!response.ok) {
        return response.json().then((body) => {
            throw new APIError(
                `Request failed with status ${response.status}`,
                body,
                response.status
            )
        })
    }
    return response.json()
}

const Fetch = ({ body, method, path, query, url }) => {
    let completeUrl = url ?? `${window.location.origin}/api${path}`

    if (query) {
        completeUrl = `${completeUrl}?${Object.keys(query)
            .map((k) => `${k}=${encodeURIComponent(query[k])}`)
            .join("&")}`
    }

    const fetchProps = { body: JSON.stringify(body), method }
    const user = getAuth().currentUser

    return !user
        ? fetch(completeUrl, fetchProps).then(fetchSuccessHandler)
        : user
              .getIdToken()
              .then((token) =>
                  fetch(completeUrl, {
                      ...fetchProps,
                      headers: { Authorization: `Bearer ${token}` },
                  })
              )
              .then(fetchSuccessHandler)
}

export default Fetch
