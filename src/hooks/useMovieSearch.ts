import type { FormEvent } from 'react'
import { useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setSearch,
  setYear,
  setPage,
  clearValidationError,
  clearRequestError,
  setValidationError,
  fetchMovies
} from '../store/moviesSlice'

function validateSearch(search: string, year: string): string | null {
  const trimmedSearch = search.trim()

  if (trimmedSearch === '') {
    return 'No se puede buscar una película sin título.'
  }

  if (/^\d+$/.test(trimmedSearch)) {
    return 'La búsqueda no puede contener solo números.'
  }

  if (trimmedSearch.length < 3) {
    return 'La búsqueda debe tener al menos 3 caracteres.'
  }

  if (year !== '') {
    const currentYear = new Date().getFullYear()
    const numericYear = Number(year)

    if (!/^\d{4}$/.test(year) || numericYear < 1900 || numericYear > currentYear) {
      return `El año debe tener 4 dígitos y estar entre 1900 y ${currentYear}.`
    }
  }

  return null
}

export default function useMovieSearch() {
  const dispatch = useAppDispatch()

  const {
    search,
    year,
    page,
    movies,
    loading,
    validationError,
    requestError,
    totalPages,
    hasSearched
  } = useAppSelector((state) => state.movies)

  const visiblePages = useMemo(() => {
    if (totalPages <= 0) return []

    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)

    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }, [page, totalPages])

  const onSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearch(value))
      dispatch(clearValidationError())
      dispatch(clearRequestError())
    },
    [dispatch]
  )

  const onYearChange = useCallback(
    (value: string) => {
      dispatch(setYear(value))
      dispatch(clearValidationError())
      dispatch(clearRequestError())
    },
    [dispatch]
  )

  const executeSearch = useCallback(
    (targetPage: number) => {
      const validationMessage = validateSearch(search, year)

      if (validationMessage) {
        dispatch(setValidationError(validationMessage))
        return
      }

      dispatch(clearValidationError())
      dispatch(clearRequestError())
      dispatch(setPage(targetPage))

      const newUrl = `?query=${encodeURIComponent(search.trim())}&year=${encodeURIComponent(
        year
      )}&page=${targetPage}`

      window.history.replaceState({}, '', newUrl)

      dispatch(
        fetchMovies({
          search: search.trim(),
          page: targetPage,
          year
        })
      )
    },
    [dispatch, search, year]
  )

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      executeSearch(1)
    },
    [executeSearch]
  )

  const handlePreviousPage = useCallback(() => {
    const newPage = page - 1
    if (newPage < 1) return

    executeSearch(newPage)
  }, [executeSearch, page])

  const handleNextPage = useCallback(() => {
    const newPage = page + 1
    if (newPage > totalPages) return

    executeSearch(newPage)
  }, [executeSearch, page, totalPages])

  const handleGoToPage = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return
      executeSearch(newPage)
    },
    [executeSearch, totalPages]
  )

  const handleRetry = useCallback(() => {
    executeSearch(page)
  }, [executeSearch, page])

  return {
    search,
    year,
    page,
    movies,
    loading,
    validationError,
    requestError,
    totalPages,
    visiblePages,
    hasSearched,
    onSearchChange,
    onYearChange,
    handleSubmit,
    handlePreviousPage,
    handleNextPage,
    handleGoToPage,
    handleRetry
  }
}