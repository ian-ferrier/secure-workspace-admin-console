import { useEffect, useMemo, useState } from 'react'
import { ActivityList } from '../components/workspaces/ActivityList'
import { getWorkspaces } from '../data/workspaceApi'
import { activityEvents } from '../data/mockData'
import type { Workspace } from '../types/workspace'

export function OverviewPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadOverview() {
      try {
        const data = await getWorkspaces()

        if (isMounted) {
          setWorkspaces(data)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load overview.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadOverview()

    return () => {
      isMounted = false
    }
  }, [])

  const metrics = useMemo(() => {
    const active = workspaces.filter(
      (workspace) => workspace.status === 'online',
    ).length

    const attention = workspaces.filter(
      (workspace) =>
        workspace.status === 'degraded' ||
        workspace.status === 'offline',
    ).length

    const uniqueUsers = new Set(
      workspaces.map((workspace) => workspace.assignedUser),
    ).size

    const securityAlerts = activityEvents.filter(
      (event) => event.type === 'security',
    ).length

    return {
      active,
      attention,
      uniqueUsers,
      securityAlerts,
    }
  }, [workspaces])

  const statusCounts = useMemo(
    () => ({
      online: workspaces.filter(
        (workspace) => workspace.status === 'online',
      ).length,
      degraded: workspaces.filter(
        (workspace) => workspace.status === 'degraded',
      ).length,
      offline: workspaces.filter(
        (workspace) => workspace.status === 'offline',
      ).length,
    }),
    [workspaces],
  )

  if (isLoading) {
    return (
      <section>
        <header className="page-header">
          <h1>Overview</h1>
          <p>Monitor workspace availability and security posture.</p>
        </header>

        <div className="workspace-state" role="status">
          <div className="loading-spinner" aria-hidden="true" />
          <p>Loading overview…</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <header className="page-header">
          <h1>Overview</h1>
          <p>Monitor workspace availability and security posture.</p>
        </header>

        <div className="workspace-state workspace-state-error">
          <h2>Unable to load overview</h2>
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <header className="page-header">
        <h1>Overview</h1>
        <p>Monitor workspace availability and security posture.</p>
      </header>

      <div className="metric-grid">
        <article className="metric-card">
          <span className="metric-label">Active workspaces</span>
          <strong className="metric-value">{metrics.active}</strong>
          <span className="metric-meta">
            Currently connected and healthy
          </span>
        </article>

        <article className="metric-card">
          <span className="metric-label">Needs attention</span>
          <strong className="metric-value">{metrics.attention}</strong>
          <span className="metric-meta">
            Degraded or offline
          </span>
        </article>

        <article className="metric-card">
          <span className="metric-label">Assigned users</span>
          <strong className="metric-value">{metrics.uniqueUsers}</strong>
          <span className="metric-meta">
            Across managed workspaces
          </span>
        </article>

        <article className="metric-card metric-card-alert">
          <span className="metric-label">Security alerts</span>
          <strong className="metric-value">
            {metrics.securityAlerts}
          </strong>
          <span className="metric-meta">
            Recent events requiring review
          </span>
        </article>
      </div>

      <div className="overview-grid">
        <section className="detail-card">
          <h2>Workspace status</h2>

          <div className="status-summary">
            <div className="status-summary-row">
              <div>
                <span
                  className="status-summary-dot status-summary-dot-online"
                  aria-hidden="true"
                />
                <span>Online</span>
              </div>

              <strong>{statusCounts.online}</strong>
            </div>

            <div className="status-summary-row">
              <div>
                <span
                  className="status-summary-dot status-summary-dot-degraded"
                  aria-hidden="true"
                />
                <span>Degraded</span>
              </div>

              <strong>{statusCounts.degraded}</strong>
            </div>

            <div className="status-summary-row">
              <div>
                <span
                  className="status-summary-dot status-summary-dot-offline"
                  aria-hidden="true"
                />
                <span>Offline</span>
              </div>

              <strong>{statusCounts.offline}</strong>
            </div>
          </div>
        </section>

        <section className="detail-card">
          <div className="section-heading-row">
            <h2>Recent activity</h2>

            <span className="section-meta">
              Latest {activityEvents.length}
            </span>
          </div>

          <ActivityList events={activityEvents} />
        </section>
      </div>
    </section>
  )
}
