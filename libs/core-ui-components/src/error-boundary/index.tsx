import React, { Component, ErrorInfo, ReactNode } from 'react'
import { ErrorAlert } from '../error'

// eslint-disable-line @typescript-eslint/no-unused-vars
interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorAlert errorText={'Something went wrong.'} />
    }

    return this.props.children
  }
}
export default ErrorBoundary
