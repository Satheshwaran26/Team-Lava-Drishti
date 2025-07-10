import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  BellAlertIcon, 
  MapIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowPathIcon,
  VideoCameraIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  SpeakerWaveIcon,
  MagnifyingGlassIcon,
  FireIcon,
  WifiIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  TruckIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftEllipsisIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  trend?: number;
  description?: string;
  isLive?: boolean;
}

interface AlertItem {
  id: string;
  time: string;
  zone: string;
  type: 'bottleneck' | 'anomaly' | 'social' | 'incident' | 'missing';
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  icon: any;
}

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Live metrics data
  const [metrics, setMetrics] = useState<DashboardCard[]>([
    { 
      title: 'Total People Inside',
      value: 47000,
      icon: UserGroupIcon,
      color: 'blue',
      trend: 5.2,
      description: 'Live count across all zones',
      isLive: true
    },
    { 
      title: 'Average Crowd Density',
      value: '73%',
      icon: BuildingOfficeIcon,
      color: 'green',
      trend: -2.1,
      description: 'Current venue capacity utilization'
    },
    { 
      title: 'Active Incidents',
      value: 3,
      icon: ExclamationTriangleIcon,
      color: 'red',
      description: 'Requiring immediate attention'
    },
    { 
      title: 'Bottlenecks (Last Hour)',
      value: 5,
      icon: ArrowUpIcon,
      color: 'orange',
      trend: 15.8,
      description: 'Traffic flow disruptions detected'
    },
    { 
      title: 'Response Units',
      value: 12,
      icon: TruckIcon,
      color: 'purple',
      description: 'Currently deployed personnel'
    },
    { 
      title: 'Lost Persons Tracked',
      value: 7,
      icon: MagnifyingGlassIcon,
      color: 'amber',
      description: 'AI-assisted person tracking'
    },
    { 
      title: 'Social Media Alerts',
      value: 23,
      icon: ChatBubbleBottomCenterIcon,
      color: 'pink',
      trend: 8.4,
      description: 'Today\'s social mentions'
    },
    { 
      title: 'Cameras Online',
      value: '27/30',
      icon: VideoCameraIcon,
      color: 'teal',
      description: '90% system availability'
    },
  ]);

  // Real-time alerts data
  const [alerts] = useState<AlertItem[]>([
    {
      id: '1',
      time: '2 min ago',
      zone: 'Zone A - Main Entrance',
      type: 'bottleneck',
      description: 'High crowd density detected, potential bottleneck forming',
      severity: 'Critical',
      icon: ExclamationTriangleIcon
    },
    {
      id: '2',
      time: '5 min ago',
      zone: 'Zone C - Food Court',
      type: 'anomaly',
      description: 'Unusual crowd movement pattern detected',
      severity: 'Medium',
      icon: FireIcon
    },
    {
      id: '3',
      time: '8 min ago',
      zone: 'Zone B - North Exit',
      type: 'social',
      description: 'Social media panic signals detected from venue',
      severity: 'High',
      icon: SpeakerWaveIcon
    },
    {
      id: '4',
      time: '12 min ago',
      zone: 'Zone D - Security Checkpoint',
      type: 'incident',
      description: 'Security incident reported by staff member',
      severity: 'Critical',
      icon: ShieldExclamationIcon
    },
    {
      id: '5',
      time: '15 min ago',
      zone: 'Zone A - Main Entrance',
      type: 'missing',
      description: 'Missing person John Smith detected via facial recognition',
      severity: 'Medium',
      icon: UserIcon
    },
    {
      id: '6',
      time: '18 min ago',
      zone: 'Zone F - Parking Area',
      type: 'anomaly',
      description: 'Suspicious vehicle activity detected',
      severity: 'Low',
      icon: FireIcon
    },
    {
      id: '7',
      time: '22 min ago',
      zone: 'Zone E - West Wing',
      type: 'bottleneck',
      description: 'Crowd flow congestion in narrow corridor',
      severity: 'Medium',
      icon: ExclamationTriangleIcon
    },
    {
      id: '8',
      time: '25 min ago',
      zone: 'Zone C - Food Court',
      type: 'social',
      description: 'Positive social media mentions increasing',
      severity: 'Low',
      icon: SpeakerWaveIcon
    }
  ]);

  // Map zones data
  const mapZones = [
    { id: 'zone-a', name: 'Main Entrance', x: 20, y: 30, density: 85, status: 'critical', incidents: 2 },
    { id: 'zone-b', name: 'North Exit', x: 60, y: 15, density: 45, status: 'normal', incidents: 0 },
    { id: 'zone-c', name: 'Food Court', x: 40, y: 50, density: 70, status: 'warning', incidents: 1 },
    { id: 'zone-d', name: 'Security Checkpoint', x: 80, y: 40, density: 90, status: 'critical', incidents: 1 },
    { id: 'zone-e', name: 'West Wing', x: 15, y: 65, density: 35, status: 'normal', incidents: 0 },
    { id: 'zone-f', name: 'Parking Area', x: 70, y: 75, density: 25, status: 'normal', incidents: 1 },
  ];

  // Camera positions
  const cameras = [
    { id: 'cam-1', x: 25, y: 25, status: 'online', zone: 'Zone A' },
    { id: 'cam-2', x: 45, y: 20, status: 'online', zone: 'Zone B' },
    { id: 'cam-3', x: 35, y: 45, status: 'offline', zone: 'Zone C' },
    { id: 'cam-4', x: 75, y: 35, status: 'online', zone: 'Zone D' },
    { id: 'cam-5', x: 20, y: 60, status: 'online', zone: 'Zone E' },
    { id: 'cam-6', x: 65, y: 70, status: 'maintenance', zone: 'Zone F' },
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        if (metric.isLive && metric.title === 'Total People Inside') {
          const variation = Math.floor(Math.random() * 200 - 100);
          const newValue = Math.max(46000, Math.min(48000, (metric.value as number) + variation));
          return { ...metric, value: newValue };
        }
        return metric;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (color: string) => {
    const styles = {
      blue: 'from-blue-50 to-blue-100 shadow-blue-100',
      green: 'from-green-50 to-green-100 shadow-green-100',
      red: 'from-red-50 to-red-100 shadow-red-100',
      orange: 'from-orange-50 to-orange-100 shadow-orange-100',
      purple: 'from-purple-50 to-purple-100 shadow-purple-100',
      amber: 'from-amber-50 to-amber-100 shadow-amber-100',
      pink: 'from-pink-50 to-pink-100 shadow-pink-100',
      teal: 'from-teal-50 to-teal-100 shadow-teal-100',
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  const getIconStyle = (color: string) => {
    const styles = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      orange: 'text-orange-600 bg-orange-100',
      purple: 'text-purple-600 bg-purple-100',
      amber: 'text-amber-600 bg-amber-100',
      pink: 'text-pink-600 bg-pink-100',
      teal: 'text-teal-600 bg-teal-100',
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getZoneStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCameraStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="pl-80 pr-8 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-full mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-indigo-600 to-blue-500 rounded-full"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Surveillance Command Center
                </h1>
              </div>
              <p className="text-gray-500 pl-4">Real-time monitoring and incident management platform</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="font-medium text-emerald-700">Live System</span>
                </div>
                <span className="text-emerald-700/50">|</span>
                <span className="text-emerald-700 font-medium">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-indigo-600 bg-white rounded-xl border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* (A) Top Metrics Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className={`relative overflow-hidden bg-gradient-to-br ${getCardStyle(metric.color)} rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${getIconStyle(metric.color)} group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="w-6 h-6" />
                      {metric.isLive && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                    </div>
                    {metric.trend !== undefined && (
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        metric.trend > 0 
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {metric.trend > 0 ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                        <span>{Math.abs(metric.trend)}%</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{metric.title}</h2>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-gray-900">
                        {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                      </p>
                    </div>
                    {metric.description && (
                      <p className="text-xs text-gray-600 mt-2">{metric.description}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* (B) Live Interactive Map */}
          <div className="xl:col-span-2 bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Live Interactive Map</h2>
                  </div>
                  <p className="text-sm text-gray-500 pl-7">Real-time venue monitoring</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Critical</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Warning</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-96 overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
                
                {/* Zone Heatmap Overlay */}
                <div className="absolute inset-0">
                  {mapZones.map((zone) => (
                    <div
                      key={zone.id}
                      className={`absolute rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${
                        zone.density > 80 ? 'bg-red-400/30' :
                        zone.density > 60 ? 'bg-yellow-400/30' :
                        'bg-green-400/30'
                      }`}
                      style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${Math.max(40, zone.density / 2)}px`,
                        height: `${Math.max(40, zone.density / 2)}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                    >
                      <div className={`w-full h-full rounded-full border-2 border-white ${getZoneStatusColor(zone.status)} opacity-80 flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{zone.density}%</span>
                      </div>
                      
                      {/* Zone Label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap">
                        {zone.name}
                        {zone.incidents > 0 && (
                          <span className="ml-1 bg-red-500 text-white px-1 rounded-full text-xs">{zone.incidents}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Camera Positions */}
                <div className="absolute inset-0">
                  {cameras.map((camera) => (
                    <div
                      key={camera.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-200"
                      style={{
                        left: `${camera.x}%`,
                        top: `${camera.y}%`
                      }}
                      title={`${camera.id} - ${camera.status}`}
                    >
                      <div className={`w-6 h-6 rounded-lg ${getCameraStatusColor(camera.status)} flex items-center justify-center shadow-lg`}>
                        <VideoCameraIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Incident Markers */}
                <div className="absolute top-4 left-4">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-500 animate-pulse" />
                </div>
                <div className="absolute top-16 right-8">
                  <ShieldExclamationIcon className="w-8 h-8 text-orange-500 animate-pulse" />
                </div>
                
                {/* Selected Zone Details */}
                {selectedZone && (
                  <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 min-w-48">
                    {(() => {
                      const zone = mapZones.find(z => z.id === selectedZone);
                      return zone ? (
                        <div>
                          <h3 className="font-semibold text-gray-900">{zone.name}</h3>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Density:</span>
                              <span className="font-medium">{zone.density}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className={`font-medium capitalize ${
                                zone.status === 'critical' ? 'text-red-600' :
                                zone.status === 'warning' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>{zone.status}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Incidents:</span>
                              <span className="font-medium">{zone.incidents}</span>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* (C) Real-Time Alert Feed */}
          <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BellAlertIcon className="w-5 h-5 text-red-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Real-Time Alerts</h2>
                  </div>
                  <p className="text-sm text-gray-500 pl-7">Live incident monitoring</p>
                </div>
                <button 
                  onClick={() => onNavigate?.('alerts')}
                  className="text-sm text-gray-600 hover:text-red-600 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 hover:border-red-100 hover:bg-red-50 transition-all duration-200"
                >
                  View All
                </button>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto">
              <div className="p-6 space-y-4">
                {alerts.map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <div
                      key={alert.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          alert.severity === 'Critical' ? 'bg-red-100 text-red-600' :
                          alert.severity === 'High' ? 'bg-orange-100 text-orange-600' :
                          alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{alert.time}</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityStyle(alert.severity)}`}>
                                {alert.severity}
                              </span>
                            </div>
                          </div>
                          <div className="mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">{alert.zone}</h4>
                            <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              alert.type === 'bottleneck' ? 'bg-orange-100 text-orange-600' :
                              alert.type === 'anomaly' ? 'bg-red-100 text-red-600' :
                              alert.type === 'social' ? 'bg-purple-100 text-purple-600' :
                              alert.type === 'incident' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {alert.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Missing Persons Detection Widget */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-orange-600 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-3 h-3 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Missing Persons Detection</h2>
              </div>
              <p className="text-sm text-gray-500 pl-7">AI-powered person identification and tracking</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigate?.('missing-persons')}
                className="px-3 py-2 text-sm text-gray-600 hover:text-orange-600 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-100 hover:bg-orange-50 transition-all duration-200"
              >
                View All Cases
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Active Cases */}
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900">Active Cases</h3>
                  <p className="text-sm text-orange-700">Currently searching</p>
                </div>
              </div>
              <div className="mt-3 text-right">
                <div className="text-2xl font-bold text-orange-900">7</div>
                <div className="text-xs text-orange-600">+2 today</div>
              </div>
            </div>
            
            {/* Recent Detection */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Last Found</h3>
                  <p className="text-sm text-green-700">2 hours ago</p>
                </div>
              </div>
              <div className="mt-3 text-right">
                <div className="text-2xl font-bold text-green-900">89%</div>
                <div className="text-xs text-green-600">confidence</div>
              </div>
            </div>
            
            {/* Success Rate */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Success Rate</h3>
                  <p className="text-sm text-blue-700">Last 30 days</p>
                </div>
              </div>
              <div className="mt-3 text-right">
                <div className="text-2xl font-bold text-blue-900">85%</div>
                <div className="text-xs text-blue-600">12/14 found</div>
              </div>
            </div>
            
            {/* AI Confidence */}
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <WifiIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900">AI Status</h3>
                  <p className="text-sm text-purple-700">System health</p>
                </div>
              </div>
              <div className="mt-3 text-right">
                <div className="text-2xl font-bold text-purple-900">98%</div>
                <div className="text-xs text-purple-600">optimal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-gradient-to-b from-indigo-600 to-blue-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <p className="text-sm text-gray-500 pl-3">AI-powered surveillance tools</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => onNavigate?.('ai-chat')}
              className="group relative overflow-hidden p-6 text-center rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-200 hover:border-purple-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <ChatBubbleLeftEllipsisIcon className="h-7 w-7 text-purple-600" />
                </div>
                <span className="block text-sm font-medium text-gray-900 mt-4">AI Chat Assistant</span>
                <span className="block text-xs text-purple-600 mt-1">Ask questions about data</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate?.('missing-persons')}
              className="group relative overflow-hidden p-6 text-center rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300 border border-orange-200 hover:border-orange-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <MagnifyingGlassIcon className="h-7 w-7 text-orange-600" />
                </div>
                <span className="block text-sm font-medium text-gray-900 mt-4">Find Missing Persons</span>
                <span className="block text-xs text-orange-600 mt-1">AI-powered detection</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate?.('alerts')}
              className="group relative overflow-hidden p-6 text-center rounded-xl bg-gradient-to-br from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 transition-all duration-300 border border-red-200 hover:border-red-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <BellAlertIcon className="h-7 w-7 text-red-600" />
                </div>
                <span className="block text-sm font-medium text-gray-900 mt-4">View All Alerts</span>
                <span className="block text-xs text-red-600 mt-1">5 active alerts</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate?.('livefeed')}
              className="group relative overflow-hidden p-6 text-center rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 border border-emerald-200 hover:border-emerald-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <VideoCameraIcon className="h-7 w-7 text-emerald-600" />
                </div>
                <span className="block text-sm font-medium text-gray-900 mt-4">Live Camera Feed</span>
                <span className="block text-xs text-emerald-600 mt-1">27 cameras online</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;