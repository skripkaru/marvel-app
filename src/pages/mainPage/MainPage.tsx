import { useState } from 'react'

import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary'
import RandomChar from '../../components/randomChar/RandomChar'
import CharList from '../../components/charList/CharList'
import CharInfo from '../../components/charInfo/CharInfo'
import CharSearchForm from '../../components/charSearchForm/CharSearchForm'

import decoration from '../../resources/img/vision.png'

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState<any>(null)

  const onCharSelected = (id: number) => {
    setSelectedChar(id)
  }

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}

export default MainPage
