import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ActivityList } from '../components/workspaces/ActivityList'
import { WorkspaceStatusBadge } from '../components/workspaces/WorkspaceStatusBadge'
import { Dialog } from '../components/ui/Dialog'
import {
  getWorkspaceActivity,
  getWorkspaceById,
  revokeWorkspaceSession,
} from '../data/workspaceApi'
import type {
  ActivityEvent,
  Workspace,
} from '../types/workspace'

export function WorkspaceDetailPage() {
  const { workspaceId } = useParams()

  const [workspace, setWorkspace] =
    useState<Workspace | null>(null)

  const [activity, setActivity] =
    useState<ActivityEvent[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isDialogOpen, setIsDialogOpen] =
    useState(false)

  const [isRevoking, setIsRevoking] =
    useState(false)

  const [revokeSuccess, setRevokeSuccess] =
    useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadWorkspace() {
      if (!workspaceId) {
        setError('Workspace not found.')
        setIsLoading(false)
        return
      }

      try {
        const [workspaceData, activityData] =
          await Promise.all([
            getWorkspaceById(workspaceId),
            getWorkspaceActivity(workspaceId),
          ])

        if (!isMounted) {
          return
        }

        if (!workspaceData) {
          setError('Workspace not found.')
          return
        }

        setWorkspace(workspaceData)
        setActivity(activityData)
      } catch {
        if (isMounted) {
          setError('Unable to load workspace details.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadWorkspace()

    return () => {
      isMounted = false
    }
  }, [workspaceId])

  async function handleRevokeSession() {
    if (!workspace) {
      return
    }

    setIsRevoking(true)

    try {
      await revokeWorkspaceSession(workspace.id)

      setRevokeSuccess(true)
      setIsDialogOpen(false)
    } finally {
      setIsRevoking(false)
    }
  }

  if (isLoading) {
    return (
      <section>
        <header className="page-header">
          <h1>Workspace Detail</h1>
          <p>Loading workspace information.</p>
        </header>

        <div className="workspace-state" role="status">
          <div
            className="loading-spinner"
            aria-hidden="true"
          />
          <p>Loading workspace…</p>
        </div>
      </section>
    )
  }

  if (error || !workspace) {
    return (
      <section>
        <header className="page-header">
          <h1>Workspace unavailable</h1>
          <p>
            We could not find the requested workspace.
          </p>
        </header>

        <div className="workspace-state">
          <p>{error ?? 'Workspace not found.'}</p>

          <Link
            to="/workspaces"
            className="workspace-detail-link"
          >
            Return to workspaces
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="detail-back-link">
        <Link to="/workspaces">
          ← Back to workspaces
        </Link>
      </div>

      <header className="detail-header">
        <div>
          <h1>{workspace.name}</h1>
          <p>{workspace.id}</p>
        </div>

        <WorkspaceStatusBadge
          status={workspace.status}
        />
      </header>

      {revokeSuccess && (
        <div
          className="success-banner"
          role="status"
        >
          Session revoked successfully. The user will
          need to reconnect.
        </div>
      )}

      <div className="detail-grid">
        <section className="detail-card">
          <h2>Workspace information</h2>

          <dl className="detail-list">
            <div>
              <dt>Assigned user</dt>
              <dd>{workspace.assignedUser}</dd>
            </div>

            <div>
              <dt>Platform</dt>
              <dd>{workspace.platform}</dd>
            </div>

            <div>
              <dt>Region</dt>
              <dd>{workspace.region}</dd>
            </div>

            <div>
              <dt>Last seen</dt>
              <dd>{workspace.lastSeen}</dd>
            </div>
          </dl>
        </section>

        <section className="detail-card">
          <h2>Policy</h2>

          <dl className="detail-list">
            <div>
              <dt>Policy</dt>
              <dd>{workspace.policyName}</dd>
            </div>

            <div>
              <dt>Policy status</dt>
              <dd>
                <WorkspaceStatusBadge
                  status={workspace.policyStatus}
                />
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="detail-card security-card">
        <div>
          <h2>Security actions</h2>

          <p>
            Revoking the active session immediately
            disconnects this workspace. The assigned user
            will need to reconnect before continuing work.
          </p>
        </div>

        <button
          type="button"
          className="button button-danger"
          onClick={() => setIsDialogOpen(true)}
          disabled={revokeSuccess}
        >
          {revokeSuccess
            ? 'Session revoked'
            : 'Revoke session'}
        </button>
      </section>

      <section className="detail-card">
        <h2>Recent activity</h2>

        <ActivityList events={activity} />
      </section>

      <Dialog
        open={isDialogOpen}
        title="Revoke active session?"
        onClose={() => {
          if (!isRevoking) {
            setIsDialogOpen(false)
          }
        }}
      >
        <p className="dialog-description">
          {workspace.name} will be disconnected from its
          current secure session. {workspace.assignedUser}{' '}
          will need to reconnect before continuing work.
        </p>

        <div className="dialog-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setIsDialogOpen(false)}
            disabled={isRevoking}
          >
            Cancel
          </button>

          <button
            type="button"
            className="button button-danger"
            onClick={handleRevokeSession}
            disabled={isRevoking}
          >
            {isRevoking
              ? 'Revoking…'
              : 'Revoke session'}
          </button>
        </div>
      </Dialog>
    </section>
  )
}
