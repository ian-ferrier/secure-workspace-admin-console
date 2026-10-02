import { activityEvents, workspaces } from './mockData'
import type { ActivityEvent, Workspace } from '../types/workspace'

const SIMULATED_DELAY = 500

let shouldFailRequests = false

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function setMockApiFailure(enabled: boolean) {
  shouldFailRequests = enabled
}

function maybeFail() {
  if (shouldFailRequests) {
    throw new Error('Simulated API failure')
  }
}

export async function getWorkspaces(): Promise<Workspace[]> {
  await wait(SIMULATED_DELAY)
  maybeFail()

  return workspaces
}

export async function getWorkspaceById(
  workspaceId: string,
): Promise<Workspace | undefined> {
  await wait(SIMULATED_DELAY)
  maybeFail()

  return workspaces.find((workspace) => workspace.id === workspaceId)
}

export async function getWorkspaceActivity(
  workspaceId: string,
): Promise<ActivityEvent[]> {
  await wait(SIMULATED_DELAY)
  maybeFail()

  return activityEvents.filter((event) => event.workspaceId === workspaceId)
}

export async function revokeWorkspaceSession(
  workspaceId: string,
): Promise<void> {
  await wait(700)
  maybeFail()

  const workspace = workspaces.find((item) => item.id === workspaceId)

  if (!workspace) {
    throw new Error('Workspace not found')
  }
}