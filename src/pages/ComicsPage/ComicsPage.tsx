import React from 'react'

import AppBanner from '../../components/appBanner/AppBanner'
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary'
import ComicsList from '../../components/comicsList/ComicsList'

const ComicsPage = () => {
  return (
    <>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage
