import { useState } from 'react';
import {
  ChartBarIcon,
  MapIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  EyeIcon,
  ArrowRightIcon,
  FireIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

interface ZoneData {
  id: string;
  name: string;
  currentDensity: number;
  capacity: number;
  forecastDensity: number;
  percentCapacity: number;
  timeToBottleneck: string;
  velocityTrend: 'increasing' | 'decreasing' | 'stable';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  interventions: string[];
}

// interface TimePoint {
//   time: string;
//   zoneA: number;
//   zoneB: number;
//   zoneC: number;
//   zoneD: number;
//   westZone: number;
//   eastZone: number;
// }

const BottleneckAnalytics = () => {
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [timeRange, setTimeRange] = useState('1h'); // '30m', '1h', '2h', '4h'
  const [forecastRange, setForecastRange] = useState('15m'); // '15m', '30m', '1h'

  // Sample historical data for the last hour (for future chart implementation)
  // const historicalData: TimePoint[] = [
  //   { time: '14:00', zoneA: 75, zoneB: 60, zoneC: 85, zoneD: 45, westZone: 70, eastZone: 65 },
  //   { time: '14:05', zoneA: 78, zoneB: 65, zoneC: 88, zoneD: 48, westZone: 73, eastZone: 68 },
  //   { time: '14:10', zoneA: 82, zoneB: 68, zoneC: 92, zoneD: 50, westZone: 76, eastZone: 72 },
  //   { time: '14:15', zoneA: 85, zoneB: 72, zoneC: 95, zoneD: 53, westZone: 80, eastZone: 75 },
  //   { time: '14:20', zoneA: 88, zoneB: 75, zoneC: 98, zoneD: 55, westZone: 83, eastZone: 78 },
  //   { time: '14:25', zoneA: 90, zoneB: 78, zoneC: 100, zoneD: 58, westZone: 85, eastZone: 80 },
  //   { time: '14:30', zoneA: 83, zoneB: 74, zoneC: 96, zoneD: 52, westZone: 82, eastZone: 77 },
  //   { time: '14:35', zoneA: 87, zoneB: 76, zoneC: 98, zoneD: 55, westZone: 84, eastZone: 79 },
  //   { time: '14:40', zoneA: 91, zoneB: 80, zoneC: 102, zoneD: 60, westZone: 88, eastZone: 82 },
  //   { time: '14:45', zoneA: 94, zoneB: 83, zoneC: 105, zoneD: 62, westZone: 91, eastZone: 85 },
  //   { time: '14:50', zoneA: 96, zoneB: 85, zoneC: 108, zoneD: 65, westZone: 93, eastZone: 88 },
  //   { time: '14:55', zoneA: 98, zoneB: 88, zoneC: 110, zoneD: 68, westZone: 95, eastZone: 90 },
  // ];

  // Zone data with bottleneck analysis
  const zonesData: ZoneData[] = [
    {
      id: 'zone-a',
      name: 'Zone A',
      currentDensity: 1250,
      capacity: 1500,
      forecastDensity: 1420,
      percentCapacity: 83,
      timeToBottleneck: '25 minutes',
      velocityTrend: 'increasing',
      riskLevel: 'high',
      interventions: [
        'Open additional entry gates',
        'Deploy staff to guide crowd flow',
        'Activate overflow area A-2'
      ]
    },
    {
      id: 'zone-b',
      name: 'Zone B',
      currentDensity: 890,
      capacity: 1200,
      forecastDensity: 980,
      percentCapacity: 74,
      timeToBottleneck: '45 minutes',
      velocityTrend: 'stable',
      riskLevel: 'medium',
      interventions: [
        'Monitor crowd density closely',
        'Prepare backup exit routes'
      ]
    },
    {
      id: 'zone-c',
      name: 'Zone C',
      currentDensity: 1450,
      capacity: 1400,
      forecastDensity: 1520,
      percentCapacity: 104,
      timeToBottleneck: 'CRITICAL - Now',
      velocityTrend: 'increasing',
      riskLevel: 'critical',
      interventions: [
        'IMMEDIATE: Redirect new entries',
        'Open emergency exits',
        'Deploy all available staff',
        'Activate crowd control barriers'
      ]
    },
    {
      id: 'zone-d',
      name: 'Zone D',
      currentDensity: 670,
      capacity: 1000,
      forecastDensity: 720,
      percentCapacity: 67,
      timeToBottleneck: '2+ hours',
      velocityTrend: 'stable',
      riskLevel: 'low',
      interventions: [
        'Continue normal operations'
      ]
    },
    {
      id: 'west-zone',
      name: 'West Zone',
      currentDensity: 980,
      capacity: 1100,
      forecastDensity: 1050,
      percentCapacity: 89,
      timeToBottleneck: '20 minutes',
      velocityTrend: 'increasing',
      riskLevel: 'high',
      interventions: [
        'Redirect traffic to East Zone',
        'Open west auxiliary exits',
        'Deploy crowd control team'
      ]
    },
    {
      id: 'east-zone',
      name: 'East Zone',
      currentDensity: 1100,
      capacity: 1300,
      forecastDensity: 1180,
      percentCapacity: 85,
      timeToBottleneck: '35 minutes',
      velocityTrend: 'increasing',
      riskLevel: 'medium',
      interventions: [
        'Monitor capacity closely',
        'Prepare to receive redirected traffic from West Zone'
      ]
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical': return <FireIcon className="w-4 h-4" />;
      case 'high': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'medium': return <ClockIcon className="w-4 h-4" />;
      case 'low': return <ShieldCheckIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const getVelocityIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowTrendingUpIcon className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 rotate-180" />;
      case 'stable': return <ArrowRightIcon className="w-4 h-4 text-blue-500" />;
      default: return <ArrowRightIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const sortedZones = zonesData.sort((a, b) => {
    const riskOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return riskOrder[b.riskLevel as keyof typeof riskOrder] - riskOrder[a.riskLevel as keyof typeof riskOrder];
  });

  return (
    <div className="pl-80 pr-8 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-indigo-500/10 to-blue-500/10 rounded-full blur-xl"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-2 bg-gradient-to-b from-blue-600 to-indigo-500 rounded-full"></div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  Bottleneck Analytics
                </h1>
              </div>
              <p className="text-gray-600 pl-5 text-lg">Advanced crowd flow intelligence and bottleneck prediction</p>
              <div className="flex items-center gap-4 pl-5">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700">Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
                  <span className="text-xs font-medium text-blue-700">AI Predictions Active</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 rounded-full">
                  <span className="text-xs font-medium text-orange-700">
                    {zonesData.filter(z => z.riskLevel === 'critical' || z.riskLevel === 'high').length} High Risk Zones
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="30m">Last 30 minutes</option>
                <option value="1h">Last 1 hour</option>
                <option value="2h">Last 2 hours</option>
                <option value="4h">Last 4 hours</option>
              </select>
              <select
                value={forecastRange}
                onChange={(e) => setForecastRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="15m">15-min forecast</option>
                <option value="30m">30-min forecast</option>
                <option value="1h">1-hour forecast</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Charts and Visualizations */}
          <div className="xl:col-span-2 space-y-6">
            {/* Crowd Density Chart */}
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-blue-600" />
                    Crowd Density Over Time
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Per zone capacity percentage</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Historical</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full ml-4"></div>
                  <span>Forecast</span>
                </div>
              </div>
              
              {/* Chart placeholder - in a real app, you'd use a library like Chart.js or Recharts */}
              <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Sample trend lines */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      points="0,150 50,140 100,130 150,120 200,110 250,115 300,105 350,100 400,95"
                    />
                    <polyline
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      points="250,115 300,105 350,100 400,95"
                    />
                  </svg>
                </div>
                <div className="text-center z-10">
                  <ChartBarIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-blue-600 font-medium">Interactive Chart Visualization</p>
                  <p className="text-blue-500 text-sm">Real-time crowd density trends</p>
                </div>
              </div>
            </div>

            {/* Predictive Heatmap */}
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-indigo-600" />
                    Predictive Heatmap
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{forecastRange} density forecast overlay</p>
                </div>
              </div>
              
              {/* Heatmap placeholder */}
              <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-4">
                  {zonesData.map((zone) => (
                    <div
                      key={zone.id}
                      className={`rounded-lg border-2 flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        zone.riskLevel === 'critical' ? 'bg-red-200 border-red-400' :
                        zone.riskLevel === 'high' ? 'bg-orange-200 border-orange-400' :
                        zone.riskLevel === 'medium' ? 'bg-yellow-200 border-yellow-400' :
                        'bg-green-200 border-green-400'
                      }`}
                      onClick={() => setSelectedZone(zone)}
                    >
                      <span className="text-xs font-semibold text-gray-700">{zone.name}</span>
                      <span className="text-lg font-bold text-gray-900">{zone.percentCapacity}%</span>
                      <div className="flex items-center gap-1 mt-1">
                        {getRiskIcon(zone.riskLevel)}
                        <span className="text-xs text-gray-600">{zone.riskLevel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottleneck Table and Details */}
          <div className="xl:col-span-1 space-y-6">
            {/* Zones at Risk Table */}
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
                  Zones at Risk
                </h2>
                <p className="text-sm text-gray-500 mt-1">{sortedZones.length} zones monitored</p>
              </div>
              
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {sortedZones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                      selectedZone?.id === zone.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{zone.name}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(zone.riskLevel)}`}>
                        {getRiskIcon(zone.riskLevel)}
                        {zone.riskLevel}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Capacity:</span>
                        <span className={`font-medium ${zone.percentCapacity > 100 ? 'text-red-600' : zone.percentCapacity > 90 ? 'text-orange-600' : 'text-gray-900'}`}>
                          {zone.percentCapacity}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Time to bottleneck:</span>
                        <span className="font-medium text-gray-900">{zone.timeToBottleneck}</span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-600">Trend:</span>
                        <div className="flex items-center gap-1">
                          {getVelocityIcon(zone.velocityTrend)}
                          <span className="text-xs text-gray-600">{zone.velocityTrend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottleneck Details Panel */}
            {selectedZone ? (
              <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Zone Details</h2>
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Zone Overview */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedZone.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <UsersIcon className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">Current Density</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-900">{selectedZone.currentDensity.toLocaleString()}</div>
                        <div className="text-xs text-blue-600">of {selectedZone.capacity.toLocaleString()} capacity</div>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowTrendingUpIcon className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700">Forecast Density</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-900">{selectedZone.forecastDensity.toLocaleString()}</div>
                        <div className="text-xs text-purple-600">in {forecastRange}</div>
                      </div>
                    </div>
                  </div>

                  {/* Velocity Trends */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Crowd Velocity Trends</h4>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      {getVelocityIcon(selectedZone.velocityTrend)}
                      <div>
                        <span className="text-sm font-medium text-gray-900 capitalize">{selectedZone.velocityTrend}</span>
                        <p className="text-xs text-gray-600 mt-1">
                          {selectedZone.velocityTrend === 'increasing' && 'Crowd density is rising rapidly'}
                          {selectedZone.velocityTrend === 'decreasing' && 'Crowd density is decreasing'}
                          {selectedZone.velocityTrend === 'stable' && 'Crowd density is stable'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Interventions */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                      <LightBulbIcon className="w-4 h-4" />
                      Suggested Interventions
                    </h4>
                    <div className="space-y-2">
                      {selectedZone.interventions.map((intervention, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-xl border text-sm ${
                            intervention.includes('IMMEDIATE') 
                              ? 'bg-red-50 border-red-200 text-red-800' 
                              : selectedZone.riskLevel === 'high'
                              ? 'bg-orange-50 border-orange-200 text-orange-800'
                              : 'bg-blue-50 border-blue-200 text-blue-800'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              intervention.includes('IMMEDIATE') 
                                ? 'bg-red-500' 
                                : selectedZone.riskLevel === 'high'
                                ? 'bg-orange-500'
                                : 'bg-blue-500'
                            }`}></div>
                            <span>{intervention}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
                    <EyeIcon className="w-4 h-4" />
                    View Live Feed for {selectedZone.name}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <UserGroupIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Zone</h3>
                <p className="text-gray-500">Click on any zone from the table or heatmap to view detailed bottleneck analysis and intervention suggestions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottleneckAnalytics;
