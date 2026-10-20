import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { generateFallbackCampaign } from './src/utils/campaignLogic.js';
import { ProductInput, CampaignResult } from './src/types/campaign.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server client if key is present
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Endpoint: Generate Full Multi-Platform Campaign with A/B Ad Sets & Brand Kit
app.post('/api/generate-campaign', async (req, res) => {
  const input: ProductInput = req.body;

  if (!input || !input.name) {
    return res.status(400).json({ error: 'Product name is required.' });
  }

  // Generate high-grade deterministic baseline
  const baselineCampaign = generateFallbackCampaign(input);

  if (!ai) {
    // If no API key configured, return baseline
    return res.json({
      ...baselineCampaign,
      source: 'deterministic-engine',
    });
  }

  try {
    const prompt = `You are a world-class creative advertising director and social media growth strategist.
Create a tailored multi-platform social media campaign with complete ad sets and A/B testing variations for the following product:

Product Name: ${input.name}
Category: ${input.category}
Tagline: ${input.tagline}
Description: ${input.description}
Key Benefits: ${input.keyBenefits.join(', ')}
Price / Offer: ${input.priceOrOffer}
Target Audience: ${input.targetAudiences?.[0]?.name || 'Modern Innovators'} (${input.targetAudiences?.[0]?.corePainPoint || ''})
Brand Kit Name: ${input.brandKit?.logoName || 'Our Brand'}
Brand Voice: ${input.brandKit?.brandVoice || 'authoritative'}
Domain: ${input.brandKit?.companyDomain || 'getproduct.com'}

Generate a tailored JSON response for 4 primary ad networks (Facebook, Instagram, LinkedIn, Twitter) plus TikTok and Pinterest.
For each platform, provide:
1. A/B testing hypothesis and primary performance metric
2. Variant A (Benefit & Feature Clarity): high-clarity headline, subhead, hook, body copy, CTA, hashtags, and visual badge.
3. Variant B (Social Proof & Urgency / Emotional Angle): testimonial or FOMO headline, subhead, hook, body copy, CTA, hashtags, and visual badge.

Be punchy, network-native, and adhere strictly to best practices for each platform.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            adSets: {
              type: Type.OBJECT,
              properties: {
                facebook: {
                  type: Type.OBJECT,
                  properties: {
                    abTestHypothesis: { type: Type.STRING },
                    variantA: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                    variantB: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                  },
                  required: ['abTestHypothesis', 'variantA', 'variantB'],
                },
                instagram: {
                  type: Type.OBJECT,
                  properties: {
                    abTestHypothesis: { type: Type.STRING },
                    variantA: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                    variantB: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                  },
                  required: ['abTestHypothesis', 'variantA', 'variantB'],
                },
                linkedin: {
                  type: Type.OBJECT,
                  properties: {
                    abTestHypothesis: { type: Type.STRING },
                    variantA: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                    variantB: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                  },
                  required: ['abTestHypothesis', 'variantA', 'variantB'],
                },
                twitter: {
                  type: Type.OBJECT,
                  properties: {
                    abTestHypothesis: { type: Type.STRING },
                    variantA: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                    variantB: {
                      type: Type.OBJECT,
                      properties: {
                        headline: { type: Type.STRING },
                        subheadline: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        ctaText: { type: Type.STRING },
                        hookLine: { type: Type.STRING },
                        bodyParagraph: { type: Type.STRING },
                        callToAction: { type: Type.STRING },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                      },
                      required: ['headline', 'subheadline', 'ctaText', 'hookLine', 'bodyParagraph', 'hashtags'],
                    },
                  },
                  required: ['abTestHypothesis', 'variantA', 'variantB'],
                },
              },
              required: ['facebook', 'instagram', 'linkedin', 'twitter'],
            },
          },
          required: ['summary', 'adSets'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed && parsed.adSets) {
      // Merge Gemini creative output into our structured campaign
      const mergedCampaign = { ...baselineCampaign };
      mergedCampaign.summary = parsed.summary || baselineCampaign.summary;

      const platforms = ['facebook', 'instagram', 'linkedin', 'twitter'] as const;
      for (const plat of platforms) {
        const genSet = parsed.adSets[plat];
        if (genSet && mergedCampaign.adSets[plat]) {
          const adSet = mergedCampaign.adSets[plat];
          adSet.abTestHypothesis = genSet.abTestHypothesis || adSet.abTestHypothesis;

          if (genSet.variantA) {
            adSet.variants.A.visualConfig.headline = genSet.variantA.headline || adSet.variants.A.visualConfig.headline;
            adSet.variants.A.visualConfig.subheadline = genSet.variantA.subheadline || adSet.variants.A.visualConfig.subheadline;
            if (genSet.variantA.badge) adSet.variants.A.visualConfig.badge = genSet.variantA.badge;
            if (genSet.variantA.ctaText) adSet.variants.A.visualConfig.ctaText = genSet.variantA.ctaText;
            adSet.variants.A.copyData.hookLine = genSet.variantA.hookLine || adSet.variants.A.copyData.hookLine;
            adSet.variants.A.copyData.bodyParagraph = genSet.variantA.bodyParagraph || adSet.variants.A.copyData.bodyParagraph;
            adSet.variants.A.copyData.callToAction = genSet.variantA.callToAction || adSet.variants.A.copyData.callToAction;
            if (genSet.variantA.hashtags?.length) adSet.variants.A.copyData.hashtags = genSet.variantA.hashtags;
          }

          if (genSet.variantB) {
            adSet.variants.B.visualConfig.headline = genSet.variantB.headline || adSet.variants.B.visualConfig.headline;
            adSet.variants.B.visualConfig.subheadline = genSet.variantB.subheadline || adSet.variants.B.visualConfig.subheadline;
            if (genSet.variantB.badge) adSet.variants.B.visualConfig.badge = genSet.variantB.badge;
            if (genSet.variantB.ctaText) adSet.variants.B.visualConfig.ctaText = genSet.variantB.ctaText;
            adSet.variants.B.copyData.hookLine = genSet.variantB.hookLine || adSet.variants.B.copyData.hookLine;
            adSet.variants.B.copyData.bodyParagraph = genSet.variantB.bodyParagraph || adSet.variants.B.copyData.bodyParagraph;
            adSet.variants.B.copyData.callToAction = genSet.variantB.callToAction || adSet.variants.B.copyData.callToAction;
            if (genSet.variantB.hashtags?.length) adSet.variants.B.copyData.hashtags = genSet.variantB.hashtags;
          }
        }
      }

      return res.json({
        ...mergedCampaign,
        source: 'gemini-3.8-flash',
      });
    }

    return res.json({
      ...baselineCampaign,
      source: 'deterministic-fallback',
    });
  } catch (err: any) {
    console.error('Error in /api/generate-campaign:', err?.message || err);
    // Graceful fallback guarantees flawless UX
    return res.json({
      ...baselineCampaign,
      source: 'deterministic-fallback-after-error',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
