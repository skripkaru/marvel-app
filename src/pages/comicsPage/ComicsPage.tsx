import { Helmet } from 'react-helmet'

import AppBanner from '../../components/appBanner/AppBanner'
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary'
import ComicsList from '../../components/comicsList/ComicsList'

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics Page</title>
      </Helmet>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage
