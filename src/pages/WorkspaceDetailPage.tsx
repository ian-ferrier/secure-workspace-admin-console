import { useParams } from 'react-router-dom'

export function WorkspaceDetailPage() {
  const { workspaceId } = useParams()

  return (
    <section>
      <h1>Workspace Detail</h1>
      <p>Workspace ID: {workspaceId}</p>
    </section>
  )
}
