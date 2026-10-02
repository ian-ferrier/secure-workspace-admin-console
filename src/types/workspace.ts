export type WorkspaceStatus = 'online' | 'degraded' | 'offline'

export type PolicyStatus = 'current' | 'review-required'

export type WorkspacePlatform = 'Android' | 'iOS' | 'Windows'

export interface Workspace {
  id: string
  name: string
  assignedUser: string
  platform: WorkspacePlatform
  status: WorkspaceStatus
  lastSeen: string
  policyStatus: PolicyStatus
  policyName: string
  region: string
}

export interface ActivityEvent {
  id: string
  workspaceId: string
  type: 'connection' | 'policy' | 'security'
  message: string
  timestamp: string
}
