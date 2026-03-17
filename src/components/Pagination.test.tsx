import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  test('no renderiza nada cuando totalPages es 1 o menor', () => {
    const { container } = render(
      <Pagination
        page={1}
        totalPages={1}
        pages={[1]}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
        onGoToPage={vi.fn()}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  test('renderiza botones de navegación y páginas visibles', () => {
    render(
      <Pagination
        page={3}
        totalPages={10}
        pages={[1, 2, 3, 4, 5]}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
        onGoToPage={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: /Anterior/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
  })

  test('deshabilita el botón "Anterior" en la primera página', () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        pages={[1, 2, 3]}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
        onGoToPage={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: /Anterior/i })).toBeDisabled()
  })

  test('deshabilita el botón "Siguiente" en la última página', () => {
    render(
      <Pagination
        page={5}
        totalPages={5}
        pages={[3, 4, 5]}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
        onGoToPage={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeDisabled()
  })

  test('deshabilita el botón de la página actual', () => {
    render(
      <Pagination
        page={3}
        totalPages={5}
        pages={[1, 2, 3, 4, 5]}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
        onGoToPage={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: '3' })).toBeDisabled()
  })

  test('llama a onPrevious al pulsar "Anterior"', async () => {
    const user = userEvent.setup()
    const onPrevious = vi.fn()

    render(
      <Pagination
        page={3}
        totalPages={5}
        pages={[1, 2, 3, 4, 5]}
        onPrevious={onPrevious}
        onNext={vi.fn()}
        onGoToPage={vi.fn()}
      />
    )

    await user.click(screen.getByRole('button', { name: /Anterior/i }))

    expect(onPrevious).toHaveBeenCalledTimes(1)
  })

  test('llama a onNext al pulsar "Siguiente"', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()

    render(
      <Pagination
        page={3}
        totalPages={5}
        pages={[1, 2, 3, 4, 5]}
        onPrevious={vi.fn()}
        onNext={onNext}
        onGoToPage={vi.fn()}
      />
    )

    await user.click(screen.getByRole('button', { name: /Siguiente/i }))

    expect(onNext).toHaveBeenCalledTimes(1)
  })

  test('llama a onGoToPage con la página correcta al pulsar un número', async () => {
    const user = userEvent.setup()
    const onGoToPage = vi.fn()

    render(
      <Pagination
        page={3}
        totalPages={10}
        pages={[1, 2, 3, 4, 5]}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
        onGoToPage={onGoToPage}
      />
    )

    await user.click(screen.getByRole('button', { name: '5' }))

    expect(onGoToPage).toHaveBeenCalledTimes(1)
    expect(onGoToPage).toHaveBeenCalledWith(5)
  })
})