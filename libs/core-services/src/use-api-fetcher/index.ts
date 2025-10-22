import apiFetcher, {RequestScopedHeader, StandardHeaders} from '../api-fetcher'

const useApiFetcher = () => {

    const get = async <T>(
        url: string,
        standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    ) => {
        const headers: StandardHeaders<RequestScopedHeader> = {...standardRequestHeaders}
        return apiFetcher.get<T>(url, headers)
    }

    const post = async <T, R>(
        url: string,
        data: T,
        standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    ) => {
        const headers: StandardHeaders<RequestScopedHeader> = {...standardRequestHeaders}
        return apiFetcher.post<T, R>(url, data, headers)
    }

    const put = async <T, R>(
        url: string,
        data: T,
        standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    ) => {
        const headers: StandardHeaders<RequestScopedHeader> = {...standardRequestHeaders}
        return apiFetcher.put<T, R>(url, data, headers)
    }

    return {get, post, put}
}

export default useApiFetcher
