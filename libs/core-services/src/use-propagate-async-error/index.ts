import { useCallback, useState } from 'react'

const usePropagateAsyncError = () => {
  const [, setError] = useState()
  return useCallback(
    (e: any) => {
      setError(() => {
        throw e
      })
    },
    [setError],
  )
}

export default usePropagateAsyncError
