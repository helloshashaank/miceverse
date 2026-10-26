import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  Sliders, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  ShieldAlert, 
  DollarSign, 
  Percent, 
  RefreshCw 
} from 'lucide-react';
import { MiceEvent } from '../../types/mice';

interface PredictiveBudgetViewProps {
  event: MiceEvent;
  onUpdateEvent: (updated: MiceEvent) => void;
}

export const PredictiveBudgetView: React.FC<PredictiveBudgetViewProps> = ({ event, onUpdateEvent }) => {
  const [paxVariance, setPaxVariance] = useState<number>(event.budgetForecast.predictedPaxVariance || 0);
  const [contingencyBuffer, setContingencyBuffer] = useState<number>(event.budgetForecast.contingencyBufferPercent || 5);
  const [currencyDrift, setCurrencyDrift] = useState<number>(event.budgetForecast.currencyDriftPercent || 0);
  const [fuelInflation, setFuelInflation] = useState<number>(3.5);

  // Dynamic recalculation
  const effectivePax = Math.round(event.paxCount * (1 + paxVariance / 100));
  const baseTotal = event.budgetForecast.flightEstimate + 
                    event.budgetForecast.hotelEstimate + 
                    event.budgetForecast.fnbEstimate + 
                    event.budgetForecast.avAndGalaEstimate;

  const paxScalingFactor = effectivePax / event.paxCount;
  
  // Hotel and F&B scale with pax; charter flight is mostly fixed with fuel variance
  const adjustedHotel = event.budgetForecast.hotelEstimate * paxScalingFactor;
  const adjustedFnb = event.budgetForecast.fnbEstimate * paxScalingFactor;
  const adjustedFlight = event.budgetForecast.flightEstimate * (1 + fuelInflation / 100);
  const adjustedAv = event.budgetForecast.avAndGalaEstimate; // mostly fixed staging

  const subtotalAdjusted = adjustedHotel + adjustedFnb + adjustedFlight + adjustedAv;
  const currencyImpact = subtotalAdjusted * (currencyDrift / 100);
  const contingencyAmount = (subtotalAdjusted + currencyImpact) * (contingencyBuffer / 100);
  
  const projectedTotal = subtotalAdjusted + currencyImpact + contingencyAmount;
  const projectedPerPax = Math.round(projectedTotal / effectivePax);
  const varianceFromCap = projectedTotal - event.budgetTotal;
  const percentDelta = ((varianceFromCap / event.budgetTotal) * 100).toFixed(1);

  const resetSimulation = () => {
    setPaxVariance(event.budgetForecast.predictedPaxVariance);
    setContingencyBuffer(event.budgetForecast.contingencyBufferPercent);
    setCurrencyDrift(event.budgetForecast.currencyDriftPercent);
    setFuelInflation(3.5);
  };

  return (
    <div className="space-y-8">
      {/* Header & Simulation status */}
      <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 font-mono">Predictive AI Financial Model</span>
              <span aria-hidden="true">·</span>
              <span>Monte Carlo Volatility Simulation</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Predictive Budget & Exposure Forecasting</h2>
            <p className="text-sm text-slate-300 mt-0.5">
              Simulate Pax attendance swings, foreign exchange drift, aviation fuel surcharges, and room yield variances.
            </p>
          </div>

          <button
            onClick={resetSimulation}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            Reset Defaults
          </button>
        </div>

        {/* 4 Key Financial KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Contracted Cap</span>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {event.currency} {(event.budgetTotal).toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Base: {event.currency} {event.budgetPerPax.toLocaleString()} / pax</span>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Projected Total Cost</span>
            <div className={`text-lg font-bold font-mono mt-1 ${varianceFromCap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {event.currency} {Math.round(projectedTotal).toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Effective: {effectivePax} pax</span>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Projected Per-Pax Cost</span>
            <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
              {event.currency} {projectedPerPax.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Delta: {projectedPerPax > event.budgetPerPax ? '+' : ''}{(projectedPerPax - event.budgetPerPax).toLocaleString()}</span>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Variance Exposure</span>
            <div className="flex items-center gap-1.5 mt-1">
              {varianceFromCap > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-amber-400" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-emerald-400" />
              )}
              <span className={`text-lg font-bold font-mono ${varianceFromCap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {percentDelta}%
              </span>
            </div>
            <span className="text-[11px] text-slate-500">
              {varianceFromCap > 0 ? 'Exceeds contract buffer' : 'Within sanctioned limit'}
            </span>
          </div>
        </div>
      </div>

      {/* Sensitivity Parameter Sliders */}
      <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Dynamic Volatility Simulator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider 1: Pax Variance */}
          <div className="space-y-2 p-4 bg-slate-950/40 rounded-lg border border-slate-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Participant Attendance Swing</span>
              <span className="font-mono text-cyan-400">{paxVariance > 0 ? `+${paxVariance}%` : `${paxVariance}%`} ({effectivePax} Pax)</span>
            </div>
            <input
              type="range"
              min="-15"
              max="20"
              step="1"
              value={paxVariance}
              onChange={(e) => setPaxVariance(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>-15% Drop-off</span>
              <span>Target (200 Pax)</span>
              <span>+20% Surge</span>
            </div>
          </div>

          {/* Slider 2: Contingency Buffer */}
          <div className="space-y-2 p-4 bg-slate-950/40 rounded-lg border border-slate-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Emergency Contingency Buffer</span>
              <span className="font-mono text-cyan-400">{contingencyBuffer}% ({event.currency} {Math.round(contingencyAmount).toLocaleString()})</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={contingencyBuffer}
              onChange={(e) => setContingencyBuffer(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Lean (2%)</span>
              <span>Recommended (5-7%)</span>
              <span>Maximum (15%)</span>
            </div>
          </div>

          {/* Slider 3: Fuel Surcharges & Airport Tariffs */}
          <div className="space-y-2 p-4 bg-slate-950/40 rounded-lg border border-slate-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Aviation Fuel & Surcharge Drift</span>
              <span className="font-mono text-cyan-400">+{fuelInflation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={fuelInflation}
              onChange={(e) => setFuelInflation(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>0% Locked</span>
              <span>Moderate (3-5%)</span>
              <span>High Peak (12%)</span>
            </div>
          </div>

          {/* Slider 4: FX Currency Drift */}
          <div className="space-y-2 p-4 bg-slate-950/40 rounded-lg border border-slate-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Foreign Exchange & Cross-Border Drift</span>
              <span className="font-mono text-cyan-400">+{currencyDrift}% ({event.currency} {Math.round(currencyImpact).toLocaleString()})</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.2"
              value={currencyDrift}
              onChange={(e) => setCurrencyDrift(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Domestic (0%)</span>
              <span>THB / USD Buffer (4%)</span>
              <span>Max Volatility (10%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Component Allocation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white">Adjusted Cost Categories</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Hotel & Luxury Stays</span>
                <span className="font-mono text-white">{event.currency} {Math.round(adjustedHotel).toLocaleString()}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-cyan-400" 
                  style={{ width: `${(adjustedHotel / projectedTotal) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Air Charter & Flights Block</span>
                <span className="font-mono text-white">{event.currency} {Math.round(adjustedFlight).toLocaleString()}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-indigo-400" 
                  style={{ width: `${(adjustedFlight / projectedTotal) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Gourmet Catering & Gala Dinners</span>
                <span className="font-mono text-white">{event.currency} {Math.round(adjustedFnb).toLocaleString()}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-amber-400" 
                  style={{ width: `${(adjustedFnb / projectedTotal) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>Staging, AV & Desert/Island Experiences</span>
                <span className="font-mono text-white">{event.currency} {Math.round(adjustedAv).toLocaleString()}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-400" 
                  style={{ width: `${(adjustedAv / projectedTotal) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-slate-300">
                <span>FX Drift & Contingency Reserves</span>
                <span className="font-mono text-white">{event.currency} {Math.round(contingencyAmount + currencyImpact).toLocaleString()}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-rose-400" 
                  style={{ width: `${((contingencyAmount + currencyImpact) / projectedTotal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Predictive Recommendations */}
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">AI Budget Optimization Insights</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="font-semibold text-cyan-300">Room Block Cut-off Optimization:</span>
              <p className="text-slate-400 mt-1">
                Release 10 unallocated rooms by D-14 to save up to {event.currency} 5,70,000 without incurring hotel attrition penalties.
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="font-semibold text-cyan-300">Aviation Fuel Hedge Advisory:</span>
              <p className="text-slate-400 mt-1">
                Lock in charter group fuel rate agreement now to safeguard against projected +3.5% aviation turbine fuel hike expected next month.
              </p>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="font-semibold text-cyan-300">F&B Minimum Guarantee (MG):</span>
              <p className="text-slate-400 mt-1">
                Set final headcount guarantee 72 hours before arrival to prevent overbilling on non-arriving delegates (potential savings: ~{event.currency} 2,10,000).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
