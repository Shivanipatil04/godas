import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export function FloatingWhatsApp({ onOpenQuoteModal }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Phone Floating Button */}
      <a
        href={`tel:${companyInfo.phones[0].raw}`}
        className="w-12 h-12 bg-[#0D2F45] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center border-2 border-white group"
        title="Call Sales Technical Team"
        aria-label="Call Sales Technical Team"
      >
        <Phone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={companyInfo.socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center border-2 border-white group relative"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
        <MessageSquare className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}
