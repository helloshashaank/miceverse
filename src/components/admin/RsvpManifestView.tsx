import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  UserPlus, 
  Download, 
  Utensils, 
  ShieldCheck, 
  Bed, 
  Plane 
} from 'lucide-react';
import { MiceEvent, Attendee, RsvpStatus } from '../../types/mice';

interface RsvpManifestViewProps {
  event: MiceEvent;
  onUpdateEvent: (updated: MiceEvent) => void;
}

export const RsvpManifestView: React.FC<RsvpManifestViewProps> = ({ event, onUpdateEvent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | RsvpStatus>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');

  // Stats calculation
  const confirmedCount = event.attendees.filter(a => a.rsvpStatus === 'confirmed').length;
  const pendingCount = event.attendees.filter(a => a.rsvpStatus === 'pending').length;
  const waitlistCount = event.attendees.filter(a => a.rsvpStatus === 'waitlist').length;
  const checkedInCount = event.attendees.filter(a => a.checkedIn).length;

  const toggleCheckIn = (attendeeId: string) => {
    const updatedAttendees = event.attendees.map(a => 
      a.id === attendeeId ? { ...a, checkedIn: !a.checkedIn } : a
    );
    onUpdateEvent({ ...event, attendees: updatedAttendees });
  };

  const updateRsvpStatus = (attendeeId: string, newStatus: RsvpStatus) => {
    const updatedAttendees = event.attendees.map(a => 
      a.id === attendeeId ? { ...a, rsvpStatus: newStatus } : a
    );
    onUpdateEvent({ ...event, attendees: updatedAttendees });
  };

  const filteredAttendees = event.attendees.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || a.rsvpStatus === statusFilter;
    const matchesDietary = dietaryFilter === 'all' || a.dietaryPreference === dietaryFilter;

    return matchesSearch && matchesStatus && matchesDietary;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Organization', 'Designation', 'City', 'RSVP Status', 'Room Allocation', 'Flight Status', 'Dietary', 'Doc Status', 'Checked In'];
    const rows = filteredAttendees.map(a => [
      a.id,
      `"${a.name}"`,
      `"${a.organization}"`,
      `"${a.designation}"`,
      `"${a.city}"`,
      a.rsvpStatus,
      `"${a.roomAllocation}"`,
      `"${a.flightStatus}"`,
      a.dietaryPreference,
      a.docStatus,
      a.checkedIn ? 'Yes' : 'No'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${event.id}_Manifest_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & RSVP Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Confirmed RSVPs</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
            {confirmedCount} <span className="text-xs text-slate-500 font-sans font-normal">/ {event.paxCount} Cap</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">
            {Math.round((confirmedCount / event.paxCount) * 100)}% Capacity Reached
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Awaiting Response</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1 tabular-nums">
            {pendingCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Automated chaser pinged</div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Onsite Checked In</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1 tabular-nums">
            {checkedInCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Smart RFID & App Scans</div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Waitlist Queue</span>
            <AlertTriangle className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
            {waitlistCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Auto-promotes on decline</div>
        </div>
      </div>

      {/* Control and Search Strip */}
      <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by delegate name, company, city, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Controls (Segmented functional buttons) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                statusFilter === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                statusFilter === 'confirmed' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                statusFilter === 'pending' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('waitlist')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                statusFilter === 'waitlist' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Waitlist
            </button>
          </div>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Manifest Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/40">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
            <tr>
              <th className="py-3 px-4">Delegate & Entity</th>
              <th className="py-3 px-4">RSVP Status</th>
              <th className="py-3 px-4">Transit & Flight</th>
              <th className="py-3 px-4">Room Allocation</th>
              <th className="py-3 px-4">Dietary</th>
              <th className="py-3 px-4">KYC Vault</th>
              <th className="py-3 px-4 text-center">Onsite Check-In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredAttendees.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No delegates match the active filter criteria.
                </td>
              </tr>
            ) : (
              filteredAttendees.map((att) => (
                <tr key={att.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{att.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{att.designation} · {att.organization}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{att.city} · {att.email}</div>
                  </td>

                  <td className="py-3 px-4">
                    <select
                      value={att.rsvpStatus}
                      onChange={(e) => updateRsvpStatus(att.id, e.target.value as RsvpStatus)}
                      className={`text-xs py-1 px-2 rounded font-medium border bg-slate-950 focus:outline-none cursor-pointer ${
                        att.rsvpStatus === 'confirmed'
                          ? 'border-emerald-500/40 text-emerald-300'
                          : att.rsvpStatus === 'pending'
                          ? 'border-amber-500/40 text-amber-300'
                          : 'border-indigo-500/40 text-indigo-300'
                      }`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="waitlist">Waitlist</option>
                      <option value="declined">Declined</option>
                    </select>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <Plane className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{att.flightStatus}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <Bed className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate max-w-[160px]">{att.roomAllocation}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">
                      <Utensils className="w-3 h-3 text-slate-400" />
                      {att.dietaryPreference}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-mono ${
                      att.docStatus === 'verified' ? 'text-emerald-400' :
                      att.docStatus === 'pending_review' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {att.docStatus.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleCheckIn(att.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        att.checkedIn
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {att.checkedIn ? 'Checked In ✓' : 'Mark Arrival'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
