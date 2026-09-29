/**
 * Centralized Configuration & Data File for AURA STUDIO
 * 
 * Replace or update values here to customize all content across the entire website.
 */

export interface AgencyConfig {
  brand: {
    name: string;
    wordmark: string;
    tagline: string;
    founder?: string;
    location: string;
    email: string;
    phone: string;
    displayPhone: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    socialLinks: {
      instagram: string;
      linkedin: string;
      twitter: string;
      youtube: string;
    };
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    supportingHeadline: string;
    primaryCta: string;
    secondaryCta: string;
    scrollText: string;
    heroImage: string;
  };
  stats: Array<{
    value: string;
    label: string;
    sublabel: string;
  }>;
  clients: Array<{
    name: string;
    sector: string;
  }>;
  services: Array<{
    id: string;
    number: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    deliverables: string[];
    timeline: string;
    icon: string;
  }>;
  projects: Array<{
    id: string;
    number: string;
    title: string;
    client: string;
    category: 'Web Design' | 'Branding' | 'Social Media' | 'Video' | 'Marketing';
    servicesProvided: string[];
    shortDescription: string;
    fullDescription: string;
    challenge: string;
    solution: string;
    results: string;
    year: string;
    image: string;
    accentColor: string;
  }>;
  caseStudy: {
    kicker: string;
    heading: string;
    clientName: string;
    clientTagline: string;
    challenge: string;
    solution: string;
    results: Array<{
      value: string;
      metric: string;
      description: string;
    }>;
    image: string;
    testimonialQuote: string;
    testimonialAuthor: string;
    testimonialRole: string;
  };
  about: {
    heading: string;
    mainParagraph: string;
    story: string;
    mission: string;
    vision: string;
    founder?: {
      name: string;
      role: string;
      bio: string;
      quote: string;
      location?: string;
    };
    values: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  process: Array<{
    step: string;
    title: string;
    description: string;
    duration: string;
    keyDeliverables: string[];
  }>;
  whyChooseUs: Array<{
    id: string;
    title: string;
    description: string;
    badge: string;
  }>;
  testimonials: Array<{
    id: string;
    rating: number;
    quote: string;
    name: string;
    role: string;
    company: string;
    location: string;
  }>;
  industries: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  pricing: Array<{
    id: string;
    tier: string;
    tagline: string;
    recommended?: boolean;
    priceInr: string;
    priceUsd: string;
    period: string;
    inclusions: string[];
    ctaText: string;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
  }>;
}

export const agencyConfig: AgencyConfig = {
  brand: {
    name: "NEXVANTA",
    wordmark: "NEXVANTA",
    tagline: "Ideas → Strategy → Impact",
    founder: "Aditya Kumar",
    location: "Jharkhand, India",
    email: "aditmunda60@gmail.com",
    phone: "+91 92794 95630",
    displayPhone: "+91 92794 95630",
    whatsappNumber: "919279495630",
    whatsappDefaultMessage: "Hi, I'm interested in working with Nexvanta. I'd like to discuss a project.",
    socialLinks: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com"
    }
  },

  hero: {
    badge: "CREATIVE DIGITAL AGENCY · IDEAS → STRATEGY → IMPACT",
    headlinePart1: "WE BUILD DIGITAL EXPERIENCES THAT MAKE BRANDS ",
    headlineHighlight: "IMPOSSIBLE TO IGNORE.",
    headlinePart2: "",
    supportingHeadline: "Strategy, design, technology and creativity — combined to help ambitious brands grow.",
    primaryCta: "Start a Project",
    secondaryCta: "View Our Work",
    scrollText: "SCROLL TO EXPLORE ↓",
    heroImage: "/src/assets/images/nexvanta_hero_background_1790607099639.jpg"
  },

  stats: [
    { value: "10+", label: "Projects Delivered", sublabel: "Websites, brands & motion" },
    { value: "5+", label: "Ambitious Brands", sublabel: "From startups to enterprises" },
    { value: "2+", label: "Years Experience", sublabel: "Strategy, design & engineering" },
    { value: "100%", label: "Creative Ownership", sublabel: "Zero templates or cookie-cutters" }
  ],

