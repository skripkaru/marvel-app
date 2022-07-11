import { useHttp } from '../hooks/useHttp'
import { IChar, IComic } from '../types'

// interface IChar {
//   id: number
//   name: string
//   description: string
//   thumbnail: { path: string; extension: string }
//   urls: any[]
//   comics: {
//     items: [{ resourceURI: string; name: string }]
//   }
// }
//
// interface IComic {
//   id: number
//   title: string
//   description: string
//   pageCount: string
//   thumbnail: any
//   language: any
//   price: any
//   textObjects: any
//   prices: any
// }

const useMarvelApi = () => {
  const { loading, request, error, clearError } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=d10e550a9145445d1cc3ba067a855fe0'
  const _baseOffset = 210

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    )

    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id: number) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)

    return _transformCharacter(res.data.results[0])
  }

  const getCharacterByName = async (name: string) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)

    return res.data.results.map(_transformCharacter)
  }

  const _transformCharacter = (char: IChar) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    )

    return res.data.results.map(_transformComic)
  }

  const getComic = async (id: number) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComic(res.data.results[0])
  }

  const _transformComic = (comics: IComic) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'No description',
      pageCount: comics.pageCount
        ? `${comics.pageCount} pages`
        : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices.price ? `${comics.prices.price}$` : 'Not available',
    }
  }

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    getAllComics,
    getComic,
  }
}

export default useMarvelApi
