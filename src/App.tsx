import { useState } from 'react';
import {
  VideoCameraIcon,
  ChartBarIcon,
  BellAlertIcon,
  CommandLineIcon,
  UserGroupIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  CogIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import LiveFeed from './components/LiveFeed';
import Predictions from './components/Predictions';
import Alerts from './components/Alerts';
import CommandInterface from './components/CommandInterface';
import FaceData from './components/FaceData';
import Dashboard from './components/Dashboard';
import MissingPersons from './components/MissingPersons';
import AiChat from './components/AiChat';
import Incidents from './components/Incidents';
import BottleneckAnalytics from './components/BottleneckAnalytics';
import Settings from './components/Settings';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, id: 'dashboard' },
    { name: 'Live Feed', icon: VideoCameraIcon, id: 'livefeed', badge: { text: 'Live', color: 'emerald' } },
    { name: 'Bottleneck Analytics', icon: ArrowTrendingUpIcon, id: 'bottleneck-analytics', badge: { text: 'AI', color: 'blue' } },
    { name: 'Incident Management', icon: ExclamationTriangleIcon, id: 'incidents', badge: { text: '3', color: 'red' } },
    { name: 'Find Missing Persons', icon: MagnifyingGlassIcon, id: 'missing-persons', badge: { text: 'AI', color: 'orange' } },
    { name: 'AI Chat Assistant', icon: ChatBubbleLeftEllipsisIcon, id: 'ai-chat', badge: { text: 'AI', color: 'purple' } },
    { name: 'Predictions', icon: ChartBarIcon, id: 'predictions', badge: { text: 'AI', color: 'indigo' } },
    { name: 'Alerts', icon: BellAlertIcon, id: 'alerts', badge: { text: '5', color: 'rose' } },
    { name: 'Command Interface', icon: CommandLineIcon, id: 'command' },
    { name: 'Face Data', icon: UserGroupIcon, id: 'facedata', badge: { text: 'New', color: 'blue' } },
    { name: 'Settings', icon: CogIcon, id: 'settings' },
  ];

  const bottomNavigation = [
    { name: 'Logout', icon: ArrowLeftOnRectangleIcon, id: 'logout' }
  ];

  const handleNavigation = (id: string) => {
    if (id === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
    } else {
      setActivePage(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-30 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <VideoCameraIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Surveillance</h1>
            <p className="text-xs text-gray-500">Security Dashboard</p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activePage === item.id
                  ? 'bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-200 ${
                activePage === item.id
                  ? 'bg-white shadow-sm text-indigo-600'
                  : 'text-gray-500 group-hover:text-indigo-600'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`flex-1 text-left text-sm font-medium ${
                activePage === item.id ? 'text-indigo-600' : 'text-gray-700'
              }`}>
                {item.name}
              </span>
              {item.badge && (
                <span className={`px-2 py-1 text-xs font-medium rounded-lg bg-${item.badge.color}-50 text-${item.badge.color}-700`}>
                  {item.badge.text}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Navigation (Logout) */}
        <div className="p-4 border-t border-gray-100">
          {bottomNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-rose-50"
            >
              <div className="p-2 rounded-lg text-gray-500 group-hover:text-rose-600">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-gray-700 group-hover:text-rose-600">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen">
        {activePage === 'dashboard' && <Dashboard onNavigate={setActivePage} />}
        {activePage === 'livefeed' && <LiveFeed />}
        {activePage === 'bottleneck-analytics' && <BottleneckAnalytics />}
        {activePage === 'incidents' && <Incidents />}
        {activePage === 'missing-persons' && <MissingPersons onNavigate={handleNavigation} />}
        {activePage === 'ai-chat' && <AiChat />}
        {activePage === 'predictions' && <Predictions />}
        {activePage === 'alerts' && <Alerts />}
        {activePage === 'command' && <CommandInterface />}
        {activePage === 'facedata' && <FaceData />}
        {activePage === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;