  clients: [
    { name: "KINETIC LABS", sector: "Deep Tech" },
    { name: "VALENCE", sector: "Mobility" },
    { name: "AETHERIA", sector: "Luxury Living" },
    { name: "NORDIC ROAST", sector: "Specialty Coffee" },
    { name: "SYNERGY AI", sector: "Machine Intelligence" },
    { name: "MONOLITH", sector: "Modern Architecture" },
    { name: "CYPRUS WEAR", sector: "Fashion & Apparel" },
    { name: "ELEVATE HEALTH", sector: "Biotech & Wellness" }
  ],

  services: [
    {
      id: "web-dev",
      number: "01",
      title: "Website Development",
      shortDescription: "High-performance websites designed to turn visitors into customers.",
      fullDescription: "We engineer lightning-fast, conversion-focused websites powered by modern frameworks like React, Next.js, and headless CMS architectures. Every site is rigorously optimized for speed, responsive fidelity, and SEO.",
      deliverables: ["Custom Frontend Development", "Headless CMS Setup", "Mobile Optimization", "Core Web Vitals Tuning", "E-Commerce Integrations"],
      timeline: "3–6 Weeks",
      icon: "Code2"
    },
    {
      id: "branding",
      number: "02",
      title: "Branding & Identity",
      shortDescription: "Complete visual identities that make businesses memorable.",
      fullDescription: "From core brand typography and bespoke color harmonies to comprehensive identity guidelines and print collateral, we craft cohesive visual systems that differentiate your brand in crowded markets.",
      deliverables: ["Brand Strategy & Positioning", "Logo & Typography Suite", "Color System & Guidelines", "Packaging & Stationery", "Brand Book"],
      timeline: "3–4 Weeks",
      icon: "Sparkles"
    },
    {
      id: "social-media",
      number: "03",
      title: "Social Media Management",
      shortDescription: "Creative social media strategies and content that build communities.",
      fullDescription: "We build social narratives that captivate audiences. Our team conceptualizes, designs, scripts, and schedules content tailored to organic reach algorithms across LinkedIn, Instagram, and X.",
      deliverables: ["Monthly Content Calendar", "Graphic Design & Carousels", "Community Engagement", "Hashtag & Trend Strategy", "Analytics Reporting"],
      timeline: "Ongoing Retainer",
      icon: "Share2"
    },
    {
      id: "video-motion",
      number: "04",
      title: "Video & Motion",
      shortDescription: "High-impact video editing, reels, advertisements and motion graphics.",
      fullDescription: "Motion commands attention. We direct and produce product teasers, kinetic typography, 3D animated renders, dynamic reels, and broadcast-ready advertisements that evoke deep brand emotion.",
      deliverables: ["Brand Teaser Films", "Social Reels & TikToks", "3D Product Animation", "Kinetic Typography", "Commercial Grading"],
      timeline: "1–3 Weeks",
      icon: "Film"
    },
    {
      id: "digital-marketing",
      number: "05",
      title: "Digital Marketing",
      shortDescription: "Data-driven campaigns designed to increase visibility and conversions.",
      fullDescription: "We deploy full-funnel customer acquisition campaigns across Meta, Google Ads, and programmatic channels, relentlessly measuring ROAS, CAC, and pipeline conversion.",
      deliverables: ["Multi-Channel Ad Campaigns", "Funnel Architecture", "Creative A/B Testing", "Retargeting Infrastructure", "Conversion Rate Optimization"],
      timeline: "Ongoing Sprint",
      icon: "TrendingUp"
    },
    {
      id: "ui-ux",
      number: "06",
      title: "UI/UX Design",
      shortDescription: "Beautiful, intuitive interfaces designed around real users.",
      fullDescription: "We craft seamless digital product interfaces in Figma, backed by user research, wireframing, clickable prototyping, and design token architectures ready for engineering handoff.",
      deliverables: ["User Research & Flow Mapping", "Wireframes & Information Architecture", "Interactive Figma Prototypes", "Design System Tokens", "Handoff Documentation"],
      timeline: "2–5 Weeks",
      icon: "Layers"
    },
    {
      id: "seo",
      number: "07",
      title: "SEO & Organic Growth",
      shortDescription: "Search-engine strategies designed to increase organic visibility.",
      fullDescription: "Technical SEO audits, keyword gap analysis, structured schema implementation, and editorial authority building designed to establish long-term compounding search traffic.",
      deliverables: ["Technical Audit & Fixes", "Keyword Strategy & Mapping", "Schema JSON-LD Setup", "Internal Linking Optimization", "Backlink Acquisition Plan"],
      timeline: "Ongoing Growth",
      icon: "Search"
    },
    {
      id: "ai-solutions",
      number: "08",
      title: "AI Creative Solutions",
      shortDescription: "Use modern AI workflows to create faster, smarter and more scalable content.",
      fullDescription: "We harness cutting-edge generative tools and automated workflows to accelerate asset generation, localize marketing copy, personalize consumer experiences, and scale creative output without compromising craftsmanship.",
      deliverables: ["Generative Visual Synthesis", "Creative Automation Pipelines", "AI Brand Voice Calibration", "Dynamic Creative Localization", "Workflow Consulting"],
      timeline: "Custom Sprints",
      icon: "Cpu"
    }
  ],

