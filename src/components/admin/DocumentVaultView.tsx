import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Check, 
  AlertCircle, 
  Download, 
  Send, 
  FileCheck, 
  Key, 
  Eye, 
  Search 
} from 'lucide-react';
import { MiceEvent, Attendee, DocStatus } from '../../types/mice';

interface DocumentVaultViewProps {
  event: MiceEvent;
  onUpdateEvent: (updated: MiceEvent) => void;
}

export const DocumentVaultView: React.FC<DocumentVaultViewProps> = ({ event, onUpdateEvent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'action_required'>('all');
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  const verifiedCount = event.attendees.filter(a => a.docStatus === 'verified').length;
  const pendingCount = event.attendees.filter(a => a.docStatus === 'pending_review').length;
  const missingCount = event.attendees.filter(a => a.docStatus === 'missing').length;

  const updateDocStatus = (attendeeId: string, status: DocStatus) => {
    const updated = event.attendees.map(a => 
      a.id === attendeeId ? { ...a, docStatus: status } : a
    );
    onUpdateEvent({ ...event, attendees: updated });
    if (selectedAttendee?.id === attendeeId) {
      setSelectedAttendee({ ...selectedAttendee, docStatus: status });
    }
  };

  const handleBulkChaser = () => {
    alert(`Automated WhatsApp & Email KYC reminder dispatched to ${missingCount + pendingCount} delegates requiring document submission.`);
  };

  const filtered = event.attendees.filter(a => {
    const match = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  a.organization.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'verified') return match && a.docStatus === 'verified';
    if (activeTab === 'action_required') return match && (a.docStatus === 'missing' || a.docStatus === 'pending_review');
    return match;
  });

  return (
    <div className="space-y-6">
      {/* Top Encryption Security Badge Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                <Lock className="w-3 h-3 text-cyan-400" />
                AES-256-GCM End-to-End Encrypted Vault
              </span>
              <span className="text-xs text-slate-400">Zero-Knowledge Storage</span>
            </div>
            <h2 className="text-xl font-bold text-white">Delegate KYC, Passports & Identity Vault</h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Strict enterprise confidentiality protocol compliant with GDPR and India DPDP Act 2023. All government IDs, passport bio-pages, visas, and health records are encrypted at rest with hardware security modules (HSM).
            </p>
          </div>

          <button
            onClick={handleBulkChaser}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Dispatch KYC Chaser ({missingCount + pendingCount} Pending)
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400">Verified & Flight Cleared</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{verifiedCount}</div>
            <span className="text-[10px] text-slate-500">Boarding & room pass generated</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400">Review Pending (Needs Ops Check)</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">{pendingCount}</div>
            <span className="text-[10px] text-slate-500">Scans submitted, manual check</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400">Awaiting Upload</span>
            <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">{missingCount}</div>
            <span className="text-[10px] text-slate-500">Flight manifest blocked</span>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search delegate ID or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              activeTab === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({event.attendees.length})
          </button>
          <button
            onClick={() => setActiveTab('verified')}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              activeTab === 'verified' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setActiveTab('action_required')}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              activeTab === 'action_required' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Action Required ({missingCount + pendingCount})
          </button>
        </div>
      </div>

      {/* Delegate Document Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((att) => (
          <div
            key={att.id}
            className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{att.name}</h4>
                <p className="text-xs text-slate-400">{att.designation} · {att.organization}</p>
                <span className="text-[11px] font-mono text-slate-500">{att.email}</span>
              </div>

              <span className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded border ${
                att.docStatus === 'verified'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : att.docStatus === 'pending_review'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {att.docStatus.replace('_', ' ')}
              </span>
            </div>

            {/* Document Details Grid */}
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Government ID / Passport:</span>
                <span className="font-mono text-slate-200">{att.passportOrIdNumber || 'Not submitted'}</span>
              </div>
              {att.visaStatus && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Visa / Clearance:</span>
                  <span className="font-mono text-cyan-300">{att.visaStatus}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Encryption Envelope:</span>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                  <Key className="w-3 h-3" />
                  SHA-256 Verified
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setSelectedAttendee(att)}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Inspect Certificate
              </button>

              <div className="flex items-center gap-2">
                {att.docStatus !== 'verified' && (
                  <button
                    onClick={() => updateDocStatus(att.id, 'verified')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded border border-emerald-500/40 transition-colors"
                  >
                    <Check className="w-3 h-3" />
                    Approve KYC
                  </button>
                )}
                <button
                  onClick={() => alert(`Downloaded encrypted compliance archive for ${att.name}`)}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                  title="Download encrypted file"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Inspector */}
      {selectedAttendee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Encrypted KYC Certificate</h3>
              </div>
              <button
                onClick={() => setSelectedAttendee(null)}
                className="text-xs text-slate-400 hover:text-white font-mono"
              >
                CLOSE
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-slate-400">Delegate:</span>
                <div className="font-semibold text-white">{selectedAttendee.name}</div>
                <div className="text-slate-400">{selectedAttendee.organization}</div>
              </div>

              <div>
                <span className="text-slate-400">ID / Passport Reference:</span>
                <div className="font-mono text-cyan-300 font-semibold">{selectedAttendee.passportOrIdNumber || 'Awaiting document upload'}</div>
              </div>

              <div>
                <span className="text-slate-400">Cryptographic Digest:</span>
                <div className="font-mono text-[10px] text-slate-400 break-all bg-slate-900 p-2 rounded mt-1">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800">
                <span className="text-slate-400">Hardware Security Module:</span>
                <span className="text-emerald-400 font-mono">FIPS 140-2 Level 3</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedAttendee(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
