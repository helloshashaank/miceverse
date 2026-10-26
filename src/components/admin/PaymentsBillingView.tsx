import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Bell, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Download, 
  FileText, 
  Building2, 
  Calendar, 
  Receipt, 
  ArrowUpRight 
} from 'lucide-react';
import { MiceEvent, PaymentRecord, PaymentReminderLog, PaymentMilestone } from '../../types/mice';

interface PaymentsBillingViewProps {
  event: MiceEvent;
  payments: PaymentRecord[];
  reminders: PaymentReminderLog[];
  onAddPayment: (newPayment: PaymentRecord) => void;
  onSendReminder: (newReminder: PaymentReminderLog) => void;
}

export const PaymentsBillingView: React.FC<PaymentsBillingViewProps> = ({
  event,
  payments,
  reminders,
  onAddPayment,
  onSendReminder
}) => {
  const eventPayments = payments.filter(p => p.eventId === event.id);
  const eventReminders = reminders.filter(r => r.eventId === event.id);

  // Financial calculations
  const totalBudget = event.budgetTotal;
  const totalPaid = eventPayments.reduce((acc, p) => acc + p.amount, 0);
  const remainingBalance = Math.max(0, totalBudget - totalPaid);
  const percentCollected = Math.min(100, Math.round((totalPaid / (totalBudget || 1)) * 100));

  // Modals
  const [showPartialPayModal, setShowPartialPayModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  // Partial Payment Form
  const [payAmount, setPayAmount] = useState<number>(2000000);
  const [payMethod, setPayMethod] = useState<PaymentRecord['paymentMethod']>('rtgs_neft');
  const [payRef, setPayRef] = useState('');
  const [payMilestoneId, setPayMilestoneId] = useState(event.paymentMilestones?.[0]?.id || 'm-1');
  const [payNotes, setPayNotes] = useState('');

  // Reminder Form
  const [remChannel, setRemChannel] = useState<'whatsapp' | 'email' | 'both'>('both');
  const [remContactName, setRemContactName] = useState(event.clientContact.split('(')[0].trim() || 'Rajesh Verma');
  const [remContactEmail, setRemContactEmail] = useState('accounts.finance@corporate.com');
  const [remContactPhone, setRemContactPhone] = useState('+91 98201 44520');
  const [reminderDispatchedNotice, setReminderDispatchedNotice] = useState(false);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payAmount || payAmount <= 0) return;

    const selectedM = event.paymentMilestones?.find(m => m.id === payMilestoneId);

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      eventId: event.id,
      milestoneId: payMilestoneId,
      milestoneName: selectedM ? selectedM.milestone : 'Partial Advance Tranche',
      amount: Number(payAmount),
      currency: event.currency,
      paymentMethod: payMethod,
      transactionReference: payRef || `UTR${Date.now()}`,
      paymentDate: new Date().toISOString().split('T')[0],
      recordedBy: 'Finance Ops (Portal Entry)',
      receiptNumber: `REC-${Date.now().toString().slice(-4)}`,
      status: 'completed',
      notes: payNotes || 'Partial installment payment credited.'
    };

    onAddPayment(newPayment);
    setShowPartialPayModal(false);
    setPayRef('');
    setPayNotes('');
  };

  const handleDispatchReminder = (e: React.FormEvent) => {
    e.preventDefault();

    const newReminder: PaymentReminderLog = {
      id: `rem-${Date.now()}`,
      eventId: event.id,
      milestoneId: payMilestoneId,
      channel: remChannel,
      recipientName: remContactName,
      recipientEmail: remContactEmail,
      recipientPhone: remContactPhone,
      sentAt: new Date().toLocaleString(),
      amountDue: remainingBalance,
      dueDate: event.paymentMilestones?.[1]?.dueDate || '15 Feb 2027',
      status: 'delivered'
    };

    onSendReminder(newReminder);
    setShowReminderModal(false);
    setReminderDispatchedNotice(true);
    setTimeout(() => setReminderDispatchedNotice(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-cyan-400 font-mono font-semibold">Treasury & Commercial Ledger</span>
            <span aria-hidden="true">·</span>
            <span>Partial Payments, Tranches & Automated Reminders</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Payment Terms, Installments & Invoicing</h2>
          <p className="text-sm text-slate-300 mt-0.5">
            Flexible corporate partial payment recording, automated WhatsApp/Email collection chasers, and financial reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setShowPartialPayModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Record Partial Payment
          </button>

          <button
            onClick={() => setShowReminderModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-cyan-400" />
            Send Payment Reminder
          </button>
        </div>
      </div>

      {reminderDispatchedNotice && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs text-emerald-200">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Payment reminder notification successfully dispatched to {remContactName} via {remChannel.toUpperCase()}!
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">Delivered to Gateway</span>
        </div>
      )}

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Total Contract Value</span>
          <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
            {event.currency} {(totalBudget).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {event.paxCount} Pax @ {event.currency} {event.budgetPerPax.toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Total Realized (Paid)</span>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
            {event.currency} {totalPaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            {percentCollected}% Contract Realized
          </span>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Outstanding Balance</span>
          <div className="text-xl font-bold font-mono text-amber-300 mt-1 tabular-nums">
            {event.currency} {remainingBalance.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {100 - percentCollected}% Remaining
          </span>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Next Tranche Due</span>
          <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
            {event.paymentMilestones?.[1]?.dueDate || 'Due on cut-off'}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Tranche: {event.paymentMilestones?.[1]?.milestone.split(' ')[0] || 'Room Block'}
          </span>
        </div>
      </div>

      {/* Progress Bar Strip */}
      <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300 font-medium">Corporate Collection Progress</span>
          <span className="font-mono text-cyan-400 font-semibold">{percentCollected}% Settled</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${percentCollected}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-1">
          <span>₹ 0 Advance</span>
          <span>Target Cap: {event.currency} {totalBudget.toLocaleString()}</span>
        </div>
      </div>

      {/* Milestones & Transaction Ledger 2-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milestone Tranches */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Agreed Payment Tranches</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Milestone Terms</span>
          </div>

          <div className="space-y-3">
            {event.paymentMilestones?.map((m) => (
              <div key={m.id} className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{m.milestone}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">Due Date: {m.dueDate}</span>
                  </div>
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                    m.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400 font-mono">Share: {m.percentage}%</span>
                  <span className="text-sm font-bold font-mono text-cyan-300">
                    {event.currency} {m.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Realized Payments Ledger */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Verified Payments Ledger ({eventPayments.length})</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">Total: {event.currency} {totalPaid.toLocaleString()}</span>
          </div>

          {eventPayments.length === 0 ? (
            <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-500 text-xs">
              No payments recorded yet. Click "Record Partial Payment" above.
            </div>
          ) : (
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {eventPayments.map((p) => (
                <div key={p.id} className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{p.milestoneName}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Ref: {p.transactionReference} · Method: {p.paymentMethod.toUpperCase()}
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      + {event.currency} {p.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80 font-mono">
                    <span>Receipt: {p.receiptNumber}</span>
                    <span>Date: {p.paymentDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dispatched Payment Reminders History */}
      <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Payment Reminder Audit Trail</h3>
          </div>
          <span className="text-xs text-slate-400">{eventReminders.length} Notices Sent</span>
        </div>

        <div className="space-y-2.5">
          {eventReminders.map((rem) => (
            <div key={rem.id} className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>Recipient: {rem.recipientName} ({rem.channel.toUpperCase()})</span>
                  <span className="text-[10px] text-emerald-400 font-mono">✓ {rem.status}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Amount Inquired: <strong className="text-cyan-300 font-mono">{event.currency} {rem.amountDue.toLocaleString()}</strong> · Due: {rem.dueDate}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">{rem.recipientEmail} · {rem.recipientPhone}</div>
              </div>

              <span className="text-[10px] text-slate-400 font-mono self-start sm:self-auto shrink-0">
                Dispatched: {rem.sentAt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Record Partial Payment */}
      {showPartialPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Record Partial / Tranche Payment</h3>
              <button onClick={() => setShowPartialPayModal(false)} className="text-slate-400 hover:text-white text-xs">
                ESC
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Milestone / Tranche</label>
                <select
                  value={payMilestoneId}
                  onChange={(e) => setPayMilestoneId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {event.paymentMilestones?.map(m => (
                    <option key={m.id} value={m.id}>{m.milestone} ({event.currency} {m.amount.toLocaleString()})</option>
                  ))}
                  <option value="adhoc">Ad-hoc Corporate Advance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Payment Amount ({event.currency})</label>
                <input
                  type="number"
                  min="1000"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Payment Mode</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value as PaymentRecord['paymentMethod'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="rtgs_neft">RTGS / NEFT Treasury</option>
                    <option value="bank_transfer">Direct Bank Wire</option>
                    <option value="corporate_card">Corporate Credit Card</option>
                    <option value="cheque">Bank Demand Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Bank UTR / Transaction Ref</label>
                  <input
                    type="text"
                    required
                    placeholder="HDFCR52027..."
                    value={payRef}
                    onChange={(e) => setPayRef(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Cleared via corporate treasury account, receipts issued..."
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPartialPayModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Dispatch Payment Reminder */}
      {showReminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Send Corporate Payment Reminder</h3>
              </div>
              <button onClick={() => setShowReminderModal(false)} className="text-slate-400 hover:text-white text-xs">
                ESC
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Transmit an official payment reminder notice with current outstanding dues ({event.currency} {remainingBalance.toLocaleString()}) and direct RTGS bank coordinates.
            </p>

            <form onSubmit={handleDispatchReminder} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Corporate POC Name</label>
                <input
                  type="text"
                  required
                  value={remContactName}
                  onChange={(e) => setRemContactName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Recipient Email</label>
                  <input
                    type="email"
                    required
                    value={remContactEmail}
                    onChange={(e) => setRemContactEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">WhatsApp / Phone</label>
                  <input
                    type="text"
                    required
                    value={remContactPhone}
                    onChange={(e) => setRemContactPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Dispatch Channels</label>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setRemChannel('both')}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                      remChannel === 'both' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Email + WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setRemChannel('email')}
                    className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                      remChannel === 'email' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Email Only
                  </button>
                </div>
              </div>

              {/* Template Preview */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <span className="font-semibold text-cyan-400 block font-mono">Reminder Message Preview:</span>
                <p>
                  "Dear {remContactName}, regarding your corporate MICE contract for {event.name}: Upcoming tranche of {event.currency} {remainingBalance.toLocaleString()} is due. Kindly release via RTGS to MICEverse Treasury HDFC Account: 5020008819201 (IFSC: HDFC0000128)."
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowReminderModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Reminder Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
