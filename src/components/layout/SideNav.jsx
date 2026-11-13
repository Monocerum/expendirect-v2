import { NavLink } from 'react-router-dom'
import { SIDE_NAV_ITEMS } from '@/constants/navigation'
import NavIcon from './NavIcon'

export default function SideNav({ isOpen, onToggle, onOpen, onClose }) {
  return (
    <>
      <aside className={`side${isOpen ? ' open' : ''}`}>
        <button onClick={onToggle} aria-label="Toggle menu" aria-expanded={isOpen}>
          <NavIcon name="menu" />
        </button>
        {SIDE_NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end title={item.label}>
            <NavIcon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </aside>
      {isOpen && <div className="scrim" onClick={onClose} />}
      <button className="burger" onClick={onOpen} aria-label="Open menu">
        <NavIcon name="menu" size={26} />
      </button>
    </>
  )
}
