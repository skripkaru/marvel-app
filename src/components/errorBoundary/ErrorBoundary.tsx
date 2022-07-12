import React, { Component } from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage'

class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: true,
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }

    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    return this.props.children
  }
}

export default ErrorBoundary
