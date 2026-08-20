import React from 'react';
import { 
  Flame, Apple, Layers, Leaf, Zap, Coffee, Fish, Wheat, 
  FlaskConical, Flower2, Sun, Beef, CircleDot, Factory 
} from 'lucide-react';
import { industries } from '../data/industries';
import { RevealOnScroll, RevealItem } from './RevealOnScroll';

// Icon Map helper
const iconComponents = {
  Flame, Apple, Layers, Leaf, Zap, Coffee, Fish, Wheat, 
  FlaskConical, Flower2, Sun, Beef, CircleDot, Factory
};

export function IndustryGrid() {
  return (
    <section className="py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <RevealOnScroll direction="up" className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] bg-slate-100 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-slate-200">
            Versatile Agricultural & Industrial Applications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D]">
            Engineering Tailored Dehydration Solutions for Sectors
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            From export-grade spices and Moringa leaf powder to seafood drying and botanical extracts, our solar tunnel dryers preserve peak nutritional value, aroma, and color.
          </p>
        </RevealOnScroll>

        {/* Industry Cards Grid */}
        <RevealOnScroll staggerChildren className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const IconComp = iconComponents[ind.icon] || Leaf;
            return (
              <RevealItem key={ind.id}>
                <div
                  className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between h-full hover:-translate-y-1"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#16A34A] group-hover:bg-[#16A34A] group-hover:text-white transition-colors duration-300 flex items-center justify-center shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-[#16A34A] bg-slate-100 px-2 py-0.5 rounded uppercase border border-slate-200">
                        Sector
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-800 group-hover:text-[#16A34A] transition-colors mb-2">
                      {ind.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {ind.description}
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

