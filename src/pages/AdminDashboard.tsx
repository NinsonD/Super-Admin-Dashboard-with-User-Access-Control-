import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import UserRoleTable from '../components/UserManagement/UserRoleTable';
import UserPanel from '../components/UserManagement/UserPanel';

interface User {
  id: string;
  email: string;
  name: string;
  permissions: Record<string, string[]>;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      permissions: {
        'Products List': ['View', 'Edit'],
        'Marketing List': ['View', 'Create', 'Edit'],
        'Order List': ['View'],
        'Clients': ['View', 'Create', 'Edit', 'Delete']
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      permissions: {
        'Products List': ['View', 'Create'],
        'Sales Reports': ['View'],
        'Finance & Accounting': ['View', 'Edit']
      }
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsNewUser(false);
    setIsPanelOpen(true);
  };

  const handleAddNewUser = () => {
    setSelectedUser(null);
    setIsNewUser(true);
    setIsPanelOpen(true);
  };

  const handleSaveUser = (user: User) => {
    if (isNewUser) {
      setUsers(prev => [...prev, { ...user, id: Date.now().toString() }]);
    } else {
      setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 flex flex-col">
        <Header 
          userName="Super Admin" 
          userRole="admin" 
          onLogout={handleLogout} 
        />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <p className="text-gray-600 mt-1">Manage user access and permissions</p>
              </div>
              <button
                onClick={handleAddNewUser}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New User
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900">Active Pages</h3>
                  <p className="text-2xl font-bold text-green-600">10</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900">Total Permissions</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {users.reduce((acc, user) => {
                      return acc + Object.values(user.permissions).flat().length;
                    }, 0)}
                  </p>
                </div>
              </div>
            </div>

            <UserRoleTable users={users} onEditUser={handleEditUser} />
          </div>
        </main>
      </div>

      <UserPanel
        user={selectedUser}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSave={handleSaveUser}
        isNewUser={isNewUser}
      />
    </div>
  );
};

export default AdminDashboard;
