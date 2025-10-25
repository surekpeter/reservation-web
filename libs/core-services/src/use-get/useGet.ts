import {useEffect, useState} from 'react'
import useAsyncError from '../use-propagate-async-error'
import useApiFetcher from '../use-api-fetcher'
import {RequestScopedHeader, StandardHeaders} from '../api-fetcher'
import {GetResponse} from './GetResponse'
import {ResponseError} from './ResponseError'

export default <T>(
    url: string,
    initialData: T,
    standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    throwExceptionIntoRender = false,
): GetResponse<T> => {
    const apiFetcher = useApiFetcher()

    const [hasError, setError] = useState<ResponseError | undefined>(undefined)

    const [forceReloadCount, updateForceReloadCount] = useState(0)

    const forceReload = () => {
        updateForceReloadCount(forceReloadCount + 1)
    }

    const [initData] = useState(initialData)
    const [{fetchData, isLoading, status}, setFetchData] = useState<{
        fetchData: T,
        isLoading: boolean,
        status: number | null
    }>({
        fetchData: initialData,
        isLoading: true,
        status: null
    })
    const throwAsyncError = useAsyncError()

    useEffect(() => {
        const fetchData = async () => {
            setFetchData({isLoading: true, fetchData: initData, status: null})
            setError(undefined)
            try {
                const responseData = await apiFetcher.get<T>(`${url}`, standardRequestHeaders)
                setFetchData({isLoading: false, fetchData: responseData.responseData, status: responseData.status})
            } catch (err: any) {
                setError({status: err.response.status, statusText: err.response.statusText})
                setFetchData({isLoading: false, fetchData: initData, status: err.response.status})
                if (throwExceptionIntoRender) {
                    throwAsyncError(err)
                }
            }
        }
        fetchData()
    }, [
        url,
        initData,
        throwExceptionIntoRender,
        throwAsyncError,
        Object.values(standardRequestHeaders || {}).join(','), // FIX: endless useEffect loop if standardRequestHeaders is an object
        forceReloadCount,
    ])

    return {isLoading, hasError, data: fetchData, status, forceReload}
}
