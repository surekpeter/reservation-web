import { ReactNode } from 'react'
import { CurrentUserContext } from './CurrentUserContext'
import type { CurrentUserState } from './CurrentUserContext'
import UserRole from '../enums/user-role'

interface Props {
  username: string | null
  role: UserRole | null
  logout: (() => void) | undefined
  children?: ReactNode
  showDebugInfo?: boolean
}

const CurrentUserProvider = (props: Props) => (
  <CurrentUserContext.Provider
    value={{
      username: props.username,
      role: props.role,
      logout: props.logout,
      showDebugInfo: props.showDebugInfo,
    }}
  >
    {props.children}
  </CurrentUserContext.Provider>
)

export default CurrentUserProvider
export { CurrentUserContext }
export type { CurrentUserState }
