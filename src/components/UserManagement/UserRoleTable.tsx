
import React from 'react';
import { Edit } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  permissions: Record<string, string[]>;
}

interface UserRoleTableProps {
  users: User[];
  onEditUser: (user: User) => void;
}

const UserRoleTable: React.FC<UserRoleTableProps> = ({ users, onEditUser }) => {
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

  const getPermissionBadge = (permissions: string[]) => {
    if (!permissions || permissions.length === 0) {
      return <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">No Access</span>;
    }

    const colors = {
      'View': 'bg-blue-100 text-blue-800',
      'Create': 'bg-green-100 text-green-800',
      'Edit': 'bg-yellow-100 text-yellow-800',
      'Delete': 'bg-red-100 text-red-800'
    };

    return (
      <div className="flex flex-wrap gap-1">
        {permissions.map((permission) => (
          <span
            key={permission}
            className={`px-2 py-1 text-xs rounded ${colors[permission as keyof typeof colors] || 'bg-gray-100 text-gray-600'}`}
          >
            {permission}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">User Role Management</h3>
        <p className="text-sm text-gray-600 mt-1">Manage user permissions across different pages</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              {pagesList.map((page) => (
                <th
                  key={page}
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32"
                >
                  {page}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                {pagesList.map((page) => (
                  <td key={page} className="px-3 py-4">
                    {getPermissionBadge(user.permissions[page] || [])}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onEditUser(user)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRoleTable;
