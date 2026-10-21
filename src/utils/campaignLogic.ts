import {
  PlatformId,
  PlatformAdSet,
  TemplateVariant,
  ProductInput,
  CampaignResult,
  LayoutArchetype,
  BrandKit,
} from '../types/campaign';

export interface PlatformMetadata {
  id: PlatformId;
  name: string;
  icon: string;
  width: number;
  height: number;
  aspectRatio: string;
  ratioLabel: string;
  maxChars: number;
  bestTime: string;
  recommendedPlacement: string;
  defaultArchetype: LayoutArchetype;
  audienceVibe: string;
  bestPractices: string[];
}

export const PLATFORM_SPECS: Record<PlatformId, PlatformMetadata> = {
  facebook: {
    id: 'facebook',
    name: 'Facebook Feed & Ads',
    icon: 'Facebook',
    width: 1200,
    height: 1200,
    aspectRatio: '1:1',
    ratioLabel: 'Square (1:1 • 1200x1200)',
    maxChars: 5000,
    bestTime: '1:00 PM - 4:00 PM (Weekdays)',
    recommendedPlacement: 'Feed, Marketplace & Audience Network',
    defaultArchetype: 'social-proof',
    audienceVibe: 'Direct response, social proof trust badges, community validation, explicit offer & clear click trigger.',
    bestPractices: [
      'Keep text under 20% of image area for optimal delivery',
      'Lead with social proof or immediate risk-reversal guarantee',
      'Use high-contrast CTA button pill that mimics native interaction',
      'Include customer ratings or verified buyer badges',
    ],
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram Feed',
    icon: 'Instagram',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    ratioLabel: 'Square (1:1 • 1080x1080)',
    maxChars: 2200,
    bestTime: '11:00 AM - 1:00 PM & 7:00 PM',
    recommendedPlacement: 'Instagram Main Feed & Explore Grid',
    defaultArchetype: 'hero-showcase',
    audienceVibe: 'Visual-first, aesthetic curation, lifestyle aspiration, punchy hooks & saving to collections.',
    bestPractices: [
      'Focus on high-aesthetic hero product framing',
      'Hook the audience in the first line before the "more" fold',
      'Include 3-5 curated niche hashtags at bottom',
      'Design for thumb-stopping visual elegance and bookmarkability',
    ],
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn Sponsored Post',
    icon: 'Linkedin',
    width: 1200,
    height: 628,
    aspectRatio: '1.91:1',
    ratioLabel: 'Landscape (1.91:1 • 1200x628)',
    maxChars: 3000,
    bestTime: '8:00 AM - 10:00 AM (Tue-Thu)',
    recommendedPlacement: 'Desktop & Mobile Sponsored Content Feed',
    defaultArchetype: 'split-feature',
    audienceVibe: 'Professional ROI, workflow efficiency, thought-leadership breakdown, data-driven credibility.',
    bestPractices: [
      'Use landscape 1.91:1 ratio for native corporate feed immersion',
      'Structure value into 3 numbered operational benefits',
      'Avoid hyper-promotional fluff; speak in terms of team leverage & ROI',
      'Include clear enterprise demo or trial call to action',
    ],
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter) Lead Card',
    icon: 'Twitter',
    width: 1200,
    height: 675,
    aspectRatio: '16:9',
    ratioLabel: 'Wide Card (16:9 • 1200x675)',
    maxChars: 280,
    bestTime: '9:00 AM & 12:00 PM',
    recommendedPlacement: 'Promoted Timeline & Trend Takeover',
    defaultArchetype: 'editorial-minimal',
    audienceVibe: 'Provocative contrarian hook, razor-sharp brevity, discussion igniter, thread-worthy insight.',
    bestPractices: [
      'Use high-contrast typographic card with dark mode friendliness',
      'Frame the hook as a counter-intuitive industry insight',
      'Keep copy strictly under 280 characters for organic thread retweets',
      'Include an arrow pointer towards the external link',
    ],
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok & Reels Story',
    icon: 'Smartphone',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    ratioLabel: 'Vertical (9:16 • 1080x1920)',
    maxChars: 2200,
    bestTime: '6:00 PM - 9:00 PM',
    recommendedPlacement: 'TikTok For You Page, IG Stories & Reels Ads',
    defaultArchetype: 'urgency-promo',
    audienceVibe: 'High energy, immediate 3-second hook, fast value, relatable problem-solution, sticker-ready CTA.',
    bestPractices: [
      'Safe zones: keep text away from top 15% and bottom 20% (UI elements)',
      'Hook the viewer in the first 3 words with pattern-interrupt styling',
      'Feature high-contrast urgency stickers ("Trending", "Selling Fast")',
      'Design for vertical full-screen smartphone immersion',
    ],
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest Idea Pin',
    icon: 'Pin',
    width: 1000,
    height: 1500,
    aspectRatio: '2:3',
    ratioLabel: 'Portrait Pin (2:3 • 1000x1500)',
    maxChars: 500,
    bestTime: '8:00 PM - 11:00 PM (Weekends)',
    recommendedPlacement: 'Home Feed & Visual Search Discovery',
    defaultArchetype: 'editorial-minimal',
    audienceVibe: 'Search intent, moodboard aesthetics, inspirational how-to, aspirational lifestyle enhancement.',
    bestPractices: [
      'Use 2:3 vertical aspect ratio (1000x1500) to maximize pin board height',
      'Include bold editorial typography that is readable on mobile grid',
      'Highlight aesthetic integration into daily living spaces',
      'Provide search-friendly descriptive keywords for pin indexing',
    ],
  },
};

export const BRAND_PALETTE_PRESETS: Array<{
  name: string;
  theme: BrandKit['brandVoice'];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
    cardBg: string;
  };
}> = [
  {
    name: 'Cyberpunk Neon',
    theme: 'urgent',
    colors: {
      primary: '#06B6D4',
      secondary: '#3B82F6',
      accent: '#F43F5E',
      bg: '#090D16',
      text: '#F8FAFC',
      cardBg: 'rgba(255, 255, 255, 0.06)',
    },
  },
  {
    name: 'Obsidian Luxury',
    theme: 'authoritative',
    colors: {
      primary: '#D97706',
      secondary: '#B45309',
      accent: '#10B981',
      bg: '#141416',
      text: '#FAF8F5',
      cardBg: 'rgba(38, 38, 42, 0.8)',
    },
  },
  {
    name: 'SaaS Indigo Glow',
    theme: 'authoritative',
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#06B6D4',
      bg: '#0F172A',
      text: '#F8FAFC',
      cardBg: 'rgba(30, 41, 59, 0.8)',
    },
  },
  {
    name: 'Nordic Clean Studio',
    theme: 'minimalist',
    colors: {
      primary: '#0F172A',
      secondary: '#334155',
      accent: '#2563EB',
      bg: '#F8FAFC',
      text: '#0F172A',
      cardBg: '#FFFFFF',
    },
  },
  {
    name: 'Botanical Emerald',
    theme: 'conversational',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#F97316',
      bg: '#052E16',
      text: '#F0FDF4',
      cardBg: 'rgba(6, 78, 59, 0.6)',
    },
  },
  {
    name: 'Sunset Coral Pop',
    theme: 'playful',
    colors: {
      primary: '#EC4899',
      secondary: '#F43F5E',
      accent: '#F59E0B',
      bg: '#18181B',
      text: '#FFF1F2',
      cardBg: 'rgba(255, 255, 255, 0.08)',
    },
  },
];

export const BRAND_FONTS = [
  { name: 'Inter (Clean Tech)', heading: 'font-sans', body: 'font-sans' },
  { name: 'Space Grotesk (Modern Bold)', heading: 'font-mono', body: 'font-sans' },
  { name: 'Playfair Display (Luxury Editorial)', heading: 'font-serif', body: 'font-sans' },
  { name: 'Plus Jakarta Sans (SaaS Executive)', heading: 'font-sans', body: 'font-sans' },
  { name: 'Outfit (Friendly Geometric)', heading: 'font-display', body: 'font-sans' },
];

