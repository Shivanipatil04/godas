import React from 'react';
import {
  ShieldCheck, CheckCircle2
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { companyInfo } from '../data/companyInfo';
import { companyStats } from '../data/stats';
import { RevealOnScroll, RevealItem } from '../components/RevealOnScroll';
import logoImg from '../assets/logo.png';

export function About({ onOpenQuoteModal }) {
  const companyHighlights = [
    "20+ Years of Industry Experience",
    "Serving Customers Across 5+ States",
    "Heavy-Duty Engineering & SS-304",
    "Complete Project Support & Training",
    "Made in India"
  ];

  return (
    <>
      <SEO
        title="About Us | Godas Business Corporation Nashik"
        description="Learn about Godas Business Corporation, India's trusted manufacturer of Polycarbonate Sheet Solar Tunnel Dryers and industrial food dehydration machinery."
      />

      <main className="font-sans overflow-x-hidden">

        {/* Page Header */}
        <section className="bg-[#14532D] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <RevealOnScroll direction="up">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F4B400] bg-emerald-950/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-700/60">
                Company Profile & Manufacturing Excellence
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
                Pioneering Thermal Solar Engineering in India
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto mt-3">
                Established in Nashik, Maharashtra, Godas Business Corporation manufactures world-class solar tunnel dryers, hybrid dryers, and commercial food processing equipment.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Story & Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <RevealOnScroll direction="right" className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  Our Legacy & Mission
                </span>
                <h2 className="text-3xl font-extrabold text-[#14532D]">
                  Empowering Farmers & Agro-Exporters Through Solar Innovation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Post-harvest crop wastage in India accounts for up to 30% of total agricultural production due to unhygienic open sun drying and unexpected weather changes.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Godas Business Corporation was founded to solve this critical challenge. By leveraging trapped solar radiation in high-grade UV polycarbonate multiwall tunnels, we enable farmers, Farmer Producer Organizations (FPOs), and food processors to dry their produce 60% faster under 100% hygienic conditions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="text-sm font-bold text-[#16A34A] mb-1">Our Mission</h3>
                    <p className="text-xs text-slate-600">
                      To engineer efficient, reliable and scalable solar and hybrid dehydration technologies that deliver better quality, lower energy dependence and greater value to our customers.
                    </p>
                  </div>

                  <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200/70">
                    <h3 className="text-sm font-bold text-amber-900 mb-1">Our Vision</h3>
                    <p className="text-xs text-slate-600">
                      Innovating sustainable drying solutions for a better food-processing future.
                    </p>
                  </div>
                </div>

                {/* Company Highlights Section */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-extrabold text-[#14532D] mb-3 uppercase tracking-wider">
                    Company Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {companyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="left" delay={0.2} className="lg:col-span-6 flex justify-center items-center">
                <div className="w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] flex justify-center items-center">
                  <img
                    src={logoImg}
                    alt="Godas Business Corporation Logo"
                    className="w-full h-auto max-h-[480px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </RevealOnScroll>

            </div>
          </div>
        </section>

        {/* Founder's Message Block */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up" className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                {/* Founder Photo & Role */}
                <div className="md:col-span-4 flex flex-col items-center text-center">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#16A34A] shadow-lg mb-4 bg-slate-100">
                    <img
                      src="src/assets/images/founder.png"
                      alt="Founder - Godas Business Corporation"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#14532D]">Deepak Subhash Patil</h3>
                  <p className="text-xs font-bold text-[#16A34A]">Director | Godas Business Corporation</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Nashik, Maharashtra</p>
                </div>

                {/* Message Content */}
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-block bg-[#F4B400]/20 text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-[#F4B400]/40">
                    Leadership Message
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    “Engineering a Smarter, Sustainable Future for Food Drying”
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    At Godas Business Corporation, we believe technology should create sustainable value for businesses, farmers and the food processing industry. We develop advanced Solar Tunnel Dryers and Solar Hybrid Drying Systems that combine renewable energy, efficient heat management and controlled drying technology to deliver consistent product quality while reducing energy consumption and dependence on conventional energy sources.

                    Our goal is to build practical, reliable and scalable drying solutions for fruits, vegetables, herbs, spices and other food products—helping businesses improve quality, reduce processing costs and adopt more sustainable practices. Through continuous innovation and engineering excellence, we aim to make modern food dehydration technology accessible and commercially viable across India and the global market.

                  </p>
                    <p className="font-bold text-slate-800">
                      When innovation meets sustainability, we don't just dry food—we create a better future for food processing.
                    </p>
                  <div className="pt-2 text-xs text-slate-500 font-medium">
                    — Deepak Subhash Patil | Director |Godas Business Corporation
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Company Stats Grid */}
        <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll staggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
              {companyStats.slice(0, 4).map((s) => (
                <RevealItem key={s.id}>
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between h-full hover:border-[#16A34A] transition-all hover:-translate-y-1">
                    <div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#16A34A] font-sans break-words">
                        {s.display || `${s.value}${s.suffix}`}
                      </div>
                      <div className="text-xs font-bold text-[#14532D] mt-1">{s.label}</div>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{s.description}</div>
                  </div>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        {/* Certifications & Quality Assurance */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up" className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] bg-slate-100 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-slate-200">
                Strict Quality Standards
              </span>
              <h2 className="text-3xl font-extrabold text-[#14532D]">
                Certifications & Compliance
              </h2>
            </RevealOnScroll>

            <RevealOnScroll staggerChildren className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto gap-6 justify-center">
              {companyInfo.certifications.map((cert, idx) => (
                <RevealItem key={idx}>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center text-center space-y-3 h-full shadow-xs">
                    <div className="w-12 h-12 bg-slate-100 text-[#16A34A] rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-800">{cert}</h3>
                    <p className="text-[11px] text-slate-500">
                      Compliant with food safety & thermal engineering standards.
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

      </main>
    </>
  );
}

