import { ResponseError } from './ResponseError'

type GetResponse<T> = {
  isLoading: boolean
  hasError: ResponseError | undefined
  data: T
  status: number | null
  forceReload: () => void
}

export type { GetResponse }
