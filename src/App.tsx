import { Navigate, Route, Routes } from 'react-router-dom'
import { PLACEHOLDER_PAGES } from './components/flight-dashboard/data'
import { DashboardLayout } from './components/flight-dashboard/DashboardLayout'
import { FlightsPage } from './components/flight-dashboard/pages/FlightsPage'
import { PlaceholderPage } from './components/flight-dashboard/pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/flights" replace />} />
        <Route path="flights" element={<FlightsPage />} />
        {PLACEHOLDER_PAGES.map((page) => (
          <Route
            key={page.path}
            path={page.path.slice(1)}
            element={<PlaceholderPage title={page.title} description={page.description} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/flights" replace />} />
      </Route>
    </Routes>
  )
}

export default App
