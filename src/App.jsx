import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import AccountsPage from '@/pages/AccountsPage'
import BudgetPlanPage from '@/pages/BudgetPlanPage'
import CategoriesPage from '@/pages/CategoriesPage'
import DemographicsPage from '@/pages/DemographicsPage'
import HomePage from '@/pages/HomePage'
import PaymentsPage from '@/pages/PaymentsPage'
import ProfilePage from '@/pages/ProfilePage'
import SettingsPage from '@/pages/SettingsPage'
import TrackerPage from '@/pages/TrackerPage'

export default function App() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path="tracker" element={<TrackerPage />} />
				<Route path="accounts" element={<AccountsPage />} />
				<Route path="categories" element={<CategoriesPage />} />
				<Route path="budget-plan" element={<BudgetPlanPage />} />
				<Route path="payments" element={<PaymentsPage />} />
				<Route path="demographics" element={<DemographicsPage />} />
				<Route path="settings" element={<SettingsPage />} />
				<Route path="profile" element={<ProfilePage />} />
				<Route path="*" element={<p>Page not found.</p>} />
			</Route>
		</Routes>
	)
}