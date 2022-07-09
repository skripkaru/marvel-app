import { useEffect, useState } from 'react'

import useMarvelApi from '../../api/marvelApi'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'

interface IChar {
  id: number
  name: string
  description: string
  thumbnail: string
  homepage: string
  wiki: string
  comics: any[]
}

const RandomChar = () => {
  const [char, setChar] = useState<IChar | null>(null)
  const { getCharacter, loading, error, clearError } = useMarvelApi()

  useEffect(() => {
    updateChar()

    const timerId = setInterval(updateChar, 60000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  const onCharLoaded = (char: IChar) => {
    setChar(char)
  }

  const updateChar = () => {
    clearError()
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000

    getCharacter(id).then(onCharLoaded)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !char) ? <View {...char} /> : null

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  )
}

const View = (props: IChar) => {
  const { name, thumbnail, description, wiki, homepage } = props

  return (
    <div className="randomchar__block">
      <img
        className="randomchar__img"
        src={thumbnail}
        alt={name}
        style={{
          objectFit: `${
            thumbnail.includes('image_not_available') ? 'fill' : 'cover'
          }`,
        }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a className="button button__main" href={homepage}>
            <div className="inner">homepage</div>
          </a>
          <a className="button button__secondary" href={wiki}>
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar
