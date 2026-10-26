import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Tag, 
  Sparkles, 
  ChevronRight, 
  Shirt, 
  UserCheck, 
  Trash2 
} from 'lucide-react';
import { MiceEvent, ItineraryItem } from '../../types/mice';

interface ItineraryBuilderViewProps {
  event: MiceEvent;
  onUpdateEvent: (updated: MiceEvent) => void;
}

export const ItineraryBuilderView: React.FC<ItineraryBuilderViewProps> = ({ event, onUpdateEvent }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New item form state
  const [newItemTime, setNewItemTime] = useState('');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemLoc, setNewItemLoc] = useState('');
  const [newItemType, setNewItemType] = useState<ItineraryItem['type']>('conference');
  const [newItemDress, setNewItemDress] = useState('Smart Casual');

  // Days list
  const totalDays = event.durationNights + 1;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  const filteredItems = event.itinerary.filter(item => item.dayNumber === selectedDay);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle || !newItemTime) return;

    const newItem: ItineraryItem = {
      id: `itin-custom-${Date.now()}`,
      dayNumber: selectedDay,
      date: `Day ${selectedDay}`,
      time: newItemTime,
      title: newItemTitle,
      description: newItemDesc,
      location: newItemLoc || 'Venue Grounds',
      type: newItemType,
      dressCode: newItemDress
    };

    onUpdateEvent({
      ...event,
      itinerary: [...event.itinerary, newItem]
    });

    // Reset
    setNewItemTime('');
    setNewItemTitle('');
    setNewItemDesc('');
    setNewItemLoc('');
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateEvent({
      ...event,
      itinerary: event.itinerary.filter(item => item.id !== id)
    });
  };

  const getTypeBadge = (type: ItineraryItem['type']) => {
    switch (type) {
      case 'transfer':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'gala':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'conference':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'activity':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'dining':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900/70 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-cyan-400 font-mono">Automated Travel Itinerary Engine</span>
            <span aria-hidden="true">·</span>
            <span>{event.itinerary.length} Total Agenda Nodes</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Multi-Day Master Itinerary & Operations Schedule</h2>
          <p className="text-sm text-slate-300 mt-0.5">
            Synchronized logistics, attendee briefing schedules, AV cues, and group movement tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Schedule Node
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {daysArray.map(day => {
          const count = event.itinerary.filter(item => item.dayNumber === day).length;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                selectedDay === day
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 font-semibold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Day {day}</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {count} Events
              </span>
            </button>
          );
        })}
      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/30 border border-slate-800 rounded-xl">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-300">No events scheduled for Day {selectedDay}</h4>
            <p className="text-xs text-slate-500 mt-1">Click "Add Schedule Node" to create an itinerary event.</p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/40">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    <span className={`text-[11px] font-medium capitalize px-2 py-0.5 rounded border ${getTypeBadge(item.type)}`}>
                      {item.type}
                    </span>
                    {item.dressCode && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        <Shirt className="w-3 h-3 text-slate-400" />
                        {item.dressCode}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white pt-1">{item.title}</h3>
                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {item.location}
                    </span>
                    {item.speakerOrLead && (
                      <span className="flex items-center gap-1 text-slate-300">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                        Host: {item.speakerOrLead}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Schedule Node (Day {selectedDay})</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ESC
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Time Range (e.g. 14:00 - 16:30)</label>
                <input
                  type="text"
                  required
                  placeholder="10:00 - 11:30"
                  value={newItemTime}
                  onChange={(e) => setNewItemTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Session / Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="Keynote or Gala Banquet"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value as ItineraryItem['type'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="conference">Conference / Keynote</option>
                    <option value="gala">Gala / Awards</option>
                    <option value="transfer">Transit / Flight</option>
                    <option value="activity">Activity / Tour</option>
                    <option value="dining">Dining / Lunch</option>
                    <option value="networking">Networking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Dress Code</label>
                  <input
                    type="text"
                    placeholder="Smart Casual / Black Tie"
                    value={newItemDress}
                    onChange={(e) => setNewItemDress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Location / Room</label>
                <input
                  type="text"
                  placeholder="Grand Ballroom / Poolside Lawn"
                  value={newItemLoc}
                  onChange={(e) => setNewItemLoc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description & AV Brief</label>
                <textarea
                  rows={3}
                  placeholder="Brief details of proceedings, speakers, or logistical transfers..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg"
                >
                  Save Itinerary Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
