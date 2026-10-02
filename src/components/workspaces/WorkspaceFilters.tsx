import type { WorkspaceStatus } from '../../types/workspace'

export type WorkspaceStatusFilter = 'all' | WorkspaceStatus

interface WorkspaceFiltersProps {
  searchTerm: string
  statusFilter: WorkspaceStatusFilter
  onSearchChange: (value: string) => void
  onStatusChange: (value: WorkspaceStatusFilter) => void
}

export function WorkspaceFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: WorkspaceFiltersProps) {
  return (
    <div className="workspace-filters">
      <div className="filter-field filter-field-search">
        <label htmlFor="workspace-search">Search</label>
        <input
          id="workspace-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search workspace or user"
        />
      </div>

      <div className="filter-field">
        <label htmlFor="workspace-status-filter">Status</label>
        <select
          id="workspace-status-filter"
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(
              event.target.value as WorkspaceStatusFilter,
            )
          }
        >
          <option value="all">All statuses</option>
          <option value="online">Online</option>
          <option value="degraded">Degraded</option>
          <option value="offline">Offline</option>
        </select>
      </div>
    </div>
  )
}
