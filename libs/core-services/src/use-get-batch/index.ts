import { useCallback, useRef, useState } from 'react'
import useApiFetcher from '../use-api-fetcher'
import { RequestScopedHeader, StandardHeaders } from '../api-fetcher'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface FetchState<T> {
  data: Record<string | number, T>
  status: Record<string | number, Status>
}

/**
 *  T - response object class
 *  I - type of identifier of T
 *
 */
export default <T>(getIdentifier: (item: T) => string | number) => {
  const [response, setResponse] = useState<FetchState<T>>({
    data: {},
    status: {},
  })

  const apiFetcher = useApiFetcher()

  const pendingIdsRef = useRef<Set<string | number>>(new Set())

  const addBatch = useCallback(
    (
      urlPath: string,
      idQueryParameterName: string,
      ids: (string | number)[],
      standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    ) => {
      const urlWithIds = `${urlPath}?${ids.map((it) => `${idQueryParameterName}=${it}`).join('&')}`
      const uniqueNewIds = ids.filter(
        (id) => !response.status[id] || response.status[id] === 'idle',
      )

      if (uniqueNewIds.length === 0) return

      // Set loading states
      setResponse((prev) => {
        const newStatus = { ...prev.status }
        uniqueNewIds.forEach((id) => (newStatus[id] = 'loading'))
        return { ...prev, status: newStatus }
      })

      // Prevent re-adding same ids during fetch
      uniqueNewIds.forEach((id) => pendingIdsRef.current.add(id))

      apiFetcher
        .get<T[]>(urlWithIds, standardRequestHeaders)
        .then((result) => {
          setResponse((prev) => {
            const newData = { ...prev.data }
            const newStatus = { ...prev.status }

            result.responseData.forEach((each) => {
              const identifier = getIdentifier(each)
              newStatus[identifier] = 'success'
              newData[identifier] = each
            })

            return { data: newData, status: newStatus }
          })
        })
        .catch(() => {
          setResponse((prev) => {
            const newStatus = { ...prev.status }
            uniqueNewIds.forEach((id) => {
              newStatus[id] = 'error'
            })
            return { ...prev, status: newStatus }
          })
        })
        .finally(() => {
          uniqueNewIds.forEach((id) => pendingIdsRef.current.delete(id))
        })
    },
    [response.status, getIdentifier],
  )

  const getStatus = useCallback(
    (id: string | number): Status => {
      return response.status[id] ?? 'idle'
    },
    [response.status],
  )

  const getData = useCallback(
    (id: string | number): T | undefined => {
      return response.data[id]
    },
    [response.data],
  )

  return {
    addBatch,
    getStatus,
    getData,
  }
}
