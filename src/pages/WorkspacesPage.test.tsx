import { afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { WorkspacesPage } from './WorkspacesPage'
import { setMockApiFailure } from '../data/workspaceApi'

describe('WorkspacesPage', () => {
  afterEach(() => {
    setMockApiFailure(false)
  })

  it('filters workspaces by user search', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <WorkspacesPage />
      </MemoryRouter>,
    )

    await screen.findByText('Atlas-014')

    const searchInput = screen.getByLabelText('Search')

    await user.type(searchInput, 'Riley')

    expect(screen.getByText('Atlas-021')).toBeInTheDocument()
    expect(screen.queryByText('Atlas-014')).not.toBeInTheDocument()
  })

  it('shows an empty state when filters return no results', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <WorkspacesPage />
      </MemoryRouter>,
    )

    await screen.findByText('Atlas-014')

    const searchInput = screen.getByLabelText('Search')

    await user.type(searchInput, 'does-not-exist')

    await waitFor(() => {
      expect(
        screen.getByText('No matching workspaces'),
      ).toBeInTheDocument()
    })
  })

  it('shows an error state when workspace loading fails', async () => {
    setMockApiFailure(true)

    render(
      <MemoryRouter>
        <WorkspacesPage />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText('Unable to load workspaces'),
    ).toBeInTheDocument()
  })
})
