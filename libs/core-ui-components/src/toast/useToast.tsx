import { useContext } from 'react'
import { ToastContext, ShowToastType } from './ToastProvider'

type UseToast = () => { showToast: ShowToastType }

export const useToast: UseToast = () => {
  return useContext(ToastContext)
}
