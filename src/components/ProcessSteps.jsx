import React from 'react';
import { 
  Calculator, DraftingCompass, Factory, CheckSquare, Truck, GraduationCap 
} from 'lucide-react';
import { processSteps } from '../data/process';
import { RevealOnScroll, RevealItem } from './RevealOnScroll';

const iconMap = {
  Calculator, DraftingCompass, Factory, CheckSquare, Truck, GraduationCap
};

export function ProcessSteps() {
  return (
    <section className="py-16 bg-slate-900 text-white font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <RevealOnScroll direction="up" className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/70 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-amber-800/50">
            End-to-End Turnkey Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Our 6-Step Engineering & Delivery Process
          </h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            From initial moisture calculations to on-site commissioning and crop trial batches, we ensure seamless project execution.
          </p>
        </RevealOnScroll>

        <RevealOnScroll staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((p) => {
            const IconComp = iconMap[p.icon] || Factory;
            return (
              <RevealItem key={p.step}>
                <div 
                  className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700/80 hover:border-emerald-500/50 transition-all duration-300 relative group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                        {p.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-700/80 text-amber-400 flex items-center justify-center group-hover:bg-[#1E7A5A] group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {p.subtitle}
                    </span>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {p.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}

