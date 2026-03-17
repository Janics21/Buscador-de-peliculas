import { PrimaryButton } from '@fluentui/react'

const pageButtonStyles = (isActive: boolean) => ({
  root: {
    minWidth: 42,
    height: 38,
    borderRadius: 50,
    fontWeight: '600',
    backgroundColor: isActive ? '#5bb6db' : '#87CEEB',
    color: 'black',
    border: '1px solid #87CEEB',
    boxShadow: isActive
      ? '0 4px 12px rgba(0,0,0,0.2)'
      : '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'all 0.2s ease',
    margin: 0
  },
  rootHovered: {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #87CEEB',
    transform: 'translateY(-1px)'
  },
  rootPressed: {
    transform: 'scale(0.97)'
  }
})

type Props = {
  page: number
  totalPages: number
  pages: number[]
  onPrevious: () => void
  onNext: () => void
  onGoToPage: (page: number) => void
}

export function Pagination({
  page,
  totalPages,
  pages,
  onPrevious,
  onNext,
  onGoToPage
}: Props) {
  if (totalPages <= 1) return null

  return (
    <footer>
      <div className='pagination'>
        <div className='pagination__inner'>
          <PrimaryButton
            onClick={onPrevious}
            disabled={page <= 1}
            styles={pageButtonStyles(false)}
          >
            Anterior
          </PrimaryButton>

          {pages.map((p) => (
            <PrimaryButton
              key={p}
              onClick={() => onGoToPage(p)}
              disabled={p === page}
              styles={pageButtonStyles(p === page)}
            >
              {p}
            </PrimaryButton>
          ))}

          <PrimaryButton
            onClick={onNext}
            disabled={page >= totalPages}
            styles={pageButtonStyles(false)}
          >
            Siguiente
          </PrimaryButton>
        </div>
      </div>
    </footer>
  )
}