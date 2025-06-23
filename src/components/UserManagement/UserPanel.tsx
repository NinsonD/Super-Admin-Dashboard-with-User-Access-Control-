
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  permissions: Record<string, string[]>;
}

interface UserPanelProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  isNewUser: boolean;
}

const UserPanel: React.FC<UserPanelProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
  isNewUser
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    permissions: {} as Record<string, string[]>
  });

  const pagesList = [
    'Products List',
    'Marketing List', 
    'Order List',
    'Media Plans',
    'Offer Pricing SKUs',
    'Clients',
    'Suppliers',
    'Customer Support',
    'Sales Reports',
    'Finance & Accounting'
  ];

  const permissionTypes = ['View', 'Create', 'Edit', 'Delete'];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        permissions: user.permissions
      });
    } else {
      setFormData({
        name: '',
        email: '',
        permissions: {}
      });
    }
  }, [user, isOpen]);

  const handlePermissionToggle = (page: string, permission: string) => {
    setFormData(prev => {
      const pagePermissions = prev.permissions[page] || [];
      const hasPermission = pagePermissions.includes(permission);
      
      const updatedPermissions = hasPermission
        ? pagePermissions.filter(p => p !== permission)
        : [...pagePermissions, permission];

      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [page]: updatedPermissions
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: User = {
      id: user?.id || '',
      name: formData.name,
      email: formData.email,
      permissions: formData.permissions
    };
    onSave(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-gray-200 z-50">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {isNewUser ? 'Add New User' : 'Edit User'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Page Permissions</h4>
              <div className="space-y-4">
                {pagesList.map((page) => (
                  <div key={page} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">{page}</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {permissionTypes.map((permission) => (
                        <label key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={(formData.permissions[page] || []).includes(permission)}
                            onChange={() => handlePermissionToggle(page, permission)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {isNewUser ? 'Create User' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPanel;
