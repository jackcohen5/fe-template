import { useCallback } from "react"
import { getAuth } from "firebase/auth"

export class APIError extends Error {
    body: unknown
    status: number

    constructor(message: string, body: unknown, status: number) {
        super()
        this.message = message
        this.body = body
        this.status = status
    }
}

type FetchProps = {
    body?: unknown
    method: "GET" | "POST" | "PUT" | "DELETE"
    path?: string
    query?: Record<string, string | number | boolean>
    url?: string
}

export const useFetch = () => {
    return useCallback(
        ({ body, method, query, path, url }: FetchProps) =>
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

const fetchSuccessHandler = (response: Response): Promise<unknown> => {
    if (!response.ok) {
        return response.json().then((body: unknown) => {
            throw new APIError(
                `Request failed with status ${response.status}`,
                body,
                response.status
            )
        })
    }
    return response.json()
}

const Fetch = ({ body, method, path, query, url }: FetchProps) => {
    let completeUrl = url ?? `${window.location.origin}/api${path}`

    if (query) {
        completeUrl = `${completeUrl}?${Object.keys(query)
            .map((k) => `${k}=${encodeURIComponent(query[k])}`)
            .join("&")}`
    }

    const fetchProps = { body: body ? JSON.stringify(body) : undefined, method }
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
