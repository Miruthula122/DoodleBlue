import { NavLink } from 'react-router-dom'
import Icon from './Icon.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Students', to: '/students' },
  { label: 'Teachers', to: '/teachers' },
]

function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink className="brand" to="/students" aria-label="Campus Directory">
          <span className="brand-mark">CD</span>
          <span className="brand-name">Campus Directory</span>
        </NavLink>

        <nav className="nav" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
          <span className="nav-user" aria-hidden="true">
            <Icon name="user" size={20} />
          </span>
        </nav>
      </div>
    </header>
  )
}

export default Header