export const DEFAULT_BRAND_KIT: BrandKit = {
  logoName: 'Aura Labs',
  primaryColor: '#6366F1',
  secondaryColor: '#8B5CF6',
  accentColor: '#06B6D4',
  bgColor: '#0F172A',
  textColor: '#F8FAFC',
  cardBg: 'rgba(30, 41, 59, 0.8)',
  headingFont: 'Plus Jakarta Sans',
  bodyFont: 'Inter',
  brandVoice: 'authoritative',
  companyDomain: 'ravindran.in',
};

/**
 * Normalizes an array of hashtags ensuring # symbol, alphanumeric/underscore only
 */
export function normalizeHashtags(tags: string[]): string[] {
  return tags
    .map((tag) => {
      const clean = tag.replace(/[^a-zA-Z0-9_]/g, '');
      return clean.length > 0 ? `#${clean}` : '';
    })
    .filter((tag) => tag.length > 1);
}

/**
 * Validates text length against platform limits
 */
export function validatePlatformLimits(
  platform: PlatformId,
  text: string
): { valid: boolean; charCount: number; maxChars: number; remainingChars: number; note?: string } {
  const spec = PLATFORM_SPECS[platform] || PLATFORM_SPECS.instagram;
  let evaluatedText = text;
  let note: string | undefined;

  if (platform === 'twitter' && text.includes('--- THREAD FOLLOW-UP ---')) {
    evaluatedText = text.split('--- THREAD FOLLOW-UP ---')[0].trim();
    note = 'Lead Tweet';
  }

  const charCount = evaluatedText.length;
  const remainingChars = spec.maxChars - charCount;
  return {
    valid: charCount <= spec.maxChars,
    charCount,
    maxChars: spec.maxChars,
    remainingChars,
    note,
  };
}

/**
 * Formats copy for full platform caption export
 */
export function formatCopyForPlatform(
  platform: PlatformId,
  copy: {
    hookLine: string;
    bodyParagraph: string;
    callToAction: string;
    hashtags: string[];
    threadOrSlideCopy?: string[];
  }
): string {
  const cleanHashtags = normalizeHashtags(copy.hashtags).join(' ');

  if (platform === 'twitter') {
    const base = `${copy.hookLine}\n\n${copy.bodyParagraph}\n\n👉 ${copy.callToAction}\n\n${normalizeHashtags(copy.hashtags).slice(0, 3).join(' ')}`;
    if (copy.threadOrSlideCopy && copy.threadOrSlideCopy.length > 0) {
      const threadText = copy.threadOrSlideCopy
        .map((step, idx) => `[${idx + 2}/${copy.threadOrSlideCopy!.length + 1}] ${step}`)
        .join('\n\n');
      return `${base}\n\n--- THREAD FOLLOW-UP ---\n${threadText}`;
    }
    return base;
  }

  if (platform === 'linkedin') {
    const bullets = copy.threadOrSlideCopy && copy.threadOrSlideCopy.length > 0
      ? '\n' + copy.threadOrSlideCopy.map((pt) => `🔹 ${pt}`).join('\n') + '\n'
      : '';
    return `${copy.hookLine}\n\n${copy.bodyParagraph}${bullets}\nHere is why this matters for your workflow:\n👉 ${copy.callToAction}\n\nWhat are your thoughts on this approach?\n.\n.\n${cleanHashtags}`;
  }

  if (platform === 'tiktok') {
    return `${copy.hookLine} 🔥\n\n${copy.bodyParagraph}\n\nLink in bio to check it out! 👆\n\n${cleanHashtags}`;
  }

  if (platform === 'pinterest') {
    return `${copy.hookLine}\n\n${copy.bodyParagraph}\n\nSave this pin for later! | ${cleanHashtags}`;
  }

  if (platform === 'facebook') {
    return `${copy.hookLine}\n\n${copy.bodyParagraph}\n\n👉 Click below to claim yours today:\n${copy.callToAction}\n\n${cleanHashtags}`;
  }

  // Instagram default
  return `${copy.hookLine}\n.\n${copy.bodyParagraph}\n.\n👉 ${copy.callToAction}\n.\n.\n${cleanHashtags}`;
}

/**
 * Calculates optimal responsive scale to fit within container
 */
