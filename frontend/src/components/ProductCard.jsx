import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Sun } from 'lucide-react';

export function ProductCard({ product, onOpenQuoteModal }) {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      <div>
        {/* Product Image Container */}
        <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          
          {/* Top Category Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#14532D]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-700/60">
              {product.category}
            </span>
            {product.featured && (
              <span className="bg-[#F4B400] text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center shadow-xs">
                <Sun className="w-3 h-3 mr-1 text-slate-950" /> Popular
              </span>
            )}
          </div>

          {/* Bottom Title & Capacity Info Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4B400] font-extrabold block mb-0.5">
              Capacity: {product.capacityRange}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-[#4ADE80] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Card Body - ONLY first 2 lines of plain description text */}
        <div className="p-5">
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[36px]">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-slate-100 mt-2">
        <Link
          to={`/products/${product.slug || product.id}`}
          className="bg-slate-100 hover:bg-slate-200 text-[#14532D] text-xs font-bold py-2.5 px-3 rounded-xl transition-colors text-center flex items-center justify-center space-x-1"
        >
          <span>Specs & Data</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#16A34A]" />
        </Link>
        
        <button
          onClick={() => onOpenQuoteModal && onOpenQuoteModal(product.name)}
          className="bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition-colors text-center flex items-center justify-center space-x-1 group/btn cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#F4B400] group-hover/btn:scale-110 transition-transform" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  );
}
