import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import styles from './DashboardLayout.module.css'

export function DashboardLayout() {
  return (
    <div className={`${styles.dashboard} gap-4 p-3 sm:p-5 lg:gap-6 lg:p-11`}>
      <div className={styles.blobGold} aria-hidden="true" />
      <div className={styles.blobMint} aria-hidden="true" />

      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
