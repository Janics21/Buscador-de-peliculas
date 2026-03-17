import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const API_KEY = '7a4154d1320f8b6a3252c51862d31576'

export type Movie = {
  id: number
  title: string
  year: string
  poster: string
}

type FetchMoviesArgs = {
  search: string
  page: number
  year: string
}

type TmdbMovie = {
  id: number
  title: string
  release_date?: string
  poster_path?: string
}

type FetchMoviesResponse = {
  movies: Movie[]
  totalPages: number
}

type MoviesState = {
  search: string
  year: string
  page: number
  movies: Movie[]
  loading: boolean
  validationError: string | null
  requestError: string | null
  totalPages: number
  hasSearched: boolean
}

const initialState: MoviesState = {
  search: '',
  year: '',
  page: 1,
  movies: [],
  loading: false,
  validationError: null,
  requestError: null,
  totalPages: 0,
  hasSearched: false
}

export const fetchMovies = createAsyncThunk<
  FetchMoviesResponse,
  FetchMoviesArgs,
  { rejectValue: string }
>('movies/fetchMovies', async ({ search, page, year }, thunkAPI) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&api_key=${API_KEY}&page=${page}`
    )

    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        `Error del servidor: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    if (!Array.isArray(data.results)) {
      return thunkAPI.rejectWithValue('La respuesta del servidor no tiene el formato esperado.')
    }

    let filteredResults: TmdbMovie[] = data.results

    if (year) {
      filteredResults = filteredResults.filter((movie) => {
        if (!movie.release_date) return false
        return movie.release_date.slice(0, 4) === year
      })
    }

    const movies: Movie[] = filteredResults.map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : ''
    }))

    return {
      movies,
      totalPages: data.total_pages ?? 0
    }
  } catch {
    return thunkAPI.rejectWithValue(
      'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
    )
  }
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    clearValidationError: (state) => {
      state.validationError = null
    },
    clearRequestError: (state) => {
      state.requestError = null
    },
    setValidationError: (state, action: PayloadAction<string>) => {
      state.validationError = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true
        state.requestError = null
        state.validationError = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload.movies
        state.totalPages = action.payload.totalPages
        state.requestError = null
        state.hasSearched = true
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false
        state.movies = []
        state.totalPages = 0
        state.requestError = action.payload ?? 'Error desconocido'
        state.hasSearched = true
      })
  }
})

export const {
  setSearch,
  setYear,
  setPage,
  clearValidationError,
  clearRequestError,
  setValidationError
} = moviesSlice.actions

export default moviesSlice.reducer