import { SetStateAction, useEffect, useState } from 'react'

import useMarvelApi from '../../api/marvelApi'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss'
import placeholder from '../../resources/img/placeholder.svg'
import { IChar } from '../../types'

interface CharInfoProps {
  charId: number
}

const CharInfo = (props: CharInfoProps) => {
  const { charId } = props

  const [char, setChar] = useState<IChar | null>(null)

  const { getCharacter, loading, error, clearError } = useMarvelApi()

  useEffect(() => {
    updateChar()
  }, [charId])

  const onCharLoaded = (char: SetStateAction<IChar | null>) => {
    setChar(char)
  }

  const updateChar = () => {
    clearError()
    if (!charId) return

    // @ts-ignore
    getCharacter(charId).then(onCharLoaded)
  }

  const skeleton = char || loading || error ? null : <Skeleton />
  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !char) ? <View {...char} /> : null

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

const View = (props: IChar) => {
  const { name, thumbnail, description, wiki, homepage, comics } = props

  return (
    <>
      <div className="char__basics">
        <img
          src={
            thumbnail.includes('image_not_available') ||
            thumbnail.includes('4c002e0305708')
              ? placeholder
              : thumbnail
          }
          alt={name}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a
              className="button button__main"
              href={homepage}
              target="_blank"
              rel="noreferrer"
            >
              <div className="inner">homepage</div>
            </a>
            <a
              className="button button__secondary"
              href={wiki}
              target="_blank"
              rel="noreferrer"
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      {comics.length ? (
        <ul className="char__comics-list">
          {/* @ts-ignore*/}
          {comics.map((item, i) => {
            if (i > 9) return
            return (
              <li className="char__comics-item" key={i}>
                {item.name}
              </li>
            )
          })}
        </ul>
      ) : (
        'Not found'
      )}
    </>
  )
}

export default CharInfo
