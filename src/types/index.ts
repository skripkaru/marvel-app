export interface IChar {
  id: number
  name: string
  description: string
  homepage: string
  wiki: string
  thumbnail: { path: string; extension: string } | string | any
  urls: any[]
  comics: { items: [{ resourceURI: string; name: string }] } | any
}

export interface IComic {
  id: number
  title: string
  description: string
  thumbnail: string | any
  pageCount: number
  language: string
  price: number
  prices: any
  textObjects: any
}
