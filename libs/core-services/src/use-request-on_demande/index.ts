import { useState } from 'react'
import useAsyncError from '../use-propagate-async-error'
import { RequestScopedHeader, StandardHeaders } from '../api-fetcher'
import useApiFetcher from '../use-api-fetcher'
import { ResponseError } from '../use-get'

interface RequestState<T> {
  isLoading: boolean
  hasError: ResponseError | undefined
  responseData: T
}

const useGetOnDemand = <Res>(
  throwExceptionIntoRender = true,
  initResponseValue: Res,
  standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
) => {
  return useRequestOnDemand<void, Res>(
    'GET',
    initResponseValue,
    undefined,
    throwExceptionIntoRender,
    standardRequestHeaders,
  )
}

const usePut = <Req, Res = void>(
  url?: string,
  throwExceptionIntoRender = true,
  initResponseValue?: Res,
  standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
) => {
  return useRequestOnDemand<Req, Res | undefined>(
    'PUT',
    initResponseValue,
    url,
    throwExceptionIntoRender,
    standardRequestHeaders,
  )
}

const usePost = <Req, Res = void>(
  url: string,
  throwExceptionIntoRender = true,
  initResponseValue?: Res,
  standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
) => {
  return useRequestOnDemand<Req, Res | undefined>(
    'POST',
    initResponseValue,
    url,
    throwExceptionIntoRender,
    standardRequestHeaders,
  )
}

const useRequestOnDemand = <Req = void, Res = void>(
  method: 'POST' | 'PUT' | 'GET',
  initResponseValue: Res,
  url?: string,
  throwExceptionIntoRender = true,
  standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
) => {
  const apiFetcher = useApiFetcher()

  const [requestState, setRequestState] = useState<RequestState<Res>>({
    isLoading: false,
    hasError: undefined,
    responseData: initResponseValue,
  })

  const throwAsyncError = useAsyncError()

  const invokeRequest = async (body: Req, requestUrl?: string): Promise<Res> => {
    try {
      setRequestState({ isLoading: true, hasError: undefined, responseData: initResponseValue })
      const urlToInvoke = requestUrl ? requestUrl : url
      if (!urlToInvoke) {
        throw Error('No URL defined')
      }
      let response
      if (method === 'POST') {
        response = await apiFetcher.post<Req, Res>(urlToInvoke, body, standardRequestHeaders)
      } else if (method === 'PUT') {
        response = await apiFetcher.put<Req, Res>(urlToInvoke, body, standardRequestHeaders)
      } else {
        response = await apiFetcher.get<Res>(urlToInvoke, standardRequestHeaders)
      }
      setRequestState({ isLoading: false, hasError: undefined, responseData: response.responseData })
      return response.responseData
    } catch (err: any) {
      setRequestState({
        isLoading: false,
        hasError: { status: err.response.status, statusText: err.response.statusText },
        responseData: initResponseValue,
      })
      if (throwExceptionIntoRender) {
        throwAsyncError(err)
      }
      return Promise.reject(err)
    }
  }
  return { requestState, invokeRequest }
}

export { usePost, usePut, useGetOnDemand }
export type { RequestState }
