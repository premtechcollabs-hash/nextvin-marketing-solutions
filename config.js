/**
 * Nextvin Marketing Solutions - Central Business Configuration
 * 
 * Update your agency details here. Changes will automatically reflect
 * across all pages of the website on load.
 * 
 * Domain: https://nextvinmarketingsolutions.in/
 * Email: support@nextvinmarketingsolutions.in
 */

const NEXTVIN_CONFIG = {
  business: {
    name: "Nextvin Marketing Solutions",
    shortName: "Nextvin",
    tagline: "We help businesses get customers using ads, content, and growth strategies.",
    supportingStatement: "From building brand visibility to generating leads and converting audiences into customers, we bring advertising, creativity and marketing strategy together to help businesses grow.",
    domain: "https://nextvinmarketingsolutions.in/",
    email: "support@nextvinmarketingsolutions.in",
    phoneDisplay: "+91 (WhatsApp Business)",
    registrar: "Hostinger",
    targetMarket: "India-based businesses, startups, local businesses, entrepreneurs, SMEs and growing brands"
  },

  whatsapp: {
    // INSTRUCTIONS: Replace with your actual 10-digit phone number with country code 91
    // Example: "919876543210" (no spaces, no + sign, no dashes)
    number: "917288993594",
    defaultMessage: "Hello Nextvin Marketing Solutions, I would like to discuss marketing services for my business."
  },

  packages: {
    quickCreative: {
      name: "Quick Creative",
      priceRange: "₹499 – ₹2,999",
      billing: "One-time purchase per pack",
      description: "Designed for businesses needing specific creative deliverables without committing to a monthly marketing retainer."
    },
    starterPresence: {
      name: "Starter Presence",
      priceRange: "₹5,000 – ₹10,000",
      billing: "per month",
      description: "Designed for businesses beginning or improving their social media presence."
    },
    growthMarketing: {
      name: "Growth Marketing",
      priceRange: "₹10,000 – ₹25,000",
      billing: "per month",
      description: "Designed for businesses looking for coordinated marketing, content, reels and lead generation."
    },
    fullService: {
      name: "Full-Service Marketing",
      priceRange: "₹30,000 – ₹50,000+",
      billing: "per month",
      description: "Designed for businesses seeking comprehensive marketing strategy, ads, funnels, and conversion optimization."
    }
  },

  social: {
    // Only populated when real profiles exist
    instagram: "https://www.instagram.com/nextvinmarketingsolutions",
    linkedin: "",
    facebook: "",
    youtube: ""
  }
};

// Automatic client-side binding to keep all pages synced
(function() {
  function applyConfig() {
    if (typeof window === 'undefined') return;
    window.NEXTVIN_CONFIG = NEXTVIN_CONFIG;

    const cleanNumber = NEXTVIN_CONFIG.whatsapp.number.replace(/[^0-9]/g, '');
    const defaultMsg = encodeURIComponent(NEXTVIN_CONFIG.whatsapp.defaultMessage);
    const waUrl = `https://wa.me/${cleanNumber}?text=${defaultMsg}`;

    // Update all WhatsApp links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      const currentHref = link.getAttribute('href');
      if (currentHref && currentHref.includes('text=')) {
        const textParam = currentHref.split('text=')[1];
        link.setAttribute('href', `https://wa.me/${cleanNumber}?text=${textParam}`);
      } else {
        link.setAttribute('href', waUrl);
      }
    });

    // Update all email links
    document.querySelectorAll('[data-config="email"], a[href^="mailto:"]').forEach(el => {
      if (el.tagName === 'A') {
        el.setAttribute('href', `mailto:${NEXTVIN_CONFIG.business.email}`);
        if (el.textContent.includes('@')) {
          el.textContent = NEXTVIN_CONFIG.business.email;
        }
      } else {
        el.textContent = NEXTVIN_CONFIG.business.email;
      }
    });

    // Update agency name elements
    document.querySelectorAll('[data-config="name"]').forEach(el => {
      el.textContent = NEXTVIN_CONFIG.business.name;
    });

    // Update package prices
    for (const [key, pkg] of Object.entries(NEXTVIN_CONFIG.packages)) {
      document.querySelectorAll(`[data-package-price="${key}"]`).forEach(el => {
        el.textContent = pkg.priceRange;
      });
    }

    // Update social media links
    if (NEXTVIN_CONFIG.social.instagram) {
      document.querySelectorAll('a[data-social="instagram"], a[href*="instagram.com"]').forEach(el => {
        el.setAttribute('href', NEXTVIN_CONFIG.social.instagram);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyConfig);
  } else {
    applyConfig();
  }
})();
