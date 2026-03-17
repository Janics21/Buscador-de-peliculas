import { describe, expect, test } from 'vitest'
import validateSearch from './validateSearch'

describe('validateSearch', () => {
  test('devuelve error si la búsqueda está vacía', () => {
    expect(validateSearch('', '')).toBe('No se puede buscar una película sin título.')
  })

  test('devuelve error si la búsqueda contiene solo números', () => {
    expect(validateSearch('12345', '')).toBe('La búsqueda no puede contener solo números.')
  })

  test('devuelve error si la búsqueda tiene menos de 3 caracteres', () => {
    expect(validateSearch('ab', '')).toBe('La búsqueda debe tener al menos 3 caracteres.')
  })

  test('devuelve error si el año no tiene 4 dígitos', () => {
    expect(validateSearch('Batman', '99')).toContain('El año debe tener 4 dígitos')
  })

  test('devuelve null si los datos son válidos', () => {
    expect(validateSearch('Batman', '2020')).toBeNull()
  })
})