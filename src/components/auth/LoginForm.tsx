import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const [domain, setDomain] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!domain || !password) {
      setError('Заполните все поля');
      return;
    }

    const success = await login(domain, password);
    if (!success) {
      setError('Неверные учетные данные');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gov-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-gov-blue-600 rounded-lg flex items-center justify-center">
            <Icon name="Building2" className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gov-gray-900">
            Корпоративный портал
          </CardTitle>
          <CardDescription className="text-gov-gray-600">
            Правительство Хабаровского края
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Доменная учетная запись</Label>
              <Input
                id="domain"
                type="text"
                placeholder="username@gov27.ru"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <Icon name="AlertCircle" className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-gov-blue-600 hover:bg-gov-blue-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Вход в систему...
                </>
              ) : (
                'Войти'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gov-gray-500">
            <p>Демо-данные для входа:</p>
            <p><strong>Администратор:</strong> admin@gov27.ru / password</p>
            <p><strong>Пользователь:</strong> ivanov@gov27.ru / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}