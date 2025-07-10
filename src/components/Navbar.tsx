import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  VideoCameraIcon, 
  ChartBarIcon, 
  BellIcon, 
  CommandLineIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: HomeIcon },
    { path: '/live-feed', name: 'Live Feed', icon: VideoCameraIcon },
    { path: '/missing-persons', name: 'Find Missing Persons', icon: MagnifyingGlassIcon },
    { path: '/predictions', name: 'Predictions', icon: ChartBarIcon },
    { path: '/alerts', name: 'Alerts', icon: BellIcon },
    { path: '/command-interface', name: 'Command Interface', icon: CommandLineIcon },
    { path: '/face-data', name: 'Face Data', icon: UserIcon },
  ];

  return (
    <nav className="w-72 min-h-screen bg-white shadow-xl fixed left-0 top-0">
      {/* Logo Section */}
      <div className="px-6 py-8">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-xl">GS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Garuda Sentinel
            </span>
            <span className="text-xs text-gray-500">Surveillance Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="px-4 py-6">
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
                {item.path === '/alerts' && (
                  <span className="ml-auto bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 mt-8">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">System Status</span>
            <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1"></span>
              Active
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white rounded-lg p-2">
              <div className="text-lg font-semibold text-indigo-600">98%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
            <div className="bg-white rounded-lg p-2">
              <div className="text-lg font-semibold text-blue-600">24/7</div>
              <div className="text-xs text-gray-500">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile/Logout Section */}
      <div className="absolute bottom-0 w-full border-t border-gray-100 bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3 px-2 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">Security Admin</div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 