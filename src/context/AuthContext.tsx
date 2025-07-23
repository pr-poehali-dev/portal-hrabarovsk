import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, Ministry, Department, Position, Address, Resource } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (domain: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  completeFirstLogin: () => void;
  
  ministries: Ministry[];
  departments: Department[];
  positions: Position[];
  addresses: Address[];
  resources: Resource[];
  
  addMinistry: (ministry: Omit<Ministry, 'id'>) => void;
  updateMinistry: (id: string, ministry: Partial<Ministry>) => void;
  deleteMinistry: (id: string) => void;
  
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, department: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  
  addPosition: (position: Omit<Position, 'id'>) => void;
  updatePosition: (id: string, position: Partial<Position>) => void;
  deletePosition: (id: string) => void;
  
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  
  addResource: (resource: Omit<Resource, 'id'>) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockData = {
  ministries: [
    { id: '1', name: 'Министерство экономического развития', code: 'MED' },
    { id: '2', name: 'Министерство образования и науки', code: 'MON' },
    { id: '3', name: 'Министерство здравоохранения', code: 'MZ' },
    { id: '4', name: 'Министерство строительства', code: 'MS' }
  ],
  departments: [
    { id: '1', name: 'Отдел экономического анализа', ministryId: '1', code: 'OEA' },
    { id: '2', name: 'Отдел инвестиций', ministryId: '1', code: 'OI' },
    { id: '3', name: 'Отдел дошкольного образования', ministryId: '2', code: 'ODO' },
    { id: '4', name: 'Отдел высшего образования', ministryId: '2', code: 'OVO' }
  ],
  positions: [
    { id: '1', name: 'Главный специалист', code: 'GS' },
    { id: '2', name: 'Ведущий специалист', code: 'VS' },
    { id: '3', name: 'Заместитель начальника отдела', code: 'ZNO' },
    { id: '4', name: 'Начальник отдела', code: 'NO' }
  ],
  addresses: [
    { id: '1', street: 'ул. Муравьева-Амурского', building: '22', city: 'Хабаровск', postalCode: '680000' },
    { id: '2', street: 'ул. Фрунзе', building: '68', city: 'Хабаровск', postalCode: '680000' },
    { id: '3', street: 'ул. Комсомольская', building: '56', city: 'Хабаровск', postalCode: '680000' }
  ],
  resources: [
    { id: '1', title: 'Система электронного документооборота', description: 'СЭД для работы с документами', url: '/sed', icon: 'FileText', order: 1, isActive: true },
    { id: '2', title: 'Телефонный справочник', description: 'Справочник сотрудников', url: '/phonebook', icon: 'Phone', order: 2, isActive: true },
    { id: '3', title: 'Обратиться в техподдержку', description: 'Техническая поддержка', url: '/support', icon: 'Headphones', order: 3, isActive: true },
    { id: '4', title: 'Направить заявку', description: 'Подача заявок и обращений', url: '/requests', icon: 'Send', order: 4, isActive: true }
  ],
  users: [
    {
      id: 'admin',
      domain: 'admin@gov27.ru',
      firstName: 'Администратор',
      lastName: 'Системы',
      middleName: 'Портала',
      ministry: '1',
      department: '1',
      position: '4',
      address: '1',
      officeNumber: '101',
      phoneNumber: '+7 (4212) 12-34-56',
      internalPhone: '1234',
      email: 'admin@gov27.ru',
      role: 'admin' as const,
      isFirstLogin: false
    },
    {
      id: 'user1',
      domain: 'ivanov@gov27.ru',
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      ministry: '1',
      department: '1',
      position: '2',
      address: '1',
      officeNumber: '201',
      phoneNumber: '+7 (4212) 12-34-57',
      internalPhone: '1235',
      email: 'ivanov@gov27.ru',
      role: 'user' as const,
      isFirstLogin: false
    }
  ]
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [ministries, setMinistries] = useState<Ministry[]>(mockData.ministries);
  const [departments, setDepartments] = useState<Department[]>(mockData.departments);
  const [positions, setPositions] = useState<Position[]>(mockData.positions);
  const [addresses, setAddresses] = useState<Address[]>(mockData.addresses);
  const [resources, setResources] = useState<Resource[]>(mockData.resources);

  useEffect(() => {
    const savedUser = localStorage.getItem('portal_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (domain: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockData.users.find(u => u.domain === domain);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('portal_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('portal_user');
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('portal_user', JSON.stringify(updatedUser));
  };

  const completeFirstLogin = () => {
    if (!user) return;
    
    const updatedUser = { ...user, isFirstLogin: false };
    setUser(updatedUser);
    localStorage.setItem('portal_user', JSON.stringify(updatedUser));
  };

  const addMinistry = (ministry: Omit<Ministry, 'id'>) => {
    const newMinistry = { ...ministry, id: Date.now().toString() };
    setMinistries(prev => [...prev, newMinistry]);
  };

  const updateMinistry = (id: string, ministry: Partial<Ministry>) => {
    setMinistries(prev => prev.map(m => m.id === id ? { ...m, ...ministry } : m));
  };

  const deleteMinistry = (id: string) => {
    setMinistries(prev => prev.filter(m => m.id !== id));
  };

  const addDepartment = (department: Omit<Department, 'id'>) => {
    const newDepartment = { ...department, id: Date.now().toString() };
    setDepartments(prev => [...prev, newDepartment]);
  };

  const updateDepartment = (id: string, department: Partial<Department>) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, ...department } : d));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  const addPosition = (position: Omit<Position, 'id'>) => {
    const newPosition = { ...position, id: Date.now().toString() };
    setPositions(prev => [...prev, newPosition]);
  };

  const updatePosition = (id: string, position: Partial<Position>) => {
    setPositions(prev => prev.map(p => p.id === id ? { ...p, ...position } : p));
  };

  const deletePosition = (id: string) => {
    setPositions(prev => prev.filter(p => p.id !== id));
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = { ...address, id: Date.now().toString() };
    setAddresses(prev => [...prev, newAddress]);
  };

  const updateAddress = (id: string, address: Partial<Address>) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...address } : a));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = { ...resource, id: Date.now().toString() };
    setResources(prev => [...prev, newResource]);
  };

  const updateResource = (id: string, resource: Partial<Resource>) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, ...resource } : r));
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      updateUserProfile,
      completeFirstLogin,
      ministries,
      departments,
      positions,
      addresses,
      resources,
      addMinistry,
      updateMinistry,
      deleteMinistry,
      addDepartment,
      updateDepartment,
      deleteDepartment,
      addPosition,
      updatePosition,
      deletePosition,
      addAddress,
      updateAddress,
      deleteAddress,
      addResource,
      updateResource,
      deleteResource
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}