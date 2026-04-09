import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/DashboardHome';
import NewOrder from './pages/NewOrder';
import OrderHistory from './pages/dashboard/OrderHistory';
import AddFunds from './pages/dashboard/AddFunds';
import Referrals from './pages/dashboard/Referrals';
import MyProfile from './pages/dashboard/MyProfile';
import APISettings from './pages/dashboard/APISettings';
import SupportTickets from './pages/dashboard/SupportTickets';
import Security from './pages/dashboard/Security';
import UserAnalytics from './pages/dashboard/Analytics';
import TrustCenter from './pages/dashboard/TrustCenter';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import Transactions from './pages/admin/Transactions';
import OrderManagement from './pages/admin/OrderManagement';
import APIProviders from './pages/admin/APIProviders';
import NotificationSystem from './pages/admin/NotificationSystem';
import AppSettings from './pages/admin/AppSettings';
import ServiceManagement from './pages/admin/ServiceManagement';
import SupportAdmin from './pages/admin/SupportAdmin';
import Analytics from './pages/admin/Analytics';
import Logs from './pages/admin/Logs';
import CouponSystem from './pages/admin/CouponSystem';
import ReferralControl from './pages/admin/ReferralControl';
import SMTPSettings from './pages/admin/SMTPSettings';
import SecuritySettings from './pages/admin/SecuritySettings';
import AdminLogin from './pages/admin/AdminLogin';
import Preloader from './components/Preloader';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { BrandProvider } from './context/BrandContext';
import { AdminThemeProvider } from './context/AdminThemeContext';

// ─── Isolated session check helpers ───────────────────────────────────────────
const getAdminSession = () => {
  try {
    const token = localStorage.getItem('favtech_admin_token');
    const data  = JSON.parse(localStorage.getItem('favtech_admin_data') || '{}');
    return { token, user: data };
  } catch { return { token: null, user: {} }; }
};

const getUserSession = () => {
  try {
    const token = localStorage.getItem('favtech_user_token');
    const data  = JSON.parse(localStorage.getItem('favtech_user_data') || '{}');
    return { token, user: data };
  } catch { return { token: null, user: {} }; }
};

const ADMIN_ROLES = ['admin', 'support', 'finance'];

const ProtectedRoute = ({ children, adminOnly = false }) => {
  if (adminOnly) {
    // ── Admin route: must have a valid admin token with an admin role ──
    const { token, user } = getAdminSession();
    if (!token) return <Navigate to="/admin/login" replace />;
    if (!ADMIN_ROLES.includes(user?.role)) return <Navigate to="/admin/login" replace />;
    return children;
  } else {
    // ── User route: must have a valid user token with a non-admin role ──
    const { token, user } = getUserSession();
    if (!token) return <Navigate to="/login" replace />;
    // If somehow an admin token ended up here, send them to the admin panel
    if (ADMIN_ROLES.includes(user?.role)) return <Navigate to="/admin/dashboard" replace />;
    return children;
  }
};

const AppContent = () => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const overlay = searchParams.get('overlay');
  const isAuthPage = ['/login', '/register'].includes(location.pathname) || ['login', 'register'].includes(overlay);
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAdmin = location.pathname.startsWith('/admin');
  const isFullscreen = isAuthPage || isDashboard || isAdmin;

  useEffect(() => {
    if (!isDashboard && !isAdmin) {
      setIsAppLoading(true);
      const t = setTimeout(() => setIsAppLoading(false), 500);
      return () => clearTimeout(t);
    }
  }, [location.pathname, isDashboard, isAdmin]);

  return (
    <div className={`${isFullscreen ? '' : 'min-h-screen flex flex-col'} bg-[#f8fafc]`}>
      {isAppLoading && <Preloader />}
      {!isFullscreen && <Navbar />}
      <main className={`${!isFullscreen ? 'flex-grow pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/buy-instagram-followers" element={<ServicesPage />} />
          <Route path="/buy-tiktok-views" element={<ServicesPage />} />
          <Route path="/login" element={<Navigate to="/?overlay=login" replace />} />
          <Route path="/register" element={<Navigate to="/?overlay=register" replace />} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="new-order" element={<NewOrder />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="add-funds" element={<AddFunds />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="api" element={<APISettings />} />
            <Route path="tickets" element={<SupportTickets />} />
            <Route path="security" element={<Security />} />
            <Route path="verify" element={<TrustCenter />} />
            <Route path="install" element={<TrustCenter />} />
            <Route path="help" element={<FAQ />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="api-providers" element={<APIProviders />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="tickets" element={<SupportAdmin />} />
            <Route path="referrals" element={<ReferralControl />} />
            <Route path="notifications" element={<NotificationSystem />} />
            <Route path="settings" element={<AppSettings />} />
            <Route path="smtp" element={<SMTPSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="logs" element={<Logs />} />
            <Route path="coupons" element={<CouponSystem />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <BrandProvider>
        <AdminThemeProvider>
          <AppContent />
        </AdminThemeProvider>
      </BrandProvider>
    </Router>
  );
}
