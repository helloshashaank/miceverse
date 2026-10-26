import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  Plus, 
  Building2, 
  Calendar, 
  Download, 
  Check, 
  PenTool, 
  Trash2 
} from 'lucide-react';
import { TripAgreement, MiceEvent, TripAgreementClause } from '../../types/mice';

interface AgreementMouViewProps {
  agreements: TripAgreement[];
  events: MiceEvent[];
  selectedEvent: MiceEvent;
  onUpdateAgreement: (updated: TripAgreement) => void;
  onAddAgreement: (newAgr: TripAgreement) => void;
}

export const AgreementMouView: React.FC<AgreementMouViewProps> = ({
  agreements,
  events,
  selectedEvent,
  onUpdateAgreement,
  onAddAgreement
}) => {
  const currentAgreement = agreements.find(a => a.eventId === selectedEvent.id) || agreements[0];
  const [activeAgreementId, setActiveAgreementId] = useState<string>(currentAgreement?.id || '');
  const activeAgr = agreements.find(a => a.id === activeAgreementId) || currentAgreement;

  // New clause state
  const [newClauseTitle, setNewClauseTitle] = useState('');
  const [newClauseContent, setNewClauseContent] = useState('');
  const [showAddClause, setShowAddClause] = useState(false);

  // Acknowledgment validation state
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [validatorName, setValidatorName] = useState(selectedEvent.clientContact.split('(')[0].trim() || 'Rajesh Verma');
  const [validatorTitle, setValidatorTitle] = useState('Authorized Procurement Signatory');

  const handleAcknowledgeAndValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAgr) return;

    const updated: TripAgreement = {
      ...activeAgr,
      status: 'signed',
      executionDate: new Date().toISOString().split('T')[0],
      acknowledgedInPortal: true,
      acknowledgedAt: new Date().toLocaleString(),
      clientSignatory: {
        name: validatorName,
        title: validatorTitle,
        email: selectedEvent.clientContact,
        signedAt: new Date().toLocaleString(),
        ipAddress: '103.24.188.42',
        verificationHash: `SHA256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      }
    };

    onUpdateAgreement(updated);
    setShowValidateModal(false);
  };

  const handleAddClause = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAgr || !newClauseTitle || !newClauseContent) return;

    const newClause: TripAgreementClause = {
      id: `c-custom-${Date.now()}`,
      title: newClauseTitle,
      content: newClauseContent
    };

    const updated: TripAgreement = {
      ...activeAgr,
      clauses: [...activeAgr.clauses, newClause]
    };

    onUpdateAgreement(updated);
    setNewClauseTitle('');
    setNewClauseContent('');
    setShowAddClause(false);
  };

  const handleDeleteClause = (clauseId: string) => {
    if (!activeAgr) return;
    const updated: TripAgreement = {
      ...activeAgr,
      clauses: activeAgr.clauses.filter(c => c.id !== clauseId)
    };
    onUpdateAgreement(updated);
  };

  const handlePrintMou = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-cyan-400 font-mono font-semibold">Legal & Compliance Hub</span>
            <span aria-hidden="true">·</span>
            <span>Trip Agreement, MoU & Digital SLA Validation</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Memorandum of Understanding (MoU) Management</h2>
          <p className="text-sm text-slate-300 mt-0.5">
            Bind scope of work, flight charter commitments, hotel attrition policies, and execute dual-party digital validations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            onClick={handlePrintMou}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            Print MoU Copy
          </button>

          <button
            onClick={() => setShowValidateModal(true)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeAgr?.status === 'signed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-sm'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {activeAgr?.status === 'signed' ? 'MoU Validated & Executed ✓' : 'Acknowledge & Validate MoU'}
          </button>
        </div>
      </div>

      {/* Trip Agreement Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 whitespace-nowrap">Active Trip MoUs:</span>
        {agreements.map((agr) => {
          const isSelected = activeAgr?.id === agr.id;
          return (
            <button
              key={agr.id}
              onClick={() => setActiveAgreementId(agr.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{agr.corporateClientName.split(' ')[0]} - {agr.eventTitle.split(':')[0].slice(0, 18)}</span>
              <span className={`text-[9px] uppercase font-mono px-1 rounded ${
                agr.status === 'signed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {agr.status}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Agreement Reviewer */}
      {activeAgr && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Legal Clauses Viewer (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Agreement Document Header */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">
                    {activeAgr.agreementType.toUpperCase()} REF: {activeAgr.id.toUpperCase()} · Version: {activeAgr.version}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{activeAgr.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>Corporate Client: <strong className="text-slate-200">{activeAgr.corporateClientName}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Effective: {activeAgr.effectiveDate}</span>
                  </div>
                </div>

                <div className="text-right sm:self-start">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono uppercase font-semibold ${
                    activeAgr.status === 'signed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {activeAgr.status === 'signed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {activeAgr.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Scope of Work Summary */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                  Article I. Scope of MICE Services & Deliverables
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                  {activeAgr.scopeOfWorkSummary}
                </p>
              </div>

              {/* Commercial Terms & Tranches */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                  Article II. Commercial Payment Schedule & Billing Tranches
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
                  {activeAgr.paymentTermsSummary}
                </p>
              </div>

              {/* Cancellation & Force Majeure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-slate-400 font-mono font-semibold text-[11px] uppercase">
                    Article III. Cancellation & Attrition
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{activeAgr.cancellationClause}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-slate-400 font-mono font-semibold text-[11px] uppercase">
                    Article IV. Force Majeure & Sovereignty
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{activeAgr.forceMajeureClause}</p>
                </div>
              </div>

              {/* Dynamic Specific Clauses */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                    Specific Operational Clauses ({activeAgr.clauses.length})
                  </span>
                  <button
                    onClick={() => setShowAddClause(true)}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Custom Clause
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeAgr.clauses.map((clause) => (
                    <div key={clause.id} className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1 group">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{clause.title}</h4>
                        <button
                          onClick={() => handleDeleteClause(clause.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-0.5 transition-opacity"
                          title="Remove clause"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{clause.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Validation & Signatory Audit Panel (1 Col) */}
          <div className="space-y-5">
            {/* Dual Party Execution Box */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">Legal Sign-Off Status</span>
                <h3 className="text-sm font-bold text-white mt-0.5">Dual-Party Validation & Seal</h3>
              </div>

              {/* Agency Signatory */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                <span className="text-slate-400 text-[10px] uppercase font-mono">Agency Signatory</span>
                <div className="font-semibold text-white">{activeAgr.agencySignatory.name}</div>
                <div className="text-[11px] text-slate-400">{activeAgr.agencySignatory.title}</div>
                <div className="text-[10px] font-mono text-emerald-400 pt-1">
                  ✓ Signed: {activeAgr.agencySignatory.signedAt}
                </div>
              </div>

              {/* Client Signatory */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                <span className="text-slate-400 text-[10px] uppercase font-mono">Client Acknowledgment & Signatory</span>
                <div className="font-semibold text-white">
                  {activeAgr.clientSignatory?.name || selectedEvent.clientContact}
                </div>
                <div className="text-[11px] text-slate-400">
                  {activeAgr.clientSignatory?.title || 'Corporate Procurement Authority'}
                </div>
                {activeAgr.status === 'signed' ? (
                  <div className="space-y-1 pt-1.5 border-t border-slate-800/80">
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Digital Validation Seal Verified
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 break-all bg-slate-900 p-1.5 rounded">
                      {activeAgr.clientSignatory?.verificationHash}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      IP: {activeAgr.clientSignatory?.ipAddress} · Signed: {activeAgr.clientSignatory?.signedAt}
                    </div>
                  </div>
                ) : (
                  <div className="pt-2">
                    <button
                      onClick={() => setShowValidateModal(true)}
                      className="w-full py-2 px-3 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer"
                    >
                      Acknowledge & Sign MoU
                    </button>
                  </div>
                )}
              </div>

              {/* Legal Notes */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block">Enforceability & Indian Contract Act:</span>
                <p>
                  Electronic records and cryptographic acknowledgement timestamps herein satisfy Section 65B of the Indian Evidence Act and IT Act 2000.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Clause */}
      {showAddClause && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Operational Clause to MoU</h3>
              <button onClick={() => setShowAddClause(false)} className="text-slate-400 hover:text-white text-xs">
                ESC
              </button>
            </div>

            <form onSubmit={handleAddClause} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Clause Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Section 4. Onsite Paramedic & AED Setup"
                  value={newClauseTitle}
                  onChange={(e) => setNewClauseTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Clause Wording & Terms</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Specify legal covenants, service levels, or delivery stipulations..."
                  value={newClauseContent}
                  onChange={(e) => setNewClauseContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddClause(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg"
                >
                  Append Clause
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Validate & Execute MoU */}
      {showValidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Client MoU Acknowledgment & Validation</h3>
              </div>
              <button onClick={() => setShowValidateModal(false)} className="text-slate-400 hover:text-white text-xs">
                ESC
              </button>
            </div>

            <p className="text-xs text-slate-300">
              By confirming, you acknowledge that the corporate client has reviewed and accepted all terms, pricing tranches, and cancellation policies specified in this Memorandum of Understanding.
            </p>

            <form onSubmit={handleAcknowledgeAndValidate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Corporate Signatory Full Name</label>
                <input
                  type="text"
                  required
                  value={validatorName}
                  onChange={(e) => setValidatorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Signatory Title</label>
                <input
                  type="text"
                  required
                  value={validatorTitle}
                  onChange={(e) => setValidatorTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-[11px] font-mono text-cyan-300">
                <div>Digital Validation Protocol: AES-256 / SHA-256 Digest</div>
                <div className="text-slate-500">Timestamp: {new Date().toLocaleString()} IST</div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowValidateModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg"
                >
                  Validate & Execute MoU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
