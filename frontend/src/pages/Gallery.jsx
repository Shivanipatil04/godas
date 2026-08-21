import React, { useState, useEffect } from 'react';
import { MapPin, X, ZoomIn, Sun, ArrowRight, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';
import { galleryItems as fallbackGallery } from '../data/gallery';
import { getGalleryItems } from '../api';

export function Gallery({ onOpenQuoteModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeItem, setActiveItem] = useState(null);
  const [itemsList, setItemsList] = useState(fallbackGallery);

  useEffect(() => {
    getGalleryItems('all').then(data => {
      if (data && data.length > 0) setItemsList(data);
    });
  }, []);

  const categories = ['All', 'Installations', 'Manufacturing', 'Products', 'Innovations'];

  const filteredItems = itemsList.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <>
      <SEO 
        title="Project Gallery & Installations | Godas Business Corp"
        description="View photos of Polycarbonate Solar Tunnel Dryer installations, SS-304 manufacturing unit in Nashik, and high quality dehydrated crop results."
      />

      <main className="font-sans">
        
        {/* Banner */}
        <section className="bg-[#14532D] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F4B400] bg-emerald-950/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-700/60">
              Commercial Installations & Factory Manufacturing
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Project Gallery & Product Showcase
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Real commercial installations and manufacturing excellence in Nashik, Maharashtra.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#16A34A] text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid - Clean image showcase */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group cursor-pointer aspect-4/3 relative"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="bg-[#16A34A] p-3 rounded-full shadow-lg">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Zoom Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-slate-700">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 bg-slate-900/80 text-white hover:bg-slate-900 p-2 rounded-full z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-80 sm:h-[460px] bg-slate-950 relative">
                <img
                  src={activeItem.image}
                  alt="Gallery Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-slate-900 text-white flex justify-end">
                <button
                  onClick={() => {
                    setActiveItem(null);
                    onOpenQuoteModal && onOpenQuoteModal('General Inquiry');
                  }}
                  className="bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center space-x-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#F4B400]" />
                  <span>Request Information</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
