import { useState, useEffect, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import useMarvelApi from '../../api/marvelApi'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './charList.scss'
import placeholder from '../../resources/img/placeholder.svg'
import { IChar } from '../../types'

export interface CharListProps {
  onCharSelected: (id: number) => void
}

const CharList = (props: CharListProps) => {
  const { onCharSelected } = props

  const [charList, setCharList] = useState<IChar[] | []>([])
  const [newItemLoading, setNewItemLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(210)
  const [charEnded, setCharEnded] = useState<boolean>(false)

  const { getAllCharacters, loading, error } = useMarvelApi()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onCharListLoaded = (newCharList: IChar[]) => {
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

  function renderItems(arr: IChar[]) {
    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>
          {arr.map((item, i) => {
            return (
              <CSSTransition
                key={item.id}
                timeout={500}
                classNames="char__item"
              >
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
                    src={
                      item.thumbnail.includes('image_not_available') ||
                      item.thumbnail.includes('4c002e0305708')
                        ? placeholder
                        : item.thumbnail
                    }
                    alt={item.name}
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
