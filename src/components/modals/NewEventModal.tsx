import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, DollarSign, Plus } from 'lucide-react';
import { MiceEvent } from '../../types/mice';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (newEvent: MiceEvent) => void;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [name, setName] = useState('');
  const [clientName, setClientName] = useState('');
  const [destination, setDestination] = useState('');
  const [paxCount, setPaxCount] = useState<number>(200);
  const [startDate, setStartDate] = useState('2027-05-10');
  const [durationNights, setDurationNights] = useState<number>(3);
  const [budgetPerPax, setBudgetPerPax] = useState<number>(65000);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !destination || !clientName) return;

    const total = paxCount * budgetPerPax;

    const newEvent: MiceEvent = {
      id: `mice-${Date.now()}`,
      name,
      clientName,
      clientContact: 'Operations Lead',
      destination,
      paxCount,
      startDate,
      endDate: '2027-05-13',
      durationNights,
      budgetTotal: total,
      budgetPerPax,
      currency: 'INR',
      status: 'draft',
      heroImage: '/src/assets/images/delhi_convention_1793044681027.jpg',
      description: description || `Corporate MICE gathering for ${paxCount} delegates in ${destination}.`,
      inclusions: [
        'Roundtrip group transit & airport meet-and-assist',
        `${durationNights} Nights 5-Star accommodation with breakfast`,
        'Master Plenary Convention Hall with LED Staging',
        'Gala Dinner with entertainment & open bar',
        'Delegate welcome kits & digital RFID passes'
      ],
      exclusions: [
        'Individual room incidentals & laundry',
        'Private airport transfers outside scheduled group coach'
      ],
      hotelOptions: [
        {
          id: `hotel-${Date.now()}`,
          name: `${destination.split(',')[0]} Grand Resort`,
          category: '5-Star Luxury',
          location: destination,
          roomTypes: ['Deluxe King', 'Twin Executive'],
          costPerNightPerPax: Math.round(budgetPerPax * 0.4 / durationNights),
          totalRoomsBlocked: Math.round(paxCount * 0.6),
          rating: 4.8,
          amenities: ['Grand Ballroom', 'Pool', 'High-Speed Wi-Fi'],
          selected: true
        }
      ],
      travelOptions: [
        {
          id: `travel-${Date.now()}`,
          type: 'commercial_flight',
          operator: 'Commercial Airline Group Block',
          route: `Origin Hub ➔ ${destination}`,
          departureTime: '10 May, 09:00 AM',
          arrivalTime: '10 May, 12:30 PM',
          capacity: paxCount,
          costPerPax: Math.round(budgetPerPax * 0.35),
          includedLuggage: '20kg Check-in + 7kg Cabin',
          selected: true
        }
      ],
      itinerary: [
        {
          id: `itin-new-1`,
          dayNumber: 1,
          date: '10 May 2027',
          time: '12:30 - 15:00',
          title: 'Delegate Arrival & Check-in',
          description: 'Airport escort transfer and express digital pass room check-in.',
          location: 'Main Hotel Reception',
          type: 'transfer'
        },
        {
          id: `itin-new-2`,
          dayNumber: 1,
          date: '10 May 2027',
          time: '19:00 - 22:30',
          title: 'Welcome Fellowship Dinner',
          description: 'Networking cocktail reception and keynote address.',
          location: 'Grand Ballroom',
          type: 'gala'
        }
      ],
      attendees: [
        {
          id: `att-new-1`,
          name: 'Executive Delegate',
          email: 'delegate@client.com',
          phone: '+91 98000 00000',
          organization: clientName,
          designation: 'Director',
          city: 'Mumbai',
          rsvpStatus: 'confirmed',
          roomAllocation: 'Suite 101',
          flightStatus: 'Group Block Confirmed',
          dietaryPreference: 'Vegetarian',
          docStatus: 'verified',
          checkedIn: false
        }
      ],
      notifications: [
        {
          id: `notif-new-1`,
          title: 'Welcome to MICE Portal',
          message: 'Your registration is in draft. Please verify your details.',
          targetAudience: 'all',
          channels: ['push'],
          sentAt: 'Just Now',
          deliveredCount: paxCount,
          openRate: '100%'
        }
      ],
      venueZones: [
        {
          id: `zone-new-1`,
          name: 'Plenary Main Arena',
          type: 'hall',
          capacity: paxCount,
          currentOccupancy: 0,
          currentAgenda: 'Setup & Soundcheck',
          coords: { x: 50, y: 50 }
        }
      ],
      budgetForecast: {
        baseCostPerPax: budgetPerPax,
        flightEstimate: total * 0.35,
        hotelEstimate: total * 0.40,
        fnbEstimate: total * 0.15,
        avAndGalaEstimate: total * 0.10,
        contingencyBufferPercent: 5.0,
        currencyDriftPercent: 0,
        predictedPaxVariance: 0
      }
    };

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white">Create New MICE Proposal</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Event / Conclave Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Annual Global Partner Summit 2027"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Client / Corporate Sponsor</label>
              <input
                type="text"
                required
                placeholder="e.g. Tech Mahindra / HSBC"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Destination City & Country</label>
              <input
                type="text"
                required
                placeholder="e.g. Udaipur, India or Bali, Indonesia"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Headcount (Pax)</label>
              <input
                type="number"
                min="10"
                max="5000"
                required
                value={paxCount}
                onChange={(e) => setPaxCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Duration (Nights)</label>
              <input
                type="number"
                min="1"
                max="14"
                required
                value={durationNights}
                onChange={(e) => setDurationNights(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Budget / Pax (INR)</label>
              <input
                type="number"
                min="5000"
                required
                value={budgetPerPax}
                onChange={(e) => setBudgetPerPax(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Event Concept & Brief</label>
            <textarea
              rows={2}
              placeholder="Key objectives, keynote requirements, theme..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              Total Budget: <strong className="text-cyan-400 font-mono">INR {(paxCount * budgetPerPax).toLocaleString()}</strong>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg cursor-pointer"
              >
                Create Proposal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
