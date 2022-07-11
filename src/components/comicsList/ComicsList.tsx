import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useMarvelApi from '../../api/marvelApi'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicsList.scss'
import placeholder from '../../resources/img/placeholder.svg'
import { IComic } from '../../types'

const ComicsList = () => {
  const [comicsList, setComicsList] = useState<IComic[]>([])
  const [offset, setOffset] = useState<number>(210)
  const [newItemLoading, setNewItemLoading] = useState<boolean>(false)
  const [comicsEnded, setComicsEnded] = useState<boolean>(false)

  const { getAllComics, loading, error } = useMarvelApi()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onComicsListLoaded = (newComicsList: IComic[]) => {
    let ended = false

    if (newComicsList.length < 8) {
      ended = true
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList])
    setNewItemLoading(false)
    setOffset((offset) => offset + 8)
    setComicsEnded(ended)
  }

  const onRequest = (offset: number, initial: boolean) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getAllComics(offset).then(onComicsListLoaded)
  }

  const renderItems = (arr: IComic[]) => {
    const items = arr.map((item, i) => (
      <li className="comics__item" key={i}>
        <Link to={`/comics/${item.id}`}>
          <img
            src={
              item.thumbnail.includes('image_not_available') ||
              item.thumbnail.includes('4c002e0305708')
                ? placeholder
                : item.thumbnail
            }
            alt={item.title}
            className="comics__item-img"
          />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.price}</div>
        </Link>
      </li>
    ))

    return <ul className="comics__grid">{items}</ul>
  }

  const items = renderItems(comicsList)

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading && !newItemLoading ? <Spinner /> : null

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset, true)}
        disabled={newItemLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList
