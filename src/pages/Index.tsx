import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [user] = useState({
    name: 'Иванова Анна Петровна',
    role: 'Пользователь',
    ministry: 'Министерство экономического развития',
    department: 'Отдел регионального развития',
    email: 'a.ivanova@gov.khv.ru'
  });

  const resources = [
    {
      id: 1,
      title: 'Система электронного документооборота',
      description: 'Работа с официальными документами',
      icon: 'FileText',
      color: 'bg-slate-700 hover:bg-slate-600',
      href: '#'
    },
    {
      id: 2,
      title: 'Телефонный справочник',
      description: 'Контакты сотрудников и подразделений',
      icon: 'Phone',
      color: 'bg-slate-700 hover:bg-slate-600',
      href: '#'
    },
    {
      id: 3,
      title: 'Обратиться в техподдержку',
      description: 'Техническая поддержка портала',
      icon: 'HelpCircle',
      color: 'bg-red-600 hover:bg-red-700',
      href: '#'
    },
    {
      id: 4,
      title: 'Направить заявку',
      description: 'Подача служебных заявок',
      icon: 'Send',
      color: 'bg-blue-600 hover:bg-blue-700',
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Icon name="Building2" size={32} className="text-blue-400" />
              <div>
                <h1 className="text-xl font-bold">Корпоративный портал</h1>
                <p className="text-sm text-gray-300">Правительство Хабаровского края</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-600 text-white">
                {user.role}
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-300">{user.ministry}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Добро пожаловать, {user.name.split(' ')[1]} {user.name.split(' ')[2]}
          </h2>
          <p className="text-gray-600">
            {user.department} • {user.ministry}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {resources.map((resource) => (
            <Card 
              key={resource.id} 
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg border-0 bg-white overflow-hidden"
            >
              <CardHeader className={`${resource.color} text-white p-6 transition-colors duration-200`}>
                <div className="flex items-center justify-center mb-4">
                  <Icon name={resource.icon} size={32} className="text-white" />
                </div>
                <CardTitle className="text-white text-center text-lg font-semibold">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <CardDescription className="text-center text-gray-600">
                  {resource.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Zap" size={20} />
              <span>Быстрые действия</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Icon name="Calendar" size={24} />
                <span>Календарь мероприятий</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Icon name="Users" size={24} />
                <span>Структура организации</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Icon name="Settings" size={24} />
                <span>Настройки профиля</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span>Последние действия</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Icon name="FileText" size={16} className="text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Подписан документ "Распоряжение №245"</p>
                  <p className="text-xs text-gray-500">2 часа назад</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Icon name="Phone" size={16} className="text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Обновлен телефонный справочник</p>
                  <p className="text-xs text-gray-500">Вчера в 14:30</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Icon name="Send" size={16} className="text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Направлена заявка на ремонт оборудования</p>
                  <p className="text-xs text-gray-500">3 дня назад</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">© 2024 Правительство Хабаровского края</p>
              <p className="text-xs text-gray-400">Корпоративный портал государственных служащих</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <Icon name="Mail" size={16} className="mr-2" />
                Поддержка
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <Icon name="BookOpen" size={16} className="mr-2" />
                Справка
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;