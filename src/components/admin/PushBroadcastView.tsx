import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Smartphone, 
  MessageSquare, 
  Radio, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { MiceEvent, PushNotification } from '../../types/mice';

interface PushBroadcastViewProps {
  event: MiceEvent;
  onUpdateEvent: (updated: MiceEvent) => void;
}

export const PushBroadcastView: React.FC<PushBroadcastViewProps> = ({ event, onUpdateEvent }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<PushNotification['targetAudience']>('all');
  const [selectedChannels, setSelectedChannels] = useState<('push' | 'sms' | 'whatsapp')[]>(['push', 'whatsapp']);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const toggleChannel = (channel: 'push' | 'sms' | 'whatsapp') => {
    if (selectedChannels.includes(channel)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter(c => c !== channel));
      }
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    setIsSending(true);

    setTimeout(() => {
      const newNotification: PushNotification = {
        id: `notif-${Date.now()}`,
        title,
        message,
        targetAudience: audience,
        channels: selectedChannels,
        sentAt: 'Just Now',
        deliveredCount: event.paxCount - 4,
        openRate: '98%'
      };

      onUpdateEvent({
        ...event,
        notifications: [newNotification, ...event.notifications]
      });

      setIsSending(false);
      setSendSuccess(true);
      setTitle('');
      setMessage('');

      setTimeout(() => setSendSuccess(false), 3000);
    }, 600);
  };

  const quickTemplates = [
    {
      title: 'Bus Shuttle Convoy Departure',
      message: 'Luxury coaches departing from Main Hotel Lobby in 15 minutes. Please board Bus 1 or 2 with your RFID badge.'
    },
    {
      title: 'Plenary Session Resuming (Hall A)',
      message: 'Tea break concluding. Keynote addresses on Enterprise 2030 will resume promptly at 14:30. Seating is open.'
    },
    {
      title: 'Evening Gala Dress Code Reminder',
      message: 'Tonight is our Royal Celebration Banquet. Recommended dress code is Formal Ethnic / Black Tie. Warm layers advised.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="text-cyan-400 font-mono">Multi-Channel Push Pipeline</span>
          <span aria-hidden="true">·</span>
          <span>Web Push · SMS Gateway · WhatsApp Business API</span>
        </div>
        <h2 className="text-xl font-bold text-white">Logistics & Attendee Broadcast Center</h2>
        <p className="text-sm text-slate-300">
          Transmit instantaneous flight updates, coach departures, dress codes, and emergency schedule shifts directly to all {event.paxCount} delegates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Form */}
        <div className="lg:col-span-2 p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Compose Instant Broadcast</h3>
            </div>
            {sendSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Dispatched successfully!
              </span>
            )}
          </div>

          {/* Quick template buttons */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Load Quick Logistics Template</label>
            <div className="flex flex-wrap gap-2">
              {quickTemplates.map((tmpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTitle(tmpl.title);
                    setMessage(tmpl.message);
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                >
                  {tmpl.title}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Headline / Push Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Flight Departure Update or Bus Departure in 15 Min"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Message Content</label>
              <textarea
                required
                rows={3}
                placeholder="Write the clear, concise instructions for attendees..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Segment</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as PushNotification['targetAudience'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Attendees ({event.paxCount} Pax)</option>
                  <option value="confirmed_only">Confirmed RSVPs Only</option>
                  <option value="vip">VIP Speakers & Leadership</option>
                  <option value="pending_docs">Delegates with Missing KYC</option>
                  <option value="bus_group">Coach Transfer Passengers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Delivery Channels</label>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleChannel('push')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      selectedChannels.includes('push')
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    Web Push
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleChannel('whatsapp')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      selectedChannels.includes('whatsapp')
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleChannel('sms')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      selectedChannels.includes('sms')
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    SMS
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSending ? 'Broadcasting...' : 'Broadcast Notification Now'}
              </button>
            </div>
          </form>
        </div>

        {/* Live Smartphone Screen Preview */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Attendee Device Lock Screen Preview</h3>
          </div>

          <div className="w-full max-w-[280px] mx-auto p-3 bg-slate-950 border border-slate-800 rounded-3xl shadow-xl space-y-3">
            <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto" />
            
            <div className="text-center py-2">
              <div className="text-2xl font-light text-slate-200 font-mono">14:28</div>
              <div className="text-[10px] text-slate-500">Wednesday, {event.startDate}</div>
            </div>

            {/* Notification Banner */}
            <div className="p-3 bg-slate-900/90 border border-cyan-500/40 rounded-xl shadow-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                  <Bell className="w-2.5 h-2.5" />
                  MICEverse
                </span>
                <span className="text-[9px] text-slate-500">now</span>
              </div>
              <div className="text-xs font-semibold text-white truncate">
                {title || 'Sample Broadcast Alert'}
              </div>
              <div className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                {message || 'Real-time alert will render here on attendee lock screens and WhatsApp notifications.'}
              </div>
            </div>

            <div className="pt-8 pb-1 text-center text-[10px] text-slate-600 font-mono">
              Swipe up to open pass
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast History Log */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Sent Broadcast History</h3>
        <div className="space-y-3">
          {event.notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                  <span className="text-[11px] text-slate-500 font-mono">· {notif.sentAt}</span>
                </div>
                <p className="text-xs text-slate-300">{notif.message}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Audience: <strong className="text-slate-200 capitalize">{notif.targetAudience.replace('_', ' ')}</strong></span>
                  <span>Channels: <strong className="text-slate-200">{notif.channels.join(', ')}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono self-start sm:self-auto shrink-0 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">Delivered</span>
                  <span className="text-emerald-400 font-semibold">{notif.deliveredCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Open Rate</span>
                  <span className="text-cyan-400 font-semibold">{notif.openRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
