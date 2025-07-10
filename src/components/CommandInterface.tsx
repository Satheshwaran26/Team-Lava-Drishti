import { useState } from 'react';
import {
  CommandLineIcon,
  ArrowPathIcon,
  PlayIcon,
  StopIcon,
  ArrowDownTrayIcon,
  CameraIcon,
  VideoCameraIcon,
  MapIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface Command {
  id: string;
  command: string;
  output: string;
  status: 'success' | 'error' | 'running';
  timestamp: string;
}

const CommandInterface = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Command[]>([
    {
      id: '1',
      command: 'status --all-cameras',
      output: 'All cameras operational. Feed quality: 1080p. Network latency: 15ms',
      status: 'success',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      command: 'analyze --zone="A" --type="crowd"',
      output: 'Zone A Analysis:\n- Current occupancy: 45 people\n- Density: Medium\n- Flow rate: Normal\n- No anomalies detected',
      status: 'success',
      timestamp: '5 minutes ago',
    },
    {
      id: '3',
      command: 'track --id="person_123" --time-range="last_15m"',
      output: 'Tracking error: Subject lost at intersection point B-C. Insufficient data.',
      status: 'error',
      timestamp: '10 minutes ago',
    },
  ]);

  const quickCommands = [
    { name: 'System Status', command: 'status --all', icon: ArrowPathIcon },
    { name: 'Start Recording', command: 'record --all-cameras', icon: VideoCameraIcon },
    { name: 'Take Snapshot', command: 'snapshot --all-cameras', icon: CameraIcon },
    { name: 'Export Logs', command: 'export --logs --format=json', icon: ArrowDownTrayIcon },
    { name: 'Zone Analysis', command: 'analyze --all-zones', icon: MapIcon },
    { name: 'Track Movement', command: 'track --mode=crowd', icon: UserGroupIcon },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const newCommand: Command = {
      id: Date.now().toString(),
      command: command.trim(),
      output: 'Processing command...',
      status: 'running',
      timestamp: 'Just now',
    };

    setHistory(prev => [newCommand, ...prev]);
    setCommand('');

    // Simulate command processing
    setTimeout(() => {
      setHistory(prev => prev.map(cmd => {
        if (cmd.id === newCommand.id) {
          return {
            ...cmd,
            output: 'Command executed successfully. Results will be displayed in the analytics dashboard.',
            status: 'success',
          };
        }
        return cmd;
      }));
    }, 2000);
  };

  return (
    <div className="pl-80 pr-8 py-8">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-gray-900 to-gray-600 rounded-full"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Command Interface
                </h1>
              </div>
              <p className="text-gray-500 pl-4">Advanced system control and automation interface</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2">
                  <CommandLineIcon className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-700">Terminal Status</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-700 font-medium">Ready</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-gray-900 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="font-medium">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickCommands.map((cmd, index) => {
            const Icon = cmd.icon;
            return (
              <button
                key={index}
                onClick={() => setCommand(cmd.command)}
                className="bg-white backdrop-blur-xl bg-opacity-90 rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-medium text-gray-900">{cmd.name}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">{cmd.command}</p>
                  </div>
                  <PlayIcon className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Command Input */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CommandLineIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Type your command here..."
                className="block w-full pl-10 pr-4 py-2.5 text-gray-900 font-mono rounded-xl border border-gray-200 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-gray-50"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            >
              Execute
            </button>
          </form>
        </div>

        {/* Command History */}
        <div className="space-y-4">
          {history.map((cmd) => (
            <div
              key={cmd.id}
              className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <CommandLineIcon className="h-5 w-5 text-gray-400" />
                    <code className="text-sm font-mono text-gray-900">{cmd.command}</code>
                    <span className="text-xs text-gray-500">{cmd.timestamp}</span>
                  </div>
                  <div className={`mt-2 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
                    cmd.status === 'error'
                      ? 'bg-rose-50 text-rose-700'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {cmd.output}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cmd.status === 'running' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-600"></div>
                  ) : (
                    <div className={`h-5 w-5 rounded-full ${
                      cmd.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandInterface; 