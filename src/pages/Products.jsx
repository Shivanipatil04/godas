import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Sun, FileText, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { RevealOnScroll, RevealItem } from '../components/RevealOnScroll';

export function Products({ onOpenQuoteModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Solar Dryers', 'Hybrid Systems', 'Electric Dryers', 'Dehydrators'];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.suitableFor.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Industrial Solar Tunnel Dryer Equipment Catalog | Godas Business Corp"
        description="Browse our range of Polycarbonate Solar Tunnel Dryers, Hybrid Biomass Solar Dryers, Electric Cabinet Tray Dryers, and Commercial Heat Pump Dehydrators."
      />

      <main className="font-sans overflow-x-hidden">
        
        {/* Header Banner */}
        <section className="bg-[#14532D] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <RevealOnScroll direction="up">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F4B400] bg-emerald-950/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-700/60">
                Complete Industrial Machinery Range
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
                Solar Tunnel Dryers & Food Dehydrators
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto mt-3">
                100 kg to 10,000 kg batch capacity solutions engineered with food grade SS-304, UV multiwall polycarbonate, and automated moisture controllers.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="py-8 bg-white border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-xs'
                      : 'bg-emerald-50/40 text-slate-700 border-emerald-100 hover:bg-emerald-100/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search models or crops (e.g. Chilli, Moringa)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-emerald-50/30 border border-emerald-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
              />
            </div>

          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length > 0 ? (
              <RevealOnScroll key={`${selectedCategory}-${searchQuery}`} staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <RevealItem key={p.id}>
                    <ProductCard 
                      product={p} 
                      onOpenQuoteModal={onOpenQuoteModal} 
                    />
                  </RevealItem>
                ))}
              </RevealOnScroll>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-emerald-100 max-w-md mx-auto p-8 space-y-3 shadow-xs">
                <p className="text-sm font-bold text-slate-700">No equipment matching your search.</p>
                <p className="text-xs text-slate-500">Contact our custom engineering team for non-standard tonnage specifications.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="bg-[#16A34A] text-white text-xs font-bold py-2 px-4 rounded-lg cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}

