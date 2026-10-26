import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Cpu, 
  WifiOff, 
  Layers, 
  CheckCircle2, 
  Code, 
  Sparkles, 
  Compass, 
  Share2, 
  ArrowRight 
} from 'lucide-react';

export const FeatureBlueprintView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'schema' | 'architecture' | 'cases'>('features');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="text-cyan-400 font-mono">Engineering Specification Document</span>
          <span aria-hidden="true">·</span>
          <span>Node.js · React · PostgreSQL Architecture</span>
        </div>
        <h1 className="text-2xl font-bold text-white">MICE Platform Feature Blueprint & System Architecture</h1>
        <p className="text-sm text-slate-300">
          Detailed feature prioritization, relational schema, zero-knowledge encryption protocols, offline-first sync pipelines, and predictive algorithms designed for enterprise corporate travel.
        </p>

        {/* Blueprint Sub-navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('features')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'features'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            01. Prioritized Feature Matrix
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'schema'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            02. PostgreSQL Schema & DDL
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            03. Security, Offline & AI Pipeline
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            04. Case Studies Comparative Specs
          </button>
        </div>
      </div>

      {/* Tab 1: Prioritized Feature Matrix */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* P0 */}
            <div className="p-5 bg-slate-900/50 border border-cyan-500/30 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-cyan-400">PHASE 1 · P0 ESSENTIALS</span>
                <span className="text-[10px] text-slate-500">MVP Baseline</span>
              </div>
              <h3 className="text-base font-bold text-white">Core Proposals & Logistics Registry</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Proposal & Contract Engine:</strong> Inclusions, Exclusions, client quotation generators.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Hotel & Travel Inventory Blocks:</strong> Group charters, airline group PNRs, room tier allocation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Real-Time RSVP & Manifests:</strong> Confirmed, pending, dietary tags, onsite check-in tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Dynamic Master Itinerary:</strong> Multi-day schedules, dress codes, speaker logistics.</span>
                </li>
              </ul>
            </div>

            {/* P1 */}
            <div className="p-5 bg-slate-900/50 border border-indigo-500/30 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-indigo-400">PHASE 2 · P1 INTELLIGENCE</span>
                <span className="text-[10px] text-slate-500">Operational Automation</span>
              </div>
              <h3 className="text-base font-bold text-white">Predictive AI & Multi-Channel Broadcast</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Predictive Budget Forecaster:</strong> Pax volatility simulator, FX drift buffer, fuel inflation hedges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Encrypted KYC & ID Vault:</strong> Zero-knowledge AES-256 storage for Passports, Visas, and Aadhaar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Targeted Push Broadcast Hub:</strong> Instant logistics dispatch via Web Push, SMS & WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span><strong>Interactive Venue Wayfinding:</strong> 2D/3D map floorplans with live occupancy and audio pins.</span>
                </li>
              </ul>
            </div>

            {/* P2 */}
            <div className="p-5 bg-slate-900/50 border border-emerald-500/30 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-emerald-400">PHASE 3 · P2 MOBILITY</span>
                <span className="text-[10px] text-slate-500">Resilience & Network</span>
              </div>
              <h3 className="text-base font-bold text-white">Offline PWA & Attendee Experience</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Offline PWA Engine:</strong> Local IndexedDB caching of passes, local language addresses, and emergency hotlines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Attendee Digital RFID Pass:</strong> Mobile wallet compatible QR badges for 5-second airport & bus gates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Social Viral Sharing:</strong> One-click verified LinkedIn, Twitter & WhatsApp attendance badges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Post-Event Media & Survey:</strong> Instant feedback collection and expense audit trail.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: PostgreSQL Schema */}
      {activeTab === 'schema' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Relational PostgreSQL Data Model (Postgres 16+)
            </h3>
            <p className="text-xs text-slate-300">
              Normalized tables with UUID primary keys, JSONB for dynamic metadata, and foreign key constraints.
            </p>
          </div>

          <pre className="p-5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`-- 1. MICE Events & Master Contracts
CREATE TABLE mice_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    pax_capacity INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_nights INT NOT NULL,
    contract_budget_total NUMERIC(14, 2) NOT NULL,
    budget_currency VARCHAR(3) DEFAULT 'INR',
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    inclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
    exclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Hotels & Accommodation Group Blocks
CREATE TABLE mice_hotel_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES mice_events(id) ON DELETE CASCADE,
    hotel_name VARCHAR(255) NOT NULL,
    star_category VARCHAR(64) NOT NULL,
    address TEXT NOT NULL,
    rooms_blocked INT NOT NULL,
    cost_per_night_pax NUMERIC(10, 2) NOT NULL,
    is_selected BOOLEAN DEFAULT false,
    amenities TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- 3. Travel Transit & Flight Charters
CREATE TABLE mice_travel_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES mice_events(id) ON DELETE CASCADE,
    transit_type VARCHAR(64) NOT NULL, -- 'flight_charter', 'commercial_group', 'coach', 'speed_boat'
    operator VARCHAR(255) NOT NULL,
    origin_route VARCHAR(255) NOT NULL,
    destination_route VARCHAR(255) NOT NULL,
    departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
    arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
    capacity INT NOT NULL,
    cost_per_pax NUMERIC(10, 2) NOT NULL,
    is_selected BOOLEAN DEFAULT true
);