  projects: [
    {
      id: "nova-coffee",
      number: "01",
      title: "Brand Identity — Nova Coffee",
      client: "Nova Artisan Roasters",
      category: "Branding",
      servicesProvided: ["Visual Identity", "Custom Packaging", "Typography", "Art Direction"],
      shortDescription: "A minimalist, tactile brand identity and packaging system for an artisanal direct-trade coffee roaster.",
      fullDescription: "Nova Coffee sought to establish a premier foothold among specialty craft roasters in urban metropolitan centers. We designed an architectural typographic identity, matte black foil-stamped retail packaging, and a sensory art direction guide.",
      challenge: "Differentiating Nova in a saturated specialty coffee market dominated by rustic and generic craft aesthetics.",
      solution: "Engineered an understated, luxury architectural identity with Japanese-inspired minimalism, precision grid layouts, and sensory metallic foil accents.",
      results: "+180% Wholesale Retail Placement in First 90 Days",
      year: "2025",
      image: "/src/assets/images/case_study_ecosystem_1790603710697.jpg",
      accentColor: "#F59E0B"
    },
    {
      id: "luxe-studio",
      number: "02",
      title: "Website — Luxe Studio",
      client: "Luxe Interior Architecture",
      category: "Web Design",
      servicesProvided: ["UI/UX Design", "Headless Next.js", "WebGL Transition", "SEO"],
      shortDescription: "An ultra-fluid, editorial digital portfolio for an international interior architecture and design atelier.",
      fullDescription: "Luxe Studio needed an online presence as immaculate as their multimillion-dollar private residences. We developed a fluid 60FPS portfolio featuring asynchronous transitions, full-bleed spatial showcases, and interactive 3D floorplan viewports.",
      challenge: "Balancing high-resolution architectural imagery with sub-second page loads and zero layout jitter.",
      solution: "Built a headless architecture using next-gen image formats, edge caching, and lightweight CSS transforms that preserve luxury editorial pacing.",
      results: "Sub-0.8s Global Load Times & +92% Session Duration",
      year: "2025",
      image: "/src/assets/images/work_web_luxury_1790603726309.jpg",
      accentColor: "#38BDF8"
    },
    {
      id: "urban-wear",
      number: "03",
      title: "Social Campaign — Urban Wear",
      client: "KINETIC Streetwear",
      category: "Social Media",
      servicesProvided: ["Creative Direction", "Short-Form Video", "Community Drops", "Influencer Strategy"],
      shortDescription: "A viral product drop campaign generating organic hype across Gen-Z streetwear collectives.",
      fullDescription: "For KINETIC's limited-edition capsule release, we orchestrated a multi-week cryptic teaser campaign, interactive Instagram countdown games, and 45 high-energy micro-reels featuring kinetic typography and raw street documentary visuals.",
      challenge: "Creating genuine organic buzz without over-spending on traditional display ad inventory.",
      solution: "Pioneered a gated drop mechanism via Instagram DM automations and community Discord challenges, achieving 100% sellout within 18 minutes.",
      results: "1.4M Organic Views & 100% Drop Sellout in 18 Minutes",
      year: "2025",
      image: "/src/assets/images/work_brand_future_1790603740845.jpg",
      accentColor: "#6366F1"
    },
    {
      id: "future-labs",
      number: "04",
      title: "Motion Design — Future Labs",
      client: "Future Labs Robotics",
      category: "Video",
      servicesProvided: ["3D Motion Graphics", "Product Teaser", "Sound Design", "Cinema 4D"],
      shortDescription: "A futuristic kinetic launch trailer showcasing autonomous spatial mapping systems.",
      fullDescription: "Future Labs needed to unveil their patented LIDAR sensor to institutional venture funds and enterprise clients. We engineered a 90-second cinematic 3D motion trailer spotlighting photon trajectory, laser scanning, and industrial telemetry.",
      challenge: "Explaining intricate spatial sensor physics in an exhilarating visual format accessible to non-engineers.",
      solution: "Crafted photorealistic ray-traced laser visualizations and synchronized custom binaural sound design.",
      results: "Helped Secure $14M Series A Funding Round",
      year: "2025",
      image: "/src/assets/images/hero_agency_studio_1790603689120.jpg",
      accentColor: "#10B981"
    },
    {
      id: "aura-living",
      number: "05",
      title: "E-Commerce — Aura Living",
      client: "Aura Home Living",
      category: "Web Design",
      servicesProvided: ["Shopify Plus", "Custom UI Kit", "Checkout Optimization", "Speed Tuning"],
      shortDescription: "A high-conversion luxury furniture e-commerce experience with interactive room customizer.",
      fullDescription: "We overhauled the direct-to-consumer digital flagship for Aura Living, introducing interactive material swatches, 3D room scale previews, and a streamlined 2-step checkout flow.",
      challenge: "High cart abandonment due to fragmented legacy store UI and confusing shipping estimates.",
      solution: "Redesigned product pages with transparent shipping calculators, sticky purchase bars, and instant payment methods.",
      results: "+44% Average Order Value & +62% Checkout Completion",
      year: "2024",
      image: "/src/assets/images/work_web_luxury_1790603726309.jpg",
      accentColor: "#EC4899"
    },
    {
      id: "vertex-mobility",
      number: "06",
      title: "Brand Campaign — Vertex",
      client: "Vertex Mobility",
      category: "Marketing",
      servicesProvided: ["Go-To-Market Strategy", "Performance Ads", "Landing Funnel", "Lead Generation"],
      shortDescription: "An omnichannel customer acquisition sprint for next-generation electric fleet mobility.",
      fullDescription: "Targeting B2B commercial logistics fleet operators, we engineered highly focused performance funnels, comparison whitepapers, and interactive fleet TCO calculators.",
      challenge: "Overcoming institutional hesitation regarding commercial EV battery longevity and charging infrastructure.",
      solution: "Developed an interactive ROI simulation engine that proved 34% cost savings over 36 months, paired with hyper-targeted LinkedIn ad segments.",
      results: "340+ Qualified Enterprise Fleet Test Drive Requests",
      year: "2024",
      image: "/src/assets/images/case_study_ecosystem_1790603710697.jpg",
      accentColor: "#F97316"
    }
  ],

