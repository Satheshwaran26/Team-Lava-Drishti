import { useState } from 'react';
import {
  UserIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  XCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  VideoCameraIcon,
  CloudArrowUpIcon,
  DocumentMagnifyingGlassIcon,
  IdentificationIcon,
  PlayIcon,
  PencilIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

interface MissingPerson {
  id: string;
  name: string;
  age: number;
  lastSeen: string;
  lastSeenZone: string;
  description: string;
  photo: string;
  status: 'active' | 'found' | 'expired' | 'investigating';
  detections: Detection[];
  uploadedAt: string;
  matches: number;
  priority: 'high' | 'medium' | 'low';
}

interface Detection {
  id: string;
  timestamp: string;
  location: string;
  zone: string;
  camera: string;
  confidence: number;
  type: 'entry' | 'exit' | 'zone_movement';
  screenshot: string;
}

interface SearchResult {
  id: string;
  personId: string;
  thumbnail: string;
  zone: string;
  camera: string;
  confidence: number;
  timestamp: string;
  location: string;
}

interface Zone {
  id: string;
  name: string;
  type: 'entrance' | 'public' | 'restricted' | 'exit';
}

const MissingPersons = ({ onNavigate }: { onNavigate?: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'results' | 'cases'>('upload');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    name: '',
    age: '',
    description: '',
    lastSeenZone: '',
    photo: null as File | null,
  });

  // Available zones
  const zones: Zone[] = [
    { id: 'zone-a', name: 'Main Entrance', type: 'entrance' },
    { id: 'zone-b', name: 'Reception Area', type: 'public' },
    { id: 'zone-c', name: 'Cafeteria', type: 'public' },
    { id: 'zone-d', name: 'Back Exit', type: 'exit' },
    { id: 'zone-e', name: 'Security Office', type: 'restricted' },
    { id: 'zone-f', name: 'Parking Garage', type: 'public' },
  ];

  // Sample missing persons data
  const missingPersons: MissingPerson[] = [
    {
      id: '1',
      name: 'John Smith',
      age: 34,
      lastSeen: '2024-07-09 14:30',
      lastSeenZone: 'Main Entrance',
      description: 'White male, brown hair, wearing blue jacket and jeans',
      photo: '/api/placeholder/150/150',
      status: 'active',
      uploadedAt: '2024-07-09 15:00',
      matches: 3,
      priority: 'high',
      detections: [
        {
          id: 'd1',
          timestamp: '2024-07-10 09:15',
          location: 'Main Entrance',
          zone: 'Zone A',
          camera: 'Camera 1',
          confidence: 89,
          type: 'entry',
          screenshot: '/api/placeholder/300/200'
        },
        {
          id: 'd2',
          timestamp: '2024-07-10 11:22',
          location: 'Reception Area',
          zone: 'Zone B',
          camera: 'Camera 3',
          confidence: 76,
          type: 'zone_movement',
          screenshot: '/api/placeholder/300/200'
        }
      ]
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      age: 28,
      lastSeen: '2024-07-08 16:45',
      lastSeenZone: 'Cafeteria',
      description: 'Female, blonde hair, red dress, black handbag',
      photo: '/api/placeholder/150/150',
      status: 'found',
      uploadedAt: '2024-07-08 17:00',
      matches: 1,
      priority: 'medium',
      detections: [
        {
          id: 'd3',
          timestamp: '2024-07-09 08:30',
          location: 'Back Exit',
          zone: 'Zone D',
          camera: 'Camera 4',
          confidence: 94,
          type: 'exit',
          screenshot: '/api/placeholder/300/200'
        }
      ]
    },
    {
      id: '3',
      name: 'Michael Chen',
      age: 45,
      lastSeen: '2024-07-07 12:15',
      lastSeenZone: 'Security Office',
      description: 'Asian male, black hair, glasses, grey suit',
      photo: '/api/placeholder/150/150',
      status: 'investigating',
      uploadedAt: '2024-07-07 13:00',
      matches: 0,
      priority: 'low',
      detections: []
    }
  ];

  // Sample search results
  const sampleSearchResults: SearchResult[] = [
    {
      id: 'sr1',
      personId: '1',
      thumbnail: '/api/placeholder/150/150',
      zone: 'Main Entrance',
      camera: 'Camera 1',
      confidence: 89,
      timestamp: '2024-07-10 09:15',
      location: 'Building A - Entrance'
    },
    {
      id: 'sr2',
      personId: '1',
      thumbnail: '/api/placeholder/150/150',
      zone: 'Reception Area',
      camera: 'Camera 3',
      confidence: 76,
      timestamp: '2024-07-10 11:22',
      location: 'Building A - Lobby'
    },
    {
      id: 'sr3',
      personId: '1',
      thumbnail: '/api/placeholder/150/150',
      zone: 'Parking Garage',
      camera: 'Camera 6',
      confidence: 82,
      timestamp: '2024-07-10 13:45',
      location: 'Parking Level B1'
    },
  ];

  const filteredPersons = missingPersons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || person.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'found': return 'bg-green-100 text-green-700 border-green-200';
      case 'investigating': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'expired': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleUploadPerson = () => {
    if (!uploadForm.name || !uploadForm.age || !uploadForm.description || !uploadForm.lastSeenZone) {
      return;
    }
    
    // Simulate upload
    console.log('Uploading person:', uploadForm);
    setUploadForm({ name: '', age: '', description: '', lastSeenZone: '', photo: null });
    alert('Missing person report submitted successfully!');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, photo: file });
    }
  };

  const handleSearch = () => {
    if (!uploadForm.photo) {
      alert('Please upload a photo first');
      return;
    }
    
    setIsSearching(true);
    setActiveTab('results');
    
    // Simulate AI search
    setTimeout(() => {
      setSearchResults(sampleSearchResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleViewLiveFeed = () => {
    if (onNavigate) {
      onNavigate('livefeed');
    }
  };

  const handleUpdateCase = (personId: string) => {
    console.log('Updating case:', personId);
  };

  const handleCloseCase = (personId: string) => {
    console.log('Closing case:', personId);
  };

  return (
    <div className="pl-80 pr-8 py-8">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-orange-600 to-red-500 rounded-full"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                  Missing Persons Detection
                </h1>
              </div>
              <p className="text-gray-500 pl-4">AI-powered person identification and tracking system</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-700">{missingPersons.filter(p => p.status === 'active').length} Active Cases</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-orange-600 bg-white rounded-xl border-2 border-gray-100 hover:border-orange-100 hover:bg-orange-50 transition-all duration-200 shadow-sm hover:shadow">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'upload'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <CloudArrowUpIcon className="w-5 h-5" />
                Upload Panel
              </div>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'results'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <DocumentMagnifyingGlassIcon className="w-5 h-5" />
                Search Results
              </div>
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === 'cases'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Bars3Icon className="w-5 h-5" />
                Ongoing Cases
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Upload Panel */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Form */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Missing Person Information</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={uploadForm.name}
                        onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter full name..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                      <input
                        type="number"
                        value={uploadForm.age}
                        onChange={(e) => setUploadForm({...uploadForm, age: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter age..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Seen Zone *</label>
                      <select
                        value={uploadForm.lastSeenZone}
                        onChange={(e) => setUploadForm({...uploadForm, lastSeenZone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select zone...</option>
                        {zones.map((zone) => (
                          <option key={zone.id} value={zone.name}>{zone.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Physical Description *</label>
                      <textarea
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Detailed physical description, clothing, distinguishing features..."
                      />
                    </div>
                  </div>

                  {/* Right Column - Photo Upload */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Photo Upload</h2>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                      {uploadForm.photo ? (
                        <div className="space-y-4">
                          <div className="w-32 h-32 mx-auto rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img 
                              src={URL.createObjectURL(uploadForm.photo)} 
                              alt="Preview" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-600 mb-2">✓ {uploadForm.photo.name}</p>
                            <button
                              onClick={() => setUploadForm({...uploadForm, photo: null})}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              Remove photo
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <label className="cursor-pointer">
                            <span className="text-lg font-medium text-orange-600 hover:text-orange-700">
                              Upload Photo
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                          <p className="text-sm text-gray-500 mt-2">
                            Clear frontal photo for better AI recognition<br />
                            Supported formats: JPG, PNG, WEBP
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={handleUploadPerson}
                        disabled={!uploadForm.name || !uploadForm.age || !uploadForm.description || !uploadForm.lastSeenZone}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <PlusIcon className="w-5 h-5" />
                        Submit Missing Person Report
                      </button>

                      {uploadForm.photo && (
                        <button
                          onClick={handleSearch}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-orange-600 bg-orange-50 border-2 border-orange-200 rounded-xl hover:bg-orange-100 transition-colors duration-200"
                        >
                          <MagnifyingGlassIcon className="w-5 h-5" />
                          Search Database Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Panel */}
            {activeTab === 'results' && (
              <div className="space-y-6">
                {isSearching ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Searching Database...</h3>
                    <p className="text-gray-500">AI is analyzing uploaded photo across all camera feeds</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
                      <span className="text-sm text-gray-500">{searchResults.length} matches found</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.map((result) => (
                        <div key={result.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                              <img src={result.thumbnail} alt="Match" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(result.confidence)}`}>
                                  {result.confidence}% match
                                </span>
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <MapPinIcon className="w-4 h-4" />
                                  <span>{result.zone}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <VideoCameraIcon className="w-4 h-4" />
                                  <span>{result.camera}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ClockIcon className="w-4 h-4" />
                                  <span>{result.timestamp}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700">{result.location}</p>
                            <button
                              onClick={() => handleViewLiveFeed()}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors duration-200"
                            >
                              <PlayIcon className="w-4 h-4" />
                              View Live Feed
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DocumentMagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Search Results</h3>
                    <p className="text-gray-500">Upload a photo in the Upload Panel to start searching</p>
                  </div>
                )}
              </div>
            )}

            {/* Ongoing Cases Table */}
            {activeTab === 'cases' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Ongoing Cases</h2>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Search cases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="investigating">Investigating</option>
                      <option value="found">Found</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Zone</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPersons.map((person) => (
                          <tr key={person.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                                  {person.photo ? (
                                    <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <UserIcon className="w-6 h-6 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                  <div className="text-sm text-gray-500">Age: {person.age}</div>
                                  <div className="text-sm text-gray-500">{person.lastSeen}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{person.lastSeenZone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(person.status)}`}>
                                {person.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <EyeIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">{person.matches}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(person.priority)}`}>
                                {person.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleUpdateCase(person.id)}
                                  className="flex items-center gap-1 px-3 py-1 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                  Update
                                </button>
                                <button
                                  onClick={() => handleCloseCase(person.id)}
                                  className="flex items-center gap-1 px-3 py-1 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                >
                                  <XCircleIcon className="w-4 h-4" />
                                  Close
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {filteredPersons.length === 0 && (
                  <div className="text-center py-12">
                    <IdentificationIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Cases Found</h3>
                    <p className="text-gray-500">No missing persons cases match your current filters</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPersons;
