import { useParams } from 'react-router-dom'

export function WorkspaceDetailPage() {
  const { workspaceId } = useParams()

  return (
    <section>
      <header className="page-header">
        <h1>Workspace Detail</h1>
        <p>Review connection state, policy posture, and recent activity.</p>
      </header>

      <div className="placeholder-panel">
        <p>Workspace ID: {workspaceId}</p>
      </div>
    </section>
  )
}
