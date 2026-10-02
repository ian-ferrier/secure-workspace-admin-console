import { useWorkspaces } from '../hooks/useWorkspaces'

export function WorkspacesPage() {
  const { workspaces, isLoading, error } = useWorkspaces()

  return (
    <section>
      <header className="page-header">
        <h1>Workspaces</h1>
        <p>Manage secure workspace status and policy compliance.</p>
      </header>

      <div className="placeholder-panel">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && <p>{workspaces.length} workspaces loaded.</p>}
      </div>
    </section>
  )
}
