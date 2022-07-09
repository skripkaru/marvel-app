import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import useMarvelApi from '../../api/marvelApi'

import './singleComic.scss'
import ErrorMessage from '../../components/errorMessage/ErrorMessage'
import Spinner from '../../components/spinner/Spinner'

const SingleComicPage = () => {
  const [comic, setComic] = useState(null)
  const { comicId } = useParams()
  const { getComic, loading, error, clearError } = useMarvelApi()

  useEffect(() => {
    updateComic()
  }, [comicId])

  const onComicLoaded = (comic: any) => {
    setComic(comic)
  }

  const updateComic = () => {
    clearError()
    if (!comicId) return

    // @ts-ignore
    getComic(comicId).then(onComicLoaded)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({ comic }: any) => {
  const { title, description, thumbnail, pageCount, price, language } = comic

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  )
}

export default SingleComicPage
