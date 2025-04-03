"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="rounded-lg bg-white p-8 shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-red-600">Ups! Coś poszło nie tak.</h2>
              <p className="mb-4 text-gray-700">
                Wystąpił błąd podczas ładowania tej części strony. Spróbuj odświeżyć stronę.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Spróbuj ponownie
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

