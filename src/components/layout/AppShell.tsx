import { LayoutDashboard, MonitorSmartphone, ShieldCheck } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  {
    to: '/',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    to: '/workspaces',
    label: 'Workspaces',
    icon: MonitorSmartphone,
  },
]

export function AppShell() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <ShieldCheck size={20} />
          </div>

          <div>
            <div className="brand-name">Secure Workspace</div>
            <div className="brand-subtitle">Admin Console</div>
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label="Primary navigation">
          <nav>
            <ul className="nav-list">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `nav-link${isActive ? ' nav-link-active' : ''}`
                    }
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <div
              className="sidebar-system-status"
              aria-label="System status: operational"
            >
              <span className="status-dot" aria-hidden="true" />
              <span>System operational</span>
            </div>

            <div className="sidebar-meta">
              <span>Portfolio demonstration</span>
              <span>Fictional data only</span>
            </div>
          </div>
        </aside>

        <main id="main-content" className="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <div
        className="mobile-system-status"
        aria-label="System status: operational"
      >
        <span className="status-dot" aria-hidden="true" />
        <span>System operational</span>
      </div>
    </div>
  )
}
