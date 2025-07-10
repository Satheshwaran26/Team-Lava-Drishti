import { useState } from 'react';
import {
  UserGroupIcon,
  ArrowPathIcon,
  FaceSmileIcon,
  UserCircleIcon,
  ClockIcon,
  MapPinIcon,
  ChartBarIcon,
  VideoCameraIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Person {
  id: string;
  name: string;
  status: 'authorized' | 'unauthorized' | 'watch_list';
  lastSeen: string;
  location: string;
  matchConfidence: number;
  image: string;
}

const FaceData = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'authorized' | 'unauthorized' | 'watch_list'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const people: Person[] = [
    {
      id: '1',
      name: 'John Smith',
      status: 'authorized',
      lastSeen: '2 minutes ago',
      location: 'Main Entrance',
      matchConfidence: 98.5,
      image: 'https://ui-avatars.com/api/?name=John+Smith&background=3730a3&color=fff',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      status: 'authorized',
      lastSeen: '5 minutes ago',
      location: 'Zone B',
      matchConfidence: 97.8,
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3730a3&color=fff',
    },
    {
      id: '3',
      name: 'Unknown Person',
      status: 'unauthorized',
      lastSeen: '1 minute ago',
      location: 'Back Exit',
      matchConfidence: 45.2,
      image: 'https://ui-avatars.com/api/?name=Unknown&background=dc2626&color=fff',
    },
    {
      id: '4',
      name: 'Michael Brown',
      status: 'watch_list',
      lastSeen: '10 minutes ago',
      location: 'Parking Lot',
      matchConfidence: 89.4,
      image: 'https://ui-avatars.com/api/?name=Michael+Brown&background=eab308&color=fff',
    },
  ];

  // Analytics Data
  const recognitionStats = [
    {
      title: 'Total Detections',
      value: '1,234',
      trend: 8,
      icon: UserGroupIcon,
      color: 'indigo',
    },
    {
      title: 'Avg. Confidence',
      value: '94.5%',
      trend: 3,
      icon: ChartBarIcon,
      color: 'emerald',
    },
    {
      title: 'Active Cameras',
      value: '8/10',
      trend: -1,
      icon: VideoCameraIcon,
      color: 'blue',
    },
    {
      title: 'Processing Time',
      value: '45ms',
      trend: -5,
      icon: ClockIcon,
      color: 'violet',
    },
  ];

  const demographicData = [
    { name: 'Adult', value: 65, color: '#4F46E5' },
    { name: 'Senior', value: 15, color: '#06B6D4' },
    { name: 'Youth', value: 20, color: '#10B981' },
  ];

  const timeDistribution = [
    { time: '08:00', count: 45 },
    { time: '10:00', count: 85 },
    { time: '12:00', count: 120 },
    { time: '14:00', count: 95 },
    { time: '16:00', count: 75 },
    { time: '18:00', count: 60 },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'authorized':
        return 'bg-indigo-50 text-indigo-700 ring-indigo-600/20';
      case 'unauthorized':
        return 'bg-rose-50 text-rose-700 ring-rose-600/20';
      case 'watch_list':
        return 'bg-amber-50 text-amber-700 ring-amber-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
  };

  const filteredPeople = people.filter(person => {
    const matchesFilter = selectedFilter === 'all' || person.status === selectedFilter;
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pl-80 pr-8 py-8">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-indigo-600 to-violet-500 rounded-full"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                  Face Recognition
                </h1>
              </div>
              <p className="text-gray-500 pl-4">Advanced facial recognition and tracking system</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-2">
                  <FaceSmileIcon className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-indigo-700">Recognition Status</span>
                </div>
                <span className="text-indigo-700/50">|</span>
                <span className="text-indigo-700 font-medium">Active</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-indigo-600 bg-white rounded-xl border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recognitionStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium ${
                    stat.trend > 0 
                      ? 'text-emerald-700 bg-emerald-50' 
                      : 'text-rose-700 bg-rose-50'
                  }`}>
                    {stat.trend > 0 ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                    {Math.abs(stat.trend)}%
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Distribution */}
          <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">Detection Timeline</h2>
                <p className="text-sm text-gray-500">Face detections over time</p>
              </div>
              <select className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-600">
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      padding: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demographics */}
          <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">Demographics</h2>
                <p className="text-sm text-gray-500">Age group distribution</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200">
                <ArrowPathIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      padding: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {demographicData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recognition List */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter Results:</span>
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
                onClick={() => setSelectedFilter('authorized')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === 'authorized'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                Authorized
              </button>
              <button
                onClick={() => setSelectedFilter('unauthorized')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === 'unauthorized'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                }`}
              >
                Unauthorized
              </button>
              <button
                onClick={() => setSelectedFilter('watch_list')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === 'watch_list'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                }`}
              >
                Watch List
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm text-gray-900 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPeople.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-gray-900">{person.name}</h3>
                    <div className={`px-2.5 py-1 text-xs font-medium rounded-lg ring-1 ring-inset ${getStatusStyles(person.status)}`}>
                      {person.status.replace('_', ' ').charAt(0).toUpperCase() + person.status.slice(1).replace('_', ' ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4" />
                      <span>{person.lastSeen}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{person.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <ChartBarIcon className="w-4 h-4" />
                      <span>{person.matchConfidence.toFixed(1)}% match</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceData; 