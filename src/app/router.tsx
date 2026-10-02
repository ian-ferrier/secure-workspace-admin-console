import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { OverviewPage } from '../pages/OverviewPage'
import { WorkspaceDetailPage } from '../pages/WorkspaceDetailPage'
import { WorkspacesPage } from '../pages/WorkspacesPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: '/',
        element: <OverviewPage />,
      },
      {
        path: '/workspaces',
        element: <WorkspacesPage />,
      },
      {
        path: '/workspaces/:workspaceId',
        element: <WorkspaceDetailPage />,
      },
    ],
  },
])
