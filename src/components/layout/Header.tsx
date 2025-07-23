import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout, ministries, departments, positions } = useAuth();

  if (!user) return null;

  const userMinistry = ministries.find(m => m.id === user.ministry);
  const userDepartment = departments.find(d => d.id === user.department);
  const userPosition = positions.find(p => p.id === user.position);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <header className="border-b border-gov-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gov-blue-600 rounded flex items-center justify-center">
            <Icon name="Building2" className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gov-gray-900">
              Корпоративный портал
            </h1>
            <p className="text-sm text-gov-gray-600">
              Правительство Хабаровского края
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user.role === 'admin' && (
            <Badge variant="outline" className="border-gov-blue-200 text-gov-blue-700">
              <Icon name="Shield" className="w-3 h-3 mr-1" />
              Администратор
            </Badge>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gov-blue-100 text-gov-blue-700">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <div className="p-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.lastName} {user.firstName} {user.middleName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <div className="mt-3 space-y-1 text-xs text-gov-gray-600">
                  <p><strong>Министерство:</strong> {userMinistry?.name}</p>
                  <p><strong>Подразделение:</strong> {userDepartment?.name}</p>
                  <p><strong>Должность:</strong> {userPosition?.name}</p>
                  <p><strong>Кабинет:</strong> {user.officeNumber}</p>
                  <p><strong>Телефон:</strong> {user.phoneNumber}</p>
                  <p><strong>Внутренний:</strong> {user.internalPhone}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="User" className="mr-2 h-4 w-4" />
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Настройки
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <Icon name="LogOut" className="mr-2 h-4 w-4" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}