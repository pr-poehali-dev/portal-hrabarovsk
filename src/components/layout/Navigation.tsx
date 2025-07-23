import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  const { user } = useAuth();

  const navigation = [
    {
      id: 'dashboard',
      name: 'Главная',
      icon: 'Home',
      access: ['admin', 'user']
    },
    {
      id: 'profile',
      name: 'Профиль',
      icon: 'User',
      access: ['admin', 'user']
    }
  ];

  const adminNavigation = [
    {
      id: 'admin',
      name: 'Администрирование',
      icon: 'Settings',
      access: ['admin']
    },
    {
      id: 'ministries',
      name: 'Министерства',
      icon: 'Building',
      access: ['admin']
    },
    {
      id: 'departments',
      name: 'Подразделения',
      icon: 'Users',
      access: ['admin']
    },
    {
      id: 'positions',
      name: 'Должности',
      icon: 'Briefcase',
      access: ['admin']
    },
    {
      id: 'addresses',
      name: 'Адреса',
      icon: 'MapPin',
      access: ['admin']
    },
    {
      id: 'resources',
      name: 'Ресурсы',
      icon: 'Grid3x3',
      access: ['admin']
    }
  ];

  const allNavigation = user?.role === 'admin' 
    ? [...navigation, ...adminNavigation]
    : navigation;

  const filteredNavigation = allNavigation.filter(item => 
    item.access.includes(user?.role || 'user')
  );

  return (
    <nav className="border-b border-gov-gray-200 bg-white">
      <div className="px-6">
        <div className="flex space-x-1">
          {filteredNavigation.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? 'default' : 'ghost'}
              className={`flex items-center space-x-2 ${
                currentView === item.id 
                  ? 'bg-gov-blue-600 text-white hover:bg-gov-blue-700' 
                  : 'text-gov-gray-600 hover:text-gov-gray-900'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon name={item.icon as any} className="h-4 w-4" />
              <span>{item.name}</span>
              {item.access.includes('admin') && user?.role === 'admin' && (
                <Badge variant="secondary" className="ml-1 h-4 text-xs">
                  Admin
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}