import { Link } from 'react-router-dom'
import type { Workspace } from '../../types/workspace'
import { WorkspaceStatusBadge } from './WorkspaceStatusBadge'

interface WorkspaceTableProps {
  workspaces: Workspace[]
}

export function WorkspaceTable({
  workspaces,
}: WorkspaceTableProps) {
  return (
    <div className="workspace-table-wrapper">
      <table className="workspace-table">
        <caption className="sr-only">
          Secure workspace inventory
        </caption>

        <thead>
          <tr>
            <th scope="col">Workspace</th>
            <th scope="col">Assigned user</th>
            <th scope="col">Platform</th>
            <th scope="col">Status</th>
            <th scope="col">Last seen</th>
            <th scope="col">Policy</th>
            <th scope="col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {workspaces.map((workspace) => (
            <tr key={workspace.id}>
              <td>
                <div className="workspace-name-cell">
                  <span className="workspace-name">
                    {workspace.name}
                  </span>
                  <span className="workspace-id">
                    {workspace.id}
                  </span>
                </div>
              </td>

              <td>{workspace.assignedUser}</td>
              <td>{workspace.platform}</td>

              <td>
                <WorkspaceStatusBadge status={workspace.status} />
              </td>

              <td>{workspace.lastSeen}</td>

              <td>
                <WorkspaceStatusBadge
                  status={workspace.policyStatus}
                />
              </td>

              <td className="workspace-action-cell">
                <Link
                  to={`/workspaces/${workspace.id}`}
                  className="workspace-detail-link"
                  aria-label={`View details for ${workspace.name}`}
                >
                  View details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