export function calculateResponsiveScale(
  containerWidth: number,
  containerHeight: number,
  targetWidth: number,
  targetHeight: number,
  padding = 32
): number {
  if (containerWidth <= 0 || containerHeight <= 0) return 0.5;
  const availW = Math.max(100, containerWidth - padding * 2);
  const availH = Math.max(100, containerHeight - padding * 2);
  const scaleW = availW / targetWidth;
  const scaleH = availH / targetHeight;
  return Math.min(scaleW, scaleH, 1);
}

/**
 * Generates an end-to-end multi-platform campaign with tailored Ad Sets and A/B testing variants (A vs B)
 */
export function generateFallbackCampaign(input: ProductInput): CampaignResult {
  const currentAudience =
    input.targetAudiences.find((a) => a.id === input.selectedAudienceId) ||
    input.targetAudiences[0] || {
      id: 'default',
      name: 'Modern Consumers & Innovators',
      tagline: 'Seeking superior quality and effortless utility',
      corePainPoint: 'Clunky, low-grade products that fail to deliver',
      keyDesire: 'Seamless performance and premium aesthetic',
      toneBias: 'Confident, inspiring, clear',
    };

  const brand = input.brandKit || DEFAULT_BRAND_KIT;
  const colors = {
    primary: brand.primaryColor,
    secondary: brand.secondaryColor,
    accent: brand.accentColor,
    bg: brand.bgColor,
    text: brand.textColor,
    cardBg: brand.cardBg,
  };

  const benefit1 = input.keyBenefits[0] || 'Uncompromising craftsmanship';
  const benefit2 = input.keyBenefits[1] || 'Engineered for seamless daily flow';
  const benefit3 = input.keyBenefits[2] || 'Intuitive, durable & beautifully minimal';

  const defaultImages: Record<string, string> = {
    tech: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    food: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    fashion: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    wellness: 'https://images.unsplash.com/photo-1608248597359-0a6311634b3f?auto=format&fit=crop&w=800&q=80',
    saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  };

  const fallbackImage =
    input.imageUrl ||
    defaultImages[input.category.toLowerCase()] ||
    defaultImages.tech;

  // Helper to build variants A and B for each platform
  const createAdSet = (platform: PlatformId): PlatformAdSet => {
    const spec = PLATFORM_SPECS[platform];

    // Variant A: Feature / Clarity / Direct Solution
    const variantA: TemplateVariant = {
      id: 'A',
      name: 'Variant A: Feature & Value Clarity',
      concept: 'Focuses on tangible specifications, problem-solving benefits, and straightforward value proposition.',
      layoutArchetype: spec.defaultArchetype,
      visualConfig: {
        headline: input.name,
        subheadline: input.tagline || 'Engineered for those who refuse to settle.',
        badge: '✨ NEW LAUNCH',
        ctaText: platform === 'linkedin' ? 'Request Enterprise Demo' : 'Explore The Collection',
        priceTag: input.priceOrOffer || 'Special Launch Edition',
        ratingStars: 5,
        ratingCount: '4.9 ★ (1,500+ Verified Reviews)',
        bulletPoints: [benefit1, benefit2],
        bgTheme: 'dark',
        colorPalette: colors,
        fontHeading: brand.headingFont,
        fontBody: brand.bodyFont,
        showBadge: true,
        showRating: true,
        showPrice: true,
        showBullets: platform === 'linkedin' || platform === 'facebook',
        showLogo: true,
        imagePosition: platform === 'linkedin' ? 'right' : 'center',
        customImage: fallbackImage,
        logoUrl: brand.logoUrl,
      },
      copyData: {
        primaryText: `${input.name}: The smarter way to solve ${currentAudience.corePainPoint.toLowerCase()}.`,
        hookLine: `Tired of ${currentAudience.corePainPoint.toLowerCase()}? Discover how ${input.name} sets a new standard.`,
        bodyParagraph: `${input.description}\n\nFeaturing:\n• ${benefit1}\n• ${benefit2}\n• ${benefit3}`,
        callToAction: `Claim your launch offer on ${brand.companyDomain} today.`,
        hashtags: [
          input.name.toLowerCase().replace(/\s+/g, ''),
          'Innovation',
          'ProductLaunch',
          'BestInClass',
        ],
        threadOrSlideCopy: [
          `Pillar 1: Overcoming ${currentAudience.corePainPoint}`,
          `Pillar 2: Why ${benefit1} makes the difference`,
          `Pillar 3: Real world reliability for ${currentAudience.name}`,
        ],
        characterCount: 380,
        recommendedPostTime: spec.bestTime,
        audienceReasoning: `Analytical buyers in the ${currentAudience.name} cohort look for explicit feature validation and build quality before deciding.`,
        targetAudienceName: currentAudience.name,
      },
    };

    // Variant B: Social Proof / Emotional Urgency / Curiosity
    const variantB: TemplateVariant = {
      id: 'B',
      name: 'Variant B: Social Proof & Urgency',
      concept: 'Leverages social proof quotes, FOMO badges, and high-impact curiosity to test emotional conversion lift.',
      layoutArchetype: 'social-proof',
      visualConfig: {
        headline: `"I threw away my old setup after 24 hours with this."`,
        subheadline: `${input.name} — Over 10,000+ happy customers already upgraded.`,
        badge: '🔥 SELLING FAST • 24H DROP',
        ctaText: 'Claim Your 20% Discount',
        priceTag: input.priceOrOffer ? `Limited: ${input.priceOrOffer}` : '30-Day Risk-Free Trial',
        ratingStars: 5,
        ratingCount: 'Rated 4.9/5 by 10,000+ Customers',
        quoteAuthor: 'Verified Purchaser',
        bulletPoints: [benefit1, 'Free Expedited Global Shipping', '30-Day Money-Back Guarantee'],
        bgTheme: 'gradient',
        colorPalette: {
          ...colors,
          bg: '#090D16',
          cardBg: 'rgba(255, 255, 255, 0.08)',
        },
        fontHeading: brand.headingFont,
        fontBody: brand.bodyFont,
        showBadge: true,
        showRating: true,
        showPrice: true,
        showBullets: true,
        showLogo: true,
        imagePosition: 'center',
        customImage: fallbackImage,
        logoUrl: brand.logoUrl,
      },
      copyData: {
        primaryText: `${input.name}: Verified customer favorite with 4.9-star rating.`,
        hookLine: `⭐️⭐️⭐️⭐️⭐️ "Honestly didn't think it would make this big of a difference. Now I recommend it to everyone."`,
        bodyParagraph: `If you're still dealing with ${currentAudience.corePainPoint.toLowerCase()}, you're losing valuable hours every week.\n\nHere is why ${input.name} is going viral:\n✅ ${benefit1}\n✅ ${benefit2}\n✅ Zero risk with our 30-day trial`,
        callToAction: 'Tap below to lock in the special pricing before inventory runs out!',
        hashtags: [
          'CustomerFavorite',
          'GameChanger',
          input.name.toLowerCase().replace(/\s+/g, ''),
          'Trending',
        ],
        threadOrSlideCopy: [
          'Slide 1: Customer testimonial & before/after',
          'Slide 2: Unboxing and tactile materials check',
          'Slide 3: Risk-reversal guarantee and link in bio',
        ],
        characterCount: 420,
        recommendedPostTime: spec.bestTime,
        audienceReasoning: `Testing psychological urgency and user testimonials against feature-first messaging tests whether social consensus drives a lower Cost-Per-Acquisition.`,
        targetAudienceName: currentAudience.name,
      },
    };

    return {
      platform,
      platformName: spec.name,
      platformIcon: spec.icon,
      dimensions: {
        width: spec.width,
        height: spec.height,
        aspectRatio: spec.aspectRatio,
        label: spec.ratioLabel,
      },
      bestPractices: spec.bestPractices,
      recommendedPlacement: spec.recommendedPlacement,
      abTestHypothesis:
        platform === 'linkedin'
          ? 'Variant A (Feature ROI) is projected to generate higher enterprise pipeline quality, while Variant B will test whether executive peer testimonials reduce sales cycle length.'
          : 'Variant A (Value Clarity) tests direct intent clicks, while Variant B (Social Proof & Urgency) tests emotional FOMO lift on CTR and conversion rate.',
      primaryMetric:
        platform === 'linkedin'
          ? 'Click-Through Rate (CTR)'
          : platform === 'facebook'
          ? 'Conversion Rate (CVR)'
          : 'Engagement Rate',
      activeVariantId: 'A',
      variants: {
        A: variantA,
        B: variantB,
      },
    };
  };

  const adSets: Record<PlatformId, PlatformAdSet> = {
    facebook: createAdSet('facebook'),
    instagram: createAdSet('instagram'),
    linkedin: createAdSet('linkedin'),
    twitter: createAdSet('twitter'),
    tiktok: createAdSet('tiktok'),
    pinterest: createAdSet('pinterest'),
  };

  return {
    id: `campaign-${Date.now()}`,
    productName: input.name,
    timestamp: new Date().toISOString(),
    brandKit: brand,
    adSets,
    summary: `Complete multi-platform ad set and A/B campaign generated for "${input.name}", fully branded with ${brand.logoName} brand kit and tailored for ${currentAudience.name}.`,
  };
}

