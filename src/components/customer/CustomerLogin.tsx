import React, { useState } from 'react';
import { 
  Compass, 
  Lock, 
  ArrowRight, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  MapPin 
} from 'lucide-react';
import { MiceEvent, Attendee } from '../../types/mice';

interface CustomerLoginProps {
  event: MiceEvent;
  onLoginSuccess: (attendee: Attendee) => void;
  onSwitchToAdmin: () => void;
}

export const CustomerLogin: React.FC<CustomerLoginProps> = ({
  event,
  onLoginSuccess,
  onSwitchToAdmin
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    setTimeout(() => {
      const found = event.attendees.find(
        a => a.email.toLowerCase() === emailOrPhone.trim().toLowerCase() ||
             a.phone.replace(/\s+/g, '') === emailOrPhone.replace(/\s+/g, '')
      );

      if (found) {
        setIsLoading(false);
        onLoginSuccess(found);
      } else if (emailOrPhone.trim().length > 3) {
        // Create an ad-hoc attendee profile for testing if not found
        const guestAttendee: Attendee = {
          id: `att-guest-${Date.now()}`,
          name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0].replace('.', ' ') : 'Registered Delegate',
          email: emailOrPhone.includes('@') ? emailOrPhone : 'delegate@corp.com',
          phone: emailOrPhone.includes('@') ? '+91 98000 11223' : emailOrPhone,
          organization: event.clientName,
          designation: 'Senior Delegate',
          city: 'Corporate HQ',
          rsvpStatus: 'confirmed',
          roomAllocation: `${event.hotelOptions[0]?.name.split(' ')[0]} Deluxe Room 204`,
          flightStatus: event.travelOptions[0]?.operator.split(' ')[0] + ' Confirmed',
          dietaryPreference: 'Vegetarian',
          docStatus: 'verified',
          passportOrIdNumber: 'ID Token: 8829-VERIFIED',
          checkedIn: false
        };
        setIsLoading(false);
        onLoginSuccess(guestAttendee);
      } else {
        setIsLoading(false);
        setAuthError('Please enter a valid corporate email or 10-digit mobile number.');
      }
    }, 450);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Compass className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Attendee Mobile Pass</h1>
          <p className="text-xs text-slate-400">
            Access your verified boarding pass, hotel keys, flight alerts, and encrypted KYC documents.
          </p>
        </div>

        {/* Event Card Badge */}
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center gap-3 shadow-lg">
          <img
            src={event.heroImage}
            alt={event.name}
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800"
          />
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-mono text-cyan-400">Selected Conclave</span>
            <div className="text-sm font-bold text-white truncate">{event.name}</div>
            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              {event.destination.split(',')[0]} · {event.startDate}
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-5">
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Corporate Email or Registered Phone
              </label>
              <input
                type="text"
                required
                placeholder="e.g. v.rathore@tatatelecom.com or phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {authError && (
                <p className="text-[11px] text-rose-400 mt-1">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Secure Pass...</span>
              ) : (
                <>
                  <span>Access Delegate Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] text-slate-400 block font-medium">
              Or quick sign-in with sample registered delegates:
            </span>
            <div className="space-y-1.5">
              {event.attendees.slice(0, 3).map((att) => (
                <button
                  key={att.id}
                  type="button"
                  onClick={() => onLoginSuccess(att)}
                  className="w-full text-left p-2.5 bg-slate-950/70 hover:bg-slate-800/60 border border-slate-800/80 rounded-xl transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                      {att.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {att.designation} · {att.organization}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 shrink-0 ml-2">
                    Sign in →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Security badge */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>FIPS 140-2 Encrypted Session · Zero Passwords Required</span>
          </div>
        </div>

        {/* Bottom switch back to admin */}
        <div className="text-center">
          <button
            onClick={onSwitchToAdmin}
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            ← Switch to MICE Operations & Planner Admin Hub
          </button>
        </div>
      </div>
    </div>
  );
};
