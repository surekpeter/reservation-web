import { ResponseError } from './ResponseError'

type GetResponse<T> = {
  isLoading: boolean
  hasError: ResponseError | undefined
  data: T
  forceReload: () => void
}

export type { GetResponse }
