import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, ChevronDown, Menu, X, Sun, 
  Shield, Award, FileText, ArrowRight, MessageSquare 
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { products } from '../data/products';
import logoImg from '../assets/logo.png';

export function Header({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full font-sans sticky top-0 z-50 transition-all duration-300">
      {/* Top Header Bar */}
      <div className="bg-[#14532D] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Left Side: Phone & Location */}
          <div className="flex items-center space-x-6">
            <a 
              href={`tel:${companyInfo.phones[0].raw}`} 
              className="flex items-center space-x-1.5 hover:text-[#F4B400] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F4B400]" />
              <span className="font-medium">{companyInfo.phones[0].number}</span>
            </a>
            <div className="flex items-center space-x-1.5 text-emerald-200/90">
              <MapPin className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>Nashik, Maharashtra, India</span>
            </div>
          </div>

          {/* Right Side: Email */}
          <div className="flex items-center space-x-4">
            <a 
              href={`mailto:${companyInfo.emails.sales}`} 
              className="flex items-center space-x-1.5 hover:text-[#F4B400] text-emerald-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>{companyInfo.emails.sales}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200' 
            : 'bg-white py-4 shadow-sm border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img src={logoImg} alt="Godas Business Corporation Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight text-[#14532D] group-hover:text-[#16A34A] transition-colors leading-none">
                GODAS
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase text-slate-600 mt-0.5 leading-none">
                BUSINESS <span className="text-[#F4B400]">CORPORATION</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 font-medium text-sm text-slate-700">
            <Link 
              to="/" 
              className={`hover:text-[#16A34A] transition-colors ${
                location.pathname === '/' ? 'text-[#16A34A] font-extrabold' : ''
              }`}
            >
              Home
            </Link>

            <Link 
              to="/about" 
              className={`hover:text-[#16A34A] transition-colors ${
                location.pathname === '/about' ? 'text-[#16A34A] font-extrabold' : ''
              }`}
            >
              About Us
            </Link>

            {/* Products Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <Link 
                to="/products" 
                className={`flex items-center space-x-1 hover:text-[#16A34A] transition-colors ${
                  location.pathname.startsWith('/products') ? 'text-[#16A34A] font-extrabold' : ''
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productDropdownOpen ? 'rotate-180 text-[#16A34A]' : ''}`} />
              </Link>

              {/* Dropdown Menu */}
              {productDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Industrial Equipment</p>
                  </div>
                  <div className="py-1">
                    {products.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.slug}`}
                        className="flex items-start p-2.5 rounded-lg hover:bg-slate-100 transition-colors group/item"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#16A34A] mt-2 mr-2.5 group-hover/item:scale-125 transition-transform" />
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover/item:text-[#16A34A]">
                            {p.name}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{p.capacityRange}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg mt-1 border border-slate-200 flex justify-between items-center text-xs font-bold text-[#16A34A]">
                    <Link to="/products" className="hover:underline flex items-center">
                      View All Models <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/gallery" 
              className={`hover:text-[#16A34A] transition-colors ${
                location.pathname === '/gallery' ? 'text-[#16A34A] font-extrabold' : ''
              }`}
            >
              Gallery
            </Link>

            <Link 
              to="/contact" 
              className={`hover:text-[#16A34A] transition-colors ${
                location.pathname === '/contact' ? 'text-[#16A34A] font-extrabold' : ''
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Action CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href={`tel:${companyInfo.phones[0].raw}`}
              className="flex items-center space-x-2 text-xs font-bold text-[#14532D] bg-slate-100 hover:bg-slate-200 py-2.5 px-3.5 rounded-lg transition-colors border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Call Sales</span>
            </a>
            
            <button
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              className="inline-flex items-center justify-center bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-extrabold py-2.5 px-4 rounded-lg shadow-sm shadow-emerald-900/10 hover:shadow-md transition-all group cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-1.5 text-[#F4B400] group-hover:scale-110 transition-transform" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              className="bg-[#16A34A] text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#16A34A] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1 font-medium text-slate-800 text-sm">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-lg transition-colors ${
                  location.pathname === '/' ? 'bg-slate-100 text-[#16A34A] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-lg transition-colors ${
                  location.pathname === '/about' ? 'bg-slate-100 text-[#16A34A] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                About Us
              </Link>
              <Link 
                to="/products" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-lg transition-colors ${
                  location.pathname.startsWith('/products') ? 'bg-slate-100 text-[#16A34A] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                Products
              </Link>
              <Link 
                to="/gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-lg transition-colors ${
                  location.pathname === '/gallery' ? 'bg-slate-100 text-[#16A34A] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                Gallery & Projects
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-lg transition-colors ${
                  location.pathname === '/contact' ? 'bg-slate-100 text-[#16A34A] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                Contact Us
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
              <a 
                href={`tel:${companyInfo.phones[0].raw}`}
                className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-800 bg-slate-100 py-2.5 rounded-lg border border-slate-200"
              >
                <Phone className="w-4 h-4 text-[#16A34A]" />
                <span>Call {companyInfo.phones[0].number}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal && onOpenQuoteModal();
                }}
                className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold py-3 rounded-lg shadow flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4 text-[#F4B400]" />
                <span>Get Free Quote</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
