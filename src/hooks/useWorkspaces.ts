import { useEffect, useState } from 'react'
import { getWorkspaces } from '../data/workspaceApi'
import type { Workspace } from '../types/workspace'

interface UseWorkspacesResult {
  workspaces: Workspace[]
  isLoading: boolean
  error: string | null
}

export function useWorkspaces(): UseWorkspacesResult {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadWorkspaces() {
      try {
        const data = await getWorkspaces()

        if (isMounted) {
          setWorkspaces(data)
        }
      } catch {
        if (isMounted) {
          setError('Unable to load workspaces.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadWorkspaces()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    workspaces,
    isLoading,
    error,
  }
}
