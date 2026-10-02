import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/workspaces', label: 'Workspaces' },
]

export function AppShell() {
  return (
    <div>
      <header>
        <a href="#main-content">Skip to main content</a>

        <div>
          <strong>Secure Workspace</strong>
          <span>System operational</span>
        </div>
      </header>

      <div>
        <aside aria-label="Primary navigation">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
