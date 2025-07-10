import { useState } from 'react';
import {
  BellAlertIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'critical' | 'warning' | 'info';
  zone: string;
  timestamp: string;
  status: 'new' | 'investigating' | 'resolved';
  camera?: string;
}

const Alerts = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'investigating' | 'resolved'>('all');

  const alerts: Alert[] = [
    {
      id: '1',
      title: 'Unauthorized Access Detected',
      description: 'Unknown individual attempting to access restricted area.',
      type: 'critical',
      zone: 'Zone A',
      timestamp: '2 minutes ago',
      status: 'new',
      camera: 'Camera 1',
    },
    {
      id: '2',
      title: 'Crowd Density Threshold Exceeded',
      description: 'Number of people in zone exceeds safety limit.',
      type: 'warning',
      zone: 'Zone B',
      timestamp: '5 minutes ago',
      status: 'investigating',
      camera: 'Camera 3',
    },
    {
      id: '3',
      title: 'Suspicious Behavior Detected',
      description: 'Individual displaying unusual movement patterns.',
      type: 'warning',
      zone: 'Zone C',
      timestamp: '10 minutes ago',
      status: 'new',
      camera: 'Camera 2',
    },
    {
      id: '4',
      title: 'System Health Check',
      description: 'All cameras operating at optimal performance.',
      type: 'info',
      zone: 'All Zones',
      timestamp: '15 minutes ago',
      status: 'resolved',
    },
    {
      id: '5',
      title: 'Emergency Exit Blocked',
      description: 'Objects detected blocking emergency exit route.',
      type: 'critical',
      zone: 'Zone D',
      timestamp: '18 minutes ago',
      status: 'investigating',
      camera: 'Camera 4',
    },
  ];

  const getAlertTypeStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 ring-rose-600/20';
      case 'warning':
        return 'bg-amber-50 text-amber-700 ring-amber-600/20';
      case 'info':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-indigo-50 text-indigo-700 ring-indigo-600/20';
      case 'investigating':
        return 'bg-amber-50 text-amber-700 ring-amber-600/20';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return ExclamationTriangleIcon;
      case 'warning':
        return ShieldExclamationIcon;
      case 'info':
        return BellAlertIcon;
      default:
        return BellAlertIcon;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = selectedFilter === 'all' || alert.type === selectedFilter;
    const statusMatch = selectedStatus === 'all' || alert.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className="pl-80 pr-8 py-8">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-rose-600 to-orange-500 rounded-full"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                  Security Alerts
                </h1>
              </div>
              <p className="text-gray-500 pl-4">Real-time incident monitoring and response system</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <span className="font-medium text-rose-700">Live Monitoring</span>
                </div>
                <span className="text-rose-700/50">|</span>
                <span className="text-rose-700 font-medium">2 Critical Alerts</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-rose-600 bg-white rounded-xl border-2 border-gray-100 hover:border-rose-100 hover:bg-rose-50 transition-all duration-200 shadow-sm hover:shadow">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter Alerts:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('critical')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === 'critical'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                }`}
              >
                Critical
              </button>
              <button
                onClick={() => setSelectedFilter('warning')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === 'warning'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                }`}
              >
                Warning
              </button>
              <button
                onClick={() => setSelectedFilter('info')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === 'info'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                Info
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const AlertIcon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${getAlertTypeStyles(alert.type)}`}>
                    <AlertIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {alert.title}
                      </h3>
                      <span className="text-sm text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="mt-1 text-gray-600">{alert.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{alert.zone}</span>
                      </div>
                      {alert.camera && (
                        <div className="flex items-center gap-2">
                          <VideoCameraIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{alert.camera}</span>
                        </div>
                      )}
                      <div className={`px-2.5 py-1 text-xs font-medium rounded-lg ring-1 ring-inset ${getStatusStyles(alert.status)}`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {alert.status !== 'resolved' && (
                      <button className="p-2 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all duration-200">
                        <CheckCircleIcon className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all duration-200">
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Alerts; 