import React from 'react';
import { Compass, Sparkles, Plus, WifiOff, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: 'admin' | 'corporates' | 'attendee' | 'blueprint';
  onSelectTab: (tab: 'admin' | 'corporates' | 'attendee' | 'blueprint') => void;
  onOpenNewEvent: () => void;
  isOfflineMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewEvent,
  isOfflineMode
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onSelectTab('admin')} 
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              </span>
              MICEverse
            </span>
          </button>
          {isOfflineMode && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20">
              <WifiOff className="w-3 h-3" />
              Offline Cache
            </span>
          )}
        </div>

        {/* Zone 2: Navigation Links (Single-line, unboxed, clean hover states) */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('admin')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'admin'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MICE Projects
          </button>

          <button
            onClick={() => onSelectTab('corporates')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'corporates'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Corporate Accounts
          </button>

          <button
            onClick={() => onSelectTab('attendee')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'attendee'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Attendee Pass Portal
          </button>

          <button
            onClick={() => onSelectTab('blueprint')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'blueprint'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System Specs
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenNewEvent}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            New Proposal
          </button>
        </div>

      </div>
    </header>
  );
};
