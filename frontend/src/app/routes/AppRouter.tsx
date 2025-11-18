import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../features/home/pages/HomePage';
import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import TermsPage from '../../features/auth/pages/TermsPage';
import PrivacyPage from '../../features/auth/pages/PrivacyPage';
import ContactPage from '../../features/auth/pages/ContactPage';
import HelpPage from '../../features/auth/pages/HelpPage';
import VerifyEmailPage from '../../features/auth/pages/VerifyEmailPage';
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../../features/auth/pages/ResetPasswordPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import ProfilePage from '../../features/profile/pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inicio-sesion" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/verificar-email" element={<VerifyEmailPage />} />
      <Route path="/olvidar-contrasena" element={<ForgotPasswordPage />} />
      <Route path="/restablecer-contrasena" element={<ResetPasswordPage />} />
      <Route path="/terminos" element={<TermsPage />} />
      <Route path="/privacidad" element={<PrivacyPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/ayuda" element={<HelpPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      {/* Ruta catch-all para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
