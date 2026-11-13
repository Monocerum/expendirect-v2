import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { getPageMeta } from '@/constants/pageMeta'
import { useApplyTheme } from '@/hooks/useApplyTheme'
import { useStore } from '@/hooks/useStore'
import Header from './Header'
import PageHero from './PageHero'
import SeoHead from './SeoHead'
import SideNav from './SideNav'

export default function AppLayout() {
  const { pathname } = useLocation()
  const { state } = useStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const page = getPageMeta(pathname)
  const isHome = pathname === '/'

  useApplyTheme(state.settings)

  useEffect(() => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <SeoHead title={page.title} description={page.description} />
      <Header profile={state.profile} />
      <PageHero
        title={page.h1}
        subtitle={isHome ? 'expense tracker' : 'expendirect'}
        action={
          isHome && (
            <Link to="/tracker" className="btn big">
              Track expenses
            </Link>
          )
        }
      />
      <div className="shell">
        <SideNav
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
        />
        <main key={pathname} className="content">
          <Outlet />
        </main>
      </div>
      <div className="foot" aria-hidden="true" />
    </div>
  )
}
