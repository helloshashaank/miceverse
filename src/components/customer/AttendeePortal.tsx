import React, { useState } from 'react';
import { 
  QrCode, 
  Share2, 
  WifiOff, 
  Wifi, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Download, 
  Upload, 
  Bell, 
  Bed, 
  Plane, 
  PhoneCall, 
  Navigation, 
  FileText, 
  Lock 
} from 'lucide-react';
import { MiceEvent, Attendee } from '../../types/mice';
import { SocialShareModal } from '../modals/SocialShareModal';

interface AttendeePortalProps {
  event: MiceEvent;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
}

export const AttendeePortal: React.FC<AttendeePortalProps> = ({
  event,
  isOfflineMode,
  onToggleOffline
}) => {
  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string>(event.attendees[0]?.id || '');
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'pass' | 'itinerary' | 'docs' | 'offline_guide'>('pass');
  const [simulatedDocUploaded, setSimulatedDocUploaded] = useState(false);

  const currentAttendee = event.attendees.find(a => a.id === selectedAttendeeId) || event.attendees[0];

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSimulatedDocUploaded(true);
      setTimeout(() => {
        alert('File uploaded and encrypted client-side using AES-256. Awaiting security desk validation.');
      }, 500);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Bar for Attendee Mode & Delegate Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
            {currentAttendee?.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{currentAttendee?.name}</h2>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                Verified Delegate
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentAttendee?.designation} · {currentAttendee?.organization}
            </p>
          </div>
        </div>

        {/* Controls: Attendee switcher & Offline mode toggle */}
        <div className="flex items-center gap-3">
          <select
            value={selectedAttendeeId}
            onChange={(e) => setSelectedAttendeeId(e.target.value)}
            className="text-xs bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {event.attendees.map(a => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.city})
              </option>
            ))}
          </select>

          {/* Offline Mode Toggle Button */}
          <button
            onClick={onToggleOffline}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isOfflineMode
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            {isOfflineMode ? 'Offline Mode Active' : 'Go Offline'}
          </button>
        </div>
      </div>

      {/* Offline Mode Alert banner if active */}
      {isOfflineMode && (
        <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-3">
          <WifiOff className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-amber-200">Offline Caching Protocol Activated (Desert & Archipelago Mode)</h4>
            <p className="text-amber-300/80">
              Your digital boarding pass, hotel address in local script, emergency organizer hotlines, and offline itinerary have been cached to local IndexedDB. You can access all critical passes without internet connectivity.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('pass')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'pass'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Digital Event Pass & Boarding QR
        </button>
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'itinerary'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          My Live Itinerary
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'docs'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Document & KYC Locker
        </button>
        <button
          onClick={() => setActiveTab('offline_guide')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'offline_guide'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Emergency & Venue Survival
        </button>
      </div>

      {/* View 1: Digital Boarding Pass & Event Pass */}
      {activeTab === 'pass' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Futuristic Boarding Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between border-b border-slate-800/80 pb-5">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                  MICE Executive Pass · {event.paxCount} Pax Conclave
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{event.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{event.destination}</p>
              </div>

              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Attendance
              </button>
            </div>

            {/* Delegate & Transit Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Delegate</span>
                <div className="font-semibold text-white mt-0.5">{currentAttendee.name}</div>
                <div className="text-[11px] text-slate-400">{currentAttendee.city}</div>
              </div>

              <div>
                <span className="text-slate-400 block">Transit Manifest</span>
                <div className="font-semibold text-sky-300 mt-0.5">{currentAttendee.flightStatus}</div>
                <div className="text-[11px] text-slate-400">Terminal Escort Active</div>
              </div>

              <div>
                <span className="text-slate-400 block">Room Allocation</span>
                <div className="font-semibold text-indigo-300 mt-0.5">{currentAttendee.roomAllocation}</div>
                <div className="text-[11px] text-slate-400">Express Key Ready</div>
              </div>

              <div>
                <span className="text-slate-400 block">Dietary Profile</span>
                <div className="font-semibold text-amber-300 mt-0.5">{currentAttendee.dietaryPreference}</div>
                <div className="text-[11px] text-slate-400">Tagged in Banquet AV</div>
              </div>
            </div>

            {/* Simulated Barcode & RFID Gate band */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center">
                  {/* High fidelity SVG QR representation */}
                  <svg viewBox="0 0 24 24" className="w-full h-full text-slate-950 fill-current">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v2h-4v-2zm-4 4h2v4h-2v-4zm4 2h4v2h-4v-2z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-mono font-bold text-white">GATE RFID: MICE-PASS-{currentAttendee.id.toUpperCase()}</div>
                  <div className="text-[11px] text-slate-400">Tap at venue gates, bus convoys, and banquet entry</div>
                  <span className="text-[10px] text-emerald-400 font-mono">Offline cryptographic token valid</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Offline Apple Wallet / Google Wallet pass file downloaded.')}
                  className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  Add to Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Quick Notification & Emergency Help */}
          <div className="space-y-4">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Bell className="w-4 h-4 text-cyan-400" />
                Latest Logistics Alerts
              </div>
              <div className="space-y-2 text-xs">
                {event.notifications.slice(0, 2).map((n) => (
                  <div key={n.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="font-semibold text-slate-200">{n.title}</div>
                    <div className="text-slate-400 text-[11px]">{n.message}</div>
                    <span className="text-[10px] text-slate-500 font-mono">{n.sentAt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Onsite Concierge & Medical
              </div>
              <div className="text-xs space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">MICE Lead:</span>
                  <span className="font-mono text-white">+91 98200 11223</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Paramedic Desk:</span>
                  <span className="font-mono text-emerald-400">Ext 401 (Onsite)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hotel Front Desk:</span>
                  <span className="font-mono text-white">Dial '0' from room</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: My Live Itinerary */}
      {activeTab === 'itinerary' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-xs text-slate-300">
              Times displayed in local destination timezone ({event.destination.split(',')[1] || 'India Standard Time'})
            </span>
            <span className="text-xs font-mono text-cyan-400">Auto-synced with master logistics</span>
          </div>

          <div className="space-y-3">
            {event.itinerary.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/40">
                      {item.time}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Day {item.dayNumber} · {item.date}</span>
                    <span className="text-[11px] capitalize text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white pt-1">{item.title}</h4>
                  <p className="text-xs text-slate-300 max-w-2xl">{item.description}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {item.location}
                    </span>
                    {item.dressCode && (
                      <span>Dress: <strong className="text-slate-200">{item.dressCode}</strong></span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Directions to ${item.location} plotted on interactive venue floorplan!`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  Find Room
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Document Locker */}
      {activeTab === 'docs' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Your Encrypted Document Locker</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                AES-256 Vault Active
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Upload your government photo ID, passport photo page, and visa clearance documents. Your files are automatically encrypted in your browser before transmission and can only be decrypted by authorized corporate flight & immigration officers.
            </p>

            <div className="p-4 bg-slate-950/70 border border-dashed border-slate-700 rounded-xl text-center space-y-3">
              <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
              <div>
                <div className="text-xs font-semibold text-white">Select Government ID / Passport scan</div>
                <div className="text-[11px] text-slate-500">PDF, JPG, or PNG up to 10MB</div>
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg cursor-pointer">
                <span>Browse & Encrypt</span>
                <input type="file" onChange={handleSimulateUpload} className="hidden" />
              </label>
              {simulatedDocUploaded && (
                <div className="text-xs text-emerald-400 font-mono">
                  ✓ Document safely encrypted and transmitted to vault.
                </div>
              )}
            </div>

            {/* Stored document cards */}
            <div className="space-y-2 pt-2">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">Primary Identity Document</div>
                    <div className="text-[11px] text-slate-400">{currentAttendee.passportOrIdNumber || 'Aadhaar / Passport Token'}</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Verified & Sealed</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="font-semibold text-white">Travel Insurance Policy Certificate</div>
                    <div className="text-[11px] text-slate-400">Group Cover Policy #TATA-MICE-88192</div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloading official policy certificate PDF')}
                  className="text-xs text-cyan-400 hover:text-cyan-300"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 4: Emergency Survival & Local Guide */}
      {activeTab === 'offline_guide' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
            <h3 className="text-base font-bold text-white">Offline Destination & Emergency Cheat-Sheet</h3>
            <p className="text-xs text-slate-300">
              Show this screen to local taxi drivers, airport authorities, or hotel reception when you do not have cellular network or roaming data.
            </p>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">Local Address & Taxi Directions</span>
              <div className="text-sm font-bold text-white">{event.hotelOptions[0]?.name}</div>
              <div className="text-xs text-slate-300">{event.hotelOptions[0]?.location}</div>
              
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-amber-300">
                {event.destination.includes('Jaisalmer') && 'होटल सूर्यगढ़ पैलेस, कहल फाटा, सम रोड, जैसलमेर (संपर्क: 02992 269269)'}
                {event.destination.includes('Phuket') && 'โรงแรม เจดับบลิว แมริออท ภูเก็ต รีสอร์ท แอนด์ สปา (ไม้ขาว ภูเก็ต)'}
                {event.destination.includes('Delhi') && 'पुलमैन होटल, एसेट 2, एरोसिटी, नई दिल्ली, इंदिरा गांधी हवाई अड्डा'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Destination Emergency SOS:</span>
                <div className="font-mono text-rose-400 font-bold">112 (National Emergency)</div>
                <p className="text-[11px] text-slate-500">Works without SIM card or cellular roaming.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Onsite 24x7 Control Room:</span>
                <div className="font-mono text-cyan-400 font-bold">+91 11 4988 9200</div>
                <p className="text-[11px] text-slate-500">MICEverse 24-hour delegate crisis support.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Share Modal */}
      <SocialShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        event={event}
        attendee={currentAttendee}
      />
    </div>
  );
};
