import { createContext } from 'react'
import UserRole from '../enums/user-role'

export interface CurrentUserState {
  username: string | null
  role: UserRole | null
  logout: ((rootPath?: string) => void) | undefined
  showDebugInfo?: boolean
}

const initialState: CurrentUserState = {
  username: null,
  role: null,
  logout: undefined,
  showDebugInfo: false,
}

export const CurrentUserContext = createContext(initialState)
