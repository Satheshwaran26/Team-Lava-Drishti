import {
  ChartBarIcon,
  ArrowPathIcon,
  ChartPieIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Predictions = () => {
  // Sample data for charts
  const occupancyTrend = [
    { time: '08:00', actual: 120, predicted: 110 },
    { time: '09:00', actual: 180, predicted: 170 },
    { time: '10:00', actual: 250, predicted: 240 },
    { time: '11:00', actual: 280, predicted: 290 },
    { time: '12:00', actual: 350, predicted: 340 },
    { time: '13:00', actual: 310, predicted: 300 },
    { time: '14:00', actual: 290, predicted: 280 },
  ];

  const crowdDistribution = [
    { name: 'Zone A', value: 35, color: '#4F46E5' },
    { name: 'Zone B', value: 25, color: '#06B6D4' },
    { name: 'Zone C', value: 20, color: '#10B981' },
    { name: 'Zone D', value: 20, color: '#6366F1' },
  ];

  const insights = [
    {
      title: 'Peak Hours',
      value: '12:00 - 14:00',
      trend: 5,
      icon: ClockIcon,
      color: 'indigo',
    },
    {
      title: 'Busiest Zone',
      value: 'Zone A',
      trend: 8,
      icon: MapPinIcon,
      color: 'cyan',
    },
    {
      title: 'Avg. Duration',
      value: '45 mins',
      trend: -3,
      icon: ChartPieIcon,
      color: 'emerald',
    },
    {
      title: 'Capacity Usage',
      value: '75%',
      trend: 12,
      icon: UserGroupIcon,
      color: 'violet',
    },
  ];

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
                  AI Predictions
                </h1>
              </div>
              <p className="text-gray-500 pl-4">Advanced analytics and crowd behavior predictions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-indigo-700">AI Model Status</span>
                </div>
                <span className="text-indigo-700/50">|</span>
                <span className="text-indigo-700 font-medium">98% Accuracy</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-indigo-600 bg-white rounded-xl border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="font-medium">Update Model</span>
              </button>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-${insight.color}-100 text-${insight.color}-600`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium ${
                    insight.trend > 0 
                      ? 'text-emerald-700 bg-emerald-50' 
                      : 'text-rose-700 bg-rose-50'
                  }`}>
                    {insight.trend > 0 ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                    {Math.abs(insight.trend)}%
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-600">{insight.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{insight.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Occupancy Trend */}
          <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">Occupancy Prediction</h2>
                <p className="text-sm text-gray-500">Actual vs Predicted</p>
              </div>
              <select className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-600">
                <option>Last 7 Hours</option>
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#actualGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#predictedGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                  <span className="text-sm text-gray-600">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-600"></div>
                  <span className="text-sm text-gray-600">Predicted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Crowd Distribution */}
          <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">Crowd Distribution</h2>
                <p className="text-sm text-gray-500">Current zone allocation</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200">
                <ArrowPathIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={crowdDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {crowdDistribution.map((entry, index) => (
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
                {crowdDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions; 