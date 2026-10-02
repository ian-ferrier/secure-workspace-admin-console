import { useMemo, useState } from 'react'
import { WorkspaceFilters } from '../components/workspaces/WorkspaceFilters'
import type { WorkspaceStatusFilter } from '../components/workspaces/WorkspaceFilters'
import { WorkspaceTable } from '../components/workspaces/WorkspaceTable'
import { useWorkspaces } from '../hooks/useWorkspaces'

export function WorkspacesPage() {
  const { workspaces, isLoading, error } = useWorkspaces()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] =
    useState<WorkspaceStatusFilter>('all')

  const filteredWorkspaces = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return workspaces.filter((workspace) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        workspace.name.toLowerCase().includes(normalizedSearch) ||
        workspace.assignedUser
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'all' ||
        workspace.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [workspaces, searchTerm, statusFilter])

  const hasActiveFilters =
    searchTerm.trim().length > 0 || statusFilter !== 'all'

  return (
    <section>
      <header className="page-header">
        <h1>Workspaces</h1>
        <p>
          Manage secure workspace status and policy compliance.
        </p>
      </header>

      <div className="workspace-panel">
        <WorkspaceFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />

        {isLoading && (
          <div className="workspace-state" role="status">
            <div
              className="loading-spinner"
              aria-hidden="true"
            />
            <p>Loading workspaces…</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="workspace-state workspace-state-error">
            <h2>Unable to load workspaces</h2>
            <p>{error}</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          filteredWorkspaces.length > 0 && (
            <>
              <div className="workspace-results-summary">
                {filteredWorkspaces.length}{' '}
                {filteredWorkspaces.length === 1
                  ? 'workspace'
                  : 'workspaces'}
              </div>

              <WorkspaceTable
                workspaces={filteredWorkspaces}
              />
            </>
          )}

        {!isLoading &&
          !error &&
          filteredWorkspaces.length === 0 && (
            <div className="workspace-state">
              <h2>
                {hasActiveFilters
                  ? 'No matching workspaces'
                  : 'No workspaces available'}
              </h2>

              <p>
                {hasActiveFilters
                  ? 'Try changing your search or status filter.'
                  : 'Workspaces will appear here when they become available.'}
              </p>
            </div>
          )}
      </div>
    </section>
  )
}