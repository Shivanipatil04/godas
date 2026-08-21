import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun, Shield, ArrowRight, Award, FileText, CheckCircle2,
  Zap, Clock, Phone, Sparkles, Building2, Star, ChevronLeft, ChevronRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { products as fallbackProducts } from '../data/products';
import { companyStats } from '../data/stats';
import { testimonials as fallbackTestimonials } from '../data/testimonials';
import { ProductCard } from '../components/ProductCard';
import { IndustryGrid } from '../components/IndustryGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ROICalculator } from '../components/ROICalculator';
import { FAQAccordion } from '../components/FAQAccordion';
import { companyInfo } from '../data/companyInfo';
import { RevealOnScroll, RevealItem } from '../components/RevealOnScroll';
import { getProducts, getTestimonials } from '../api';
import solarTunnelHeroImg from '../assets/images/Godas_Hero.png';

export function Home({ onOpenQuoteModal }) {
  const testimonialScrollRef = useRef(null);
  const [productList, setProductList] = useState(fallbackProducts);
  const [testimonialList, setTestimonialList] = useState(fallbackTestimonials);

  useEffect(() => {
    getProducts().then(data => { if (data && data.length > 0) setProductList(data); });
    getTestimonials().then(data => { if (data && data.length > 0) setTestimonialList(data); });
  }, []);

  const scrollTestimonials = (direction) => {
    if (testimonialScrollRef.current) {
      const { scrollLeft, clientWidth } = testimonialScrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      testimonialScrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": companyInfo.name,
    "url": "https://godasbusinesscorp.com",
    "logo": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80",
    "description": companyInfo.tagline,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nashik",
      "addressRegion": "Maharashtra",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": companyInfo.phones[0].number,
      "contactType": "sales"
    }
  };

  return (
    <>
      <SEO
        title="Godas Business Corporation | Solar Tunnel Dryer & Food Dehydration Manufacturer India"
        description="Leading manufacturer of Polycarbonate Sheet Solar Tunnel Dryers, Hybrid Solar Dryers, Electric Cabinet Tray Dryers & Food Dehydrators in Maharashtra, India. NHM/MNRE Subsidy Eligible."
        schemaData={schemaData}
      />

      <main className="font-sans overflow-x-hidden">

        {/* HERO SECTION */}
        <section className="relative text-white overflow-hidden min-h-[280px] sm:min-h-[400px] md:min-h-[850px] lg:min-h-[950px] flex items-end sm:items-center">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center sm:bg-right-bottom"
            style={{ backgroundImage: `url(${solarTunnelHeroImg})` }}
          />

          {/* Additional subtle bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent sm:from-black/25 sm:via-transparent sm:to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 w-full px-4 sm:px-8 md:px-10 lg:pl-[6vw] xl:pl-[7vw] py-6 sm:py-12 md:py-20">

            <RevealOnScroll
              className="max-w-[760px] space-y-2 sm:space-y-4 md:space-y-6 text-left"
              direction="up"
              duration={0.6}
            >

              {/* Top Badge */}
              <div className="hidden sm:inline-flex items-center space-x-2 bg-emerald-950/90 text-emerald-100 border border-emerald-400/50 text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                <Sun className="w-4 h-4 text-[#F4B400]" />
                <span>
                  India's Premier Industrial Solar Tunnel Dryer Manufacturer
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-lg sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]">
                Sustainable{" "}
                <span className="text-[#4ADE80]">
                  Food Dehydration Solutions
                </span>{" "}
                with High-Efficiency Solar Tunnel Dryers
              </h1>

              {/* Description - short on mobile, full on sm+ */}
              <p className="sm:hidden text-[11px] leading-snug text-white/90 max-w-[320px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                Advanced Solar Tunnel Dryers for energy-efficient, hygienic drying of fruits, vegetables, herbs &amp; more.
              </p>
              <p className="hidden sm:block text-emerald-1 text-sm sm:text-base lg:text-lg leading-relaxed max-w-[700px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                We manufacture advanced Solar Tunnel Dryers designed to deliver
                energy-efficient, hygienic, and sustainable drying solutions for
                fruits, vegetables, herbs, spices, grains, flowers, and other
                agricultural products. Our innovative drying technology ensures
                superior product quality while significantly reducing drying time
                and operating costs.
              </p>

              {/* Quick Benefits */}
              <div className="flex flex-row flex-wrap gap-1.5 sm:gap-3 pt-1 sm:pt-2 text-[9px] sm:text-xs md:text-sm font-semibold text-white">

                <div className="flex items-center space-x-1 sm:space-x-2 bg-emerald-950/75 px-2 py-1 sm:px-4 sm:py-3 rounded-md sm:rounded-xl border border-emerald-400/40 backdrop-blur-sm">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#4ADE80] flex-shrink-0" />
                  <span>60% Faster Drying</span>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2 bg-emerald-950/75 px-2 py-1 sm:px-4 sm:py-3 rounded-md sm:rounded-xl border border-emerald-400/40 backdrop-blur-sm">
                  <Shield className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#F4B400] flex-shrink-0" />
                  <span>10-Yr UV Sheet Guarantee</span>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2 bg-emerald-950/75 px-2 py-1 sm:px-4 sm:py-3 rounded-md sm:rounded-xl border border-emerald-400/40 backdrop-blur-sm">
                  <Award className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#4ADE80] flex-shrink-0" />
                  <span>Up to 90% Govt Subsidy</span>
                </div>

              </div>

              {/* CTA Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-row gap-2 sm:gap-4">

                <button
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
                  className="bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-[10px] sm:text-sm px-3 py-2 sm:px-7 sm:py-4 rounded-md sm:rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center space-x-1 sm:space-x-2 group cursor-pointer border border-emerald-300/40"
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-[#F4B400] group-hover:scale-110 transition-transform" />
                  <span>Get Free Quote</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>

                <Link
                  to="/products"
                  className="bg-[#F4B400] hover:bg-amber-400 text-slate-900 font-bold text-[10px] sm:text-sm px-3 py-2 sm:px-6 sm:py-4 rounded-md sm:rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 sm:space-x-2"
                >
                  <span>View Models</span>
                </Link>

              </div>

            </RevealOnScroll>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="bg-white py-10 sm:py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll staggerChildren className="grid grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto gap-4 sm:gap-6 text-center">
              {companyStats.map((stat) => (
                <RevealItem key={stat.id}>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A34A] transition-all hover:-translate-y-1 duration-300 flex flex-col justify-between h-full shadow-xs">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#16A34A] font-sans break-words">
                        {stat.display || `${stat.value}${stat.suffix}`}
                      </div>
                      <div className="text-xs font-bold text-[#14532D] mt-1 line-clamp-2">
                        {stat.label}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {stat.description}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        {/* FEATURED PRODUCTS CATALOG SECTION */}
        <section className="py-16 bg-white" id="products">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <RevealOnScroll direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D]">
                  Our Products
                </h2>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center text-xs font-extrabold text-[#16A34A] bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
              >
                <span>View Models (6)</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </RevealOnScroll>

            <RevealOnScroll staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productList.slice(0, 6).map((product) => (
                <RevealItem key={product.id}>
                  <ProductCard
                    product={product}
                    onOpenQuoteModal={onOpenQuoteModal}
                  />
                </RevealItem>
              ))}
            </RevealOnScroll>
          </div>
        </section>

        {/* INTERACTIVE ROI & FINANCIAL CALCULATOR */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll direction="up" duration={0.6}>
              <ROICalculator onOpenQuoteModal={onOpenQuoteModal} />
            </RevealOnScroll>
          </div>
        </section>

        {/* WHY CHOOSE US - 12 FEATURES */}
        <WhyChooseUs />

        {/* APPLICATIONS & CROPS GRID */}
        <IndustryGrid onOpenQuoteModal={onOpenQuoteModal} />

        {/* TESTIMONIALS SECTION (Continuous Infinite Marquee Scroll) */}
        <section className="py-16 bg-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <RevealOnScroll direction="up" className="max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] bg-slate-100 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-slate-200">
                Verified Client Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D]">
                What Farmers & Food Exporters Say
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Trusted by Farmer Producer Companies (FPOs), spices exporters, and organic processors across India.
              </p>
            </RevealOnScroll>
          </div>

          {/* Marquee Wrapper with Side Fade Masks */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Left Gradient Fade */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

            {/* Right Gradient Fade */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

            {/* Continuous Marquee Track */}
            <div className="animate-marquee flex space-x-6 px-4">
              {[...testimonialList, ...testimonialList, ...testimonialList].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-[320px] sm:w-[380px] shrink-0 bg-white hover:bg-slate-50/50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#F4B400] space-x-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-[#F4B400]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-extrabold text-[#14532D] bg-[#F4B400]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#F4B400]/40">
                        Verified
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic group-hover:text-slate-900 transition-colors">
                      "{item.quote}"
                    </p>

                    {item.productUsed && (
                      <div className="text-[11px] font-semibold text-[#14532D] bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="text-slate-400 font-normal">Equipment:</span>
                        <span className="font-bold text-[#16A34A]">{item.productUsed}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#16A34A] shrink-0 shadow-xs"
                    />
                    <div>
                      <div className="text-xs font-extrabold text-[#14532D]">{item.name}</div>
                      <div className="text-[11px] text-[#16A34A] font-semibold">{item.role}, {item.organization}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{item.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FAQAccordion />

      </main>
    </>
  );
}

