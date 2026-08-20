import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, Shield, Database, Server, Key, AlertCircle, 
  Users, FileText, CheckCircle2, Clock, Phone, Mail, 
  Search, LogOut, ArrowLeft, TrendingUp, Package, Filter, Download
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { products } from '../data/products';

const initialLeads = [
  {
    id: 'ORD-8492',
    name: 'Rajesh Patil',
    phone: '+91 98220 12345',
    email: 'rajesh.farm@gmail.com',
    location: 'Nashik, Maharashtra',
    product: 'Polycarbonate Sheet Solar Tunnel Dryer',
    capacity: '1,000 kg (1 Ton)',
    crop: 'Red Chilli & Spices',
    date: 'Today, 10:30 AM',
    status: 'New Inquiry',
    subsidyRequested: true
  },
  {
    id: 'ORD-8491',
    name: 'Suresh Kumar',
    phone: '+91 94230 87654',
    email: 'suresh.agro@yahoo.com',
    location: 'Guntur, Andhra Pradesh',
    product: 'Hybrid Biomass Solar Dryer',
    capacity: '2,000 kg',
    crop: 'Dry Red Chilli',
    date: 'Yesterday',
    status: 'DPR Sent',
    subsidyRequested: true
  },
  {
    id: 'ORD-8490',
    name: 'Moringa Processing FPO',
    phone: '+91 91580 44332',
    email: 'info@moringafpo.org',
    location: 'Coimbatore, Tamil Nadu',
    product: 'Heat Pump Dehydrator',
    capacity: '500 kg',
    crop: 'Moringa Leaf Powder',
    date: '27 Jul 2026',
    status: 'Quote Sent',
    subsidyRequested: false
  },
  {
    id: 'ORD-8489',
    name: 'Ganesh Agro Exports',
    phone: '+91 98901 99887',
    email: 'exports@ganeshagro.com',
    location: 'Jalgaon, Maharashtra',
    product: 'Polycarbonate Sheet Solar Tunnel Dryer',
    capacity: '5,000 kg (5 Ton)',
    crop: 'Onion Flakes & Garlic',
    date: '25 Jul 2026',
    status: 'Site Survey Done',
    subsidyRequested: true
  },
  {
    id: 'ORD-8488',
    name: 'Kisan Cooperative Society',
    phone: '+91 97654 32109',
    email: 'contact@kisancoop.in',
    location: 'Indore, Madhya Pradesh',
    product: 'Electric Cabinet Tray Dryer',
    capacity: '200 kg',
    crop: 'Medicinal Herbs & Turmeric',
    date: '24 Jul 2026',
    status: 'Completed',
    subsidyRequested: true
  }
];

