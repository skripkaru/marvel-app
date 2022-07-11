import './singleComic.scss'
import { IChar } from '../../../types'

const CharacterLayout = (props: IChar) => {
  const { name, description, thumbnail } = props

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  )
}

export default CharacterLayout
