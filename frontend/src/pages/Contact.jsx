import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  ShieldCheck, Sun, Building2, MessageSquare, Award 
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { companyInfo } from '../data/companyInfo';
import { products } from '../data/products';

import { sendInquiry } from '../api';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    product: products[0].name,
    capacity: '500 kg',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await sendInquiry({
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      stateCity: formData.city,
      productId: formData.product,
      quantityCapacity: formData.capacity,
      message: formData.message,
      source: 'Contact Page Form'
    });
    setLoading(false);
    if (res && res.success) {
      setSubmitted(true);
    } else {
      alert(res?.error || 'Failed to submit inquiry. Please check network connection.');
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us | Godas Business Corporation Nashik"
        description="Contact Godas Business Corporation in Nashik, Maharashtra for industrial solar tunnel dryer inquiries, factory site visits, and NHM subsidy guidance."
      />

      <main className="font-sans">
        
        {/* Banner */}
        <section className="bg-[#14532D] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F4B400] bg-emerald-950/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-700/60">
              Direct Sales & Engineering Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Get in Touch with Goda's
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Connect with our thermal engineers for customized quotations, CAD layouts, and technical specifications.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column Contact Cards (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Contact Info Card */}
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                  <h3 className="text-xl font-bold text-[#14532D] border-b border-slate-200 pb-3">
                    Corporate Office
                  </h3>

                  <div className="space-y-4 text-xs text-slate-600">
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 bg-white border border-slate-200 text-[#16A34A] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-sm">Office Address</span>
                        <span>{companyInfo.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 bg-white border border-slate-200 text-[#16A34A] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-sm">Phone / Mobile</span>
                        <a href={`tel:${companyInfo.phones[0].raw}`} className="hover:text-[#16A34A] font-bold text-slate-900 block">
                          {companyInfo.phones[0].number}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 bg-white border border-slate-200 text-[#16A34A] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-sm">Email Inquiries</span>
                        <a href={`mailto:${companyInfo.emails.sales}`} className="hover:text-[#16A34A] font-bold text-slate-900 block">
                          {companyInfo.emails.sales}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={companyInfo.socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#F4B400]" />
                      <span>Chat Directly on WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column Inquiry Form (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs">
                  
                  {!submitted ? (
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#14532D]">
                        Send Direct Sales & Technical Inquiry
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 mb-6">
                        Fill out the form below. Our technical team will calculate your batch thermal load requirements and respond promptly.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Rajesh Patil"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. 9028771799"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-[#16A34A]"
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
                              placeholder="yourname@domain.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              City & State *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Nashik, Maharashtra"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-[#16A34A]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Equipment Model
                            </label>
                            <select
                              value={formData.product}
                              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-800"
                            >
                              {products.map(p => (
                                <option key={p.id} value={p.name}>{p.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Daily Batch Capacity
                            </label>
                            <select
                              value={formData.capacity}
                              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-800"
                            >
                              <option value="100 kg">100 kg (Farmer Scale)</option>
                              <option value="500 kg">500 kg</option>
                              <option value="1000 kg">1,000 kg (1 Ton)</option>
                              <option value="2000 kg+">2,000 kg+ (Commercial Tonnage)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Message / Specific Crop Details
                          </label>
                          <textarea
                            rows="4"
                            placeholder="Mention crop type (Red Chilli, Moringa, Onion, Turmeric), required drying time, or site constraints..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-[#16A34A]"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-[#16A34A] hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          {loading ? (
                            <span>Sending Inquiry...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4 text-[#F4B400]" />
                              <span>Submit Inquiry</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-slate-100 text-[#16A34A] rounded-full flex items-center justify-center mx-auto border border-slate-200">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#14532D]">
                        Inquiry Submitted Successfully!
                      </h3>
                      <p className="text-xs text-slate-600 max-w-md mx-auto">
                        Thank you {formData.name}. Our technical sales engineer will contact you shortly at <strong className="text-slate-900">{formData.phone}</strong>.
                      </p>
                      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href={`https://wa.me/919028771799?text=${encodeURIComponent(
                            `*New Website Inquiry*\nName: ${formData.name}\nPhone: ${formData.phone}\nProduct: ${formData.product || 'General'}\nLocation: ${formData.city || 'N/A'}\nMessage: ${formData.message || 'N/A'}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-bold py-3 px-5 rounded-xl transition-all inline-flex items-center justify-center space-x-2 shadow-md"
                        >
                          <MessageSquare className="w-4 h-4 text-[#F4B400]" />
                          <span>Forward to WhatsApp (+91 90287 71799)</span>
                        </a>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="bg-slate-100 text-[#14532D] text-xs font-bold py-3 px-5 rounded-xl hover:bg-slate-200 border border-slate-200 cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
