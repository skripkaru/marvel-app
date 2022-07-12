import { SetStateAction, useState } from 'react'
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import useMarvelApi from '../../api/marvelApi'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './charSearchForm.scss'
import { IChar } from '../../types'

const CharSearchForm = () => {
  const [char, setChar] = useState<IChar | null>(null)
  const { getCharacterByName, loading, error, clearError } = useMarvelApi()

  const onCharLoaded = (char: SetStateAction<IChar | null>) => {
    setChar(char)
  }

  const updateChar = (name: string) => {
    clearError()

    getCharacterByName(name).then(onCharLoaded)
  }

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: '',
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required('This field is required'),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName)
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              type="submit"
              className="button button__main"
              disabled={loading}
            >
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage
            className="char__search-error"
            name="charName"
            component="div"
          />
        </Form>
      </Formik>

      {/* @ts-ignore*/}
      {char && char.length > 0 ? (
        <div className="char__search-wrapper">
          <div className="char__search-success">
            {/* @ts-ignore*/}
            There is! Visit {char[0].name} page?
          </div>
          <Link
            // @ts-ignore
            to={`/characters/${char[0].id}`}
            className="button button__secondary"
          >
            <div className="inner">To page</div>
          </Link>
        </div>
      ) : (
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      )}

      {error ? (
        <div className="char__search-critical-error">
          <ErrorMessage />
        </div>
      ) : null}
    </div>
  )
}

export default CharSearchForm
