import React from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'admin' ? 'Super Admin Dashboard' : 'Dashboard'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage users, permissions, and content access
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{userName}</div>
              <div className="text-gray-500 capitalize">{userRole}</div>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
