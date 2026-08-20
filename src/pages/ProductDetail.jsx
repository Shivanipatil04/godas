import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Shield, Sun, FileText, 
  Phone, Clock, Zap, Award, Share2, ArrowRight 
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { products } from '../data/products';
import { companyInfo } from '../data/companyInfo';

export function ProductDetail({ onOpenQuoteModal }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <Link to="/products" className="bg-[#16A34A] text-white text-xs font-bold py-2 px-4 rounded-lg inline-block">
          Return to Equipment Catalog
        </Link>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product.image);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.shortDescription,
    "brand": {
      "@type": "Brand",
      "name": "Godas Business Corporation"
    }
  };

  return (
    <>
      <SEO 
        title={`${product.name} | Godas Business Corp`}
        description={product.shortDescription}
        schemaData={schemaData}
      />

      <main className="font-sans bg-slate-50/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Back breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
            <Link to="/products" className="hover:text-[#16A34A] flex items-center">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Products Catalog
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Images & Specs (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Product Gallery */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#14532D] text-white text-xs font-bold px-3 py-1 rounded-full border border-emerald-700">
                    {product.category}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-3 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      activeImage === product.image ? 'border-[#16A34A] scale-95 ring-2 ring-[#16A34A]/20' : 'border-slate-200'
                    }`}
                  >
                    <img src={product.image} alt="Main" className="w-full h-full object-cover" />
                  </button>
                  {product.secondaryImages && product.secondaryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                        activeImage === img ? 'border-[#16A34A] scale-95 ring-2 ring-[#16A34A]/20' : 'border-slate-200'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Tagline Header */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <span className="text-xs font-bold text-[#16A34A] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  Capacity: {product.capacityRange}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14532D]">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#16A34A]">
                  {product.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100 whitespace-pre-line">
                  {product.fullDescription}
                </p>
              </div>

              {/* Key Features List */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#14532D]">
                  Key Engineering Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] mr-2.5 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#14532D]">
                  Technical Specifications
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="py-3 px-4 font-bold text-slate-700 w-1/3">{key}</td>
                          <td className="py-3 px-4 text-slate-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Drying Time Comparison Table */}
              {product.dryingTimeComparison && product.dryingTimeComparison.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#14532D]">
                      Drying Time Performance Comparison
                    </h3>
                    <span className="text-[10px] font-bold text-[#14532D] bg-[#F4B400]/30 px-2.5 py-1 rounded border border-[#F4B400]/50">
                      60% Faster Drying
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-center border-collapse">
                      <thead>
                        <tr className="bg-[#14532D] text-white font-bold">
                          <th className="py-2.5 px-4 text-left">Crop / Product</th>
                          <th className="py-2.5 px-4">Traditional Open Sun</th>
                          <th className="py-2.5 px-4 bg-[#16A34A]">Godas Solar Dryer</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {product.dryingTimeComparison.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="py-3 px-4 text-left font-bold text-slate-800">{row.product}</td>
                            <td className="py-3 px-4 text-slate-500">{row.openSun}</td>
                            <td className="py-3 px-4 text-[#14532D] font-extrabold bg-slate-100">{row.solarTunnel || row.hybridSolar || row.electricTray || row.heatPump}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Suitable Crops */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#14532D]">
                  Recommended Crops & Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.suitableFor.map((item, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                      • {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sticky Inquiry Card (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg sticky top-24 space-y-5">
                
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] uppercase tracking-wider text-[#16A34A] font-bold block mb-1">
                    Direct Manufacturer Proposal
                  </span>
                  <h3 className="text-xl font-extrabold text-[#14532D]">
                    Request Technical Proposal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Includes CAD layout, batch calculations & material specifications.
                  </p>
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Batch Capacity:</span>
                    <span className="text-slate-900 font-bold">{product.capacityRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Structure Material:</span>
                    <span className="text-slate-900 font-bold">GI / SS-304</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuoteModal && onOpenQuoteModal(product.name)}
                  className="w-full bg-[#16A34A] hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#F4B400]" />
                  <span>Get Free Quotation & Layout</span>
                </button>

                <a
                  href={`tel:${companyInfo.phones[0].raw}`}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Call {companyInfo.phones[0].number}</span>
                </a>

                <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                  <p className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] mr-1.5" /> High UV Multiwall Polycarbonate Sheet</p>
                  <p className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] mr-1.5" /> Food-Grade Contact Surfaces</p>
                  <p className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] mr-1.5" /> On-Site Installation & Training</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
