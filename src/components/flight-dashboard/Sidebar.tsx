import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import { ACTIVE_USERS, ACTIVE_USERS_OVERFLOW, NAV_ITEMS } from './data'
import {
  CloseIcon,
  HomeIcon,
  PlaneIcon,
  PlaneMarkerIcon,
  ReportsIcon,
  SettingsIcon,
  StatisticsIcon,
  WalletIcon,
} from './icons'
import styles from './Sidebar.module.css'

const NAV_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  dashboard: HomeIcon,
  flights: PlaneIcon,
  wallet: WalletIcon,
  reports: ReportsIcon,
  statistics: StatisticsIcon,
  settings: SettingsIcon,
}

interface SidebarProps {
  /** Extra classes for positioning — static on desktop, a slide-in drawer below lg. */
  readonly className?: string
  /** Called when a nav link is clicked, so the drawer can close itself on navigation. */
  readonly onNavigate?: () => void
  /** When provided, renders a close button (only shown below lg). */
  readonly onClose?: () => void
}

export function Sidebar({ className, onNavigate, onClose }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} gap-6 px-5 py-7 ${className ?? ''}`}>
      {onClose && (
        <button
          type="button"
          className={`${styles.closeButton} flex lg:hidden`}
          onClick={onClose}
          aria-label="Close navigation"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}

      <header className={styles.profile}>
        <div className={`${styles.avatar} h-[78px] w-[78px] text-[22px]`} aria-hidden="true">
          AJ
        </div>
        <div className={styles.identity}>
          <p className={styles.name}>Alex Johnson</p>
          <p className={styles.email}>alex.johnson@gmail.com</p>
        </div>
      </header>

      <nav aria-label="Main">
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.id]
            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `${isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem} px-4 py-3`
                  }
                >
                  <Icon className={styles.navIcon} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className={styles.activeUsers}>
        <p className={styles.activeUsersLabel}>Active users</p>
        <ul className={styles.avatarStack}>
          {ACTIVE_USERS.map((user) => (
            <li
              key={user.id}
              className={styles.stackedAvatar}
              style={{ backgroundColor: user.color }}
            >
              {user.initial}
            </li>
          ))}
          <li className={styles.overflowAvatar}>+{ACTIVE_USERS_OVERFLOW}</li>
        </ul>
      </div>

      <div className={styles.routeMap} aria-hidden="true">
        <svg className={styles.routeMapSvg} viewBox="0 0 208 150">
          <path
            className={styles.routeLine}
            d="M28 118 C 60 70, 120 96, 150 40 S 190 20, 198 14"
          />
          <circle className={styles.routeDot} cx="28" cy="118" r="4" />
          <circle className={styles.routeRing} cx="28" cy="118" r="8" />
          <circle className={styles.routeDot} cx="150" cy="40" r="4" />
          <circle className={styles.routeRing} cx="150" cy="40" r="8" />
        </svg>
        <PlaneMarkerIcon className={styles.routePlane} />
      </div>
    </aside>
  )
}
