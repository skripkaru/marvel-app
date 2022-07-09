import React from 'react'
import { Link } from 'react-router-dom'

import ErrorMessage from '../../components/errorMessage/ErrorMessage'

const Page404 = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ErrorMessage />
      <h1 style={{ marginBottom: '1rem' }}>Page not found</h1>
      <Link to="/">Back to main page</Link>
    </div>
  )
}

export default Page404
