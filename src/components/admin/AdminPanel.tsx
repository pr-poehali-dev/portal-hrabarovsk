import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { Ministry, Department, Position, Address, Resource } from '@/types/auth';

interface AdminPanelProps {
  section: 'ministries' | 'departments' | 'positions' | 'addresses' | 'resources';
}

export default function AdminPanel({ section }: AdminPanelProps) {
  const {
    ministries, departments, positions, addresses, resources,
    addMinistry, updateMinistry, deleteMinistry,
    addDepartment, updateDepartment, deleteDepartment,
    addPosition, updatePosition, deletePosition,
    addAddress, updateAddress, deleteAddress,
    addResource, updateResource, deleteResource
  } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const getSectionData = () => {
    switch (section) {
      case 'ministries': return ministries;
      case 'departments': return departments;
      case 'positions': return positions;
      case 'addresses': return addresses;
      case 'resources': return resources;
      default: return [];
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'ministries': return 'Министерства';
      case 'departments': return 'Подразделения';
      case 'positions': return 'Должности';
      case 'addresses': return 'Адреса';
      case 'resources': return 'Ресурсы портала';
      default: return '';
    }
  };

  const handleAdd = (data: any) => {
    switch (section) {
      case 'ministries': addMinistry(data); break;
      case 'departments': addDepartment(data); break;
      case 'positions': addPosition(data); break;
      case 'addresses': addAddress(data); break;
      case 'resources': addResource(data); break;
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleUpdate = (id: string, data: any) => {
    switch (section) {
      case 'ministries': updateMinistry(id, data); break;
      case 'departments': updateDepartment(id, data); break;
      case 'positions': updatePosition(id, data); break;
      case 'addresses': updateAddress(id, data); break;
      case 'resources': updateResource(id, data); break;
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    switch (section) {
      case 'ministries': deleteMinistry(id); break;
      case 'departments': deleteDepartment(id); break;
      case 'positions': deletePosition(id); break;
      case 'addresses': deleteAddress(id); break;
      case 'resources': deleteResource(id); break;
    }
  };

  const openEditDialog = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const renderTableHeaders = () => {
    switch (section) {
      case 'ministries':
        return (
          <>
            <TableHead>Название</TableHead>
            <TableHead>Код</TableHead>
            <TableHead className="w-32">Действия</TableHead>
          </>
        );
      case 'departments':
        return (
          <>
            <TableHead>Название</TableHead>
            <TableHead>Министерство</TableHead>
            <TableHead>Код</TableHead>
            <TableHead className="w-32">Действия</TableHead>
          </>
        );
      case 'positions':
        return (
          <>
            <TableHead>Название</TableHead>
            <TableHead>Код</TableHead>
            <TableHead className="w-32">Действия</TableHead>
          </>
        );
      case 'addresses':
        return (
          <>
            <TableHead>Улица</TableHead>
            <TableHead>Дом</TableHead>
            <TableHead>Город</TableHead>
            <TableHead>Индекс</TableHead>
            <TableHead className="w-32">Действия</TableHead>
          </>
        );
      case 'resources':
        return (
          <>
            <TableHead>Название</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Порядок</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="w-32">Действия</TableHead>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRow = (item: any) => {
    switch (section) {
      case 'ministries':
        return (
          <>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                  <Icon name="Edit" className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                  <Icon name="Trash" className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </>
        );
      case 'departments':
        const ministry = ministries.find(m => m.id === item.ministryId);
        return (
          <>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{ministry?.name}</TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                  <Icon name="Edit" className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                  <Icon name="Trash" className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </>
        );
      case 'positions':
        return (
          <>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                  <Icon name="Edit" className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                  <Icon name="Trash" className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </>
        );
      case 'addresses':
        return (
          <>
            <TableCell className="font-medium">{item.street}</TableCell>
            <TableCell>{item.building}</TableCell>
            <TableCell>{item.city}</TableCell>
            <TableCell>{item.postalCode}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                  <Icon name="Edit" className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                  <Icon name="Trash" className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </>
        );
      case 'resources':
        return (
          <>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell className="text-sm text-gov-gray-600">{item.url}</TableCell>
            <TableCell>{item.order}</TableCell>
            <TableCell>
              <Badge variant={item.isActive ? 'default' : 'secondary'}>
                {item.isActive ? 'Активен' : 'Неактивен'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                  <Icon name="Edit" className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                  <Icon name="Trash" className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gov-gray-900">{getSectionTitle()}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="bg-gov-blue-600 hover:bg-gov-blue-700">
              <Icon name="Plus" className="mr-2 h-4 w-4" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Редактировать' : 'Добавить'} {getSectionTitle().toLowerCase().slice(0, -1)}
              </DialogTitle>
              <DialogDescription>
                Заполните все обязательные поля
              </DialogDescription>
            </DialogHeader>
            <FormContent
              section={section}
              editingItem={editingItem}
              ministries={ministries}
              onSubmit={editingItem ? (data: any) => handleUpdate(editingItem.id, data) : handleAdd}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список {getSectionTitle().toLowerCase()}</CardTitle>
          <CardDescription>
            Управление {getSectionTitle().toLowerCase()} в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {renderTableHeaders()}
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSectionData().map((item: any) => (
                <TableRow key={item.id}>
                  {renderTableRow(item)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function FormContent({ section, editingItem, ministries, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState(() => {
    if (editingItem) {
      return { ...editingItem };
    }
    
    switch (section) {
      case 'ministries':
        return { name: '', code: '' };
      case 'departments':
        return { name: '', ministryId: '', code: '' };
      case 'positions':
        return { name: '', code: '' };
      case 'addresses':
        return { street: '', building: '', city: '', postalCode: '' };
      case 'resources':
        return { title: '', description: '', url: '', icon: 'Link', order: 1, isActive: true };
      default:
        return {};
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderFormFields = () => {
    switch (section) {
      case 'ministries':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Название министерства"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Код</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Код министерства"
              />
            </div>
          </>
        );
      case 'departments':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Название подразделения"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ministryId">Министерство</Label>
              <Select value={formData.ministryId} onValueChange={(value) => handleInputChange('ministryId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите министерство" />
                </SelectTrigger>
                <SelectContent>
                  {ministries.map((ministry: Ministry) => (
                    <SelectItem key={ministry.id} value={ministry.id}>
                      {ministry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Код</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Код подразделения"
              />
            </div>
          </>
        );
      case 'positions':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Название должности"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Код</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Код должности"
              />
            </div>
          </>
        );
      case 'addresses':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="street">Улица</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                placeholder="Название улицы"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="building">Дом</Label>
              <Input
                id="building"
                value={formData.building}
                onChange={(e) => handleInputChange('building', e.target.value)}
                placeholder="Номер дома"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Город"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Индекс</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="Почтовый индекс"
              />
            </div>
          </>
        );
      case 'resources':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Название ресурса"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Описание ресурса"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="Ссылка на ресурс"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Иконка</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => handleInputChange('icon', e.target.value)}
                placeholder="Название иконки"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Порядок</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                placeholder="Порядок отображения"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFormFields()}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" className="bg-gov-blue-600 hover:bg-gov-blue-700">
          {editingItem ? 'Сохранить' : 'Добавить'}
        </Button>
      </DialogFooter>
    </form>
  );
}