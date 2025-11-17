import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../features/home/pages/HomePage';
import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import TermsPage from '../../features/auth/pages/TermsPage';
import PrivacyPage from '../../features/auth/pages/PrivacyPage';
import ContactPage from '../../features/auth/pages/ContactPage';
import HelpPage from '../../features/auth/pages/HelpPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inicio-sesion" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
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
    </Routes>
  );
};

export default AppRouter;
