import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap, TrendingUp, CheckCircle2, Sun } from 'lucide-react';

export function ROICalculator({ onOpenQuoteModal }) {
  const [batchKg, setBatchKg] = useState(1000);
  const [cropType, setCropType] = useState('chilli');
  const [currentMethod, setCurrentMethod] = useState('sun');

  // ROI Math
  const cropData = {
    chilli: { name: 'Red Chilli', sunDays: 8, solarDays: 2.5, valPerKg: 180 },
    moringa: { name: 'Moringa Leaves', sunDays: 4, solarDays: 0.5, valPerKg: 350 },
    onion: { name: 'Onion Flakes', sunDays: 6, solarDays: 2, valPerKg: 120 },
    turmeric: { name: 'Turmeric Roots', sunDays: 14, solarDays: 4, valPerKg: 140 },
    fruit: { name: 'Mango / Fruit Leather', sunDays: 5, solarDays: 1.5, valPerKg: 400 }
  };

  const selectedCrop = cropData[cropType] || cropData.chilli;
  const daysSaved = selectedCrop.sunDays - selectedCrop.solarDays;

  // Fuel Savings calculation (approximate rupees)
  const monthlyElectricCost = (batchKg / 100) * 8500;
  const monthlySolarCost = monthlyElectricCost * 0.25; // 75% savings
  const monthlySavings = Math.round(monthlyElectricCost - monthlySolarCost);
  const annualSavings = monthlySavings * 12;

  // Approx machine cost estimate for ROI calculation
  const estMachineCost = batchKg * 450;
  const paybackMonths = Math.max(8, Math.round((estMachineCost / monthlySavings) * 10) / 10);

  return (
    <div className="bg-[#14532D] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-emerald-800">
      {/* Background Accent Graphics */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#F4B400] bg-emerald-950/70 px-3 py-1 rounded-full mb-2 border border-emerald-700/60">
              <Calculator className="w-3.5 h-3.5 mr-1 text-[#F4B400]" /> Interactive Financial Calculator
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Solar Dryer ROI & Savings Estimator
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Calculate your batch time reduction, monthly fuel bill savings, and payback period.
            </p>
          </div>

          <span className="text-xs font-bold text-[#F4B400] bg-emerald-900/90 px-3.5 py-2 rounded-xl border border-emerald-700/60">
            Average Payback: 10 - 14 Months
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Inputs Section (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 bg-emerald-900/50 p-5 sm:p-6 rounded-2xl border border-emerald-700/60">
            
            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
                1. Select Produce / Crop
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(cropData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setCropType(key)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-left flex items-center justify-between border cursor-pointer ${
                      cropType === key
                        ? 'bg-[#16A34A] text-white border-emerald-400 shadow-xs'
                        : 'bg-emerald-950/60 text-emerald-100 border-emerald-800 hover:bg-emerald-800/60'
                    }`}
                  >
                    <span>{cropData[key].name}</span>
                    {cropType === key && <CheckCircle2 className="w-3.5 h-3.5 text-[#F4B400]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Batch Capacity Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  2. Daily Batch Capacity (kg)
                </label>
                <span className="text-sm font-extrabold text-[#F4B400] bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-700/50">
                  {batchKg.toLocaleString()} kg / batch
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={batchKg}
                onChange={(e) => setBatchKg(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#16A34A]"
              />
              <div className="flex justify-between text-[10px] text-emerald-300 mt-1 font-mono">
                <span>100 kg</span>
                <span>1,000 kg</span>
                <span>2,500 kg</span>
                <span>5,000 kg</span>
              </div>
            </div>

            {/* Current Drying Method */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
                3. Current Drying Method
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setCurrentMethod('sun')}
                  className={`py-2 px-3 rounded-lg font-bold border cursor-pointer ${
                    currentMethod === 'sun'
                      ? 'bg-[#F4B400] text-slate-950 border-amber-300'
                      : 'bg-emerald-950/60 text-emerald-100 border-emerald-800 hover:bg-emerald-800/60'
                  }`}
                >
                  Open Sun Drying
                </button>
                <button
                  onClick={() => setCurrentMethod('electric')}
                  className={`py-2 px-3 rounded-lg font-bold border cursor-pointer ${
                    currentMethod === 'electric'
                      ? 'bg-[#F4B400] text-slate-950 border-amber-300'
                      : 'bg-emerald-950/60 text-emerald-100 border-emerald-800 hover:bg-emerald-800/60'
                  }`}
                >
                  Electric Heaters
                </button>
                <button
                  onClick={() => setCurrentMethod('diesel')}
                  className={`py-2 px-3 rounded-lg font-bold border cursor-pointer ${
                    currentMethod === 'diesel'
                      ? 'bg-[#F4B400] text-slate-950 border-amber-300'
                      : 'bg-emerald-950/60 text-emerald-100 border-emerald-800 hover:bg-emerald-800/60'
                  }`}
                >
                  Diesel / Furnace
                </button>
              </div>
            </div>

          </div>

          {/* Results Display Section (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#16A34A] to-[#14532D] p-6 sm:p-7 rounded-2xl border border-emerald-400/30 shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="border-b border-emerald-400/30 pb-3 flex justify-between items-center">
                <span className="text-xs text-emerald-100 font-semibold">Drying Time Comparison</span>
                <span className="text-xs font-bold text-slate-950 bg-[#F4B400] px-2 py-0.5 rounded">
                  {daysSaved} Days Faster!
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-emerald-950/50 p-3 rounded-xl border border-emerald-700/50">
                  <p className="text-[10px] text-emerald-200 uppercase font-semibold">Open Sun Drying</p>
                  <p className="text-xl font-extrabold text-white mt-1">{selectedCrop.sunDays} Days</p>
                </div>
                <div className="bg-emerald-900/80 p-3 rounded-xl border border-[#F4B400]/60">
                  <p className="text-[10px] text-[#F4B400] uppercase font-bold">Godas Solar Dryer</p>
                  <p className="text-xl font-extrabold text-[#F4B400] mt-1">{selectedCrop.solarDays} Days</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-100">Est. Monthly Fuel Savings:</span>
                  <span className="font-extrabold text-white text-sm font-mono">₹{monthlySavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-100">Est. Annual Cost Reduction:</span>
                  <span className="font-extrabold text-[#F4B400] text-base font-mono">₹{annualSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-emerald-400/30">
                  <span className="text-emerald-100 font-semibold">Estimated Payback Period:</span>
                  <span className="font-extrabold text-white text-xs bg-emerald-950 px-2.5 py-1 rounded">
                    ~ {paybackMonths} Months
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              className="w-full bg-[#F4B400] hover:bg-amber-400 text-slate-950 text-xs font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <Zap className="w-4 h-4 text-slate-900 group-hover:scale-125 transition-transform" />
              <span>Get Detailed ROI Technical Proposal</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
