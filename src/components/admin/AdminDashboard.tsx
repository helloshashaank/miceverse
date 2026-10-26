import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Bell, 
  MapPin, 
  ChevronDown, 
  Building2, 
  Plane, 
  CheckCircle2, 
  Sparkles,
  Map,
  FileCheck2,
  CreditCard 
} from 'lucide-react';
import { MiceEvent, TripAgreement, PaymentRecord, PaymentReminderLog } from '../../types/mice';
import { ProposalView } from './ProposalView';
import { PredictiveBudgetView } from './PredictiveBudgetView';
import { ItineraryBuilderView } from './ItineraryBuilderView';
import { RsvpManifestView } from './RsvpManifestView';
import { DocumentVaultView } from './DocumentVaultView';
import { PushBroadcastView } from './PushBroadcastView';
import { VenueMapView } from './VenueMapView';
import { AgreementMouView } from './AgreementMouView';
import { PaymentsBillingView } from './PaymentsBillingView';

interface AdminDashboardProps {
  events: MiceEvent[];
  selectedEvent: MiceEvent;
  onSelectEvent: (eventId: string) => void;
  onUpdateEvent: (updated: MiceEvent) => void;
  agreements: TripAgreement[];
  onUpdateAgreement: (updated: TripAgreement) => void;
  onAddAgreement: (newAgr: TripAgreement) => void;
  payments: PaymentRecord[];
  reminders: PaymentReminderLog[];
  onAddPayment: (newPayment: PaymentRecord) => void;
  onSendReminder: (newReminder: PaymentReminderLog) => void;
}

export type AdminTab = 
  | 'proposals' 
  | 'agreement'
  | 'payments'
  | 'budget' 
  | 'itinerary' 
  | 'rsvp' 
  | 'documents' 
  | 'broadcast' 
  | 'venue';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onUpdateEvent,
  agreements,
  onUpdateAgreement,
  onAddAgreement,
  payments,
  reminders,
  onAddPayment,
  onSendReminder
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('proposals');

  // Key stats
  const confirmedRsvps = selectedEvent.attendees.filter(a => a.rsvpStatus === 'confirmed').length;
  const verifiedDocs = selectedEvent.attendees.filter(a => a.docStatus === 'verified').length;
  const checkInCount = selectedEvent.attendees.filter(a => a.checkedIn).length;
  const activeEventPayments = payments.filter(p => p.eventId === selectedEvent.id);
  const totalPaid = activeEventPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-8">
      {/* Event Selector & Hero Header */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Hero Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={selectedEvent.heroImage}
            alt={selectedEvent.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          {/* Top Bar inside Hero: Event Switcher Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-0.5 rounded">
                MICE OPERATIONS CONSOLE
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300 font-medium">Active Trip Portfolio ({events.length} Projects)</span>
            </div>

            {/* Quick Event Switcher */}
            <div className="relative">
              <select
                value={selectedEvent.id}
                onChange={(e) => onSelectEvent(e.target.value)}
                className="appearance-none bg-slate-950/90 border border-slate-700 hover:border-cyan-500/80 text-white text-xs font-semibold rounded-xl px-4 py-2.5 pr-9 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-lg"
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name.split(':')[0]} ({ev.paxCount} Pax - {ev.destination.split(',')[0]})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Event Title & Brief */}
          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedEvent.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedEvent.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Building2 className="w-4 h-4 text-cyan-400" />
                {selectedEvent.clientName}
              </span>
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {selectedEvent.destination}
              </span>
              <span className="text-slate-500">·</span>
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-4 h-4 text-cyan-400" />
                {selectedEvent.startDate} ({selectedEvent.durationNights} Nights)
              </span>
            </div>
          </div>

          {/* 4 Primary Operational Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-800/80">
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400">Headcount Capacity</span>
              <div className="text-xl font-bold font-mono text-white mt-0.5 tabular-nums">
                {selectedEvent.paxCount} <span className="text-xs font-normal text-slate-500">Pax</span>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">
                {confirmedRsvps} Confirmed RSVPs
              </span>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400">Total Sanctioned Budget</span>
              <div className="text-xl font-bold font-mono text-white mt-0.5 tabular-nums">
                {selectedEvent.currency} {(selectedEvent.budgetTotal).toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">
                Paid: {selectedEvent.currency} {totalPaid.toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400">KYC Vault Compliance</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5 tabular-nums">
                {Math.round((verifiedDocs / (selectedEvent.attendees.length || 1)) * 100)}%
              </div>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                {verifiedDocs} / {selectedEvent.attendees.length} Verified IDs
              </span>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400">Flight & Hotel Blocks</span>
              <div className="text-xl font-bold font-mono text-indigo-300 mt-0.5 tabular-nums">
                {selectedEvent.travelOptions.length} Transit · {selectedEvent.hotelOptions.length} Hotels
              </div>
              <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">
                {checkInCount} Checked-in Onsite
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-1 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('proposals')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'proposals'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Proposals & Templates
        </button>

        <button
          onClick={() => setActiveTab('agreement')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'agreement'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          Agreements & MoU
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'payments'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          Payments & Partial Terms
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'budget'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Predictive Budget AI
        </button>

        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'itinerary'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Master Itinerary
        </button>

        <button
          onClick={() => setActiveTab('rsvp')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'rsvp'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          RSVP & Manifests
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          ID & Document Vault
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'broadcast'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          Push Broadcasts
        </button>

        <button
          onClick={() => setActiveTab('venue')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'venue'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          Interactive Venue Map
        </button>
      </div>

      {/* Tab View Content */}
      <div>
        {activeTab === 'proposals' && (
          <ProposalView event={selectedEvent} onUpdateEvent={onUpdateEvent} />
        )}
        {activeTab === 'agreement' && (
          <AgreementMouView
            agreements={agreements}
            events={events}
            selectedEvent={selectedEvent}
            onUpdateAgreement={onUpdateAgreement}
            onAddAgreement={onAddAgreement}
          />
        )}
        {activeTab === 'payments' && (
          <PaymentsBillingView
            event={selectedEvent}
            payments={payments}
            reminders={reminders}
            onAddPayment={onAddPayment}
            onSendReminder={onSendReminder}
          />
        )}
        {activeTab === 'budget' && (
          <PredictiveBudgetView event={selectedEvent} onUpdateEvent={onUpdateEvent} />
        )}
        {activeTab === 'itinerary' && (
          <ItineraryBuilderView event={selectedEvent} onUpdateEvent={onUpdateEvent} />
        )}
        {activeTab === 'rsvp' && (
          <RsvpManifestView event={selectedEvent} onUpdateEvent={onUpdateEvent} />
        )}
        {activeTab === 'documents' && (
          <DocumentVaultView event={selectedEvent} onUpdateEvent={onUpdateEvent} />
        )}
        {activeTab === 'broadcast' && (
          <PushBroadcastView event={selectedEvent} onUpdateEvent={onUpdateEvent} />
        )}
        {activeTab === 'venue' && (
          <VenueMapView event={selectedEvent} />
        )}
      </div>
    </div>
  );
};
