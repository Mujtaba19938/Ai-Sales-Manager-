import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SalesPage from './pages/SalesPage';
import ExpensesPage from './pages/ExpensesPage';
import ProductsPage from './pages/ProductsPage';
import CalculatorPage from './pages/CalculatorPage';
import SettingsPage from './pages/SettingsPage';
import AccountPage from './pages/AccountPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route index element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected dashboard routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <AppShell />
                    </ProtectedRoute>
                }>
                    <Route index element={<DashboardPage />} />
                    <Route path="sales" element={<SalesPage />} />
                    <Route path="expenses" element={<ExpensesPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="calculator" element={<CalculatorPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="account" element={<AccountPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
