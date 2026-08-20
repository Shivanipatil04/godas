import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminPlaceholder } from './pages/AdminPlaceholder';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Inner App with Layout
function AppContent() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState('');
  const location = useLocation();

  const handleOpenQuoteModal = (productName = '') => {
    setDefaultProduct(productName || '');
    setQuoteModalOpen(true);
  };

  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      <ScrollToTop />

      {!isAdminRoute && (
        <Header onOpenQuoteModal={handleOpenQuoteModal} />
      )}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/about" element={<About onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/products" element={<Products onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/products/:slug" element={<ProductDetail onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/gallery" element={<Gallery onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPlaceholder />} />
          <Route path="*" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
        </Routes>
      </div>

      {!isAdminRoute && (
        <>
          <Footer onOpenQuoteModal={handleOpenQuoteModal} />
          <FloatingWhatsApp onOpenQuoteModal={handleOpenQuoteModal} />
        </>
      )}

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={defaultProduct}
      />
    </div>
  );
}

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
