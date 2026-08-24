import { useState, type ComponentType } from 'react'
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
  const [activeId, setActiveId] = useState('flights')

  return (
    <aside className={styles.sidebar}>
      <header className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">
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
            const isActive = item.id === activeId
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.navItem}
                  data-active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setActiveId(item.id)}
                >
                  <Icon className={styles.navIcon} />
                  <span>{item.label}</span>
                </button>
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
