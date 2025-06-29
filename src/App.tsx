import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppContent } from './components/AppContent';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiePolicy } from './pages/CookiePolicy';
import { Contact } from './pages/Contact';
import { ResetPassword } from './pages/ResetPassword';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { usePageTracking } from './hooks/usePageTracking';
import { useAuth } from './contexts/AuthContext';

function AdminRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email !== 'karl@serpwin.com') {
      navigate('/');
    }
  }, [user, navigate]);

  return user?.email === 'karl@serpwin.com' ? <AdminDashboard /> : null;
}

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/');
    }
  }, [searchParams, navigate]);

  return null;
}

function AppRoutes() {
  usePageTracking();

  return (
    <>
      <AuthCallback />
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;