import React from 'react'

interface IStateProps {
  hasError: boolean
}

interface IReturnProps {
  children: React.ReactNode
}

export default class ErrorBoundary extends React.Component<
  IReturnProps,
  IStateProps
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <>Ошибка</>
    }

    return this.props.children
  }
}
