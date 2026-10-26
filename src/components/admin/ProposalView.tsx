import React, { useState } from 'react';
import { 
  Building2, 
  Plane, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Star, 
  Luggage, 
  Users, 
  Calendar, 
  Check, 
  ExternalLink, 
  FileText, 
  Palette, 
  Plus, 
  Trash2, 
  Printer, 
  ShieldCheck, 
  PenTool 
} from 'lucide-react';
import { MiceEvent, ProposalTemplate } from '../../types/mice';
import { ProposalPdfModal } from '../modals/ProposalPdfModal';

interface ProposalViewProps {
  event: MiceEvent;
  onUpdateEvent: (updated: MiceEvent) => void;
}

export const ProposalView: React.FC<ProposalViewProps> = ({ event, onUpdateEvent }) => {
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);
  const [signerName, setSignerName] = useState(event.clientSignOff?.clientSignerName || '');
  const [signerTitle, setSignerTitle] = useState(event.clientSignOff?.clientSignerDesignation || '');

  const toggleHotel = (hotelId: string) => {
    const updatedHotels = event.hotelOptions.map(h => 
      h.id === hotelId ? { ...h, selected: !h.selected } : h
    );
    onUpdateEvent({ ...event, hotelOptions: updatedHotels });
  };

  const toggleTravel = (travelId: string) => {
    const updatedTravel = event.travelOptions.map(t => 
      t.id === travelId ? { ...t, selected: !t.selected } : t
    );
    onUpdateEvent({ ...event, travelOptions: updatedTravel });
  };

  const setTemplate = (template: ProposalTemplate) => {
    onUpdateEvent({ ...event, proposalTemplate: template });
  };

  const handleAddInclusion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInclusion.trim()) return;
    onUpdateEvent({
      ...event,
      inclusions: [...event.inclusions, newInclusion.trim()]
    });
    setNewInclusion('');
  };

  const handleDeleteInclusion = (index: number) => {
    const updated = [...event.inclusions];
    updated.splice(index, 1);
    onUpdateEvent({ ...event, inclusions: updated });
  };

  const handleAddExclusion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExclusion.trim()) return;
    onUpdateEvent({
      ...event,
      exclusions: [...event.exclusions, newExclusion.trim()]
    });
    setNewExclusion('');
  };

  const handleDeleteExclusion = (index: number) => {
    const updated = [...event.exclusions];
    updated.splice(index, 1);
    onUpdateEvent({ ...event, exclusions: updated });
  };

  const handleClientSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName) return;

    onUpdateEvent({
      ...event,
      status: 'contracted',
      clientSignOff: {
        clientSignerName: signerName,
        clientSignerDesignation: signerTitle || 'Authorized Signatory',
        signedAt: new Date().toLocaleString(),
        isSigned: true,
        digitalSealRef: `SEAL-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      }
    });
    setShowSignModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Action & Proposal Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Proposal Ref: MICE-2027-{event.id.toUpperCase().slice(5, 12)}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize text-cyan-400 font-mono">
              Status: {event.status.replace('_', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span>Version: {event.proposalVersion || 'v3.2'}</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Master Proposal & Dynamic Package Builder</h2>
          <p className="text-sm text-slate-300 mt-0.5">
            Select proposal templates, configure live deliverables, edit inclusions/exclusions, and export official print-ready PDF dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setShowPdfModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Generate Printable PDF Dossier
          </button>

          <button
            onClick={() => setShowSignModal(true)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              event.clientSignOff?.isSigned
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 text-cyan-400" />
            {event.clientSignOff?.isSigned ? 'Signed & Executed ✓' : 'Client E-Sign'}
          </button>
        </div>
      </div>

      {/* Proposal Design Templates Switcher */}
      <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Proposal Design Formats & Theming Presets</h3>
          </div>
          <span className="text-xs text-slate-400">Tailors typography, tone, and brand presentation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setTemplate('royal_heritage')}
            className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
              event.proposalTemplate === 'royal_heritage'
                ? 'bg-amber-950/30 border-amber-500/60 shadow-md ring-1 ring-amber-500/40'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-amber-300">Royal Heritage & Desert Gold</div>
            <p className="text-[11px] text-slate-400 mt-1">Palace banquets, royal crest motifs, and luxury heritage narratives.</p>
          </button>

          <button
            type="button"
            onClick={() => setTemplate('coastal_luxury')}
            className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
              event.proposalTemplate === 'coastal_luxury'
                ? 'bg-cyan-950/30 border-cyan-500/60 shadow-md ring-1 ring-cyan-500/40'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-cyan-300">Coastal Luxury & Oceanic</div>
            <p className="text-[11px] text-slate-400 mt-1">Tropical beachfronts, island catamarans, and incentive galas.</p>
          </button>

          <button
            type="button"
            onClick={() => setTemplate('metro_executive')}
            className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
              event.proposalTemplate === 'metro_executive'
                ? 'bg-indigo-950/30 border-indigo-500/60 shadow-md ring-1 ring-indigo-500/40'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-indigo-300">Metropolitan Executive</div>
            <p className="text-[11px] text-slate-400 mt-1">Plenary convention centers, corporate speedways, and high-tech AV.</p>
          </button>

          <button
            type="button"
            onClick={() => setTemplate('modern_minimal')}
            className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
              event.proposalTemplate === 'modern_minimal'
                ? 'bg-slate-800/60 border-slate-400 shadow-md ring-1 ring-slate-400/40'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-slate-200">Modern Minimal Monochrome</div>
            <p className="text-[11px] text-slate-400 mt-1">Crisp editorial layout with tabular figures and clean white space.</p>
          </button>
        </div>
      </div>

      {/* Dynamic Inclusions vs Exclusions Matrix with Add/Delete Capability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inclusions */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">Guaranteed Package Inclusions</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">{event.inclusions.length} Elements Covered</span>
          </div>

          <ul className="space-y-2 text-sm">
            {event.inclusions.map((item, index) => (
              <li key={index} className="flex items-start justify-between gap-2.5 text-slate-300 group p-1.5 rounded hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className="text-xs">{item}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteInclusion(index)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-0.5 transition-opacity"
                  title="Remove inclusion"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>

          {/* Add new inclusion input */}
          <form onSubmit={handleAddInclusion} className="pt-2 border-t border-slate-800/80 flex gap-2">
            <input
              type="text"
              placeholder="Add another package inclusion..."
              value={newInclusion}
              onChange={(e) => setNewInclusion(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg hover:bg-emerald-500/30 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </form>
        </div>

        {/* Exclusions */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-semibold text-white">Explicit Exclusions & Surcharges</h3>
            </div>
            <span className="text-xs font-mono text-rose-400">{event.exclusions.length} Bound Exclusions</span>
          </div>

          <ul className="space-y-2 text-sm">
            {event.exclusions.map((item, index) => (
              <li key={index} className="flex items-start justify-between gap-2.5 text-slate-300 group p-1.5 rounded hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span className="text-xs">{item}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteExclusion(index)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-0.5 transition-opacity"
                  title="Remove exclusion"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>

          {/* Add new exclusion input */}
          <form onSubmit={handleAddExclusion} className="pt-2 border-t border-slate-800/80 flex gap-2">
            <input
              type="text"
              placeholder="Add another explicit exclusion..."
              value={newExclusion}
              onChange={(e) => setNewExclusion(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-lg hover:bg-rose-500/30 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Commercial Payment Schedule */}
      {event.paymentMilestones && event.paymentMilestones.length > 0 && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Payment Milestones & Tranches Schedule</h3>
            </div>
            <span className="text-xs text-slate-400">Total: {event.currency} {event.budgetTotal.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {event.paymentMilestones.map((m) => (
              <div key={m.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{m.milestone}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                    m.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <div className="text-lg font-bold font-mono text-cyan-300">
                  {event.currency} {m.amount.toLocaleString()} ({m.percentage}%)
                </div>
                <div className="text-[11px] text-slate-400">Due Date: {m.dueDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotel & Hospitality Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Hotel & Accommodation Inventory</h3>
          </div>
          <span className="text-xs text-slate-400">Negotiated Corporate Group Block</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.hotelOptions.map((hotel) => (
            <div
              key={hotel.id}
              className={`p-5 rounded-xl border transition-colors ${
                hotel.selected 
                  ? 'bg-slate-900 border-cyan-500/50 shadow-md' 
                  : 'bg-slate-900/40 border-slate-800 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{hotel.name}</h4>
                    <span className="text-xs text-amber-400 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {hotel.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{hotel.category} · {hotel.location}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleHotel(hotel.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    hotel.selected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-semibold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {hotel.selected ? <Check className="w-3 h-3" /> : null}
                  {hotel.selected ? 'Selected' : 'Select'}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs border-t border-slate-800/80 pt-3">
                <div>
                  <span className="text-slate-400">Nightly Rate / Pax:</span>
                  <div className="font-mono text-cyan-300 font-semibold mt-0.5">
                    {event.currency} {hotel.costPerNightPerPax.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Rooms Blocked:</span>
                  <div className="font-mono text-white font-semibold mt-0.5">
                    {hotel.totalRoomsBlocked} Units
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {hotel.amenities.map((amenity, i) => (
                  <span key={i} className="text-[11px] text-slate-400 bg-slate-800/70 px-2 py-0.5 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel & Transit Logistics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Transit, Airlift & Fleet Logistics</h3>
          </div>
          <span className="text-xs text-slate-400">Dedicated charters & ground convoys</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.travelOptions.map((travel) => (
            <div
              key={travel.id}
              className={`p-5 rounded-xl border transition-colors ${
                travel.selected 
                  ? 'bg-slate-900 border-cyan-500/50 shadow-md' 
                  : 'bg-slate-900/40 border-slate-800 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">
                    {travel.type.replace('_', ' ')}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">{travel.operator}</h4>
                  <p className="text-xs text-slate-300 mt-1">{travel.route}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTravel(travel.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    travel.selected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-semibold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {travel.selected ? <Check className="w-3 h-3" /> : null}
                  {travel.selected ? 'Selected' : 'Select'}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-xs border-t border-slate-800/80 pt-3">
                <div>
                  <span className="text-slate-400">Timing:</span>
                  <div className="text-slate-200 mt-0.5">{travel.departureTime}</div>
                </div>
                <div>
                  <span className="text-slate-400">Capacity:</span>
                  <div className="font-mono text-white mt-0.5">{travel.capacity} Pax</div>
                </div>
                <div>
                  <span className="text-slate-400">Cost / Pax:</span>
                  <div className="font-mono text-cyan-300 font-semibold mt-0.5">
                    {event.currency} {travel.costPerPax.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                <Luggage className="w-3.5 h-3.5 text-slate-400" />
                <span>Luggage Rule: {travel.includedLuggage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Modal */}
      <ProposalPdfModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        event={event}
      />

      {/* Client E-Sign Modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Digital Client Proposal Sign-Off</h3>
              </div>
              <button onClick={() => setShowSignModal(false)} className="text-slate-400 hover:text-white text-xs">
                ESC
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Applying client signature will execute this MICE proposal into a binding operational contract and lock room block tariffs.
            </p>

            <form onSubmit={handleClientSign} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Authorized Client Signer</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Verma"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Corporate Designation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VP Operations & Procurement"
                  value={signerTitle}
                  onChange={(e) => setSignerTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400">
                Seal Hash: SHA-256 Verified · Timestamp: {new Date().toLocaleDateString()}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSignModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-colors cursor-pointer"
                >
                  Confirm & E-Sign Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
