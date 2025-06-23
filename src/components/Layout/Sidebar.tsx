
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  User, 
  Edit,
  Plus,
  ChevronDown,
  ChevronUp 
} from 'lucide-react';

interface SidebarProps {
  userRole: 'admin' | 'user';
  userPermissions?: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, userPermissions = [] }) => {
  const location = useLocation();
  const [pagesExpanded, setPagesExpanded] = React.useState(true);

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Users },
    { path: '/admin/users', label: 'User Management', icon: User },
  ];

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

  const getPagePath = (pageName: string) => {
    return `/pages/${pageName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen shadow-lg">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-blue-400">
          {userRole === 'admin' ? 'Super Admin' : 'User Dashboard'}
        </h2>
      </div>

      <nav className="p-4 space-y-2">
        {userRole === 'admin' && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Administration
            </h3>
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        <div>
          <button
            onClick={() => setPagesExpanded(!pagesExpanded)}
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider hover:text-white transition-colors"
          >
            <span>Pages</span>
            {pagesExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {pagesExpanded && (
            <div className="mt-2 space-y-1">
              {pagesList.map((pageName) => {
                const path = getPagePath(pageName);
                const hasAccess = userRole === 'admin' || userPermissions.includes(pageName);
                
                if (!hasAccess) return null;

                return (
                  <Link
                    key={pageName}
                    to={path}
                    className={`block px-6 py-2 rounded-lg text-sm transition-colors ${
                      isActive(path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {pageName}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
