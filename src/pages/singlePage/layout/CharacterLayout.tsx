import React from 'react'
import { Helmet } from 'react-helmet'

import { IChar } from '../../../types'

import './singleComic.scss'

const CharacterLayout = (props: IChar) => {
  const { name, description, thumbnail } = props

  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <title>{name}</title>
      </Helmet>
      <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{description}</p>
        </div>
      </div>
    </>
  )
}

export default CharacterLayout
