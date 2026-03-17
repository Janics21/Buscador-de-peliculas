import { Spinner } from '@fluentui/react'
import { Movies } from './components/Movies'
import { Pagination } from './components/Pagination'
import { SearchForm } from './components/SearchForm'
import useMovieSearch from './hooks/useMovieSearch'
import './App.scss'

function App() {
  const {
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
  } = useMovieSearch()

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>

        <SearchForm
          search={search}
          year={year}
          validationError={validationError}
          requestError={requestError}
          onSearchChange={onSearchChange}
          onYearChange={onYearChange}
          onSubmit={handleSubmit}
          onRetry={handleRetry}
        />
      </header>

      <main>
        {loading ? (
          <Spinner label='Cargando...' />
        ) : (
          <Movies movies={movies} hasSearched={hasSearched} />
        )}
      </main>

      <Pagination
        page={page}
        totalPages={totalPages}
        pages={visiblePages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        onGoToPage={handleGoToPage}
      />
    </div>
  )
}

export default App