import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { WorkspaceDetailPage } from './WorkspaceDetailPage'

describe('WorkspaceDetailPage', () => {
  it('requires confirmation before revoking a session', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/workspaces/atlas-021']}>
        <Routes>
          <Route
            path="/workspaces/:workspaceId"
            element={<WorkspaceDetailPage />}
          />
        </Routes>
      </MemoryRouter>,
    )

    await screen.findByText('Atlas-021')

    await user.click(
      screen.getByRole('button', {
        name: 'Revoke session',
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Revoke active session?',
      }),
    ).toBeInTheDocument()

    const dialog = screen.getByRole('dialog')

    expect(
      within(dialog).getByText(/will need to reconnect/i),
    ).toBeInTheDocument()
  })

  it('shows success feedback after confirmation', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/workspaces/atlas-021']}>
        <Routes>
          <Route
            path="/workspaces/:workspaceId"
            element={<WorkspaceDetailPage />}
          />
        </Routes>
      </MemoryRouter>,
    )

    await screen.findByText('Atlas-021')

    await user.click(
      screen.getByRole('button', {
        name: 'Revoke session',
      }),
    )

    const confirmButton = screen.getAllByRole('button', {
      name: 'Revoke session',
    })[1]

    await user.click(confirmButton)

    expect(
      await screen.findByText(/session revoked successfully/i),
    ).toBeInTheDocument()
  })
})
