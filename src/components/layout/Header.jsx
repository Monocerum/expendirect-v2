import { Link, NavLink } from 'react-router-dom'
import { HEADER_NAV_ITEMS } from '@/constants/navigation'
import Logo from './Logo'

export default function Header({ profile }) {
    return (
        <header className="top">
            <Logo />
            <nav aria-label="Main">
                {HEADER_NAV_ITEMS.map((item) => (
                    <NavLink key={item.to} to={item.to} end>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            <Link to="/profile" className="avatar" aria-label="Profile">
                {profile.avatar ? (
                    <img src={profile.avatar} alt="Your profile photo" />
                ) : (
                    <span>{(profile.name || 'U')[0]}</span>
                )}
            </Link>
            <Link to="/settings" className="gear" aria-label="Settings">
                <img src="/assets/settings.svg" alt="" width="26" height="26" />
            </Link>
        </header>
    )
}
