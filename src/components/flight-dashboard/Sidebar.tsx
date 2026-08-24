import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import { ACTIVE_USERS, ACTIVE_USERS_OVERFLOW, NAV_ITEMS } from './data'
import {
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

export function Sidebar() {
  return (
    <aside className={`${styles.sidebar} w-21 gap-5 px-3 py-5 lg:w-62 lg:gap-6 lg:px-5 lg:py-7`}>
      <header className={styles.profile}>
        <div
          className={`${styles.avatar} w-11 h-11 text-sm lg:h-[78px] lg:w-[78px] lg:text-[22px]`}
          aria-hidden="true"
        >
          AJ
        </div>
        <div className="hidden flex-col items-center gap-0.5 lg:flex">
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
                  className={({ isActive }) =>
                    `${isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem} justify-center p-3 lg:justify-start lg:px-4 lg:py-3`
                  }
                >
                  <Icon className={styles.navIcon} />
                  <span className="sr-only lg:not-sr-only">{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="hidden flex-col gap-2.5 lg:flex">
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

      <div className={`${styles.routeMap} hidden lg:block`} aria-hidden="true">
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
