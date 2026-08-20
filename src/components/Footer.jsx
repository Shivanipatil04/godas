import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Shield, Award, CheckCircle2, 
  ArrowRight, Sun, ExternalLink, FileText, MessageSquare 
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { products } from '../data/products';
import { SocialLinks } from './SocialLinks';
import logoImg from '../assets/logo.png';

export function Footer({ onOpenQuoteModal }) {
  return (
    <footer className="bg-[#14532D] text-emerald-100 font-sans pt-16 pb-8 border-t-4 border-[#F4B400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Quote CTA Strip */}
        <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-2xl p-6 sm:p-8 mb-16 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 border border-emerald-500/30">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#F4B400] bg-emerald-950/70 px-3 py-1 rounded-full mb-2 border border-emerald-700/50">
              <Sun className="w-3.5 h-3.5 mr-1 text-[#F4B400]" /> Sustainable Thermal Engineering
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Planning a Solar Tunnel or Food Dehydration Project?
            </h3>
            <p className="text-emerald-100 text-sm mt-1">
              Get customized capacity calculations, CAD layout blueprints, and transparent manufacturing proposals.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              className="bg-[#F4B400] hover:bg-amber-400 text-slate-900 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
              <span>Get Free Technical Quote</span>
            </button>
            <a
              href={`tel:${companyInfo.phones[0].raw}`}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-all flex items-center justify-center border border-white/20"
            >
              <Phone className="w-4 h-4 mr-2 text-[#F4B400]" />
              <span>{companyInfo.phones[0].number}</span>
            </a>
          </div>
        </div>

        {/* Main 4-Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/80">
          
          {/* Col 1: Brand & Certifications */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-md border-2 border-[#F4B400]">
                <img src={logoImg} alt="Godas Business Corporation Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-wider">GODAS</span>
                <p className="text-[10px] text-[#F4B400] uppercase tracking-widest font-bold">Business Corporation • Nashik</p>
              </div>
            </Link>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Godas Business Corporation is a manufacturer of Polycarbonate Sheet Solar Tunnel Dryers, Hybrid Biomass Solar Dryers, Electric Cabinet Tray Dryers, and Commercial Heat Pump Dehydrators in Nashik, Maharashtra.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center text-xs text-emerald-100 space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Heavy-Duty GI & SS-304 Engineering</span>
              </div>
              <div className="flex items-center text-xs text-emerald-100 space-x-2">
                <Award className="w-4 h-4 text-[#F4B400] flex-shrink-0" />
                <span>Complete Project Report & Guidance</span>
              </div>
              <div className="flex items-center text-xs text-emerald-100 space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>UV Multiwall Polycarbonate Enclosures</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] font-bold text-[#F4B400] uppercase tracking-wider block mb-2">Connect With Us</span>
              <SocialLinks variant="compact" />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#F4B400] pl-2.5">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-[#F4B400] transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1.5 text-emerald-400" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F4B400] transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1.5 text-emerald-400" /> About Company & Founder
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#F4B400] transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1.5 text-emerald-400" /> Equipment Catalog
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#F4B400] transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1.5 text-emerald-400" /> Project Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F4B400] transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-1.5 text-emerald-400" /> Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Range */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#F4B400] pl-2.5">
              Equipment Range
            </h4>
            <ul className="space-y-2.5 text-xs">
              {products.map(p => (
                <li key={p.id}>
                  <Link 
                    to={`/products/${p.id}`} 
                    className="hover:text-[#F4B400] transition-colors flex items-center text-emerald-100/90"
                  >
                    <ArrowRight className="w-3 h-3 mr-1.5 text-[#F4B400] flex-shrink-0" />
                    <span className="line-clamp-1">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#F4B400] pl-2.5">
              Office Address
            </h4>
            <div className="space-y-3 text-xs text-emerald-100">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#F4B400] mt-0.5 flex-shrink-0" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${companyInfo.phones[0].raw}`} className="hover:text-[#F4B400] font-bold block text-white">
                    {companyInfo.phones[0].number}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${companyInfo.emails.sales}`} className="hover:text-[#F4B400]">
                  {companyInfo.emails.sales}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={companyInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-extrabold text-slate-900 bg-[#F4B400] hover:bg-amber-400 py-2 px-3.5 rounded-lg transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-900" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-300/70 gap-4">
          <p>© {new Date().getFullYear()} Godas Business Corporation. All Rights Reserved. Nashik, Maharashtra, India.</p>
          <div className="flex items-center space-x-6">
            <span>Solar Tunnel Dryer Manufacturer India</span>
            <span>•</span>
            <span>Food Dehydration Machines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
