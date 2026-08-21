import React from 'react';
import { 
  Zap, Clock, ShieldCheck, Sparkles, Sun, Award, 
  CheckCircle2, Cpu, Leaf, LayoutGrid, Wrench, MapPin,
  Building2, Check
} from 'lucide-react';
import { features } from '../data/features';
import { RevealOnScroll, RevealItem } from './RevealOnScroll';

const iconMap = {
  Zap, Clock, ShieldCheck, Sparkles, Sun, Award, 
  CheckCircle2, Cpu, Leaf, LayoutGrid, Wrench, MapPin
};

export function WhyChooseUs() {
  const highlightPoints = [
    { title: "20+ Years of Manufacturing Experience", desc: "Two decades of thermal engineering & solar fabrication mastery in Nashik MIDC." },
    { title: "Government Subsidy Ready (35% to 90%)", desc: "Bankable project reports & DPR assistance for NHM, MNRE & State Agro schemes." },
    { title: "10+ Years Warranty", desc: "Heavy-duty UV protected polycarbonate sheet cladding and durable steel structural arches." },
    { title: "Startup Training & Market Support", desc: "We train you to develop, manufacture & market your own products." }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white font-sans border-t border-slate-100 overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <RevealOnScroll direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-slate-100 text-[#16A34A] border border-slate-200 text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>WHY CHOOSE GODAS BUSINESS CORPORATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#14532D] tracking-tight">
            Why Choose Godas Solar Tunnel Dryer for your solar drying project?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            With 20+ years of manufacturing experience, Godas Business Corporation builds India’s most reliable, food-grade solar tunnel dryers and hybrid dehydration machinery.
          </p>
        </RevealOnScroll>

        {/* 4 Highlight Cards */}
        <RevealOnScroll staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {highlightPoints.map((item, idx) => (
            <RevealItem key={idx}>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all border-l-4 border-l-[#16A34A] flex items-start space-x-3 h-full">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#14532D]">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>

        {/* Section Heading */}
        <RevealOnScroll direction="up" className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-xl sm:text-3xl font-extrabold text-[#14532D]">
            Features & Advantages
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Each card pairs a key engineering feature directly with its corresponding operational advantage.
          </p>
        </RevealOnScroll>

        {/* Header Label Bar for Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-6 max-w-5xl mx-auto mb-3 px-6 text-sm font-extrabold uppercase tracking-widest">
          <div className="flex items-center space-x-2 text-[#14532D]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#14532D]"></span>
            <span>Feature</span>
          </div>
          <div className="flex items-center space-x-2 text-[#16A34A]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
            <span>Advantages</span>
          </div>
        </div>

        {/* 1 Card per Feature & Advantage Set with 50/50 Partition */}
        <div className="max-w-5xl mx-auto space-y-4 mb-12">
          {features.map((item) => {
            const IconComp = iconMap[item.icon] || CheckCircle2;
            return (
              <RevealItem key={item.id}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                  
                  {/* Left 50%: Feature */}
                  <div className="p-5 sm:p-6 bg-slate-50 flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#14532D] text-[#F4B400] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block md:hidden mb-1">Feature</span>
                      <h4 className="text-sm sm:text-base font-extrabold text-[#14532D] leading-snug">
                        {item.feature || item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right 50%: Advantage */}
                  <div className="p-5 sm:p-6 bg-white flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] block md:hidden mb-1">Advantage</span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.advantage || item.description}
                      </p>
                    </div>
                  </div>

                </div>
              </RevealItem>
            );
          })}
        </div>

      </div>
    </section>
  );
}
