import { describe, expect, test } from 'vitest'
import reducer, {
  setSearch,
  setYear,
  setPage,
  clearValidationError,
  clearRequestError,
  setValidationError
} from './moviesSlice'

describe('moviesSlice', () => {
  test('setSearch actualiza el texto de búsqueda', () => {
    const state = reducer(undefined, setSearch('Batman'))
    expect(state.search).toBe('Batman')
  })

  test('setYear actualiza el año', () => {
    const state = reducer(undefined, setYear('2020'))
    expect(state.year).toBe('2020')
  })

  test('setPage actualiza la página', () => {
    const state = reducer(undefined, setPage(3))
    expect(state.page).toBe(3)
  })

  test('setValidationError guarda el error', () => {
    const state = reducer(undefined, setValidationError('Error de validación'))
    expect(state.validationError).toBe('Error de validación')
  })

  test('clearValidationError limpia el error de validación', () => {
    const withError = reducer(undefined, setValidationError('Error'))
    const cleared = reducer(withError, clearValidationError())
    expect(cleared.validationError).toBeNull()
  })

  test('clearRequestError limpia el error de petición', () => {
    const initial = {
      search: '',
      year: '',
      page: 1,
      movies: [],
      loading: false,
      validationError: null,
      requestError: 'Fallo de red',
      totalPages: 0,
      hasSearched: false
    }

    const state = reducer(initial, clearRequestError())
    expect(state.requestError).toBeNull()
  })
})