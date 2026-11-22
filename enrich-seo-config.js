const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const serviceSchemas = {
  "paid-advertising-performance-marketing.html": {
    name: "Paid Advertising & Performance Marketing",
    desc: "Reach relevant audiences, attract high-intent customers, and generate qualified enquiries through Meta Ads, Google Ads, and LinkedIn.",
    slug: "services/paid-advertising-performance-marketing.html"
  },
  "social-media-marketing.html": {
    name: "Social Media Marketing",
    desc: "Build a consistent online presence, strengthen brand identity, improve engagement and grow social media channels.",
    slug: "services/social-media-marketing.html"
  },
  "content-marketing-strategy.html": {
    name: "Content Marketing & Content Strategy",
    desc: "Create valuable, engaging and strategically planned content that attracts audiences, communicates brand value and strengthens search visibility.",
    slug: "services/content-marketing-strategy.html"
  },
  "influencer-marketing-brand-collaborations.html": {
    name: "Influencer Marketing & Brand Collaborations",
    desc: "Connect with creators and relevant audiences through planned influencer and brand collaboration campaigns.",
    slug: "services/influencer-marketing-brand-collaborations.html"
  },
  "ad-creatives-design.html": {
    name: "Ad Creatives & Design",
    desc: "Create compelling advertising and promotional visuals that communicate brand messages, capture attention and support campaign performance.",
    slug: "services/ad-creatives-design.html"
  },
  "short-form-video-reels.html": {
    name: "Short-Form Video & Reels",
    desc: "Transform video footage into engaging short-form content for social media, advertising and business promotion.",
    slug: "services/short-form-video-reels.html"
  },
  "growth-strategy-funnels-conversion.html": {
    name: "Growth Strategy, Funnels & Conversion",
    desc: "Develop strategic marketing systems that connect business goals, audience needs, brand communication, enquiries and sales.",
    slug: "services/growth-strategy-funnels-conversion.html"
  },
  "business-marketing-support-digital-setup.html": {
    name: "Business Marketing Support & Digital Setup",
    desc: "Support businesses with digital marketing infrastructure, visibility, tracking, customer communication and marketing operations.",
    slug: "services/business-marketing-support-digital-setup.html"
  }
};

const industrySchemas = {
  "fitness-gym-marketing.html": {
    name: "Fitness & Gym Marketing Solutions",
    desc: "Attract more gym members, promote trial offers, fill classes, and grow local fitness brand awareness.",
    slug: "industries/fitness-gym-marketing.html"
  },
  "restaurants-cafes-food-businesses.html": {
    name: "Restaurant & Food Business Marketing",
    desc: "Food reels, menu promotional creatives, local footfall campaigns, and customer engagement strategy.",
    slug: "industries/restaurants-cafes-food-businesses.html"
  },
  "clinics-healthcare.html": {
    name: "Clinic & Healthcare Marketing Solutions",
    desc: "Trust-building healthcare content, educational patient resources, and compliant appointment enquiry strategies.",
    slug: "industries/clinics-healthcare.html"
  },
  "retail-local-businesses.html": {
    name: "Retail & Local Business Marketing",
    desc: "Store promotion campaigns, product creatives, Google Business Profile optimization, and local lead generation.",
    slug: "industries/retail-local-businesses.html"
  }
};

const insightSchemas = {
  "why-businesses-need-marketing-strategy-before-ads.html": {
    headline: "Why Businesses Need a Marketing Strategy Before Running Ads",
    desc: "Running ads without a strategy is like driving without a destination. Here is why strategic positioning and unit economics must come first.",
    slug: "insights/why-businesses-need-marketing-strategy-before-ads.html",
    datePublished: "2026-11-20"
  },
  "how-local-businesses-generate-leads-instagram.html": {
    headline: "How Local Businesses Can Generate Leads Through Instagram",
    desc: "Instagram is not just for national brands. Local businesses can generate qualified enquiries without huge ad budgets.",
    slug: "insights/how-local-businesses-generate-leads-instagram.html",
    datePublished: "2026-11-18"
  },
  "meta-ads-vs-google-ads-which-is-better.html": {
    headline: "Meta Ads vs Google Ads: Which Is Better for Your Business?",
    desc: "A practical comparison of intent versus discovery, audience dynamics, and budgeting for Indian businesses.",
    slug: "insights/meta-ads-vs-google-ads-which-is-better.html",
    datePublished: "2026-11-15"
  },
  "why-short-form-video-matters-business-marketing.html": {
    headline: "Why Short-Form Video Matters for Business Marketing",
    desc: "How Instagram Reels and YouTube Shorts capture modern attention and how businesses can leverage short-form video effectively.",
    slug: "insights/why-short-form-video-matters-business-marketing.html",
    datePublished: "2026-11-12"
  },
  "how-to-turn-social-media-attention-into-enquiries.html": {
    headline: "How to Turn Social Media Attention Into Customer Enquiries",
    desc: "Likes and views do not pay bills. Here is how to construct frictionless funnels and WhatsApp pathways that convert followers into clients.",
    slug: "insights/how-to-turn-social-media-attention-into-enquiries.html",
    datePublished: "2026-11-10"
  }
};

