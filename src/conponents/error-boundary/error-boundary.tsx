import React from 'react'
import './styles.css'

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
      return (
        <main className='error-page'>
          <div className='error-page__wrapper'>
            <h1 className='error-page__title'>Произошла ошибка</h1>
            <p className='error-page__text'>
              Лучшие программисты уже заняты решением этого бага!
            </p>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
