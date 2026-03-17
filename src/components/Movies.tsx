import type { Movie } from '../types.d'

const FALLBACK_POSTER =
  'https://via.placeholder.com/500x750?text=Sin+imagen'

type Props = {
  movies: Movie[]
  hasSearched: boolean
}

export function Movies({ movies, hasSearched }: Props) {
  if (!hasSearched) {
    return (
      <div className='empty-state'>
        Escribe un título y pulsa “Buscar” para ver resultados.
      </div>
    )
  }

  if (movies.length === 0) {
    return <div className='empty-state'>No se encontraron películas</div>
  }

  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li key={movie.id} className='movie'>
          <img
            src={movie.poster || FALLBACK_POSTER}
            alt={movie.title}
            onError={(event) => {
              event.currentTarget.src = FALLBACK_POSTER
            }}
          />

          <div className='movie__content'>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}