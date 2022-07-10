import { useState, useEffect, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import useMarvelApi from '../../api/marvelApi'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './charList.scss'

export interface CharListProps {
  onCharSelected: (id: number) => void
}

interface ICharList {
  id: number
  name: string
  description: string
  thumbnail: string
  homepage: string
  wiki: string
  comics: any[]
}

const CharList = (props: CharListProps) => {
  const { onCharSelected } = props

  const [charList, setCharList] = useState<ICharList[] | []>([])
  const [newItemLoading, setNewItemLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(210)
  const [charEnded, setCharEnded] = useState<boolean>(false)

  const { getAllCharacters, loading, error } = useMarvelApi()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onCharListLoaded = (newCharList: ICharList[]) => {
    let ended = false

    if (newCharList.length < 9) {
      ended = true
    }

    setCharList((charList) => [...charList, ...newCharList])
    setNewItemLoading(false)
    setOffset((offset) => offset + 9)
    setCharEnded(ended)
  }

  const onRequest = (offset: number, initial: boolean) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getAllCharacters(offset).then(onCharListLoaded)
  }

  const itemRefs = useRef<any>([])

  const focusOnItem = (id: number) => {
    // @ts-ignore
    itemRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    )
    // @ts-ignore
    itemRefs.current[id].classList.add('char__item_selected')
    // @ts-ignore
    itemRefs.current[id].focus()
  }

  function renderItems(arr: ICharList[]) {
    // const items = ;

    return (
      <ul className="char__grid">
        <TransitionGroup className="char__grid" component={null}>
          {arr.map((item, i) => {
            return (
              <CSSTransition key={i} timeout={500} classNames="char__item">
                <li
                  className="char__item"
                  tabIndex={0}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => {
                    onCharSelected(item.id)
                    focusOnItem(i)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      onCharSelected(item.id)
                      focusOnItem(i)
                    }
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    style={{
                      objectFit: `${
                        item.thumbnail.includes('image_not_available')
                          ? 'fill'
                          : 'cover'
                      }`,
                    }}
                  />
                  <div className="char__name">{item.name}</div>
                </li>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </ul>
    )
  }

  const items = renderItems(charList)

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading && !newItemLoading ? <Spinner /> : null

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset, true)}
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default CharList
