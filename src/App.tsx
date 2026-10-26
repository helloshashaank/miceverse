/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CustomerLogin } from './components/customer/CustomerLogin';
import { CustomerApp } from './components/customer/CustomerApp';
import { FeatureBlueprintView } from './components/blueprint/FeatureBlueprintView';
import { NewEventModal } from './components/modals/NewEventModal';
import { INITIAL_MICE_EVENTS } from './data/mockMiceData';
import { MiceEvent, Attendee } from './types/mice';

export default function App() {
  const [events, setEvents] = useState<MiceEvent[]>(() => {
    try {
      const saved = localStorage.getItem('miceverse_events');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_MICE_EVENTS;
  });

  const [selectedEventId, setSelectedEventId] = useState<string>(
    events[0]?.id || 'mice-jaisalmer-2027'
  );

  const [currentTab, setCurrentTab] = useState<'admin' | 'attendee' | 'blueprint'>('admin');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isNewEventOpen, setIsNewEventOpen] = useState<boolean>(false);

  // Dedicated customer login state
  const [loggedInAttendee, setLoggedInAttendee] = useState<Attendee | null>(null);

  // Sync to local cache
  useEffect(() => {
    try {
      localStorage.setItem('miceverse_events', JSON.stringify(events));
    } catch {
      // Ignore quota error
    }
  }, [events]);

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleUpdateEvent = (updated: MiceEvent) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleAddEvent = (newEvent: MiceEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    setSelectedEventId(newEvent.id);
    setCurrentTab('admin');
  };

  const toggleOfflineMode = () => {
    setIsOfflineMode(prev => !prev);
  };

  const handleLoginSuccess = (attendee: Attendee) => {
    setLoggedInAttendee(attendee);
  };

  const handleLogout = () => {
    setLoggedInAttendee(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar following 3-Zone Contract */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenNewEvent={() => setIsNewEventOpen(true)}
        isOfflineMode={isOfflineMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'admin' && (
          <AdminDashboard
            events={events}
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEventId}
            onUpdateEvent={handleUpdateEvent}
          />
        )}

        {currentTab === 'attendee' && (
          loggedInAttendee ? (
            <CustomerApp
              event={selectedEvent}
              attendee={loggedInAttendee}
              onLogout={handleLogout}
              isOfflineMode={isOfflineMode}
              onToggleOffline={toggleOfflineMode}
            />
          ) : (
            <CustomerLogin
              event={selectedEvent}
              onLoginSuccess={handleLoginSuccess}
              onSwitchToAdmin={() => setCurrentTab('admin')}
            />
          )
        )}

        {currentTab === 'blueprint' && (
          <FeatureBlueprintView />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">MICEverse</span>
            <span aria-hidden="true">·</span>
            <span>Corporate Travel, Meetings, Incentives, Conferences & Exhibitions</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-400">Node.js · React · PostgreSQL Design Architecture</span>
            <span aria-hidden="true">·</span>
            <span>AES-256 HSM Encrypted</span>
          </div>
        </div>
      </footer>

      {/* New Event Proposal Modal */}
      <NewEventModal
        isOpen={isNewEventOpen}
        onClose={() => setIsNewEventOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
