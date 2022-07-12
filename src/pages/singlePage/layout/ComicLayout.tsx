import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { IComic } from '../../../types'

import './singleComic.scss'

const ComicLayout = (props: IComic) => {
  const { title, description, thumbnail, pageCount, price, language } = props

  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <title>{title}</title>
      </Helmet>
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
    </>
  )
}

export default ComicLayout
