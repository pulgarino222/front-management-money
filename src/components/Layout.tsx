import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Wallet, Home, DollarSign, CreditCard, PieChart, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">FinanceApp</span>
          </div>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 mb-4">
            <div className="text-sm font-medium text-gray-500">Welcome,</div>
            <div className="font-medium truncate">{user?.fullName}</div>
          </div>
          
          <a href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a href="/income" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <DollarSign className="h-5 w-5 mr-3" />
            Income
          </a>
          <a href="/expenses" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <CreditCard className="h-5 w-5 mr-3" />
            Expenses
          </a>
          <a href="/budget" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <PieChart className="h-5 w-5 mr-3" />
            Budget
          </a>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 mt-8"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;