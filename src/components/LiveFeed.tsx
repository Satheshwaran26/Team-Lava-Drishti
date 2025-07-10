import { useState } from 'react';
import {
  VideoCameraIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  MapIcon,
  CameraIcon,
  PhotoIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  FireIcon,
  CloudIcon,
  XMarkIcon,
  Squares2X2Icon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';

const LiveFeed = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('camera1');
  const [showAddFeedModal, setShowAddFeedModal] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'cctv', 'drone'
  const [viewMode, setViewMode] = useState('single'); // 'single', 'grid'
  const [fullscreenCamera, setFullscreenCamera] = useState<string | null>(null);
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
  const [newFeed, setNewFeed] = useState({
    name: '',
    type: 'cctv',
    source: '',
  });

  const cameras = [
    { 
      id: 'camera1', 
      name: 'Main Entrance', 
      type: 'cctv',
      status: 'active', 
      viewers: 5,
      source: '192.168.1.101',
      crowdLevel: 'medium',
      position: null,
      zone: 'Zone A'
    },
    { 
      id: 'camera2', 
      name: 'Parking Lot', 
      type: 'cctv',
      status: 'active', 
      viewers: 3,
      source: '192.168.1.102',
      crowdLevel: 'low',
      position: null,
      zone: 'Zone B'
    },
    { 
      id: 'camera3', 
      name: 'Reception', 
      type: 'cctv',
      status: 'active', 
      viewers: 4,
      source: '192.168.1.103',
      crowdLevel: 'high',
      position: null,
      zone: 'Zone C'
    },
    { 
      id: 'camera4', 
      name: 'Back Exit', 
      type: 'cctv',
      status: 'inactive', 
      viewers: 0,
      source: '192.168.1.104',
      crowdLevel: 'low',
      position: null,
      zone: 'Zone D'
    },
    { 
      id: 'drone1', 
      name: 'Sky Patrol Alpha', 
      type: 'drone',
      status: 'active', 
      viewers: 2,
      source: 'rtmp://drone1.local/stream',
      crowdLevel: 'medium',
      position: { lat: 40.7128, lng: -74.0060, altitude: 150 },
      zone: 'Aerial Zone 1'
    },
    { 
      id: 'drone2', 
      name: 'Perimeter Scout', 
      type: 'drone',
      status: 'active', 
      viewers: 1,
      source: 'rtmp://drone2.local/stream',
      crowdLevel: 'low',
      position: { lat: 40.7130, lng: -74.0062, altitude: 200 },
      zone: 'Aerial Zone 2'
    },
  ];

  const anomalies = [
    {
      id: 'anom1',
      type: 'smoke',
      severity: 'high',
      cameraId: 'camera1',
      cameraName: 'Main Entrance',
      zone: 'Zone A',
      timestamp: '2024-01-15T14:30:25Z',
      description: 'Smoke detected near main entrance area',
      screenshot: '/api/screenshots/anom1.jpg',
      isActive: true
    },
    {
      id: 'anom2',
      type: 'crowd_surge',
      severity: 'medium',
      cameraId: 'camera3',
      cameraName: 'Reception',
      zone: 'Zone C',
      timestamp: '2024-01-15T14:28:15Z',
      description: 'Unusual crowd density detected in reception area',
      screenshot: '/api/screenshots/anom2.jpg',
      isActive: true
    },
    {
      id: 'anom3',
      type: 'fire',
      severity: 'critical',
      cameraId: 'camera2',
      cameraName: 'Parking Lot',
      zone: 'Zone B',
      timestamp: '2024-01-15T14:25:10Z',
      description: 'Fire detected in parking lot section B-3',
      screenshot: '/api/screenshots/anom3.jpg',
      isActive: false
    },
    {
      id: 'anom4',
      type: 'panic_gesture',
      severity: 'high',
      cameraId: 'drone1',
      cameraName: 'Sky Patrol Alpha',
      zone: 'Aerial Zone 1',
      timestamp: '2024-01-15T14:22:45Z',
      description: 'Panic gestures detected from aerial view',
      screenshot: '/api/screenshots/anom4.jpg',
      isActive: true
    },
    {
      id: 'anom5',
      type: 'suspicious_object',
      severity: 'medium',
      cameraId: 'camera4',
      cameraName: 'Back Exit',
      zone: 'Zone D',
      timestamp: '2024-01-15T14:20:30Z',
      description: 'Unattended object detected near back exit',
      screenshot: '/api/screenshots/anom5.jpg',
      isActive: true
    }
  ];

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case 'fire': return <FireIcon className="w-4 h-4" />;
      case 'smoke': return <CloudIcon className="w-4 h-4" />;
      case 'crowd_surge': return <UserGroupIcon className="w-4 h-4" />;
      case 'panic_gesture': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'suspicious_object': return <ViewfinderCircleIcon className="w-4 h-4" />;
      default: return <ExclamationTriangleIcon className="w-4 h-4" />;
    }
  };

  const getAnomalySeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredCameras = cameras.filter(camera => {
    if (filterType === 'all') return true;
    return camera.type === filterType;
  });

  const handleAddFeed = () => {
    // Add logic to handle new feed addition
    console.log('Adding new feed:', newFeed);
    setShowAddFeedModal(false);
    setNewFeed({ name: '', type: 'cctv', source: '' });
  };

  const handleManualSnapshot = () => {
    // Add logic to take manual snapshot
    console.log('Taking snapshot of camera:', selectedCamera);
  };

  const handleViewLiveFeed = (cameraId: string) => {
    setSelectedCamera(cameraId);
    setViewMode('single');
    setSelectedAnomaly(null);
  };

  const handleExpandCamera = (cameraId: string) => {
    setFullscreenCamera(cameraId);
  };

  const handleCloseFullscreen = () => {
    setFullscreenCamera(null);
  };

  const activeAnomalies = anomalies.filter(a => a.isActive);

  return (
    <div className="pl-80 pr-8 py-8">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-emerald-600 to-teal-500 rounded-full"></div>
                <h1 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Live Feed
                </h1>
              </div>
              <p className="text-gray-500 pl-4 text-sm">Real-time surveillance camera feeds</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="font-medium text-emerald-700 text-sm">Live</span>
                </div>
                <span className="text-emerald-700/50">|</span>
                <span className="text-emerald-700 font-medium text-sm">{filteredCameras.filter(c => c.status === 'active').length} Active</span>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button 
                  onClick={() => setFilterType('all')}
                  className={`px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    filterType === 'all' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterType('cctv')}
                  className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    filterType === 'cctv' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <VideoCameraIcon className="w-3 h-3" />
                  CCTV
                </button>
                <button 
                  onClick={() => setFilterType('drone')}
                  className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    filterType === 'drone' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MapIcon className="w-3 h-3" />
                  Drone
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button 
                  onClick={() => setViewMode('single')}
                  className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    viewMode === 'single' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <EyeIcon className="w-3 h-3" />
                  Single
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Squares2X2Icon className="w-3 h-3" />
                  Grid
                </button>
              </div>

              <button 
                onClick={() => setShowAddFeedModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow text-sm"
              >
                <PlusIcon className="w-4 h-4" />
                <span className="font-medium">Add Feed</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-emerald-600 bg-white rounded-xl border-2 border-gray-100 hover:border-emerald-100 hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow text-sm">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Camera List & Anomaly Panel */}
          <div className="xl:col-span-1 order-2 xl:order-1 space-y-6">
            {/* Camera List */}
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Cameras</h2>
                <button className="p-2 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-all duration-200">
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredCameras.map((camera) => (
                  <button
                    key={camera.id}
                    onClick={() => setSelectedCamera(camera.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
                      selectedCamera === camera.id
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-emerald-50 hover:border-emerald-200'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${
                      camera.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {camera.type === 'drone' ? (
                        <MapIcon className="w-4 h-4" />
                      ) : (
                        <VideoCameraIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{camera.name}</h3>
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded flex-shrink-0 ${
                          camera.type === 'drone' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {camera.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2 truncate">{camera.source}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`flex items-center gap-1 text-xs ${
                          camera.status === 'active' ? 'text-emerald-600' : 'text-gray-500'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            camera.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'
                          }`}></span>
                          {camera.status === 'active' ? 'Live' : 'Offline'}
                        </span>
                        {camera.viewers > 0 && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <EyeIcon className="w-3 h-3" />
                              {camera.viewers}
                            </span>
                          </>
                        )}
                        <span className="text-gray-300">•</span>
                        <span className={`flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full border ${getCrowdLevelColor(camera.crowdLevel)}`}>
                          <UserGroupIcon className="w-3 h-3" />
                          {camera.crowdLevel}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Anomaly Detection Panel */}
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                  Anomalies
                </h2>
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                  {activeAnomalies.length} Active
                </span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {activeAnomalies.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      selectedAnomaly === anomaly.id
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-200'
                    } cursor-pointer`}
                    onClick={() => setSelectedAnomaly(selectedAnomaly === anomaly.id ? null : anomaly.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${getAnomalySeverityColor(anomaly.severity)}`}>
                        {getAnomalyIcon(anomaly.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {anomaly.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getAnomalySeverityColor(anomaly.severity)}`}>
                            {anomaly.severity}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">{anomaly.cameraName} • {anomaly.zone}</div>
                        <div className="text-xs text-gray-600 mb-2">{anomaly.description}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{formatTimestamp(anomaly.timestamp)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewLiveFeed(anomaly.cameraId);
                            }}
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            View Feed
                          </button>
                        </div>
                      </div>
                    </div>
                    {selectedAnomaly === anomaly.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-700">Screenshot</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewLiveFeed(anomaly.cameraId);
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
                          >
                            <EyeIcon className="w-3 h-3" />
                            View Live Feed
                          </button>
                        </div>
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                          <PhotoIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {activeAnomalies.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <ExclamationTriangleIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No active anomalies</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Feed Area */}
          <div className="xl:col-span-4 order-1 xl:order-2">
            {viewMode === 'single' ? (
              /* Single Camera View */
              <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="relative aspect-video bg-gray-900">
                  {/* Placeholder for video feed */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {cameras.find(c => c.id === selectedCamera)?.type === 'drone' ? (
                      <MapIcon className="w-20 h-20 text-gray-600" />
                    ) : (
                      <VideoCameraIcon className="w-20 h-20 text-gray-600" />
                    )}
                  </div>

                  {/* Camera Info Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-md rounded-xl text-white">
                      {cameras.find(c => c.id === selectedCamera)?.type === 'drone' ? (
                        <MapIcon className="w-4 h-4" />
                      ) : (
                        <VideoCameraIcon className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {cameras.find(c => c.id === selectedCamera)?.name}
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        {cameras.find(c => c.id === selectedCamera)?.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleManualSnapshot}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200"
                        title="Take Manual Snapshot"
                      >
                        <PhotoIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleExpandCamera(selectedCamera)}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200"
                        title="Expand to Fullscreen"
                      >
                        <ArrowsPointingOutIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200">
                        <ViewfinderCircleIcon className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200"
                        onClick={() => setIsPaused(!isPaused)}
                      >
                        {isPaused ? (
                          <PlayIcon className="w-5 h-5" />
                        ) : (
                          <PauseIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Crowd Level Indicator */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md ${getCrowdLevelColor(cameras.find(c => c.id === selectedCamera)?.crowdLevel || 'low')} bg-opacity-90`}>
                      <UserGroupIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Crowd Level: {cameras.find(c => c.id === selectedCamera)?.crowdLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Drone Position Info (only for drones) */}
                {cameras.find(c => c.id === selectedCamera)?.type === 'drone' && (
                  <div className="p-4 bg-blue-50 border-b border-blue-100">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                        <MapIcon className="w-4 h-4" />
                        Drone Position
                      </h4>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Real-time GPS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div className="text-center">
                        <span className="text-xs text-blue-600">Latitude</span>
                        <div className="font-mono text-sm text-blue-900">
                          {cameras.find(c => c.id === selectedCamera)?.position?.lat}°
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-blue-600">Longitude</span>
                        <div className="font-mono text-sm text-blue-900">
                          {cameras.find(c => c.id === selectedCamera)?.position?.lng}°
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-blue-600">Altitude</span>
                        <div className="font-mono text-sm text-blue-900">
                          {cameras.find(c => c.id === selectedCamera)?.position?.altitude}m
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {cameras.find(c => c.id === selectedCamera)?.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                          1080p
                        </span>
                        <span className="text-sm text-gray-500 truncate">
                          Source: {cameras.find(c => c.id === selectedCamera)?.source}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        Archive
                      </button>
                      <button 
                        onClick={handleManualSnapshot}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-200"
                      >
                        <CameraIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Manual Snapshot</span>
                        <span className="sm:hidden">Snapshot</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCameras.map((camera) => (
                  <div
                    key={camera.id}
                    className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-200"
                    onClick={() => handleExpandCamera(camera.id)}
                  >
                    <div className="relative aspect-video bg-gray-900">
                      {/* Placeholder for video feed */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {camera.type === 'drone' ? (
                          <MapIcon className="w-12 h-12 text-gray-600" />
                        ) : (
                          <VideoCameraIcon className="w-12 h-12 text-gray-600" />
                        )}
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute top-2 left-2">
                        <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          camera.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            camera.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                          }`}></span>
                          {camera.status === 'active' ? 'Live' : 'Offline'}
                        </span>
                      </div>

                      {/* Expand Button */}
                      <div className="absolute top-2 right-2">
                        <button className="p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/60 transition-colors duration-200">
                          <ArrowsPointingOutIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Anomaly Indicator */}
                      {activeAnomalies.some(a => a.cameraId === camera.id) && (
                        <div className="absolute bottom-2 left-2">
                          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full border border-red-200">
                            <ExclamationTriangleIcon className="w-3 h-3" />
                            Alert
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Camera Info */}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{camera.name}</h3>
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                          camera.type === 'drone' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {camera.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{camera.zone}</span>
                        <div className="flex items-center gap-2">
                          {camera.viewers > 0 && (
                            <span className="flex items-center gap-1">
                              <EyeIcon className="w-3 h-3" />
                              {camera.viewers}
                            </span>
                          )}
                          <span className={`px-1.5 py-0.5 rounded-full border ${getCrowdLevelColor(camera.crowdLevel)}`}>
                            {camera.crowdLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Feed Modal */}
      {showAddFeedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Feed</h2>
              <button 
                onClick={() => setShowAddFeedModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feed Name</label>
                <input
                  type="text"
                  value={newFeed.name}
                  onChange={(e) => setNewFeed({...newFeed, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter feed name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feed Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cctv"
                      checked={newFeed.type === 'cctv'}
                      onChange={(e) => setNewFeed({...newFeed, type: e.target.value})}
                      className="mr-2"
                    />
                    <VideoCameraIcon className="w-4 h-4 mr-1" />
                    CCTV
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="drone"
                      checked={newFeed.type === 'drone'}
                      onChange={(e) => setNewFeed({...newFeed, type: e.target.value})}
                      className="mr-2"
                    />
                    <MapIcon className="w-4 h-4 mr-1" />
                    Drone
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feed Source {newFeed.type === 'cctv' ? '(IP Address)' : '(RTMP URL)'}
                </label>
                <input
                  type="text"
                  value={newFeed.source}
                  onChange={(e) => setNewFeed({...newFeed, source: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder={newFeed.type === 'cctv' ? '192.168.1.100' : 'rtmp://drone.local/stream'}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddFeedModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFeed}
                disabled={!newFeed.name || !newFeed.source}
                className="flex-1 px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Feed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Camera Modal */}
      {fullscreenCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-7xl max-h-screen p-4">
            {/* Close Button */}
            <button 
              onClick={handleCloseFullscreen}
              className="absolute top-6 right-6 z-10 p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Fullscreen Video */}
            <div className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
              {/* Placeholder for video feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                {cameras.find(c => c.id === fullscreenCamera)?.type === 'drone' ? (
                  <MapIcon className="w-32 h-32 text-gray-600" />
                ) : (
                  <VideoCameraIcon className="w-32 h-32 text-gray-600" />
                )}
              </div>

              {/* Camera Info Overlay */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-3 px-4 py-3 bg-black/50 backdrop-blur-md rounded-xl text-white">
                  {cameras.find(c => c.id === fullscreenCamera)?.type === 'drone' ? (
                    <MapIcon className="w-5 h-5" />
                  ) : (
                    <VideoCameraIcon className="w-5 h-5" />
                  )}
                  <span className="text-lg font-medium">
                    {cameras.find(c => c.id === fullscreenCamera)?.name}
                  </span>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded">
                    {cameras.find(c => c.id === fullscreenCamera)?.type.toUpperCase()}
                  </span>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded">
                    {cameras.find(c => c.id === fullscreenCamera)?.zone}
                  </span>
                </div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border backdrop-blur-md ${getCrowdLevelColor(cameras.find(c => c.id === fullscreenCamera)?.crowdLevel || 'low')} bg-opacity-90`}>
                  <UserGroupIcon className="w-5 h-5" />
                  <span className="text-lg font-medium">
                    Crowd Level: {cameras.find(c => c.id === fullscreenCamera)?.crowdLevel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleManualSnapshot}
                    className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200"
                    title="Take Manual Snapshot"
                  >
                    <PhotoIcon className="w-6 h-6" />
                  </button>
                  <button className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200">
                    <ViewfinderCircleIcon className="w-6 h-6" />
                  </button>
                  <button 
                    className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/60 transition-colors duration-200"
                    onClick={() => setIsPaused(!isPaused)}
                  >
                    {isPaused ? (
                      <PlayIcon className="w-6 h-6" />
                    ) : (
                      <PauseIcon className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Anomaly Indicators for this camera */}
              {activeAnomalies.filter(a => a.cameraId === fullscreenCamera).length > 0 && (
                <div className="absolute top-6 right-20">
                  <div className="space-y-2">
                    {activeAnomalies.filter(a => a.cameraId === fullscreenCamera).map((anomaly) => (
                      <div
                        key={anomaly.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md ${getAnomalySeverityColor(anomaly.severity)} bg-opacity-90`}
                      >
                        {getAnomalyIcon(anomaly.type)}
                        <span className="text-sm font-medium">
                          {anomaly.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="text-xs">
                          {formatTimestamp(anomaly.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveFeed; 