import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MenuIcon } from './icons'
import styles from './DashboardLayout.module.css'

export function DashboardLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the drawer whenever the route changes (e.g. browser back/forward).
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setIsNavOpen(false)
  }

  useEffect(() => {
    if (!isNavOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsNavOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isNavOpen])

  return (
    <div className={`${styles.dashboard} gap-4 p-3 sm:p-5 lg:gap-6 lg:p-11`}>
      <div className={styles.blobGold} aria-hidden="true" />
      <div className={styles.blobMint} aria-hidden="true" />

      <button
        type="button"
        className={`${styles.navToggle} fixed top-4 left-4 z-30 flex lg:hidden`}
        onClick={() => setIsNavOpen(true)}
        aria-label="Open navigation"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {isNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 lg:hidden"
          onClick={() => setIsNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto rounded-r-[28px] transition-transform duration-300 ease-in-out ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:z-10 lg:w-62 lg:max-w-none lg:translate-x-0 lg:rounded-[28px] lg:overflow-visible lg:transition-none`}
        onNavigate={() => setIsNavOpen(false)}
        onClose={() => setIsNavOpen(false)}
      />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
