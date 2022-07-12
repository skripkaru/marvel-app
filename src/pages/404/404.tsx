import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import ErrorMessage from '../../components/errorMessage/ErrorMessage'

const Page404 = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page not found" />
        <title>404 Page</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ErrorMessage />
        <h1 style={{ marginBottom: '1rem' }}>Page not found</h1>
        <Link to="/">Back to main page</Link>
      </div>
    </>
  )
}

export default Page404