  caseStudy: {
    kicker: "FEATURED CASE STUDY",
    heading: "FROM IDEA TO IMPACT",
    clientName: "Nova Artisan Roasters",
    clientTagline: "Artisan Direct-Trade Coffee Ecosystem",
    challenge: "How do we help a growing brand create a stronger digital presence, stand apart from legacy commodities, and command premium retail pricing?",
    solution: "We engineered a cohesive digital ecosystem combining tactile matte packaging, an ultra-fast headless e-commerce store, cinematic documentary videos, and conversion-optimized retention marketing funnels.",
    results: [
      {
        value: "+180%",
        metric: "Brand Engagement",
        description: "Surge in organic community conversations & social shares"
      },
      {
        value: "+75%",
        metric: "Website Traffic",
        description: "Increase in high-intent visitors with 2.8x longer dwell time"
      },
      {
        value: "3.2×",
        metric: "Conversion Growth",
        description: "Lift in online retail sales and repeat subscription orders"
      }
    ],
    image: "/src/assets/images/case_study_ecosystem_1790603710697.jpg",
    testimonialQuote: "The transformation exceeded every expectation. Our brand looks world-class, and our direct-to-consumer store achieved record margins in month one.",
    testimonialAuthor: "Aarav Sharma",
    testimonialRole: "Founder & Master Roaster, Nova Coffee"
  },