export const SAMPLE_PRODUCTS: ProductInput[] = [
  {
    name: 'AuraPulse Smart Ring',
    category: 'tech',
    tagline: 'Titanium biometric tracker with 7-day battery and zero screen distractions.',
    description: 'AuraPulse tracks circadian recovery, sleep stages, heart-rate variability, and stress metrics within an aerospace-grade titanium ring that feels weightless.',
    keyBenefits: [
      'Aerospace Grade Titanium with 100m water resistance',
      '7-Day battery life with wireless magnetic dock',
      'Predictive sleep, readiness & recovery AI engine',
    ],
    priceOrOffer: '$299 + Free Lifetime App Access',
    selectedAudienceId: 'aud-biohackers',
    targetAudiences: [
      {
        id: 'aud-biohackers',
        name: 'High-Performance Executives & Athletes',
        tagline: 'Obsessed with data-driven recovery & continuous health telemetry',
        corePainPoint: 'Clunky smartwatches with annoying screen notifications and daily charging',
        keyDesire: 'Silent, discreet biometric tracking that delivers actionable recovery insights',
        toneBias: 'Precise, authoritative, premium, scientifically grounded',
      },
      {
        id: 'aud-mindful',
        name: 'Mindful Wellness & Digital Detoxers',
        tagline: 'Seeking balance without screen fatigue',
        corePainPoint: 'Digital burnout from wrist buzzing and display addiction',
        keyDesire: 'Invisible health awareness that lets them live in the physical present',
        toneBias: 'Calm, organic, aesthetic, restorative',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    brandKit: {
      logoName: 'AuraPulse',
      primaryColor: '#06B6D4',
      secondaryColor: '#3B82F6',
      accentColor: '#F59E0B',
      bgColor: '#090D16',
      textColor: '#F8FAFC',
      cardBg: 'rgba(255, 255, 255, 0.06)',
      headingFont: 'Space Grotesk',
      bodyFont: 'Inter',
      brandVoice: 'authoritative',
      companyDomain: 'aurapulse.io',
    },
  },
  {
    name: 'Zenith AI Workspace',
    category: 'saas',
    tagline: 'The unified operating system that synthesizes docs, tasks, and team knowledge automatically.',
    description: 'Zenith connects your Slack, GitHub, Linear, and Notion into a real-time autonomous brain that automates daily updates, unblocks cross-functional tasks, and generates executive summaries.',
    keyBenefits: [
      'Autonomous project sync across Linear, Jira & GitHub',
      'Context-aware AI coworker that drafts specs and summaries',
      'SOC-2 Type II Certified with enterprise zero-retention privacy',
    ],
    priceOrOffer: '14-Day Free Team Trial • No Credit Card Required',
    selectedAudienceId: 'aud-engineering-leads',
    targetAudiences: [
      {
        id: 'aud-engineering-leads',
        name: 'VPs of Engineering & Product Leads',
        tagline: 'Managing 20+ distributed contributors across timezones',
        corePainPoint: 'Spending 10+ hours a week chasing status updates and reconciling outdated tickets',
        keyDesire: 'Hands-off visibility into blocker resolution and accelerated sprint velocity',
        toneBias: 'No-nonsense, technical, efficiency-centric, scalable',
      },
      {
        id: 'aud-solo-founders',
        name: 'Fast-Moving Startup Founders',
        tagline: 'Wearing 5 hats while shipping new releases every week',
        corePainPoint: 'Context switching between communication and deep product execution',
        keyDesire: 'A 10x multiplier that acts as their Chief of Staff for daily task tracking',
        toneBias: 'Aggressive, visionary, high-leverage, pragmatic',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    brandKit: {
      logoName: 'Zenith OS',
      primaryColor: '#6366F1',
      secondaryColor: '#8B5CF6',
      accentColor: '#06B6D4',
      bgColor: '#0F172A',
      textColor: '#F8FAFC',
      cardBg: 'rgba(30, 41, 59, 0.8)',
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      brandVoice: 'authoritative',
      companyDomain: 'zenith.ai',
    },
  },
  {
    name: 'Komorebi Single-Origin Cold Brew',
    category: 'food',
    tagline: 'Direct-trade Ethiopian Yirgacheffe slow-dripped for 24 hours with floral jasmine notes.',
    description: 'Slow-crafted cold brew made from high-elevation heirloom beans, boasting silky body, natural citrus sweetness, and zero bitterness without added sugar.',
    keyBenefits: [
      '24-Hour Kyoto-style Japanese cold-drip extraction',
      'Direct-trade organic single-origin heirloom beans',
      'Naturally smooth with notes of bergamot, peach & floral jasmine',
    ],
    priceOrOffer: 'Buy 2 Boxes, Get 1 Free + Free Shipping',
    selectedAudienceId: 'aud-coffee-connoisseurs',
    targetAudiences: [
      {
        id: 'aud-coffee-connoisseurs',
        name: 'Specialty Coffee Purists & Creators',
        tagline: 'Appreciates origin transparency, terroir, and delicate flavor profiles',
        corePainPoint: 'Stale grocery store cold brews filled with artificial syrups and burnt beans',
        keyDesire: 'Artisanal cafe-quality single origin experience delivered to their doorstep',
        toneBias: 'Artisanal, sensory, poetic, refined',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    brandKit: {
      logoName: 'Komorebi Coffee',
      primaryColor: '#D97706',
      secondaryColor: '#B45309',
      accentColor: '#10B981',
      bgColor: '#1C1917',
      textColor: '#FAF8F5',
      cardBg: 'rgba(41, 37, 36, 0.7)',
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
      brandVoice: 'minimalist',
      companyDomain: 'komorebicoffee.com',
    },
  },
  {
    name: 'Solace Ergonomic Cloud-Stride',
    category: 'fashion',
    tagline: 'Zero-gravity barefoot running sneaker crafted from recycled ocean plastic and algae foam.',
    description: 'Engineered in Zurich with orthopedic footbed architecture that realigns posture and absorbs impact while remaining featherweight and breathable.',
    keyBenefits: [
      'Biomechanically engineered anatomical wide toe-box',
      'Algae Bloom™ energy-return midsole cushion',
      'Breathable seamless knit from 100% recycled marine yarn',
    ],
    priceOrOffer: 'Launch Discount: 20% Off With Code STRIDE20',
    selectedAudienceId: 'aud-urban-walkers',
    targetAudiences: [
      {
        id: 'aud-urban-walkers',
        name: 'Metropolitan Commuters & Nurses',
        tagline: 'On their feet for 8,000 to 15,000 steps every single day',
        corePainPoint: 'Plantar fasciitis, lower back ache, and sore heels from rigid fashionable shoes',
        keyDesire: 'All-day walking comfort without looking like clunky orthopedic footwear',
        toneBias: 'Empathetic, relieving, stylish, durable',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    brandKit: {
      logoName: 'Solace Footwear',
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      accentColor: '#F97316',
      bgColor: '#052E16',
      textColor: '#F0FDF4',
      cardBg: 'rgba(6, 78, 59, 0.6)',
      headingFont: 'Outfit',
      bodyFont: 'Inter',
      brandVoice: 'playful',
      companyDomain: 'solacestride.com',
    },
  },
];
