import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useMarvelApi from '../../api/marvelApi'
import ErrorMessage from '../../components/errorMessage/ErrorMessage'
import Spinner from '../../components/spinner/Spinner'
import AppBanner from '../../components/appBanner/AppBanner'

interface SinglePageProps {
  Component: any
  dataType: string
}

interface IData {
  id?: number
  name?: string
  title?: string
  description?: string
  thumbnail?: string
  homepage?: string
  wiki?: string
  comics?: Object[]
}

const SinglePage = (props: SinglePageProps) => {
  const { Component, dataType } = props
  const { id }: any = useParams()
  const [data, setData] = useState<IData | null>(null)
  const { getComic, getCharacter, loading, error, clearError } = useMarvelApi()

  useEffect(() => {
    updateData()
  }, [id])

  const updateData = () => {
    clearError()

    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded)
        break
      case 'character':
        getCharacter(id).then(onDataLoaded)
    }
  }

  const onDataLoaded = (data: IData) => {
    setData(data)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !data) ? <Component {...data} /> : null

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default SinglePage
