/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo } from 'react'
import { Toast, ToastState } from './Toast'
import { ToastContainer } from 'react-bootstrap'

// types
interface ToastOption {
  key: string
  message: string
  type: ToastState
}

type ToastOptions = Array<ToastOption>

export type ShowToastType = (_: ToastOption | ToastOptions) => void

export const ToastContext = React.createContext<{ showToast: ShowToastType }>({
  showToast: (_) => {},
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastsStack, setToastsStack] = React.useState<ToastOptions>([])

  const contextValue = useMemo(
    () => ({
      showToast: (toasts: ToastOption | ToastOptions): void => {
        if (Array.isArray(toasts)) {
          setToastsStack((prev) => [...toasts, ...prev])
        } else if (toasts?.key) {
          setToastsStack((prev) => [toasts, ...prev])
        }
      },
    }),
    [],
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toastsStack.length > 0 && (
        <ToastContainer>
          {toastsStack.map((toast: ToastOption) => (
            <Toast
              key={toast.key}
              type={toast.type}
              message={toast.message}
              afterClose={() => setToastsStack((prev) => prev.filter((t) => t.key !== toast.key))}
            />
          ))}
        </ToastContainer>
      )}
    </ToastContext.Provider>
  )
}
