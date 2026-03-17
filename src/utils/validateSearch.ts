export default function validateSearch(search: string, year: string): string | null {
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