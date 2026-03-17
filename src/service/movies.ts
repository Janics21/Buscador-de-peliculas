import { type Movie, type TmdbMovie } from '../types.d'

const API_KEY = '7a4154d1320f8b6a3252c51862d31576'

type SearchMoviesResponse = {
  movies: Movie[]
  totalPages: number
  year: string
}

export const searchMovies = async ({
  search,
  page = 1,
  year
}: {
  search: string
  page?: number
  year: string
}): Promise<SearchMoviesResponse> => {
  if (search === '') {
    return { movies: [], totalPages: 0, year }
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&api_key=${API_KEY}&page=${page}`
    )

    const json = await response.json()

    const movies: TmdbMovie[] = json.results ?? []

    const filteredMovies = movies.filter((movie: TmdbMovie) => {
      if (!year) return true
      return movie.release_date?.startsWith(year)
    })

    const mappedMovies = filteredMovies.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date?.split('-')[0] ?? '',
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image'
    }))

    return {
      movies: mappedMovies,
      totalPages: json.total_pages ?? 0,
      year
    }
  } catch (error) {
    throw new Error('Error searching movies')
  }
}