import { useState } from 'react';
import {
  ExclamationTriangleIcon,
  HeartIcon,
  FireIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  XMarkIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface Incident {
  id: string;
  refNumber: string;
  type: 'Medical' | 'Security' | 'Fire' | 'Lost Child' | 'Crowd Control' | 'Suspicious Activity' | 'Equipment Malfunction';
  zone: string;
  timeReported: string;
  status: 'Reported' | 'In Progress' | 'Resolved';
  assignedUnit: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  gpsCoordinates: { lat: number; lng: number };
  photos: string[];
  videos: string[];
  history: { timestamp: string; action: string; user: string }[];
  reportedBy: string;
}

const Incidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: '1',
      refNumber: 'INC-2024-001',
      type: 'Medical',
      zone: 'Zone A',
      timeReported: '2024-01-15T14:30:25Z',
      status: 'In Progress',
      assignedUnit: 'Medical Team Alpha',
      severity: 'High',
      description: 'Person collapsed near main entrance, appears to be medical emergency. Conscious but in distress.',
      gpsCoordinates: { lat: 40.7128, lng: -74.0060 },
      photos: ['/api/photos/inc1_1.jpg', '/api/photos/inc1_2.jpg'],
      videos: [],
      history: [
        { timestamp: '2024-01-15T14:30:25Z', action: 'Incident reported', user: 'Security Officer Johnson' },
        { timestamp: '2024-01-15T14:32:10Z', action: 'Medical Team Alpha dispatched', user: 'Dispatch Control' },
        { timestamp: '2024-01-15T14:35:15Z', action: 'Medical team on scene', user: 'Medic Sarah Chen' }
      ],
      reportedBy: 'Security Officer Johnson'
    },
    {
      id: '2',
      refNumber: 'INC-2024-002',
      type: 'Security',
      zone: 'West Zone',
      timeReported: '2024-01-15T14:25:10Z',
      status: 'Resolved',
      assignedUnit: 'Security Team Bravo',
      severity: 'Medium',
      description: 'Unattended bag reported in west concourse area. Initial scan shows no immediate threat.',
      gpsCoordinates: { lat: 40.7130, lng: -74.0062 },
      photos: ['/api/photos/inc2_1.jpg'],
      videos: ['/api/videos/inc2_1.mp4'],
      history: [
        { timestamp: '2024-01-15T14:25:10Z', action: 'Incident reported', user: 'Visitor Alert System' },
        { timestamp: '2024-01-15T14:26:30Z', action: 'Security Team Bravo dispatched', user: 'Dispatch Control' },
        { timestamp: '2024-01-15T14:28:45Z', action: 'Area secured, bag owner identified', user: 'Officer Martinez' },
        { timestamp: '2024-01-15T14:30:00Z', action: 'Incident resolved - false alarm', user: 'Officer Martinez' }
      ],
      reportedBy: 'Visitor Alert System'
    },
    {
      id: '3',
      refNumber: 'INC-2024-003',
      type: 'Fire',
      zone: 'Zone B',
      timeReported: '2024-01-15T14:20:30Z',
      status: 'Reported',
      assignedUnit: 'Fire Response Team',
      severity: 'High',
      description: 'Smoke detected in electrical room B-3. Fire suppression system activated automatically.',
      gpsCoordinates: { lat: 40.7125, lng: -74.0058 },
      photos: [],
      videos: [],
      history: [
        { timestamp: '2024-01-15T14:20:30Z', action: 'Smoke alarm triggered', user: 'Fire Detection System' },
        { timestamp: '2024-01-15T14:21:00Z', action: 'Fire Response Team dispatched', user: 'Emergency Control' }
      ],
      reportedBy: 'Fire Detection System'
    },
    {
      id: '4',
      refNumber: 'INC-2024-004',
      type: 'Lost Child',
      zone: 'Zone C',
      timeReported: '2024-01-15T14:15:45Z',
      status: 'In Progress',
      assignedUnit: 'Security Team Alpha',
      severity: 'Medium',
      description: 'Child (approx. 6 years old, wearing red jacket) separated from parents in main hall area.',
      gpsCoordinates: { lat: 40.7132, lng: -74.0055 },
      photos: [],
      videos: [],
      history: [
        { timestamp: '2024-01-15T14:15:45Z', action: 'Lost child reported', user: 'Visitor Services' },
        { timestamp: '2024-01-15T14:17:20Z', action: 'Security Team Alpha assigned', user: 'Dispatch Control' },
        { timestamp: '2024-01-15T14:18:30Z', action: 'PA announcement made', user: 'Officer Williams' }
      ],
      reportedBy: 'Visitor Services'
    },
    {
      id: '5',
      refNumber: 'INC-2024-005',
      type: 'Crowd Control',
      zone: 'East Zone',
      timeReported: '2024-01-15T14:10:20Z',
      status: 'In Progress',
      assignedUnit: 'Crowd Control Team',
      severity: 'Medium',
      description: 'Large crowd gathering causing congestion at east entrance. Backup needed for crowd management.',
      gpsCoordinates: { lat: 40.7135, lng: -74.0050 },
      photos: ['/api/photos/inc5_1.jpg'],
      videos: [],
      history: [
        { timestamp: '2024-01-15T14:10:20Z', action: 'Crowd buildup detected', user: 'AI Monitoring System' },
        { timestamp: '2024-01-15T14:11:40Z', action: 'Crowd Control Team dispatched', user: 'Operations Center' },
        { timestamp: '2024-01-15T14:13:15Z', action: 'Additional barriers deployed', user: 'Crowd Control Team' }
      ],
      reportedBy: 'AI Monitoring System'
    }
  ]);

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const availableUnits = [
    'Medical Team Alpha',
    'Medical Team Bravo',
    'Security Team Alpha',
    'Security Team Bravo',
    'Fire Response Team',
    'Crowd Control Team',
    'Technical Support'
  ];

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'Medical': return <HeartIcon className="w-4 h-4" />;
      case 'Security': return <ShieldExclamationIcon className="w-4 h-4" />;
      case 'Fire': return <FireIcon className="w-4 h-4" />;
      case 'Lost Child': return <UserGroupIcon className="w-4 h-4" />;
      case 'Crowd Control': return <UserGroupIcon className="w-4 h-4" />;
      case 'Suspicious Activity': return <ExclamationTriangleIcon className="w-4 h-4" />;
      default: return <ExclamationTriangleIcon className="w-4 h-4" />;
    }
  };

  const getIncidentTypeColor = (type: string) => {
    switch (type) {
      case 'Medical': return 'bg-red-100 text-red-700 border-red-200';
      case 'Security': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Fire': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Lost Child': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Crowd Control': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Suspicious Activity': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reported': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || incident.type === filterType;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });

  const updateIncidentStatus = (incidentId: string, newStatus: 'Reported' | 'In Progress' | 'Resolved') => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { 
            ...incident, 
            status: newStatus,
            history: [...incident.history, {
              timestamp: new Date().toISOString(),
              action: `Status changed to ${newStatus}`,
              user: 'Admin User'
            }]
          }
        : incident
    ));
    
    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => prev ? { 
        ...prev, 
        status: newStatus,
        history: [...prev.history, {
          timestamp: new Date().toISOString(),
          action: `Status changed to ${newStatus}`,
          user: 'Admin User'
        }]
      } : null);
    }
  };

  const updateIncidentUnit = (incidentId: string, newUnit: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { 
            ...incident, 
            assignedUnit: newUnit,
            history: [...incident.history, {
              timestamp: new Date().toISOString(),
              action: `Assigned to ${newUnit}`,
              user: 'Admin User'
            }]
          }
        : incident
    ));
    
    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => prev ? { 
        ...prev, 
        assignedUnit: newUnit,
        history: [...prev.history, {
          timestamp: new Date().toISOString(),
          action: `Assigned to ${newUnit}`,
          user: 'Admin User'
        }]
      } : null);
    }
  };

  const sendDispatchInstructions = () => {
    if (!selectedIncident) return;
    
    // Simulate sending dispatch instructions
    alert(`Dispatch instructions sent to ${selectedIncident.assignedUnit} for incident ${selectedIncident.refNumber}`);
    
    const updatedHistory = [...selectedIncident.history, {
      timestamp: new Date().toISOString(),
      action: 'Dispatch instructions sent',
      user: 'Admin User'
    }];
    
    setSelectedIncident(prev => prev ? { ...prev, history: updatedHistory } : null);
    setIncidents(prev => prev.map(incident => 
      incident.id === selectedIncident.id 
        ? { ...incident, history: updatedHistory }
        : incident
    ));
  };

  return (
    <div className="pl-80 pr-8 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-red-500/10 rounded-full blur-xl"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-2 bg-gradient-to-b from-red-600 to-orange-500 rounded-full"></div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Incident Management
                </h1>
              </div>
              <p className="text-gray-600 pl-5 text-lg">Monitor and manage all security, medical, and safety incidents</p>
              <div className="flex items-center gap-4 pl-5">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    {incidents.filter(i => i.status === 'Resolved').length} Resolved
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
                  <ArrowPathIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">
                    {incidents.filter(i => i.status === 'In Progress').length} In Progress
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full">
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-700">
                    {incidents.filter(i => i.status === 'Reported').length} Reported
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search incidents by ID, description, or zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <FunnelIcon className="w-5 h-5 text-gray-500" />
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value="Medical">Medical</option>
                <option value="Security">Security</option>
                <option value="Fire">Fire</option>
                <option value="Lost Child">Lost Child</option>
                <option value="Crowd Control">Crowd Control</option>
                <option value="Suspicious Activity">Suspicious Activity</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Reported">Reported</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              >
                <option value="all">All Severity</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Incidents Table */}
          <div className="xl:col-span-2">
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">All Incidents</h2>
                <p className="text-sm text-gray-500 mt-1">{filteredIncidents.length} incidents found</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Ref #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredIncidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{incident.refNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getIncidentTypeColor(incident.type)}`}>
                            {getIncidentIcon(incident.type)}
                            {incident.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{incident.zone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(incident.timeReported)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(incident.status)}`}>
                            {incident.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{incident.assignedUnit}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                            {incident.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedIncident(incident)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 border border-red-200"
                          >
                            <EyeIcon className="w-3 h-3" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredIncidents.length === 0 && (
                  <div className="text-center py-12">
                    <ExclamationTriangleIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No incidents found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Incident Detail Panel */}
          <div className="xl:col-span-1">
            {selectedIncident ? (
              <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Incident Details</h2>
                    <button
                      onClick={() => setSelectedIncident(null)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Reference Number</h3>
                      <p className="text-lg font-semibold text-gray-900">{selectedIncident.refNumber}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Incident Type</h3>
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${getIncidentTypeColor(selectedIncident.type)}`}>
                        {getIncidentIcon(selectedIncident.type)}
                        {selectedIncident.type}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Time Reported</h3>
                      <div className="flex items-center gap-2 text-gray-900">
                        <ClockIcon className="w-4 h-4 text-gray-500" />
                        <span>{new Date(selectedIncident.timeReported).toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Zone & GPS Coordinates</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-900">
                          <MapPinIcon className="w-4 h-4 text-gray-500" />
                          <span>{selectedIncident.zone}</span>
                        </div>
                        <div className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                          {selectedIncident.gpsCoordinates.lat}°, {selectedIncident.gpsCoordinates.lng}°
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedIncident.description}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Reported By</h3>
                      <p className="text-gray-900">{selectedIncident.reportedBy}</p>
                    </div>
                  </div>

                  {/* Media */}
                  {(selectedIncident.photos.length > 0 || selectedIncident.videos.length > 0) && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Photos & Videos</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedIncident.photos.map((_, index) => (
                          <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                            <PhotoIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        ))}
                        {selectedIncident.videos.map((_, index) => (
                          <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                            <VideoCameraIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status Controls */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                      <div className="relative">
                        <select
                          value={selectedIncident.status}
                          onChange={(e) => updateIncidentStatus(selectedIncident.id, e.target.value as any)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                        >
                          <option value="Reported">Reported</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Assigned Unit</h3>
                      <div className="relative">
                        <select
                          value={selectedIncident.assignedUnit}
                          onChange={(e) => updateIncidentUnit(selectedIncident.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                        >
                          {availableUnits.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <button
                      onClick={sendDispatchInstructions}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                      Send Dispatch Instructions
                    </button>

                    {selectedIncident.status !== 'Resolved' && (
                      <button
                        onClick={() => updateIncidentStatus(selectedIncident.id, 'Resolved')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        Mark as Resolved
                      </button>
                    )}
                  </div>

                  {/* History Log */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">History Log</h3>
                    <div className="space-y-3">
                      {selectedIncident.history.map((entry, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium">{entry.action}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{formatTimestamp(entry.timestamp)}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-xs text-gray-600">{entry.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <ExclamationTriangleIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Incident</h3>
                <p className="text-gray-500">Click on any incident from the table to view detailed information and manage the case.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incidents;
