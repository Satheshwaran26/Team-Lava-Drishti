import { useState, useRef, useEffect } from 'react';
import {
  PaperAirplaneIcon,
  ChatBubbleLeftEllipsisIcon,
  SparklesIcon,
  BookmarkIcon,
  ClockIcon,
  TrashIcon,
  UserIcon,
  CpuChipIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  saved?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastMessageAt: Date;
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI surveillance assistant. I can help you analyze incidents, check zone occupancy, forecast bottlenecks, and answer questions about your security data. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [, setActiveConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const GEMINI_API_KEY = 'AIzaSyD-DL6LN1SvF6_R_uqXZKxrB1SXA82Z9RU';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  // Sample surveillance context data
  const surveillanceContext = {
    zones: {
      'Zone A': { occupancy: 1250, capacity: 1500, status: 'normal', incidents: 0 },
      'Zone B': { occupancy: 890, capacity: 1200, status: 'normal', incidents: 1 },
      'Zone C': { occupancy: 1450, capacity: 1400, status: 'critical', incidents: 2 },
      'Zone D': { occupancy: 670, capacity: 1000, status: 'normal', incidents: 0 },
      'West Zone': { occupancy: 980, capacity: 1100, status: 'warning', incidents: 3 },
      'East Zone': { occupancy: 1100, capacity: 1300, status: 'normal', incidents: 0 }
    },
    totalPeople: 47000,
    activeIncidents: 3,
    bottleneckAlerts: 5,
    cameras: { online: 27, offline: 3, total: 30 },
    responseUnits: 12,
    missingPersons: 7
  };

  // Sample recent incidents
  const recentIncidents = [
    { zone: 'West Zone', type: 'crowd congestion', time: '10 minutes ago', severity: 'Medium' },
    { zone: 'Zone C', type: 'security alert', time: '15 minutes ago', severity: 'High' },
    { zone: 'West Zone', type: 'suspicious activity', time: '22 minutes ago', severity: 'Low' }
  ];

  // Suggested prompts
  const suggestedPrompts = [
    "Summarize incidents in West Zone",
    "How many people are in Zone A?",
    "Show bottlenecks forecast for next 30 minutes",
    "What is the current overall occupancy?",
    "List all critical zones",
    "How many cameras are offline?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildSystemPrompt = () => {
    return `You are an AI assistant for a surveillance and security system. You have access to real-time data from the surveillance dashboard.

Current Surveillance Data:
- Total People in Venue: ${surveillanceContext.totalPeople}
- Active Incidents: ${surveillanceContext.activeIncidents}
- Bottleneck Alerts: ${surveillanceContext.bottleneckAlerts}
- Response Units Deployed: ${surveillanceContext.responseUnits}
- Missing Persons Being Tracked: ${surveillanceContext.missingPersons}
- Cameras Online: ${surveillanceContext.cameras.online}/${surveillanceContext.cameras.total}

Zone Status:
${Object.entries(surveillanceContext.zones).map(([zone, data]) => 
  `${zone}: ${data.occupancy}/${data.capacity} people (${data.status}), ${data.incidents} incidents`
).join('\n')}

Recent Incidents:
${recentIncidents.map(incident => 
  `${incident.zone}: ${incident.type} (${incident.severity}) - ${incident.time}`
).join('\n')}

Please provide helpful, accurate responses about the surveillance data. Be concise but informative. When asked about forecasts or predictions, provide reasonable estimates based on current trends.`;
  };

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      const systemPrompt = buildSystemPrompt();
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser Question: ${userMessage}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t generate a response.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Sorry, I\'m having trouble connecting to the AI service. Please try again later.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Get AI response
    const aiResponse = await callGeminiAPI(userMessage.content);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, saved: !msg.saved } : msg
    ));
  };

  const saveConversation = () => {
    if (messages.length <= 1) return;

    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: messages[1]?.content.substring(0, 50) + '...' || 'New Conversation',
      messages: [...messages],
      createdAt: new Date(),
      lastMessageAt: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    alert('Conversation saved successfully!');
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI surveillance assistant. I can help you analyze incidents, check zone occupancy, forecast bottlenecks, and answer questions about your security data. What would you like to know?',
      timestamp: new Date(),
    }]);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputText(prompt);
    textareaRef.current?.focus();
  };

  return (
    <div className="pl-80 pr-8 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-2 bg-gradient-to-b from-purple-600 to-indigo-500 rounded-full"></div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                  AI Chat Assistant
                </h1>
              </div>
              <p className="text-gray-600 pl-5 text-lg">Conversational AI for surveillance insights and real-time analysis</p>
              <div className="flex items-center gap-4 pl-5">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700">Connected to Gemini AI</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
                  <span className="text-xs font-medium text-blue-700">Real-time Data</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 shadow-sm">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
                <span className="font-semibold text-purple-700">Gemini 2.0 Flash</span>
              </div>
              <button 
                onClick={saveConversation}
                className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-purple-600 bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <BookmarkIcon className="w-5 h-5" />
                <span>Save Chat</span>
              </button>
              <button 
                onClick={clearChat}
                className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-red-600 bg-white rounded-2xl border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <TrashIcon className="w-5 h-5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Main Chat Area */}
          <div className="xl:col-span-4 bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[700px]">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                  <p className="text-sm text-gray-500">Ask questions about surveillance data</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-gray-50/30 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-4xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl shadow-sm ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' 
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                      }`}>
                        {message.type === 'user' ? (
                          <UserIcon className="w-5 h-5" />
                        ) : (
                          <CpuChipIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`p-6 rounded-2xl shadow-sm ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.type === 'ai' && (
                            <button
                              onClick={() => saveMessage(message.id)}
                              className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                                message.saved
                                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                  : 'text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 border border-gray-200 hover:border-yellow-200'
                              }`}
                            >
                              <BookmarkIcon className="w-3 h-3" />
                              {message.saved ? 'Saved' : 'Save'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-4xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl shadow-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600">
                        <CpuChipIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="flex space-x-1">
                              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">AI is analyzing your question...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-gray-100 bg-white">
              <div className="flex gap-4">
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about surveillance data, incidents, zone status, forecasts, or any other questions..."
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm leading-relaxed shadow-sm transition-all duration-200"
                    rows={3}
                    disabled={isLoading}
                  />
                  
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-500">Press Enter to send, Shift+Enter for new line</p>
                    <p className="text-xs text-gray-400">{inputText.length}/1000 characters</p>
                  </div>
                  
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="px-12 py-   bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl font-medium min-h-[110px] min-w-[120px]"
                >
                  <PaperAirplaneIcon className="w-6 h-6" />
                  <span className="text-sm">{isLoading ? 'Sending...' : 'Send'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Prompts */}
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Questions</h3>
              </div>
              <div className="space-y-3">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="w-full text-left p-4 text-sm bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-indigo-50 rounded-xl transition-all duration-200 border border-gray-200 hover:border-purple-300 hover:shadow-md group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-purple-600 transition-colors duration-200"></div>
                      <span className="group-hover:text-purple-700 transition-colors duration-200">{prompt}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-xs text-purple-700 font-medium">💡 Tip: Click any question to auto-fill the input</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <InformationCircleIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Live Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-sm font-medium text-blue-800">Total People:</span>
                  <span className="font-bold text-blue-900">{surveillanceContext.totalPeople.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-sm font-medium text-red-800">Active Incidents:</span>
                  <span className="font-bold text-red-900">{surveillanceContext.activeIncidents}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-sm font-medium text-green-800">Cameras Online:</span>
                  <span className="font-bold text-green-900">{surveillanceContext.cameras.online}/{surveillanceContext.cameras.total}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="text-sm font-medium text-orange-800">Missing Persons:</span>
                  <span className="font-bold text-orange-900">{surveillanceContext.missingPersons}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-600">📊 Data updates in real-time</p>
              </div>
            </div>

            {/* Saved Conversations */}
            {conversations.length > 0 && (
              <div className="bg-white backdrop-blur-xl bg-opacity-90 rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookmarkIcon className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Saved Chats</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {conversations.slice(0, 5).map((conv) => (
                    <div
                      key={conv.id}
                      className="p-3 text-sm bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-green-50 hover:border-green-200 transition-colors duration-200"
                      onClick={() => setActiveConversationId(conv.id)}
                    >
                      <p className="font-medium text-gray-900 truncate">{conv.title}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {conv.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
