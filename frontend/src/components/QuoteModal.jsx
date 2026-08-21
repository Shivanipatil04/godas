import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Send, Phone, Sun, Shield, MessageSquare } from 'lucide-react';
import { products } from '../data/products';
import { companyInfo } from '../data/companyInfo';
import { sendInquiry } from '../api';

export function QuoteModal({ isOpen, onClose, defaultProduct = "" }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    produceType: '',
    selectedProduct: defaultProduct || products[0].name,
    dailyCapacity: '500 kg',
    subsidyInterest: 'Yes',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await sendInquiry({
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      stateCity: formData.location,
      productId: formData.selectedProduct,
      cropType: formData.produceType,
      quantityCapacity: formData.dailyCapacity,
      message: `Subsidy Interest: ${formData.subsidyInterest}. Notes: ${formData.notes}`,
      source: 'Quote Modal'
    });
    setIsSubmitting(false);
    if (res && res.success) {
      setSubmitted(true);
    } else {
      alert(res?.error || 'Failed to submit quote inquiry. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 p-3 sm:p-6 flex min-h-full items-start sm:items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-5 sm:p-8 relative border border-slate-100 my-auto sm:my-8 max-h-[92vh] flex flex-col overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-slate-100 px-3 py-1 rounded-full w-fit mb-3 border border-slate-200">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Direct Factory Pricing & Subsidy Guidance</span>
            </div>

            <h3 className="text-2xl font-extrabold text-[#0D2F45]">
              Request Custom Technical Quote & Layout
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fill out your drying requirement below. Our thermal design engineers will provide a customized CAD layout, capacity sizing, and ROI payback calculations within 4 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Product & Capacity Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Equipment Required *
                  </label>
                  <select
                    required
                    value={formData.selectedProduct}
                    onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-medium"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Custom Factory Drying Line">Custom Factory Drying Line</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Daily Batch Weight / Capacity *
                  </label>
                  <select
                    value={formData.dailyCapacity}
                    onChange={(e) => setFormData({ ...formData, dailyCapacity: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-medium"
                  >
                    <option value="100 kg">100 kg / batch (Farmer Unit)</option>
                    <option value="250 kg">250 kg / batch</option>
                    <option value="500 kg">500 kg / batch</option>
                    <option value="1000 kg">1,000 kg (1 Ton) / batch</option>
                    <option value="2000 kg">2,000 kg (2 Tons) / batch</option>
                    <option value="5000 kg+">5,000 kg+ (Commercial Tonnage)</option>
                  </select>
                </div>
              </div>

              {/* Crop / Material & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Crop / Produce to Dry *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Red Chilli, Moringa, Onion, Turmeric"
                    value={formData.produceType}
                    onChange={(e) => setFormData({ ...formData, produceType: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your City & State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nashik, Maharashtra"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Patil"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9822012345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Need NHM / MNRE Govt Subsidy Guidance?
                  </label>
                  <select
                    value={formData.subsidyInterest}
                    onChange={(e) => setFormData({ ...formData, subsidyInterest: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-medium"
                  >
                    <option value="Yes">Yes, Send Subsidy Process Guide (35%-50%)</option>
                    <option value="No">No, Commercial Direct Purchase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Requirements / Existing Facilities
                </label>
                <textarea
                  rows="2"
                  placeholder="Mention target drying time, power available (Single/3-Phase), or existing solar infrastructure..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="text-[11px] text-slate-400 flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  No spam. Direct technical team callback.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#1E7A5A] to-emerald-700 hover:from-emerald-700 hover:to-[#0D2F45] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Processing Quote...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-[#1E7A5A] rounded-full flex items-center justify-center mx-auto border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0D2F45]">
              Thank You, {formData.name || 'Valued Customer'}!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your inquiry for <strong className="text-slate-900">{formData.selectedProduct} ({formData.dailyCapacity})</strong> has been successfully received by our Nashik engineering team.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-1.5">
              <p className="font-bold text-slate-800">What Happens Next?</p>
              <p className="text-slate-600">• Our Thermal Engineer will call you at <strong className="text-slate-900">{formData.phone}</strong> within 4 working hours.</p>
              <p className="text-slate-600">• You will receive custom CAD layout options & Government Subsidy DPR paperwork.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://wa.me/919028771799?text=${encodeURIComponent(
                  `*New Technical Quote Request*\nName: ${formData.name}\nPhone: ${formData.phone}\nEquipment: ${formData.selectedProduct}\nCapacity: ${formData.dailyCapacity}\nCrop: ${formData.produceType || 'N/A'}\nLocation: ${formData.location || 'N/A'}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl inline-flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#F4B400]" />
                <span>Send to WhatsApp (+91 90287 71799)</span>
              </a>
              <button
                onClick={handleReset}
                className="bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-5 rounded-xl hover:bg-slate-300 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
