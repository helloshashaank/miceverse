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
  Lock, 
  LogOut, 
  Smartphone, 
  Monitor, 
  Compass, 
  Utensils, 
  User, 
  Check 
} from 'lucide-react';
import { MiceEvent, Attendee } from '../../types/mice';
import { SocialShareModal } from '../modals/SocialShareModal';

interface CustomerAppProps {
  event: MiceEvent;
  attendee: Attendee;
  onLogout: () => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
}

export const CustomerApp: React.FC<CustomerAppProps> = ({
  event,
  attendee,
  onLogout,
  isOfflineMode,
  onToggleOffline
}) => {
  const [activeTab, setActiveTab] = useState<'pass' | 'itinerary' | 'docs' | 'venue' | 'profile'>('pass');
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [uploadedFileNotice, setUploadedFileNotice] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileNotice(true);
      setTimeout(() => setUploadedFileNotice(false), 4000);
    }
  };

  const daysCount = event.durationNights + 1;
  const days = Array.from({ length: daysCount }, (_, i) => i + 1);
  const daySchedule = event.itinerary.filter(i => i.dayNumber === selectedDay);

  const content = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* App Mobile Header */}
      <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white leading-none">{event.name.split(':')[0]}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{event.destination.split(',')[0]}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleOffline}
            className={`px-2 py-1 text-[10px] font-mono rounded border flex items-center gap-1 transition-colors cursor-pointer ${
              isOfflineMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            {isOfflineMode ? 'Offline' : 'Online'}
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="p-1.5 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-slate-900 transition-colors"
            title="Share Badge"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Offline Alert Strip */}
      {isOfflineMode && (
        <div className="px-4 py-2 bg-amber-950/60 border-b border-amber-500/40 text-[11px] text-amber-200 flex items-center justify-between shrink-0">
          <span className="flex items-center gap-1.5 font-mono">
            <WifiOff className="w-3 h-3 text-amber-400" />
            Cached Offline Pass Active
          </span>
          <span className="text-[10px] text-amber-400 font-mono">Storage: 100% Synced</span>
        </div>
      )}

      {/* Scrollable Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* Tab 1: Digital Boarding Pass */}
        {activeTab === 'pass' && (
          <div className="space-y-4">
            {/* Top Pass Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 border border-cyan-500/30 p-5 space-y-5 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">
                    Official Executive Pass
                  </span>
                  <h2 className="text-lg font-extrabold text-white mt-0.5">{attendee.name}</h2>
                  <p className="text-xs text-slate-300">{attendee.designation}</p>
                  <p className="text-[11px] text-slate-400">{attendee.organization}</p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Cleared
                  </span>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">
                    {attendee.rsvpStatus.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Transit & Room Strip */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Plane className="w-3 h-3 text-sky-400" />
                    Flight Transit:
                  </span>
                  <div className="font-semibold text-slate-200 mt-0.5 truncate">
                    {attendee.flightStatus}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Bed className="w-3 h-3 text-indigo-400" />
                    Room Assigned:
                  </span>
                  <div className="font-semibold text-slate-200 mt-0.5 truncate">
                    {attendee.roomAllocation}
                  </div>
                </div>
              </div>

              {/* Dynamic QR Code */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-slate-950 fill-current">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v2h-4v-2zm-4 4h2v4h-2v-4zm4 2h4v2h-4v-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white">GATE RFID TOKEN</div>
                    <div className="text-[10px] text-slate-400">Scan at buses, hotel desk & hall</div>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      TOKEN: {attendee.id.toUpperCase().slice(0, 12)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Downloaded Apple/Google Wallet pass.')}
                  className="px-3 py-1.5 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
                >
                  Save Pass
                </button>
              </div>
            </div>

            {/* Live Notifications Carousel */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span className="flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" />
                  Live Event Logistics Updates
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Real-time</span>
              </div>
              <div className="space-y-2 text-xs">
                {event.notifications.slice(0, 2).map((n) => (
                  <div key={n.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-semibold text-slate-200">{n.title}</div>
                    <p className="text-[11px] text-slate-400">{n.message}</p>
                    <span className="text-[9px] text-slate-500 font-mono">{n.sentAt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Day Schedule */}
        {activeTab === 'itinerary' && (
          <div className="space-y-3">
            {/* Day Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {days.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDay === d
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Day {d}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-2.5">
              {daySchedule.map(item => (
                <div key={item.id} className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {item.time}
                    </span>
                    <span className="text-[10px] capitalize text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white pt-0.5">{item.title}</h3>
                  <p className="text-xs text-slate-300">{item.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {item.location}
                    </span>
                    {item.dressCode && <span>Dress: {item.dressCode}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Encrypted Document Locker */}
        {activeTab === 'docs' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Your Encrypted Document Vault</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">AES-256 Sealed</span>
              </div>
              <p className="text-xs text-slate-300">
                Government photo ID, passport scans, and travel clearances are protected by end-to-end client-side encryption.
              </p>

              {/* Upload trigger */}
              <div className="p-4 bg-slate-950 border border-dashed border-slate-700 rounded-xl text-center space-y-2">
                <Upload className="w-6 h-6 text-cyan-400 mx-auto" />
                <div className="text-xs text-white font-medium">Upload ID / Passport Renewal</div>
                <label className="inline-block px-3 py-1.5 text-xs font-semibold bg-cyan-400 text-slate-950 rounded-lg cursor-pointer">
                  <span>Browse File</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
                {uploadedFileNotice && (
                  <div className="text-xs text-emerald-400 font-mono mt-2">
                    ✓ Encrypted file uploaded. Awaiting desk verification.
                  </div>
                )}
              </div>

              {/* Stored ID Card */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Government ID Scanned</div>
                  <div className="text-[11px] font-mono text-slate-400">{attendee.passportOrIdNumber || 'Aadhaar / Passport'}</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Verified ✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Venue Wayfinding & Emergency */}
        {activeTab === 'venue' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-cyan-400" />
                Venue Locations & Wi-Fi
              </h3>
              <div className="space-y-2">
                {event.venueZones.map(zone => (
                  <div key={zone.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{zone.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400">Cap: {zone.capacity}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">In Session: {zone.currentAgenda}</div>
                    {zone.wifiSsid && (
                      <div className="text-[10px] font-mono text-emerald-400 pt-0.5">
                        Wi-Fi: {zone.wifiSsid}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Offline Taxi card */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] uppercase font-mono text-amber-400">Offline Taxi Card</span>
              <div className="font-bold text-white">{event.hotelOptions[0]?.name}</div>
              <div className="p-2.5 bg-slate-950 rounded-lg text-amber-300 font-mono text-[11px]">
                {event.destination.includes('Jaisalmer') && 'होटल सूर्यगढ़ पैलेस, कहल फाटा, सम रोड, जैसलमेर'}
                {event.destination.includes('Phuket') && 'โรงแรม เจดับบลิว แมริออท ภูเก็ต รีสอร์ท (ไม้ขาว)'}
                {event.destination.includes('Delhi') && 'पुलमैन होटल, एरोसिटी, नई दिल्ली'}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Profile & Preferences */}
        {activeTab === 'profile' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-base">
                  {attendee.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{attendee.name}</h3>
                  <div className="text-slate-400">{attendee.designation}</div>
                  <div className="text-[11px] text-slate-500">{attendee.organization}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Dietary Profile:</span>
                  <span className="font-semibold text-amber-300">{attendee.dietaryPreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Registered Phone:</span>
                  <span className="font-mono text-slate-200">{attendee.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Corporate Email:</span>
                  <span className="font-mono text-slate-200">{attendee.email}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-2.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-colors cursor-pointer"
            >
              Sign Out from Delegate Pass
            </button>
          </div>
        )}
      </div>

      {/* Modern Bottom Navigation Bar */}
      <div className="fixed sm:absolute bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-2 flex items-center justify-around z-30">
        <button
          onClick={() => setActiveTab('pass')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'pass' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span className="text-[10px]">Pass</span>
        </button>

        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'itinerary' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px]">Agenda</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'docs' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span className="text-[10px]">Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('venue')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'venue' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px]">Venues</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>

      {/* Social Share Modal */}
      <SocialShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        event={event}
        attendee={attendee}
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Device frame switch controls for desktop planners */}
      <div className="hidden sm:flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="text-cyan-400 font-mono font-semibold">Attendee Mobile Experience</span>
          <span>·</span>
          <span>Logged in as <strong>{attendee.name}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
              !isPhoneFrame ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Responsive
          </button>
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
              isPhoneFrame ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Phone Mockup
          </button>
        </div>
      </div>

      {/* Viewport Render: Either phone bezel mockup or fluid responsive card */}
      {isPhoneFrame ? (
        <div className="flex justify-center py-4">
          <div className="w-[390px] h-[780px] bg-slate-950 border-4 border-slate-700 rounded-[44px] shadow-2xl overflow-hidden relative flex flex-col ring-8 ring-slate-900">
            {/* Phone Speaker Notch */}
            <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto my-2 shrink-0" />
            <div className="flex-1 overflow-hidden relative">
              {content}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl min-h-[600px] relative">
          {content}
        </div>
      )}
    </div>
  );
};
