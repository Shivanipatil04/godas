// frontend/src/api/index.js
import { API_BASE_URL } from './config';
import { products as fallbackProducts } from '../data/products';
import { galleryItems as fallbackGallery } from '../data/gallery';
import { faqs as fallbackFaqs } from '../data/faqs';
import { testimonials as fallbackTestimonials } from '../data/testimonials';
import { companyInfo as fallbackCompanyInfo } from '../data/companyInfo';
import { features as fallbackFeatures } from '../data/features';
import { industries as fallbackIndustries } from '../data/industries';
import { processSteps as fallbackProcess } from '../data/process';
import { companyStats as fallbackStats } from '../data/stats';

// Helper for image URLs (handles relative backend paths vs static imports)
export const resolveImageUrl = (img) => {
  if (!img) return '';
  if (typeof img === 'string' && img.startsWith('/backend/uploads/')) {
    return `${API_BASE_URL}${img}`;
  }
  return img;
};

// Fetch Products from API with fallback
export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/backend/api/products.php`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map(p => ({
        ...p,
        image: resolveImageUrl(p.image),
        secondaryImages: (p.secondaryImages || []).map(resolveImageUrl)
      }));
    }
  } catch (err) {
    console.warn('API fetch failed for products, using fallback static data:', err);
  }
  return fallbackProducts;
}

// Fetch Single Product by Slug or ID
export async function getProductBySlug(slugOrId) {
  try {
    const res = await fetch(`${API_BASE_URL}/backend/api/products.php?slug=${encodeURIComponent(slugOrId)}&id=${encodeURIComponent(slugOrId)}`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && json.data) {
      const p = json.data;
      return {
        ...p,
        image: resolveImageUrl(p.image),
        secondaryImages: (p.secondaryImages || []).map(resolveImageUrl)
      };
    }
  } catch (err) {
    console.warn(`API fetch failed for product ${slugOrId}, using fallback:`, err);
  }
  return fallbackProducts.find(p => p.slug === slugOrId || p.id === slugOrId) || fallbackProducts[0];
}

// Fetch Gallery Items
export async function getGalleryItems(categorySlug = 'all') {
  try {
    const url = `${API_BASE_URL}/backend/api/gallery.php` + (categorySlug !== 'all' ? `?category=${encodeURIComponent(categorySlug)}` : '');
    const res = await fetch(url);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map(g => ({
        ...g,
        image: resolveImageUrl(g.image)
      }));
    }
  } catch (err) {
    console.warn('API fetch failed for gallery, using fallback static data:', err);
  }
  if (categorySlug === 'all') return fallbackGallery;
  return fallbackGallery.filter(g => g.category.toLowerCase() === categorySlug.toLowerCase());
}

// Fetch FAQs
export async function getFaqs(categorySlug = 'all') {
  try {
    const url = `${API_BASE_URL}/backend/api/faqs.php` + (categorySlug !== 'all' ? `?category=${encodeURIComponent(categorySlug)}` : '');
    const res = await fetch(url);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (err) {
    console.warn('API fetch failed for faqs, using fallback static data:', err);
  }
  return fallbackFaqs;
}

// Fetch Testimonials
export async function getTestimonials() {
  try {
    const res = await fetch(`${API_BASE_URL}/backend/api/testimonials.php`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data.map(t => ({
        ...t,
        image: resolveImageUrl(t.image)
      }));
    }
  } catch (err) {
    console.warn('API fetch failed for testimonials, using fallback static data:', err);
  }
  return fallbackTestimonials;
}

// Fetch Company Info & Features/Industries/Process/Stats
export async function getCompanyData() {
  try {
    const res = await fetch(`${API_BASE_URL}/backend/api/company.php`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && json.data) {
      return {
        companyInfo: json.data.companyInfo || fallbackCompanyInfo,
        features: json.data.features || fallbackFeatures,
        industries: json.data.industries || fallbackIndustries,
        processSteps: json.data.processSteps || fallbackProcess,
        companyStats: json.data.companyStats || fallbackStats
      };
    }
  } catch (err) {
    console.warn('API fetch failed for company data, using fallback static data:', err);
  }
  return {
    companyInfo: fallbackCompanyInfo,
    features: fallbackFeatures,
    industries: fallbackIndustries,
    processSteps: fallbackProcess,
    companyStats: fallbackStats
  };
}

// Submit Contact & Quote Inquiry Form
export async function sendInquiry(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/backend/api/inquiry.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Inquiry API error:', err);
    return { success: false, error: err.message || 'Network error submitting inquiry.' };
  }
}
