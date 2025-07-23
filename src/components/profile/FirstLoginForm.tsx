import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

export default function FirstLoginForm() {
  const { user, updateUserProfile, completeFirstLogin, ministries, departments, positions, addresses } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    middleName: user?.middleName || '',
    ministry: user?.ministry || '',
    department: user?.department || '',
    position: user?.position || '',
    address: user?.address || '',
    officeNumber: user?.officeNumber || '',
    phoneNumber: user?.phoneNumber || '',
    internalPhone: user?.internalPhone || '',
    email: user?.email || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Поле обязательно для заполнения';
    if (!formData.lastName.trim()) newErrors.lastName = 'Поле обязательно для заполнения';
    if (!formData.middleName.trim()) newErrors.middleName = 'Поле обязательно для заполнения';
    if (!formData.ministry) newErrors.ministry = 'Выберите министерство';
    if (!formData.department) newErrors.department = 'Выберите подразделение';
    if (!formData.position) newErrors.position = 'Выберите должность';
    if (!formData.address) newErrors.address = 'Выберите адрес';
    if (!formData.officeNumber.trim()) newErrors.officeNumber = 'Поле обязательно для заполнения';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Поле обязательно для заполнения';
    if (!formData.internalPhone.trim()) newErrors.internalPhone = 'Поле обязательно для заполнения';
    if (!formData.email.trim()) newErrors.email = 'Поле обязательно для заполнения';

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (formData.phoneNumber && !/^\+7\s\(\d{4}\)\s\d{2}-\d{2}-\d{2}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Формат: +7 (XXXX) XX-XX-XX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateUserProfile(formData);
      completeFirstLogin();
    } catch (error) {
      console.error('Ошибка сохранения профиля:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePhoneFormat = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('7')) {
      const formatted = cleaned.replace(/^7(\d{4})(\d{2})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4');
      return formatted;
    }
    return value;
  };

  const filteredDepartments = departments.filter(dept => dept.ministryId === formData.ministry);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gov-gray-50 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-gov-blue-600 rounded-lg flex items-center justify-center">
            <Icon name="UserPlus" className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gov-gray-900">
            Завершение регистрации
          </CardTitle>
          <CardDescription className="text-gov-gray-600">
            Заполните все поля для завершения настройки профиля
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Alert>
              <Icon name="Info" className="h-4 w-4" />
              <AlertDescription>
                Это ваш первый вход в систему. Пожалуйста, заполните все поля для продолжения работы.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Фамилия"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Имя"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Отчество *</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  placeholder="Отчество"
                  className={errors.middleName ? 'border-red-500' : ''}
                />
                {errors.middleName && <p className="text-sm text-red-500">{errors.middleName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ministry">Министерство *</Label>
                <Select value={formData.ministry} onValueChange={(value) => handleInputChange('ministry', value)}>
                  <SelectTrigger className={errors.ministry ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Выберите министерство" />
                  </SelectTrigger>
                  <SelectContent>
                    {ministries.map((ministry) => (
                      <SelectItem key={ministry.id} value={ministry.id}>
                        {ministry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ministry && <p className="text-sm text-red-500">{errors.ministry}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Структурное подразделение *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleInputChange('department', value)}
                  disabled={!formData.ministry}
                >
                  <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Выберите подразделение" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredDepartments.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Должность *</Label>
                <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                  <SelectTrigger className={errors.position ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position.id} value={position.id}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес *</Label>
                <Select value={formData.address} onValueChange={(value) => handleInputChange('address', value)}>
                  <SelectTrigger className={errors.address ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Выберите адрес" />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses.map((address) => (
                      <SelectItem key={address.id} value={address.id}>
                        {address.street}, {address.building}, {address.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="officeNumber">Номер кабинета *</Label>
                <Input
                  id="officeNumber"
                  value={formData.officeNumber}
                  onChange={(e) => handleInputChange('officeNumber', e.target.value)}
                  placeholder="101"
                  className={errors.officeNumber ? 'border-red-500' : ''}
                />
                {errors.officeNumber && <p className="text-sm text-red-500">{errors.officeNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Номер телефона *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', handlePhoneFormat(e.target.value))}
                  placeholder="+7 (XXXX) XX-XX-XX"
                  className={errors.phoneNumber ? 'border-red-500' : ''}
                />
                {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="internalPhone">Внутренний номер *</Label>
                <Input
                  id="internalPhone"
                  value={formData.internalPhone}
                  onChange={(e) => handleInputChange('internalPhone', e.target.value)}
                  placeholder="1234"
                  className={errors.internalPhone ? 'border-red-500' : ''}
                />
                {errors.internalPhone && <p className="text-sm text-red-500">{errors.internalPhone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Адрес электронной почты *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@gov27.ru"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gov-blue-600 hover:bg-gov-blue-700" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Сохранение...
                </>
              ) : (
                'Завершить регистрацию'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}