function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const isSubdir = relPath.includes('/');
  const fileName = path.basename(filePath);
  const configPath = isSubdir ? '../config.js' : 'config.js';

  // 1. Ensure config.js is included right before </body>
  if (!html.includes('config.js')) {
    html = html.replace('</body>', `  <script src="${configPath}"></script>\n</body>`);
  }

  // 2. Add OpenGraph tags if missing
  if (!html.includes('og:site_name')) {
    const ogBlock = `  <meta property="og:site_name" content="Nextvin Marketing Solutions">
  <meta property="og:locale" content="en_IN">
  <meta name="twitter:card" content="summary_large_image">`;
    html = html.replace('</head>', `${ogBlock}\n</head>`);
  }

  // 3. Add JSON-LD if missing
  if (!html.includes('application/ld+json')) {
    let jsonLd = null;

    if (relPath === 'index.html') {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Nextvin Marketing Solutions",
        "url": "https://nextvinmarketingsolutions.in/",
        "description": "We help businesses get customers using ads, content, and growth strategies. Full-service marketing agency based in India.",
        "email": "support@nextvinmarketingsolutions.in",
        "priceRange": "₹₹",
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "knowsAbout": [
          "Paid Advertising",
          "Meta Ads",
          "Google Ads",
          "Social Media Marketing",
          "Content Marketing",
          "Influencer Marketing",
          "Short-Form Video & Reels",
          "Growth Strategy",
          "Lead Generation",
          "Conversion Optimization"
        ]
      };
    } else if (serviceSchemas[fileName]) {
      const s = serviceSchemas[fileName];
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": s.name,
        "description": s.desc,
        "provider": {
          "@type": "ProfessionalService",
          "name": "Nextvin Marketing Solutions",
          "url": "https://nextvinmarketingsolutions.in/"
        },
        "areaServed": "IN",
        "url": `https://nextvinmarketingsolutions.in/${s.slug}`
      };
    } else if (industrySchemas[fileName]) {
      const ind = industrySchemas[fileName];
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": ind.name,
        "description": ind.desc,
        "provider": {
          "@type": "ProfessionalService",
          "name": "Nextvin Marketing Solutions",
          "url": "https://nextvinmarketingsolutions.in/"
        },
        "areaServed": "IN",
        "url": `https://nextvinmarketingsolutions.in/${ind.slug}`
      };
    } else if (insightSchemas[fileName]) {
      const art = insightSchemas[fileName];
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": art.headline,
        "description": art.desc,
        "datePublished": art.datePublished,
        "author": {
          "@type": "Organization",
          "name": "Nextvin Marketing Solutions"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Nextvin Marketing Solutions",
          "url": "https://nextvinmarketingsolutions.in/"
        },
        "mainEntityOfPage": `https://nextvinmarketingsolutions.in/${art.slug}`
      };
    } else {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Nextvin Marketing Solutions",
        "url": `https://nextvinmarketingsolutions.in/${relPath}`,
        "publisher": {
          "@type": "Organization",
          "name": "Nextvin Marketing Solutions"
        }
      };
    }

    if (jsonLd) {
      const ldScript = `  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`;
      html = html.replace('</head>', `${ldScript}\n</head>`);
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated: ${relPath}`);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (f.endsWith('.html')) {
      processHtmlFile(p);
    }
  });
}

walk(rootDir);
console.log("Enrichment complete.");