export function AdminPlaceholder() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('inquiries');
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleAutofill = () => {
    setUsername('admin@godasbusinesscorp.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }
    // Accept standard demo login or any input
    setIsLoggedIn(true);
    setErrorMsg('');
  };

  const toggleLeadStatus = (id) => {
    setLeads(prev => prev.map(item => {
      if (item.id === id) {
        const statuses = ['New Inquiry', 'DPR Sent', 'Quote Sent', 'Site Survey Done', 'Completed'];
        const nextIdx = (statuses.indexOf(item.status) + 1) % statuses.length;
        return { ...item, status: statuses[nextIdx] };
      }
      return item;
    }));
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <SEO 
        title="Admin Portal | Godas Business Corporation" 
        description="Internal Administrative Management System"
      />

      <main className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        
        {!isLoggedIn ? (
          /* LOGIN SCREEN */
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl max-w-md w-full space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                <Link to="/" className="text-xs text-slate-400 hover:text-emerald-400 flex items-center">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Main Site
                </Link>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  v2.4 Production Portal
                </span>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-xl flex items-center justify-center mx-auto border border-emerald-800 shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-extrabold text-white">GBC Admin Management</h1>
                <p className="text-xs text-slate-400">Internal Portal for Customer Inquiries & DPR Tracking</p>
              </div>

              {/* Demo Credentials Box */}
              <div className="bg-slate-900/90 border border-emerald-800/60 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>Demo Access Credentials:</span>
                  <button
                    type="button"
                    onClick={handleAutofill}
                    className="bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-[10px] px-2.5 py-1 rounded border border-emerald-700 font-bold transition-colors cursor-pointer"
                  >
                    Auto-Fill Credentials
                  </button>
                </div>
                <div className="text-[11px] font-mono text-slate-300 space-y-0.5">
                  <p><span className="text-slate-500">Username:</span> admin@godasbusinesscorp.com</p>
                  <p><span className="text-slate-500">Password:</span> admin123</p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Administrator Email / ID</label>
                  <input
                    type="text"
                    required
                    placeholder="admin@godasbusinesscorp.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Security Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {errorMsg && (
                  <div className="bg-red-950/80 border border-red-700 p-3 rounded-lg text-red-300 text-[11px] flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#1E7A5A] hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <Key className="w-4 h-4 text-amber-300" />
                  <span>Sign In to Dashboard</span>
                </button>
              </form>

              <div className="pt-2 text-[10px] text-slate-500 space-y-1 text-center">
                <p className="flex items-center justify-center"><Database className="w-3 h-3 text-emerald-400 mr-1" /> Live Demo Mode Enabled</p>
              </div>
            </div>
          </div>
        ) : (
          /* LOGGED IN DASHBOARD */
          <div className="min-h-screen flex flex-col">
            
            {/* Admin Header */}
            <header className="bg-slate-800 border-b border-slate-700 px-4 sm:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-emerald-950 text-emerald-400 rounded-lg flex items-center justify-center border border-emerald-800">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <span>GBC Administrative Dashboard</span>
                  </h2>
                  <p className="text-[11px] text-slate-400">Godas Business Corporation Nashik • Master Management</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  to="/"
                  className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-300 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>View Main Website</span>
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </header>

            {/* Dashboard Body */}
            <div className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
              
              {/* Quick Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Total Inquiries</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">{leads.length}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">+3 new today</div>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Pending Subsidy DPRs</span>
                    <FileText className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {leads.filter(l => l.subsidyRequested).length}
                  </div>
                  <div className="text-[10px] text-amber-400 font-semibold">NHM / MNRE Eligible</div>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Active Equipment Models</span>
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">{products.length}</div>
                  <div className="text-[10px] text-slate-400 font-semibold">100kg to 10 Ton</div>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Lead Conversion Rate</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">74.2%</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">Pan-India Network</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex space-x-2 border-b border-slate-700 pb-2">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'inquiries' 
                      ? 'bg-[#1E7A5A] text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Customer Inquiries & Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'products' 
                      ? 'bg-[#1E7A5A] text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Equipment Catalog ({products.length})
                </button>
              </div>

              {/* TAB 1: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl space-y-4 p-4 sm:p-6">
                  
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search lead name, crop, state..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
                      <span className="text-xs text-slate-400 font-semibold">Filter:</span>
                      {['All', 'New Inquiry', 'DPR Sent', 'Quote Sent', 'Site Survey Done', 'Completed'].map(st => (
                        <button
                          key={st}
                          onClick={() => setFilterStatus(st)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap border cursor-pointer ${
                            filterStatus === st 
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-700' 
                              : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="bg-slate-900 text-slate-400 font-bold border-b border-slate-700">
                          <th className="py-3 px-4">ID</th>
                          <th className="py-3 px-4">Customer Details</th>
                          <th className="py-3 px-4">Requested System</th>
                          <th className="py-3 px-4">Crop & Capacity</th>
                          <th className="py-3 px-4">Status (Click to toggle)</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/60 font-medium text-slate-200">
                        {filteredLeads.length > 0 ? (
                          filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-750/50">
                              <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{lead.id}</td>
                              <td className="py-3.5 px-4 space-y-0.5">
                                <div className="font-bold text-white">{lead.name}</div>
                                <div className="text-[11px] text-slate-400">{lead.phone} • {lead.location}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="text-slate-200 font-semibold">{lead.product}</div>
                                {lead.subsidyRequested && (
                                  <span className="inline-block bg-amber-950/80 text-amber-400 border border-amber-800 text-[10px] px-2 py-0.5 rounded mt-1 font-bold">
                                    Subsidy DPR Needed
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 space-y-0.5">
                                <div className="text-emerald-300 font-bold">{lead.crop}</div>
                                <div className="text-[11px] text-slate-400">{lead.capacity}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <button
                                  onClick={() => toggleLeadStatus(lead.id)}
                                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                                    lead.status === 'New Inquiry' ? 'bg-amber-950 text-amber-300 border-amber-700' :
                                    lead.status === 'DPR Sent' ? 'bg-blue-950 text-blue-300 border-blue-700' :
                                    lead.status === 'Quote Sent' ? 'bg-purple-950 text-purple-300 border-purple-700' :
                                    lead.status === 'Site Survey Done' ? 'bg-teal-950 text-teal-300 border-teal-700' :
                                    'bg-emerald-950 text-emerald-300 border-emerald-700'
                                  }`}
                                >
                                  {lead.status}
                                </button>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <a
                                  href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                                  className="inline-flex items-center space-x-1 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 px-2.5 py-1.5 rounded text-[11px] font-bold border border-emerald-700 transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>Call</span>
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                              No inquiries matching your search filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 2: PRODUCTS */}
              {activeTab === 'products' && (
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
                  <h3 className="text-base font-bold text-white">Equipment Catalog Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map(p => (
                      <div key={p.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl space-y-2 flex justify-between items-start">
                        <div>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                            {p.category}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1">{p.name}</h4>
                          <p className="text-xs text-slate-400">{p.capacityRange} • Payback: {p.paybackPeriod}</p>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{p.tagline}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>
    </>
  );
}
