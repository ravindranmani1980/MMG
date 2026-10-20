export type PlatformId =
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'pinterest';

export type LayoutArchetype =
  | 'hero-showcase'
  | 'split-feature'
  | 'social-proof'
  | 'urgency-promo'
  | 'editorial-minimal';

export interface BrandKit {
  logoUrl?: string;
  logoName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  cardBg: string;
  headingFont: string;
  bodyFont: string;
  brandVoice: 'authoritative' | 'conversational' | 'urgent' | 'playful' | 'minimalist';
  companyDomain: string;
}

export interface AudiencePersona {
  id: string;
  name: string;
  tagline: string;
  corePainPoint: string;
  keyDesire: string;
  toneBias: string;
}

export interface ProductInput {
  name: string;
  category: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  priceOrOffer: string;
  targetAudiences: AudiencePersona[];
  selectedAudienceId: string;
  imageUrl?: string;
  brandKit: BrandKit;
}

export interface VisualConfig {
  headline: string;
  subheadline: string;
  badge: string;
  ctaText: string;
  priceTag?: string;
  ratingStars?: number;
  ratingCount?: string;
  quoteAuthor?: string;
  bulletPoints: string[];
  bgTheme: 'dark' | 'light' | 'gradient' | 'glass';
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
    cardBg: string;
  };
  fontHeading: string;
  fontBody: string;
  showBadge: boolean;
  showRating: boolean;
  showPrice: boolean;
  showBullets: boolean;
  showLogo: boolean;
  imagePosition: 'center' | 'left' | 'right' | 'background' | 'bottom';
  customImage?: string;
  logoUrl?: string;
}

export interface CopyData {
  primaryText: string;
  hookLine: string;
  bodyParagraph: string;
  callToAction: string;
  hashtags: string[];
  threadOrSlideCopy?: string[];
  characterCount: number;
  recommendedPostTime: string;
  audienceReasoning: string;
  targetAudienceName: string;
}

export interface TemplateVariant {
  id: 'A' | 'B';
  name: string;
  concept: string; // e.g. "Feature-Driven Value Prop" vs "Social Proof & Urgency"
  layoutArchetype: LayoutArchetype;
  visualConfig: VisualConfig;
  copyData: CopyData;
}

export interface PlatformAdSet {
  platform: PlatformId;
  platformName: string;
  platformIcon: string;
  dimensions: {
    width: number;
    height: number;
    aspectRatio: string;
    label: string;
  };
  bestPractices: string[];
  recommendedPlacement: string;
  abTestHypothesis: string;
  primaryMetric: 'Click-Through Rate (CTR)' | 'Conversion Rate (CVR)' | 'Engagement Rate' | 'Saves & Shares';
  activeVariantId: 'A' | 'B';
  variants: {
    A: TemplateVariant;
    B: TemplateVariant;
  };
}

export interface CampaignResult {
  id: string;
  productName: string;
  timestamp: string;
  brandKit: BrandKit;
  adSets: Record<PlatformId, PlatformAdSet>;
  summary: string;
}
