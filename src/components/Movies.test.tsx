import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom'
import { Movies } from './Movies'

describe('Movies', () => {
  test('muestra mensaje inicial cuando no se ha buscado', () => {
    render(<Movies movies={[]} hasSearched={false} />)

    expect(
      screen.getByText(/Escribe un título y pulsa “Buscar”/i)
    ).toBeInTheDocument()
  })

  test('muestra mensaje de sin resultados cuando la búsqueda no devuelve películas', () => {
    render(<Movies movies={[]} hasSearched={true} />)

    expect(screen.getByText(/No se encontraron películas/i)).toBeInTheDocument()
  })

  test('renderiza películas cuando hay resultados', () => {
    render(
      <Movies
        hasSearched={true}
        movies={[
          {
            id: 1,
            title: 'Batman Begins',
            year: '2005',
            poster: 'https://example.com/poster.jpg'
          }
        ]}
      />
    )

    expect(screen.getByText('Batman Begins')).toBeInTheDocument()
    expect(screen.getByText('2005')).toBeInTheDocument()
  })
})