import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  Briefcase, 
  Calendar 
} from 'lucide-react';
import { CorporateClient, CorporatePerson, MiceEvent } from '../../types/mice';

interface CorporateListingViewProps {
  corporates: CorporateClient[];
  persons: CorporatePerson[];
  events: MiceEvent[];
  onAddCorporate: (newCorp: CorporateClient) => void;
  onAddPerson: (newPerson: CorporatePerson) => void;
  onSelectEvent: (eventId: string) => void;
}

export const CorporateListingView: React.FC<CorporateListingViewProps> = ({
  corporates,
  persons,
  events,
  onAddCorporate,
  onAddPerson,
  onSelectEvent
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'companies' | 'persons'>('companies');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCorpFilter, setSelectedCorpFilter] = useState<string>('all');
  
  // Modals
  const [showAddCorpModal, setShowAddCorpModal] = useState(false);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [selectedCorpDetails, setSelectedCorpDetails] = useState<CorporateClient | null>(null);

  // New Corp Form
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newGstin, setNewGstin] = useState('');
  const [newPocName, setNewPocName] = useState('');
  const [newPocEmail, setNewPocEmail] = useState('');
  const [newPocPhone, setNewPocPhone] = useState('');
  const [newCity, setNewCity] = useState('');

  // New Person Form
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonCorpId, setNewPersonCorpId] = useState(corporates[0]?.id || '');
  const [newPersonDesignation, setNewPersonDesignation] = useState('');
  const [newPersonDept, setNewPersonDept] = useState('');
  const [newPersonEmail, setNewPersonEmail] = useState('');
  const [newPersonPhone, setNewPersonPhone] = useState('');
  const [newPersonVip, setNewPersonVip] = useState<CorporatePerson['vipGrade']>('delegate');
  const [newPersonCity, setNewPersonCity] = useState('');

  const handleCreateCorp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName || !newPocEmail) return;

    const newCorp: CorporateClient = {
      id: `corp-${Date.now()}`,
      companyName: newCompanyName,
      legalEntityName: `${newCompanyName} Pvt. Ltd.`,
      industry: newIndustry || 'Corporate Enterprise',
      gstin: newGstin || '27AAACG0000A1Z5',
      pan: newGstin ? newGstin.substring(2, 12) : 'AAACG0000A',
      headOfficeCity: newCity || 'Mumbai',
      travelDeskLeadName: newPocName || 'Travel Desk Lead',
      travelDeskEmail: newPocEmail,
      travelDeskPhone: newPocPhone || '+91 98000 00000',
      contractType: 'master_services_agreement',
      creditTerms: 'advance_milestone',
      lifetimeSpend: 0,
      activeTripsCount: 0,
      totalDelegatesTravelled: 0,
      status: 'active'
    };

    onAddCorporate(newCorp);
    setShowAddCorpModal(false);
    // Reset
    setNewCompanyName('');
    setNewIndustry('');
    setNewGstin('');
    setNewPocName('');
    setNewPocEmail('');
    setNewPocPhone('');
  };

  const handleCreatePerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonName || !newPersonEmail) return;

    const newPerson: CorporatePerson = {
      id: `cp-${Date.now()}`,
      corporateId: newPersonCorpId,
      fullName: newPersonName,
      designation: newPersonDesignation || 'Associate Director',
      department: newPersonDept || 'Operations',
      email: newPersonEmail,
      phone: newPersonPhone || '+91 98000 00000',
      vipGrade: newPersonVip,
      homeCity: newPersonCity || 'Mumbai',
      dietaryPreference: 'Vegetarian',
      isKycComplete: true,
      aadhaarMasked: '**** ' + Math.floor(1000 + Math.random() * 9000),
      assignedTripIds: []
    };

    onAddPerson(newPerson);
    setShowAddPersonModal(false);
    // Reset
    setNewPersonName('');
    setNewPersonDesignation('');
    setNewPersonDept('');
    setNewPersonEmail('');
    setNewPersonPhone('');
  };

  const filteredCorporates = corporates.filter(c => 
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.headOfficeCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPersons = persons.filter(p => {
    const matchSearch = p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCorp = selectedCorpFilter === 'all' || p.corporateId === selectedCorpFilter;
    return matchSearch && matchCorp;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-cyan-400 font-mono font-semibold">B2B Corporate Travel Desk</span>
            <span aria-hidden="true">·</span>
            <span>Accounts & Employee Roster Management</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Corporate Client Accounts & Personnel Directory</h2>
          <p className="text-sm text-slate-300 mt-0.5">
            Manage enterprise client entities, master services agreements, travel desk points of contact, and delegate rosters.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setShowAddCorpModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Corporate Account
          </button>
          <button
            onClick={() => setShowAddPersonModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            Add Person / Employee
          </button>
        </div>
      </div>

      {/* Sub-tabs: Companies vs Persons */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('companies')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'companies'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Corporate Accounts ({corporates.length})
          </button>
          <button
            onClick={() => setActiveSubTab('persons')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'persons'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Employees & Delegates ({persons.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={activeSubTab === 'companies' ? "Search companies, cities..." : "Search persons, emails..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* View 1: Corporate Companies Listing */}
      {activeSubTab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCorporates.map((corp) => {
            const corpTrips = events.filter(e => 
              e.clientName.toLowerCase().includes(corp.companyName.toLowerCase().split(' ')[0]) ||
              corp.id === e.corporateClientId
            );

            return (
              <div
                key={corp.id}
                className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                      {corp.contractType.replace(/_/g, ' ')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{corp.companyName}</h3>
                    <p className="text-xs text-slate-400">{corp.industry}</p>
                    <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                      GSTIN: {corp.gstin} · {corp.headOfficeCity}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active Client
                  </span>
                </div>

                {/* POC & Credit Terms Strip */}
                <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Travel Desk Lead</span>
                    <div className="font-semibold text-slate-200 mt-0.5">{corp.travelDeskLeadName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{corp.travelDeskPhone}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Payment Terms</span>
                    <div className="font-semibold text-cyan-300 mt-0.5 capitalize font-mono">
                      {corp.creditTerms.replace(/_/g, ' ')}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Spend: ₹{(corp.lifetimeSpend / 10000000).toFixed(1)} Cr
                    </div>
                  </div>
                </div>

                {/* Linked Trips & Actions */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    Active Conclaves: <strong className="text-white font-mono">{corpTrips.length} Projects</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {corpTrips.length > 0 && (
                      <button
                        onClick={() => onSelectEvent(corpTrips[0].id)}
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                      >
                        <span>Open Trip Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedCorpDetails(corp)}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Corporate Persons Listing */}
      {activeSubTab === 'persons' && (
        <div className="space-y-4">
          {/* Corporate Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 whitespace-nowrap">Filter by Corporate:</span>
            <button
              onClick={() => setSelectedCorpFilter('all')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap ${
                selectedCorpFilter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Corporates ({persons.length})
            </button>
            {corporates.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCorpFilter(c.id)}
                className={`px-3 py-1 rounded-lg border whitespace-nowrap ${
                  selectedCorpFilter === c.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {c.companyName.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Persons Table */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Employee / Delegate</th>
                  <th className="py-3 px-4">Corporate Account</th>
                  <th className="py-3 px-4">VIP Grade</th>
                  <th className="py-3 px-4">KYC & Passport</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Assigned Trips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredPersons.map(person => {
                  const corp = corporates.find(c => c.id === person.corporateId);
                  return (
                    <tr key={person.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{person.fullName}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{person.designation} · {person.department}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{person.homeCity}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-slate-200 font-medium">{corp?.companyName || 'Corporate'}</div>
                        <span className="text-[10px] text-slate-400 font-mono">{corp?.headOfficeCity}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          person.vipGrade === 'c_suite' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          person.vipGrade === 'vp_director' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                          'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {person.vipGrade.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-200 text-[11px]">
                          {person.passportNumber ? `Pass: ${person.passportNumber}` : person.aadhaarMasked ? `Aadhaar: ${person.aadhaarMasked}` : 'KYC Submitted'}
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          Encrypted Token
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-300 text-[11px]">{person.email}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{person.phone}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {person.assignedTripIds.map((tid, idx) => {
                            const ev = events.find(e => e.id === tid);
                            return (
                              <button
                                key={idx}
                                onClick={() => onSelectEvent(tid)}
                                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded text-[10px] font-mono border border-slate-700 cursor-pointer"
                              >
                                {ev ? ev.name.split(':')[0].slice(0, 15) : 'Trip Assigned'}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Corporate Account */}
      {showAddCorpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Register Corporate Client Account</h3>
              <button onClick={() => setShowAddCorpModal(false)} className="text-slate-400 hover:text-white text-xs">
                ESC
              </button>
            </div>

            <form onSubmit={handleCreateCorp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Company / Corporate Entity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Larsen & Toubro Infotech"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Industry Sector</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering & IT"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">GSTIN Tax Registration</label>
                  <input
                    type="text"
                    placeholder="e.g. 27AAACL1290K1Z9"
                    value={newGstin}
                    onChange={(e) => setNewGstin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Head Office City</label>
                  <input
                    type="text"
                    placeholder="Mumbai / Delhi / Bengaluru"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Travel Desk Lead Name</label>
                  <input
                    type="text"
                    placeholder="Head of Procurement / Travel"
                    value={newPocName}
                    onChange={(e) => setNewPocName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Travel Desk Email</label>
                  <input
                    type="email"
                    required
                    placeholder="traveldesk@company.com"
                    value={newPocEmail}
                    onChange={(e) => setNewPocEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Official Mobile / Direct</label>
                  <input
                    type="text"
                    placeholder="+91 98000 00000"
                    value={newPocPhone}
                    onChange={(e) => setNewPocPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCorpModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg"
                >
                  Save Corporate Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Person / Employee */}
      {showAddPersonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Corporate Person / Delegate</h3>
              <button onClick={() => setShowAddPersonModal(false)} className="text-slate-400 hover:text-white text-xs">
                ESC
              </button>
            </div>

            <form onSubmit={handleCreatePerson} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Corporate Client Organization</label>
                <select
                  value={newPersonCorpId}
                  onChange={(e) => setNewPersonCorpId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {corporates.map(c => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. VP Marketing / Dealer"
                    value={newPersonDesignation}
                    onChange={(e) => setNewPersonDesignation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">VIP Protocol Tier</label>
                  <select
                    value={newPersonVip}
                    onChange={(e) => setNewPersonVip(e.target.value as CorporatePerson['vipGrade'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="c_suite">C-Suite (Chairman/MD/President)</option>
                    <option value="vp_director">VP / Director Tier</option>
                    <option value="manager">Manager / Lead Tier</option>
                    <option value="delegate">General Delegate / Dealer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="person@company.com"
                    value={newPersonEmail}
                    onChange={(e) => setNewPersonEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98000 00000"
                    value={newPersonPhone}
                    onChange={(e) => setNewPersonPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddPersonModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg"
                >
                  Save Person Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Corporate Details Drawer */}
      {selectedCorpDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">{selectedCorpDetails.companyName}</h3>
              <button onClick={() => setSelectedCorpDetails(null)} className="text-slate-400 hover:text-white text-xs">
                CLOSE
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Legal Entity:</span>
                <div className="font-semibold text-white">{selectedCorpDetails.legalEntityName}</div>
                <div className="font-mono text-cyan-300">GSTIN: {selectedCorpDetails.gstin} · PAN: {selectedCorpDetails.pan}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Contract Agreement:</span>
                  <div className="font-semibold text-white capitalize mt-0.5">{selectedCorpDetails.contractType.replace(/_/g, ' ')}</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Billing Terms:</span>
                  <div className="font-semibold text-cyan-300 capitalize mt-0.5">{selectedCorpDetails.creditTerms.replace(/_/g, ' ')}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">Account Notes:</span>
                <p className="text-slate-300 mt-1">{selectedCorpDetails.notes || 'Standard enterprise account protocol.'}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCorpDetails(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
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