  about: {
    heading: "WE ARE A SMALL TEAM WITH BIG IDEAS.",
    mainParagraph: "We are a creative digital agency helping ambitious businesses turn ideas into memorable brands, powerful websites and engaging digital experiences.",
    story: "Founded by senior designers and engineers tired of bloated traditional agencies and impersonal freelancers, NEXVANTA operates as a high-velocity creative studio. We work with a selected roster of ambitious clients to ensure deep focus, craft obsessiveness, and direct access to the people executing the work.",
    mission: "To craft digital experiences that make brands impossible to ignore, elevating aesthetics, speed, and bottom-line commercial impact.",
    vision: "To establish a gold standard for digital craftsmanship in India and across global technology hubs.",
    founder: {
      name: "Aditya Kumar",
      role: "Founder & Creative Director",
      bio: "Aditya Kumar leads NEXVANTA with a razor-sharp focus on brand distinctiveness, high-velocity frontend engineering, and conversion-first digital craft.",
      quote: "Great brands are not born by following templates. They are forged through ruthless attention to craft, strategy, and uncompromised digital execution.",
      location: "Jharkhand, India"
    },
    values: [
      {
        number: "01",
        title: "Creativity",
        description: "We challenge ordinary ideas. We refuse templates, lazy trends, and conventional shortcuts."
      },
      {
        number: "02",
        title: "Strategy",
        description: "Every creative decision has a purpose. We pair striking visuals with quantifiable business metrics."
      },
      {
        number: "03",
        title: "Quality",
        description: "We care about the details. From typography tracking to CSS micro-timings, precision is our standard."
      },
      {
        number: "04",
        title: "Partnership",
        description: "We work with clients, not just for them. Transparent communication and shared accountability."
      }
    ]
  },

  process: [
    {
      step: "01",
      title: "DISCOVER",
      description: "We understand your business, audience, and commercial goals through in-depth immersion and market analysis.",
      duration: "Week 1",
      keyDeliverables: ["Stakeholder Deep-Dive", "Competitor Audit", "Target Persona Profiles", "Scope & Milestone Roadmap"]
    },
    {
      step: "02",
      title: "STRATEGIZE",
      description: "We create the right creative and digital strategy, defining tone of voice, visual direction, and technical architecture.",
      duration: "Week 2",
      keyDeliverables: ["Creative Moodboards", "Information Architecture", "Core Messaging Wireframes", "Tech Stack Architecture"]
    },
    {
      step: "03",
      title: "CREATE",
      description: "Our designers, developers, and creatives bring the idea to life through rapid iterations and interactive prototyping.",
      duration: "Weeks 3–4",
      keyDeliverables: ["High-Fidelity Figma Mockups", "Production Frontend Code", "Design System Tokens", "Asset Production"]
    },
    {
      step: "04",
      title: "REFINE",
      description: "We test, improve, and polish every detail across devices, browsers, accessibility benchmarks, and speed audits.",
      duration: "Week 5",
      keyDeliverables: ["Multi-Device QA", "Core Web Vitals Optimization", "Accessibility Checks", "Client Review Loops"]
    },
    {
      step: "05",
      title: "LAUNCH",
      description: "We launch the final experience, train your internal team, and monitor real-world performance as you move forward.",
      duration: "Week 6+",
      keyDeliverables: ["DNS & Production Deployment", "Analytics & Event Tracking", "CMS Training Session", "30-Day Post-Launch Support"]
    }
  ],

  whyChooseUs: [
    {
      id: "creative",
      title: "Creative Thinking",
      description: "We don't rely on templates or generic solutions. Every project starts with a bespoke creative vision tailored to your market.",
      badge: "No Templates"
    },
    {
      id: "tech",
      title: "Modern Technology",
      description: "We build on modern stacks (React, Next.js, Tailwind, Motion) ensuring ultra-fast load times, flawless responsiveness, and solid security.",
      badge: "Sub-Second Speed"
    },
    {
      id: "comm",
      title: "Fast Communication",
      description: "Clear communication throughout the project with direct access to your lead designer and engineer, not account managers.",
      badge: "Direct Access"
    },
    {
      id: "business",
      title: "Business-Focused Design",
      description: "Beautiful design is essential, but business results matter just as much. We design interfaces engineered to generate leads and revenue.",
      badge: "ROI-Centered"
    },
    {
      id: "collab",
      title: "Flexible Collaboration",
      description: "Choose the level of support your business needs — from one-off flagship launches to dedicated monthly design & engineering retainers.",
      badge: "Agile Sprints"
    },
    {
      id: "partner",
      title: "Long-Term Partnership",
      description: "We aim to become an extension of your team, providing strategic guidance, proactive optimizations, and ongoing digital growth.",
      badge: "Embedded Team"
    }
  ],

