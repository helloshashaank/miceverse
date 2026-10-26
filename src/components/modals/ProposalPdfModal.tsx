import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Plane, 
  ShieldCheck, 
  FileText, 
  Check, 
  XCircle 
} from 'lucide-react';
import { MiceEvent } from '../../types/mice';

interface ProposalPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: MiceEvent;
}

export const ProposalPdfModal: React.FC<ProposalPdfModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${event.name} - MICE Master Proposal Dossier</title>
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 40px; background: #ffffff; }
    h1, h2, h3, h4 { color: #0f172a; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    th { background: #f1f5f9; font-weight: 600; }
    .badge { display: inline-block; padding: 2px 8px; font-size: 11px; border-radius: 4px; background: #e2e8f0; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .header { border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
    .section { margin-bottom: 28px; }
    .seal { border: 2px dashed #0284c7; padding: 12px; border-radius: 8px; background: #f0f9ff; text-align: center; }
  </style>
</head>
<body>
  ${printContents}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.id}_Proposal_Document.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculations for commercial summary
  const subtotal = event.budgetTotal;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Official Proposal & Contract Dossier</h3>
              <p className="text-[11px] text-slate-400">Print-ready PDF layout with dynamic corporate costing & signature lock</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download HTML
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Container */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-slate-950/60 print:bg-white print:p-0 print:overflow-visible">
          {/* Printable White Paper Document */}
          <div 
            ref={printRef}
            className="bg-white text-slate-900 rounded-xl p-8 sm:p-12 shadow-xl print:shadow-none print:rounded-none max-w-3xl mx-auto space-y-8 print:space-y-6 text-sm"
          >
            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest font-mono text-cyan-700 font-bold">
                  MICEverse Global Corporate Travel Solutions
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                  TURNKEY MICE MASTER PROPOSAL
                </h1>
                <div className="text-xs text-slate-600 mt-1">
                  Reference: <strong className="font-mono text-slate-900">MICE-{event.id.toUpperCase().slice(5, 14)}</strong> · Version: {event.proposalVersion || 'v3.2'}
                </div>
              </div>

              <div className="text-right sm:self-start">
                <div className="text-xs text-slate-500">Prepared Exclusively For</div>
                <div className="text-base font-bold text-slate-900">{event.clientName}</div>
                <div className="text-xs text-slate-600">{event.clientContact}</div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">Date: 26 October 2026</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                01. Executive Overview & Destination Brief
              </h3>
              <p className="text-xs leading-relaxed text-slate-700 text-justify">
                {event.executiveSummary || event.description}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] uppercase font-mono text-slate-500">Destination</div>
                  <div className="font-semibold text-slate-900 text-xs mt-0.5 truncate">{event.destination}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] uppercase font-mono text-slate-500">Headcount</div>
                  <div className="font-semibold text-slate-900 text-xs mt-0.5">{event.paxCount} Delegates</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] uppercase font-mono text-slate-500">Duration</div>
                  <div className="font-semibold text-slate-900 text-xs mt-0.5">{event.durationNights} Nights / {event.durationNights + 1} Days</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <div className="text-[10px] uppercase font-mono text-slate-500">Travel Window</div>
                  <div className="font-semibold text-slate-900 text-xs mt-0.5">{event.startDate}</div>
                </div>
              </div>
            </div>

            {/* Hospitality & Accommodation Grid */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                02. Hospitality & Accommodation Inventory
              </h3>
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-200 font-semibold">Resort / Hotel Property</th>
                    <th className="p-2 border border-slate-200 font-semibold">Location</th>
                    <th className="p-2 border border-slate-200 font-semibold">Rooms Blocked</th>
                    <th className="p-2 border border-slate-200 font-semibold text-right">Negotiated Rate / Pax</th>
                  </tr>
                </thead>
                <tbody>
                  {event.hotelOptions.map((h) => (
                    <tr key={h.id} className={h.selected ? 'bg-cyan-50/50' : ''}>
                      <td className="p-2 border border-slate-200">
                        <div className="font-semibold text-slate-900">{h.name}</div>
                        <div className="text-[10px] text-slate-500">{h.category}</div>
                      </td>
                      <td className="p-2 border border-slate-200 text-slate-600">{h.location}</td>
                      <td className="p-2 border border-slate-200 font-mono text-slate-900">{h.totalRoomsBlocked} Rooms</td>
                      <td className="p-2 border border-slate-200 font-mono text-slate-900 text-right">
                        {event.currency} {h.costPerNightPerPax.toLocaleString()} / night
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transit & Flight Logistics */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                03. Transit & Flight Operations
              </h3>
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-200 font-semibold">Transit Carrier & Mode</th>
                    <th className="p-2 border border-slate-200 font-semibold">Routing</th>
                    <th className="p-2 border border-slate-200 font-semibold">Schedule</th>
                    <th className="p-2 border border-slate-200 font-semibold">Baggage Allowance</th>
                  </tr>
                </thead>
                <tbody>
                  {event.travelOptions.map((t) => (
                    <tr key={t.id} className={t.selected ? 'bg-cyan-50/50' : ''}>
                      <td className="p-2 border border-slate-200 font-semibold text-slate-900">{t.operator}</td>
                      <td className="p-2 border border-slate-200 text-slate-600">{t.route}</td>
                      <td className="p-2 border border-slate-200 font-mono text-[11px] text-slate-700">{t.departureTime}</td>
                      <td className="p-2 border border-slate-200 text-slate-600">{t.includedLuggage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Complete Day-by-Day Master Itinerary */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                04. Synchronized Itinerary Timetable
              </h3>
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-200 font-semibold">Time & Day</th>
                    <th className="p-2 border border-slate-200 font-semibold">Activity / Session</th>
                    <th className="p-2 border border-slate-200 font-semibold">Venue Location</th>
                    <th className="p-2 border border-slate-200 font-semibold">Dress Code</th>
                  </tr>
                </thead>
                <tbody>
                  {event.itinerary.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 border border-slate-200 font-mono text-[11px] text-slate-900 whitespace-nowrap">
                        Day {item.dayNumber} · {item.time}
                      </td>
                      <td className="p-2 border border-slate-200">
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500">{item.description}</div>
                      </td>
                      <td className="p-2 border border-slate-200 text-slate-600">{item.location}</td>
                      <td className="p-2 border border-slate-200 text-slate-600">{item.dressCode || 'Smart Casual'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inclusions vs Exclusions Matrix */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                05. Inclusions & Exclusions Boundaries
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50/60 rounded border border-emerald-200 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-900 flex items-center gap-1 text-[11px] uppercase font-mono">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    All Guaranteed Inclusions ({event.inclusions.length})
                  </div>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {event.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-rose-50/60 rounded border border-rose-200 text-xs space-y-1.5">
                  <div className="font-bold text-rose-900 flex items-center gap-1 text-[11px] uppercase font-mono">
                    <XCircle className="w-3.5 h-3.5 text-rose-700" />
                    Explicit Commercial Exclusions ({event.exclusions.length})
                  </div>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {event.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-700 font-bold">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Financial Commercials & Payment Milestones */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                06. Financial Commercials & Milestone Schedule
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Commercial Table */}
                <div className="border border-slate-200 rounded p-3 bg-slate-50/60 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 font-mono text-[11px] uppercase">Package Cost Breakdown</div>
                  <div className="space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span>Base Cost per Delegate:</span>
                      <span className="font-mono font-semibold">{event.currency} {event.budgetPerPax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Delegates (Pax):</span>
                      <span className="font-mono font-semibold">{event.paxCount} Pax</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-1">
                      <span>Package Subtotal:</span>
                      <span className="font-mono font-semibold">{event.currency} {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Applicable GST / VAT (18%):</span>
                      <span className="font-mono">{event.currency} {gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-slate-900 pt-1 text-sm font-bold text-slate-900">
                      <span>Total Contract Value:</span>
                      <span className="font-mono text-cyan-800">{event.currency} {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Milestone Table */}
                <div className="border border-slate-200 rounded p-3 bg-slate-50/60 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 font-mono text-[11px] uppercase">Payment Tranche Schedule</div>
                  <div className="space-y-1.5 text-slate-700 text-[11px]">
                    {event.paymentMilestones?.map((m) => (
                      <div key={m.id} className="flex justify-between border-b border-slate-200 pb-1">
                        <div>
                          <div className="font-medium text-slate-900">{m.milestone} ({m.percentage}%)</div>
                          <div className="text-[10px] text-slate-500">Due: {m.dueDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-semibold text-slate-900">{event.currency} {m.amount.toLocaleString()}</div>
                          <span className={`text-[9px] uppercase font-mono px-1 rounded ${
                            m.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Official Sign-Off Block */}
            <div className="border-t-2 border-slate-900 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-8 text-xs">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Authorized MICE Lead</div>
                  <div className="mt-4 border-b border-slate-400 pb-1 font-semibold text-slate-900">
                    Shailesh Nair
                  </div>
                  <div className="text-[10px] text-slate-500">Senior Director, Corporate MICE & Logistics</div>
                  <div className="text-[10px] font-mono text-emerald-700 mt-1">✓ Electronically Sealed: MICE-OPS-2027</div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Client Acceptance & Confirmation</div>
                  <div className="mt-4 border-b border-slate-400 pb-1 font-semibold text-slate-900">
                    {event.clientSignOff?.clientSignerName || event.clientContact}
                  </div>
                  <div className="text-[10px] text-slate-500">{event.clientSignOff?.clientSignerDesignation || event.clientName}</div>
                  <div className="text-[10px] font-mono text-cyan-800 mt-1">
                    {event.clientSignOff?.isSigned 
                      ? `✓ Confirmed on ${event.clientSignOff.signedAt} (Ref: ${event.clientSignOff.digitalSealRef})` 
                      : 'Pending Client Signature Stamp'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
