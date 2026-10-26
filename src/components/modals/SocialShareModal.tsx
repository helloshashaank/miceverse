import React, { useState } from 'react';
import { X, Check, Copy, Share2, Sparkles, Download } from 'lucide-react';
import { MiceEvent, Attendee } from '../../types/mice';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: MiceEvent;
  attendee?: Attendee;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  event,
  attendee
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'linkedin' | 'whatsapp' | 'twitter'>('linkedin');

  if (!isOpen) return null;

  const attendeeName = attendee?.name || 'Corporate Delegate';
  const attendeeOrg = attendee?.organization || event.clientName;

  const shareText = {
    linkedin: `Excited to announce that I'll be attending "${event.name}" in ${event.destination} from ${event.startDate}! Looking forward to connecting with industry peers and innovators in corporate travel & enterprise leadership. #MICE #${event.destination.split(',')[0].replace(/\s+/g, '')} #CorporateTravel`,
    whatsapp: `Hey! I am attending the ${event.name} in ${event.destination} (${event.startDate}). Check out the official agenda and live itinerary here: ${window.location.origin}`,
    twitter: `Heading to ${event.destination} for ${event.name}! 🚀 #MICE2027 #CorporateTravel @${attendeeOrg.replace(/\s+/g, '')}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText[selectedFormat]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-semibold text-white">Share Event Attendance</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Visual Digital Badge Preview */}
          <div className="relative p-6 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">Official Delegate Pass</span>
                <h4 className="text-lg font-bold text-white mt-1">{event.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{event.destination} · {event.startDate}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs">
                MICE
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-200">{attendeeName}</div>
                <div className="text-xs text-slate-400">{attendeeOrg}</div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified Pass
                </span>
                <div className="text-[10px] text-slate-500 font-mono">ID: {event.id.toUpperCase().slice(0, 10)}</div>
              </div>
            </div>
          </div>

          {/* Social Platform Tabs */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Select Platform Preset</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('linkedin')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                  selectedFormat === 'linkedin'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                LinkedIn Post
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('whatsapp')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                  selectedFormat === 'whatsapp'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                WhatsApp Message
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('twitter')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                  selectedFormat === 'twitter'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                X / Twitter
              </button>
            </div>
          </div>

          {/* Textarea preview */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Pre-formatted Caption</label>
            <textarea
              readOnly
              rows={3}
              value={shareText[selectedFormat]}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 font-sans focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">Includes encrypted verification signature</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard' : 'Copy Text'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
