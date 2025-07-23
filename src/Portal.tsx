import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import FirstLoginForm from '@/components/profile/FirstLoginForm';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import AdminPanel from '@/components/admin/AdminPanel';
import Icon from '@/components/ui/icon';

export default function Portal() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gov-gray-50">
        <div className="text-center">
          <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto mb-4 text-gov-blue-600" />
          <p className="text-gov-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <LoginForm />;
  }

  if (user.isFirstLogin) {
    return <FirstLoginForm />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gov-gray-900">Профиль пользователя</h1>
            <p className="text-gov-gray-600">Здесь будет страница профиля пользователя</p>
          </div>
        );
      case 'admin':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gov-gray-900">Администрирование</h1>
            <p className="text-gov-gray-600">Выберите раздел для управления из навигации выше</p>
          </div>
        );
      case 'ministries':
        return <AdminPanel section="ministries" />;
      case 'departments':
        return <AdminPanel section="departments" />;
      case 'positions':
        return <AdminPanel section="positions" />;
      case 'addresses':
        return <AdminPanel section="addresses" />;
      case 'resources':
        return <AdminPanel section="resources" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gov-gray-50">
      <Header />
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
}