  testimonials: [
    {
      id: "test-1",
      rating: 5,
      quote: "Working with NEXVANTA completely transformed how our brand looks online. They delivered an e-commerce platform that looks like an award-winning site while doubling our checkout conversion rate within weeks.",
      name: "Devika Rao",
      role: "Founder & Creative Director",
      company: "Aura Home Living",
      location: "Bengaluru, India"
    },
    {
      id: "test-2",
      rating: 5,
      quote: "The speed and visual restraint this team brought to our rebranding was astounding. No fluff, no endless bloated meetings — just pristine execution and a technical foundation our dev team actually loves.",
      name: "Karan Singhal",
      role: "Co-Founder & VP of Product",
      company: "Valence Mobility",
      location: "Mumbai, India"
    },
    {
      id: "test-3",
      rating: 5,
      quote: "From our first strategy session to the final launch day, communication was crystal clear. Our new identity and website immediately allowed us to pitch tier-1 enterprise enterprise accounts with full confidence.",
      name: "Meera Krishnan",
      role: "Head of Marketing",
      company: "Kinetic Robotics",
      location: "Hyderabad, India"
    },
    {
      id: "test-4",
      rating: 5,
      quote: "Finding an agency that masters both high-end aesthetic discernment and rigorous technical web performance is rare. NEXVANTA is in a league of their own.",
      name: "Rohan Varma",
      role: "Managing Director",
      company: "Monolith Architecture",
      location: "New Delhi, India"
    }
  ],

  industries: [
    { id: "ecom", name: "E-Commerce & Retail", description: "Direct-to-consumer flagship stores and product launches." },
    { id: "startups", name: "Tech Startups & SaaS", description: "High-conversion marketing sites and product interfaces." },
    { id: "fashion", name: "Fashion & Apparel", description: "Immersive lookbooks, drops, and aesthetic editorial brands." },
    { id: "realestate", name: "Real Estate & Architecture", description: "Luxury property portfolios and spatial project showcases." },
    { id: "hospitality", name: "Hospitality & Restaurants", description: "Artisanal food, luxury dining, and boutique hotels." },
    { id: "beauty", name: "Beauty & Personal Care", description: "Sensory branding and high-ticket consumer packaging." },
    { id: "healthcare", name: "Healthcare & Wellness", description: "Trustworthy modern patient experiences and medical tech." },
    { id: "education", name: "Education & EdTech", description: "Interactive learning platforms and university portals." },
    { id: "creators", name: "Personal Brands & Creators", description: "Signature portfolios, course launches, and media brands." },
    { id: "b2b", name: "Professional Services", description: "Consultancies, law firms, and financial advisories." },
    { id: "mobility", name: "Mobility & Clean Tech", description: "EV innovations, smart energy, and sustainable logistics." },
    { id: "local", name: "High-Growth Local Brands", description: "Dominant regional market leaders ready for national scale." }
  ],

  pricing: [
    {
      id: "starter",
      tier: "STARTER",
      tagline: "For businesses getting started online with a premier presence.",
      recommended: false,
      priceInr: "₹5,000 – ₹15,000",
      priceUsd: "$60 – $180",
      period: "per project",
      inclusions: [
        "High-Impact Single Page / Landing Page",
        "Fully Responsive Mobile Design",
        "Core Brand Typography & Color Setup",
        "Essential On-Page Technical SEO",
        "Interactive Contact & Lead Capture Form",
        "Social Links & WhatsApp Integration",
        "Sub-1s Performance Optimization",
        "2 Rounds of Revisions",
        "Delivery in 10–14 Days"
      ],
      ctaText: "Get Started"
    },
    {
      id: "growth",
      tier: "GROWTH",
      tagline: "For ambitious businesses ready to scale traffic and market authority.",
      recommended: true,
      priceInr: "₹15,000 – ₹20,000",
      priceUsd: "$180 – $240",
      period: "per project",
      inclusions: [
        "Multi-Page Flagship Website (Up to 6 Pages)",
        "Bespoke UI/UX Design System in Figma",
        "Interactive Animations & Micro-Interactions",
        "Complete Technical SEO & Schema Markup",
        "Headless CMS Integration for Easy Content Edits",
        "Google Analytics 4 & Meta Pixel Setup",
        "Social Media Launch Kit (Templates & Covers)",
        "Speed & Core Web Vitals Guarantee",
        "4 Rounds of Revisions",
        "Delivery in 3–4 Weeks"
      ],
      ctaText: "Choose Growth"
    },
    {
      id: "custom",
      tier: "CUSTOM / ENTERPRISE",
      tagline: "For brands requiring a complete end-to-end digital ecosystem.",
      recommended: false,
      priceInr: "₹20,000 – ₹30,000",
      priceUsd: "$240 – $360",
      period: "per project",
      inclusions: [
        "Full Brand Identity & Architecture System",
        "Custom Web App or Headless E-Commerce Store",
        "Tailored 3D Motion Graphics & Launch Video",
        "Omnichannel Paid Ads Strategy & Creative Assets",
        "AI-Powered Content & Creative Automation Setup",
        "Custom CRM & Lead Routing Webhooks",
        "Dedicated Lead Designer & Senior Engineer",
        "Weekly Strategy Synchronization Calls",
        "Priority Ongoing 60-Day Support",
        "Delivery in 5–8 Weeks"
      ],
      ctaText: "Talk To Us"
    }
  ],

