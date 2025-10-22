import { useEffect, useState } from 'react'
import useAsyncError from '../use-propagate-async-error'
import useApiFetcher from '../use-api-fetcher'
import { RequestScopedHeader, StandardHeaders } from '../api-fetcher'
import { GetResponse } from './GetResponse'
import { ResponseError } from './ResponseError'

export default <T>(
  url: string,
  initialData: T,
  standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
  throwExceptionIntoRender = true,
): GetResponse<T> => {
  const apiFetcher = useApiFetcher()

  const [hasError, setError] = useState<ResponseError | undefined>(undefined)

  const [forceReloadCount, updateForceReloadCount] = useState(0)

  const forceReload = () => {
    updateForceReloadCount(forceReloadCount + 1)
  }

  const [initData] = useState(initialData)
  const [{ fetchData, isLoading }, setFetchData] = useState({
    fetchData: initialData,
    isLoading: true,
  })
  const throwAsyncError = useAsyncError()

  useEffect(() => {
    const fetchData = async () => {
      setFetchData({ isLoading: true, fetchData: initData })
      setError(undefined)
      try {
        const responseData = await apiFetcher.get<T>(`${url}`, standardRequestHeaders)
        setFetchData({ isLoading: false, fetchData: responseData })
      } catch (err: any) {
        setError({ status: err.response.status, statusText: err.response.statusText })
        setFetchData({ isLoading: false, fetchData: initData })
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

  return { isLoading, hasError, data: fetchData, forceReload }
}
