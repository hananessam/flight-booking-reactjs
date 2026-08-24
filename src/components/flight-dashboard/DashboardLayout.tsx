import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import styles from './DashboardLayout.module.css'

export function DashboardLayout() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.blobGold} aria-hidden="true" />
      <div className={styles.blobMint} aria-hidden="true" />

      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
