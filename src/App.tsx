/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CorporateListingView } from './components/admin/CorporateListingView';
import { CustomerLogin } from './components/customer/CustomerLogin';
import { CustomerApp } from './components/customer/CustomerApp';
import { FeatureBlueprintView } from './components/blueprint/FeatureBlueprintView';
import { NewEventModal } from './components/modals/NewEventModal';
import { INITIAL_MICE_EVENTS } from './data/mockMiceData';
import { 
  INITIAL_CORPORATES, 
  INITIAL_CORPORATE_PERSONS, 
  INITIAL_AGREEMENTS, 
  INITIAL_PAYMENTS, 
  INITIAL_REMINDERS 
} from './data/mockCorporateData';
import { 
  MiceEvent, 
  Attendee, 
  CorporateClient, 
  CorporatePerson, 
  TripAgreement, 
  PaymentRecord, 
  PaymentReminderLog 
} from './types/mice';

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

  const [corporates, setCorporates] = useState<CorporateClient[]>(() => {
    try {
      const saved = localStorage.getItem('miceverse_corporates');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_CORPORATES;
  });

  const [persons, setPersons] = useState<CorporatePerson[]>(() => {
    try {
      const saved = localStorage.getItem('miceverse_persons');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_CORPORATE_PERSONS;
  });

  const [agreements, setAgreements] = useState<TripAgreement[]>(() => {
    try {
      const saved = localStorage.getItem('miceverse_agreements');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_AGREEMENTS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('miceverse_payments');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_PAYMENTS;
  });

  const [reminders, setReminders] = useState<PaymentReminderLog[]>(() => {
    try {
      const saved = localStorage.getItem('miceverse_reminders');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_REMINDERS;
  });

  const [selectedEventId, setSelectedEventId] = useState<string>(
    events[0]?.id || 'mice-jaisalmer-2027'
  );

  const [currentTab, setCurrentTab] = useState<'admin' | 'corporates' | 'attendee' | 'blueprint'>('admin');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isNewEventOpen, setIsNewEventOpen] = useState<boolean>(false);

  // Dedicated customer login state
  const [loggedInAttendee, setLoggedInAttendee] = useState<Attendee | null>(null);

  // Sync to local cache
  useEffect(() => {
    try {
      localStorage.setItem('miceverse_events', JSON.stringify(events));
      localStorage.setItem('miceverse_corporates', JSON.stringify(corporates));
      localStorage.setItem('miceverse_persons', JSON.stringify(persons));
      localStorage.setItem('miceverse_agreements', JSON.stringify(agreements));
      localStorage.setItem('miceverse_payments', JSON.stringify(payments));
      localStorage.setItem('miceverse_reminders', JSON.stringify(reminders));
    } catch {
      // Ignore quota error
    }
  }, [events, corporates, persons, agreements, payments, reminders]);

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleUpdateEvent = (updated: MiceEvent) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleAddEvent = (newEvent: MiceEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    setSelectedEventId(newEvent.id);
    setCurrentTab('admin');
  };

  const handleAddCorporate = (newCorp: CorporateClient) => {
    setCorporates(prev => [newCorp, ...prev]);
  };

  const handleAddPerson = (newPerson: CorporatePerson) => {
    setPersons(prev => [newPerson, ...prev]);
  };

  const handleUpdateAgreement = (updated: TripAgreement) => {
    setAgreements(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleAddAgreement = (newAgr: TripAgreement) => {
    setAgreements(prev => [newAgr, ...prev]);
  };

  const handleAddPayment = (newPayment: PaymentRecord) => {
    setPayments(prev => [newPayment, ...prev]);
  };

  const handleSendReminder = (newReminder: PaymentReminderLog) => {
    setReminders(prev => [newReminder, ...prev]);
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
            agreements={agreements}
            onUpdateAgreement={handleUpdateAgreement}
            onAddAgreement={handleAddAgreement}
            payments={payments}
            reminders={reminders}
            onAddPayment={handleAddPayment}
            onSendReminder={handleSendReminder}
          />
        )}

        {currentTab === 'corporates' && (
          <CorporateListingView
            corporates={corporates}
            persons={persons}
            events={events}
            onAddCorporate={handleAddCorporate}
            onAddPerson={handleAddPerson}
            onSelectEvent={(eventId) => {
              setSelectedEventId(eventId);
              setCurrentTab('admin');
            }}
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
            <span>Corporate Travel, Meetings, Incentives, Conferences & Exhibitions Agency</span>
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
