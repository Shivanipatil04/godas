import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, HelpCircle, ShieldCheck } from 'lucide-react';
import { faqs as fallbackFaqs } from '../data/faqs';
import { getFaqs } from '../api';

export function FAQAccordion() {
  const [openId, setOpenId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [faqList, setFaqList] = useState(fallbackFaqs);

  useEffect(() => {
    getFaqs('all').then(data => {
      if (data && data.length > 0) setFaqList(data);
    });
  }, []);

  const categories = ['All', 'General', 'Subsidy', 'Performance', 'Technical', 'Training', 'Market Support'];

  const filteredFaqs = faqList.filter(faq => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-16 bg-slate-50 font-sans" id="faqs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] bg-white px-3.5 py-1.5 rounded-full inline-block mb-3 border border-slate-200 shadow-2xs">
            Knowledge Center & Technical Details
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Clear answers about solar tunnel drying operations, government subsidies, hybrid systems, and startup training.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search questions e.g. subsidy, training, polycarbonate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A] shadow-xs"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#16A34A] text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-800 flex items-center">
                      <HelpCircle className="w-4 h-4 text-[#16A34A] mr-2.5 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#16A34A]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200 bg-white">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs bg-white rounded-xl border border-slate-200">
              No matching questions found. Contact our technical team for immediate assistance.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