  faqs: [
    {
      id: "faq-1",
      category: "Services",
      question: "What services do you provide?",
      answer: "We provide comprehensive end-to-end digital and creative services: Website Design & Development (React, Next.js, Headless CMS), Branding & Graphic Design, Social Media Strategy & Management, Video Editing & Motion Graphics, Performance Digital Marketing, UI/UX Product Design, Search Engine Optimization (SEO), and AI-Powered Creative Solutions."
    },
    {
      id: "faq-2",
      category: "Timeline",
      question: "How long does a website project take?",
      answer: "A focused high-impact landing page typically takes 10 to 14 days from kickoff to launch. A multi-page custom corporate website or headless e-commerce store usually takes between 3 to 5 weeks. For full-scale brand identity + custom web app builds, timelines range between 6 to 8 weeks with structured weekly milestone deliverables."
    },
    {
      id: "faq-3",
      category: "Pricing",
      question: "How much does a website or brand project cost?",
      answer: "Our project pricing is transparent and outcome-driven. Starter projects begin at ₹35,000 ($450), Growth tier packages for multi-page websites are ₹75,000 ($950), and comprehensive custom scopes (branding + custom e-commerce + motion) start at ₹1,50,000 ($1,850+). We provide detailed line-item proposals with no hidden surprises."
    },
    {
      id: "faq-4",
      category: "Support",
      question: "Do you provide website maintenance and ongoing updates?",
      answer: "Yes! Every project includes a 30-day post-launch support and warranty window. For long-term continuity, we offer flexible monthly care plans covering security patches, hosting management, content updates, performance checks, and ongoing feature sprints."
    },
    {
      id: "faq-5",
      category: "Social Media",
      question: "Can you manage our social media end-to-end?",
      answer: "Absolutely. Our social media team handles everything from research, monthly content calendars, scriptwriting, carousel design, and high-retention video reels to community engagement and audience growth analytics across Instagram, LinkedIn, and X."
    },
    {
      id: "faq-6",
      category: "Video & Motion",
      question: "Do you provide video editing and motion graphics?",
      answer: "Yes, video is one of our flagship capabilities. We produce commercial teasers, 3D product animations, kinetic typography ads, and viral short-form social reels. We provide sound design, color grading, and export formats tailored for every digital channel."
    },
    {
      id: "faq-7",
      category: "Branding",
      question: "Can you help with full brand identity from scratch?",
      answer: "Yes. We specialize in building complete visual identities for new ventures as well as modernizing legacy brands. This includes brand strategy, naming consultation, logo systems, typography suites, color theory, physical packaging, stationery, and comprehensive digital brand guidelines."
    },
    {
      id: "faq-8",
      category: "Global",
      question: "Do you work with businesses outside India?",
      answer: "Yes! Over 40% of our client partnerships are international — spanning the United States, United Kingdom, UAE, Singapore, and Europe. We operate seamlessly across time zones with async communication via Slack/WhatsApp and scheduled video check-ins."
    },
    {
      id: "faq-9",
      category: "Process",
      question: "How do we start a project?",
      answer: "Simply submit our project enquiry form below or click the WhatsApp button to chat directly. We'll review your goals within 24 hours, schedule a 20-minute discovery call, and present you with a tailored roadmap and transparent proposal."
    }
  ]
};
