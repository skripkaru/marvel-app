import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import AppHeader from '../appHeader/AppHeader'
import Spinner from '../spinner/Spinner'

const Page404 = lazy(() => import('../../pages/404/404'))
const MainPage = lazy(() => import('../../pages/mainPage/MainPage'))
const ComicsPage = lazy(() => import('../../pages/comicsPage/ComicsPage'))
const SinglePage = lazy(() => import('../../pages/singlePage/SinglePage'))
const ComicLayout = lazy(
  () => import('../../pages/singlePage/layout/ComicLayout')
)
const CharacterLayout = lazy(
  () => import('../../pages/singlePage/layout/CharacterLayout')
)

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/characters" element={<MainPage />} />
              <Route path="/" element={<Navigate replace to="/characters" />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={ComicLayout} dataType="comic" />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={CharacterLayout}
                    dataType="character"
                  />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App
