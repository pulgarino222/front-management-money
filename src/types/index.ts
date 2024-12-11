export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: number;
  token?:string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}

export interface Income {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  userId: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  userId: string;
}

export enum ExpenseCategory {
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  UTILITIES = 'UTILITIES',
  ENTERTAINMENT = 'ENTERTAINMENT',
  HEALTH = 'HEALTH',
  OTHER = 'OTHER'
}

export interface Budget {
  id: string;
  description: string;
  totalAmount: number;
  userId: string;
}