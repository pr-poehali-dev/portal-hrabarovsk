export interface User {
  id: string;
  domain: string;
  firstName: string;
  lastName: string;
  middleName: string;
  ministry: string;
  department: string;
  position: string;
  address: string;
  officeNumber: string;
  phoneNumber: string;
  internalPhone: string;
  email: string;
  role: 'admin' | 'user';
  isFirstLogin: boolean;
}

export interface Ministry {
  id: string;
  name: string;
  code: string;
}

export interface Department {
  id: string;
  name: string;
  ministryId: string;
  code: string;
}

export interface Position {
  id: string;
  name: string;
  code: string;
}

export interface Address {
  id: string;
  street: string;
  building: string;
  city: string;
  postalCode: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}