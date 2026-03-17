import type { FormEvent } from 'react'
import {
  PrimaryButton,
  TextField,
  Stack,
  MessageBar,
  MessageBarType
} from '@fluentui/react'

const commonButtonStyles = {
  root: {
    height: 40,
    borderRadius: 10,
    padding: '0 18px',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'all 0.2s ease',
    border: 'none',
    marginBottom: 0
  },
  rootHovered: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
  },
  rootPressed: {
    transform: 'scale(0.98)'
  },
  rootDisabled: {
    borderRadius: 10,
    opacity: 0.6
  }
}

type Props = {
  search: string
  year: string
  validationError: string | null
  requestError: string | null
  onSearchChange: (value: string) => void
  onYearChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onRetry: () => void
}

export function SearchForm({
  search,
  year,
  validationError,
  requestError,
  onSearchChange,
  onYearChange,
  onSubmit,
  onRetry
}: Props) {
  return (
    <>
      <form className='search-form' onSubmit={onSubmit}>
        <Stack
          horizontal
          tokens={{ childrenGap: 10 }}
          verticalAlign='end'
          className='search-row'
        >
          <Stack.Item grow className='search-item search-item--grow'>
            <TextField
              label='Título de la película'
              value={search}
              onChange={(_, newValue) => onSearchChange(newValue ?? '')}
              name='query'
              placeholder='Avengers, Star Wars...'
              styles={{
                root: { marginBottom: 0, width: '100%' },
                fieldGroup: { height: 40, borderRadius: 10 }
              }}
            />
          </Stack.Item>

          <Stack.Item className='search-item search-item--year'>
            <TextField
              label='Año'
              type='number'
              value={year}
              onChange={(_, newValue) => onYearChange(newValue ?? '')}
              placeholder='Ej: 2020'
              min={1900}
              max={new Date().getFullYear()}
              styles={{
                root: { width: '100%' },
                fieldGroup: { height: 40, borderRadius: 10 }
              }}
            />
          </Stack.Item>

          <Stack.Item className='search-item search-item--button'>
            <PrimaryButton
              type='submit'
              styles={commonButtonStyles}
              className='search-submit'
            >
              Buscar
            </PrimaryButton>
          </Stack.Item>
        </Stack>
      </form>

      {(validationError || requestError) && (
        <div className='feedback'>
          {validationError && (
            <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
              {validationError}
            </MessageBar>
          )}

          {requestError && (
            <MessageBar messageBarType={MessageBarType.error}>
              <div className='message-content'>
                <span>{requestError}</span>
                <PrimaryButton onClick={onRetry}>Reintentar</PrimaryButton>
              </div>
            </MessageBar>
          )}
        </div>
      )}
    </>
  )
}