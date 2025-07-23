import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, resources, ministries, departments } = useAuth();

  if (!user) return null;

  const userMinistry = ministries.find(m => m.id === user.ministry);
  const userDepartment = departments.find(d => d.id === user.department);

  const activeResources = resources.filter(r => r.isActive).sort((a, b) => a.order - b.order);

  const handleResourceClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      console.log(`Переход к ресурсу: ${url}`);
    }
  };

  const recentActivities = [
    { id: 1, action: 'Вход в систему', time: '10:30', icon: 'LogIn' },
    { id: 2, action: 'Просмотр документа №123', time: '09:45', icon: 'FileText' },
    { id: 3, action: 'Отправка заявки', time: '09:15', icon: 'Send' },
    { id: 4, action: 'Обновление профиля', time: '08:30', icon: 'User' }
  ];

  const quickActions = [
    { id: 1, name: 'Создать документ', icon: 'Plus', color: 'bg-gov-blue-500' },
    { id: 2, name: 'Найти контакт', icon: 'Search', color: 'bg-gov-gray-500' },
    { id: 3, name: 'Отчеты', icon: 'BarChart3', color: 'bg-green-500' },
    { id: 4, name: 'Календарь', icon: 'Calendar', color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gov-gray-900">
            Добро пожаловать, {user.firstName}!
          </h1>
          <p className="text-gov-gray-600">
            {userMinistry?.name} • {userDepartment?.name}
          </p>
        </div>
        <div className="text-right text-sm text-gov-gray-500">
          <p>Сегодня, {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeResources.map((resource) => (
          <Card 
            key={resource.id} 
            className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-gov-blue-500"
            onClick={() => handleResourceClick(resource.url)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gov-blue-100 rounded-lg">
                  <Icon name={resource.icon as any} className="h-5 w-5 text-gov-blue-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm font-semibold text-gov-gray-900 leading-tight">
                    {resource.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs text-gov-gray-600">
                {resource.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Activity" className="h-5 w-5" />
              <span>Последние действия</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gov-gray-50">
                  <div className="p-1.5 bg-gov-gray-100 rounded-full">
                    <Icon name={activity.icon as any} className="h-3.5 w-3.5 text-gov-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gov-gray-900">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gov-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Zap" className="h-5 w-5" />
              <span>Быстрые действия</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-gov-gray-200 hover:border-gov-blue-300 hover:bg-gov-blue-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon name={action.icon as any} className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs text-center text-gov-gray-700 font-medium">
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Bell" className="h-5 w-5" />
            <span>Уведомления</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 border-l-4 border-l-yellow-400 rounded">
              <Icon name="AlertTriangle" className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm text-yellow-800">Обновление системы запланировано на 15:00</p>
              </div>
              <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                Важно
              </Badge>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 border-l-4 border-l-blue-400 rounded">
              <Icon name="Info" className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm text-blue-800">Новые документы доступны для ознакомления</p>
              </div>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                Инфо
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}