import React, { useState } from 'react';
import { 
  MapPin, 
  Wifi, 
  Users, 
  Radio, 
  Volume2, 
  Maximize2, 
  Navigation, 
  Compass, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { MiceEvent, VenueZone } from '../../types/mice';

interface VenueMapViewProps {
  event: MiceEvent;
}

export const VenueMapView: React.FC<VenueMapViewProps> = ({ event }) => {
  const [selectedZone, setSelectedZone] = useState<VenueZone>(event.venueZones[0]);
  const [activeFloor, setActiveFloor] = useState<'ground' | 'terrace'>('ground');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-cyan-400 font-mono">Spatial Venue Navigator</span>
            <span aria-hidden="true">·</span>
            <span>{event.destination}</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Interactive Venue Floorplan & Wayfinding</h2>
          <p className="text-sm text-slate-300 mt-0.5">
            Real-time zone occupancy, plenary audio relays, breakout room allocation, and delegate navigation paths.
          </p>
        </div>

        {/* Floor switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveFloor('ground')}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              activeFloor === 'ground' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 1 (Ground & Lawns)
          </button>
          <button
            onClick={() => setActiveFloor('terrace')}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              activeFloor === 'terrace' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Level 2 (Executive Majlis)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Visual Stage */}
        <div className="lg:col-span-2 relative min-h-[440px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
          {/* Subtle architectural grid pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Map Top Status */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>NORTH ORIENTATION · GPS LOCKED</span>
            </div>
            <div className="text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              Scale 1:200m
            </div>
          </div>

          {/* Visual Floor Layout Shapes */}
          <div className="relative w-full h-[320px] my-auto">
            {/* Outline of building complex */}
            <div className="absolute inset-x-8 inset-y-4 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20 pointer-events-none" />

            {/* Stage / Plenary outline */}
            <div className="absolute top-[20%] left-[15%] w-[40%] h-[45%] border border-cyan-500/20 rounded-xl bg-cyan-950/10 pointer-events-none flex items-center justify-center">
              <span className="text-[10px] text-cyan-600/60 uppercase font-mono tracking-widest">Main Plenary Stage</span>
            </div>

            {/* Dining Courtyard outline */}
            <div className="absolute top-[18%] right-[12%] w-[32%] h-[40%] border border-amber-500/20 rounded-xl bg-amber-950/10 pointer-events-none flex items-center justify-center">
              <span className="text-[10px] text-amber-600/60 uppercase font-mono tracking-widest">Banquet Grounds</span>
            </div>

            {/* Breakout wing outline */}
            <div className="absolute bottom-[10%] left-[12%] w-[38%] h-[30%] border border-indigo-500/20 rounded-xl bg-indigo-950/10 pointer-events-none flex items-center justify-center">
              <span className="text-[10px] text-indigo-600/60 uppercase font-mono tracking-widest">Breakout Wing</span>
            </div>

            {/* Clickable Hotspot Pins */}
            {event.venueZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    left: `${zone.coords.x}%`,
                    top: `${zone.coords.y}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <div className={`p-2 rounded-full border shadow-lg transition-colors ${
                    isSelected 
                      ? 'bg-cyan-400 text-slate-950 border-white ring-4 ring-cyan-400/30' 
                      : 'bg-slate-900 text-cyan-400 border-cyan-500/40 hover:bg-slate-800'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap text-[10px] font-semibold px-2 py-0.5 rounded shadow-md pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800'
                  }`}>
                    {zone.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Footer helper */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-900">
            <span>Click any map pin to view real-time proceedings, occupancy and network keys</span>
            <span className="font-mono">{event.venueZones.length} Monitored Zones</span>
          </div>
        </div>

        {/* Selected Zone Detail Panel */}
        <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">Zone Details</span>
            <h3 className="text-lg font-bold text-white mt-1">{selectedZone.name}</h3>
            <span className="text-xs text-slate-400 capitalize">Type: {selectedZone.type} Hub</span>
          </div>

          {/* Current Live Agenda */}
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Currently In Session:</span>
            <div className="text-sm font-semibold text-white">{selectedZone.currentAgenda}</div>
          </div>

          {/* Occupancy Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Live Occupancy:
              </span>
              <span className="font-mono text-white">
                {selectedZone.currentOccupancy} / {selectedZone.capacity} Pax ({Math.round((selectedZone.currentOccupancy / selectedZone.capacity) * 100)}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full ${
                  (selectedZone.currentOccupancy / selectedZone.capacity) > 0.85 ? 'bg-amber-400' : 'bg-cyan-400'
                }`}
                style={{ width: `${(selectedZone.currentOccupancy / selectedZone.capacity) * 100}%` }}
              />
            </div>
          </div>

          {/* Connectivity & AV Spec */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80 text-xs">
            {selectedZone.wifiSsid && (
              <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-slate-200">Dedicated Wi-Fi SSID</div>
                    <div className="font-mono text-[11px] text-slate-400">{selectedZone.wifiSsid}</div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Wi-Fi Key for ${selectedZone.wifiSsid} copied!`)}
                  className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                >
                  Copy Key
                </button>
              </div>
            )}

            {selectedZone.avSetup && (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  Onsite AV Infrastructure:
                </span>
                <p className="text-slate-300 font-mono text-[11px]">{selectedZone.avSetup}</p>
              </div>
            )}
          </div>

          {/* Wayfinding Action */}
          <button
            onClick={() => alert(`Turn-by-turn route to ${selectedZone.name} loaded on attendee navigation app!`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            Guide Me To This Zone
          </button>
        </div>
      </div>
    </div>
  );
};