-- 4. Attendees & RSVP Manifest
CREATE TABLE mice_attendees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES mice_events(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    designation VARCHAR(128) NOT NULL,
    origin_city VARCHAR(128) NOT NULL,
    rsvp_status VARCHAR(32) DEFAULT 'pending', -- 'confirmed', 'pending', 'waitlist', 'declined'
    room_allocation VARCHAR(128),
    assigned_flight_pnr VARCHAR(64),
    dietary_preference VARCHAR(64) DEFAULT 'Vegetarian',
    checked_in BOOLEAN DEFAULT false,
    checked_in_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Encrypted KYC Document Vault (Zero-Knowledge)
CREATE TABLE mice_attendee_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attendee_id UUID REFERENCES mice_attendees(id) ON DELETE CASCADE,
    doc_type VARCHAR(64) NOT NULL, -- 'passport', 'aadhaar', 'thai_visa', 'travel_insurance'
    doc_status VARCHAR(32) DEFAULT 'pending_review',
    encrypted_payload_hash VARCHAR(255) NOT NULL, -- SHA-256 digest
    encryption_algorithm VARCHAR(32) DEFAULT 'AES-256-GCM',
    verified_by_user UUID,
    verified_at TIMESTAMP WITH TIME ZONE
);

-- 6. Dynamic Day-by-Day Itinerary Nodes
CREATE TABLE mice_itinerary_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES mice_events(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    session_start_time VARCHAR(16) NOT NULL,
    session_end_time VARCHAR(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location_zone VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    dress_code VARCHAR(128)
);`}
          </pre>
        </div>
      )}

      {/* Tab 3: Security & Offline Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">AES-256 Zero-Knowledge Encryption</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Personal identity documents (Indian Aadhaar, Passport bio-pages, Thai eVisa stamping certificates) undergo client-side Web Crypto API AES-256-GCM envelope encryption before uploading. Only designated travel coordinators with hardware FIPS 140-2 Level 3 keys can decrypt the files for flight manifests.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
                Key Derivation: PBKDF2 (100,000 iterations, SHA-512)
                <br />Cipher: AES-256-GCM with 96-bit initialization vector
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Offline PWA & Desert Resilience</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When delegates are in remote zones (Sam Sand Dunes Jaisalmer or Krabi Marine Archipelago) where 4G/5G signal drops, the Service Worker serves pre-cached digital boarding passes, venue floorplans, and offline emergency survival guides with hotel addresses in regional Hindi/Thai scripts.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300">
                Storage: IndexedDB & CacheStorage (Offline First)
                <br />Sync: BackgroundSync API on network reconnection
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 3 Case Studies Comparative Analysis */}
      {activeTab === 'cases' && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-6">
          <h3 className="text-base font-bold text-white">Cross-Case Operational Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 font-mono text-slate-400 uppercase">
                <tr>
                  <th className="py-3 px-4">Dimension</th>
                  <th className="py-3 px-4 text-cyan-400">1. Jaisalmer Conclave</th>
                  <th className="py-3 px-4 text-indigo-400">2. Phuket & Krabi Incentive</th>
                  <th className="py-3 px-4 text-emerald-400">3. Delhi Rotary Conference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Pax Size</td>
                  <td className="py-3 px-4 font-mono text-slate-200">200 Pax</td>
                  <td className="py-3 px-4 font-mono text-slate-200">200 Pax</td>
                  <td className="py-3 px-4 font-mono text-slate-200">400 Pax</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Duration</td>
                  <td className="py-3 px-4 text-slate-300">2 Nights / 3 Days (08 Feb)</td>
                  <td className="py-3 px-4 text-slate-300">4 Nights / 5 Days</td>
                  <td className="py-3 px-4 text-slate-300">2 Nights / 3 Days</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Transit Logistics</td>
                  <td className="py-3 px-4 text-slate-300">SpiceJet Boeing 737 Charter + Luxury Volvo</td>
                  <td className="py-3 px-4 text-slate-300">Thai Airways Block + Speedboat Catamaran</td>
                  <td className="py-3 px-4 text-slate-300">10x Electric Luxury Coaches + Air India Block</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Primary Venue</td>
                  <td className="py-3 px-4 text-slate-300">Suryagarh Palace & Private Sand Dunes</td>
                  <td className="py-3 px-4 text-slate-300">JW Marriott Mai Khao & Rayavadee Krabi</td>
                  <td className="py-3 px-4 text-slate-300">Pullman Grand Convention Arena Aerocity</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Key Risk Hedging</td>
                  <td className="py-3 px-4 text-slate-300">Desert Night Temperature & Aviation Slot</td>
                  <td className="py-3 px-4 text-slate-300">FX THB Currency Drift & Fast-track Visa KYC</td>
                  <td className="py-3 px-4 text-slate-300">High-throughput 400 Pax RFID Kiosk Check-in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
