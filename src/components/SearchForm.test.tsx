import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { SearchForm } from './SearchForm'

describe('SearchForm', () => {
  test('renderiza campos y botón', () => {
    render(
      <SearchForm
        search=""
        year=""
        validationError={null}
        requestError={null}
        onSearchChange={vi.fn()}
        onYearChange={vi.fn()}
        onSubmit={vi.fn()}
        onRetry={vi.fn()}
      />
    )

    expect(screen.getByLabelText(/Título de la película/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Año/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument()
  })

  test('llama a onSearchChange al escribir', async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()

    render(
      <SearchForm
        search=""
        year=""
        validationError={null}
        requestError={null}
        onSearchChange={onSearchChange}
        onYearChange={vi.fn()}
        onSubmit={vi.fn()}
        onRetry={vi.fn()}
      />
    )

    await user.type(screen.getByLabelText(/Título de la película/i), 'Batman')

    expect(onSearchChange).toHaveBeenCalled()
  })

  test('llama a onSubmit al enviar', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((e) => e.preventDefault())

    render(
      <SearchForm
        search="Batman"
        year="2005"
        validationError={null}
        requestError={null}
        onSearchChange={vi.fn()}
        onYearChange={vi.fn()}
        onSubmit={onSubmit}
        onRetry={vi.fn()}
      />
    )

    await user.click(screen.getByRole('button', { name: /Buscar/i }))

    expect(onSubmit).toHaveBeenCalled()
  })
})