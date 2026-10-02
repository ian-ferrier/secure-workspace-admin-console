import type {
  PolicyStatus,
  WorkspaceStatus,
} from '../../types/workspace'

type StatusValue = WorkspaceStatus | PolicyStatus

interface WorkspaceStatusBadgeProps {
  status: StatusValue
}

const labels: Record<StatusValue, string> = {
  online: 'Online',
  degraded: 'Degraded',
  offline: 'Offline',
  current: 'Current',
  'review-required': 'Review required',
}

export function WorkspaceStatusBadge({
  status,
}: WorkspaceStatusBadgeProps) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      {labels[status]}
    </span>
  )
}
