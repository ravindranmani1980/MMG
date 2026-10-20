import React, { useState } from 'react';
import {
  ProductInput,
  CampaignResult,
  BrandKit,
  PlatformId,
  TemplateVariant,
} from './types/campaign';
import {
  SAMPLE_PRODUCTS,
  generateFallbackCampaign,
  PLATFORM_SPECS,
} from './utils/campaignLogic';
import { Header } from './components/Header';
import { ProductForm } from './components/ProductForm';
import { AdSetCard } from './components/AdSetCard';
import { ABMatrixView } from './components/ABMatrixView';
import { BrandKitModal } from './components/BrandKitModal';
import { ExportModal } from './components/ExportModal';
import { Sparkles, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

export default function App() {
  const [product, setProduct] = useState<ProductInput>(SAMPLE_PRODUCTS[0]);
  const [campaign, setCampaign] = useState<CampaignResult>(() =>
    generateFallbackCampaign(SAMPLE_PRODUCTS[0])
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'single' | 'ab-matrix'>('grid');
  const [platformFilter, setPlatformFilter] = useState<'all' | PlatformId>('all');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 3000);
  };

  // Generate complete campaign via server endpoint with graceful client fallback
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        const data: CampaignResult = await res.json();
        setCampaign(data);
        showToast('Ad sets & A/B variants updated successfully!');
      } else {
        // Fallback
        const fallback = generateFallbackCampaign(product);
        setCampaign(fallback);
        showToast('Campaign generated with local design engine');
      }
    } catch {
      const fallback = generateFallbackCampaign(product);
      setCampaign(fallback);
      showToast('Campaign generated with local design engine');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Preset Switching
  const handleSelectPreset = (preset: ProductInput) => {
    setProduct(preset);
    const newCampaign = generateFallbackCampaign(preset);
    setCampaign(newCampaign);
    showToast(`Loaded ${preset.name} preset`);
  };

  // Apply Brand Kit across the board
  const handleSaveBrandKit = (updatedBrandKit: BrandKit) => {
    const updatedProduct = {
      ...product,
      brandKit: updatedBrandKit,
    };
    setProduct(updatedProduct);

    // Re-apply to all ad sets
    const updatedAdSets = { ...campaign.adSets };
    const palette = {
      primary: updatedBrandKit.primaryColor,
      secondary: updatedBrandKit.secondaryColor,
      accent: updatedBrandKit.accentColor,
      bg: updatedBrandKit.bgColor,
      text: updatedBrandKit.textColor,
      cardBg: updatedBrandKit.cardBg,
    };

    (Object.keys(updatedAdSets) as PlatformId[]).forEach((plat) => {
      const adSet = updatedAdSets[plat];
      adSet.variants.A.visualConfig.colorPalette = palette;
      adSet.variants.A.visualConfig.fontHeading = updatedBrandKit.headingFont;
      adSet.variants.A.visualConfig.fontBody = updatedBrandKit.bodyFont;
      adSet.variants.A.visualConfig.logoUrl = updatedBrandKit.logoUrl;

      adSet.variants.B.visualConfig.colorPalette = palette;
      adSet.variants.B.visualConfig.fontHeading = updatedBrandKit.headingFont;
      adSet.variants.B.visualConfig.fontBody = updatedBrandKit.bodyFont;
      adSet.variants.B.visualConfig.logoUrl = updatedBrandKit.logoUrl;
    });

    setCampaign({
      ...campaign,
      brandKit: updatedBrandKit,
      adSets: updatedAdSets,
    });

    showToast('Brand Kit applied across all platform templates!');
  };

  // In-place variant customizer updates
  const handleUpdateVariant = (
    platform: PlatformId,
    variantId: 'A' | 'B',
    updatedVariant: TemplateVariant
  ) => {
    setCampaign((prev) => ({
      ...prev,
      adSets: {
        ...prev.adSets,
        [platform]: {
          ...prev.adSets[platform],
          variants: {
            ...prev.adSets[platform].variants,
            [variantId]: updatedVariant,
          },
        },
      },
    }));
  };

  // Switch active primary variant
  const handleSetActiveVariant = (platform: PlatformId, variantId: 'A' | 'B') => {
    setCampaign((prev) => ({
      ...prev,
      adSets: {
        ...prev.adSets,
        [platform]: {
          ...prev.adSets[platform],
          activeVariantId: variantId,
        },
      },
    }));
  };

  const adSetEntries = (Object.keys(campaign.adSets) as PlatformId[])
    .filter((plat) => platformFilter === 'all' || platformFilter === plat)
    .map((plat) => campaign.adSets[plat]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {statusNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusNotice}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        currentProduct={product}
        brandKit={campaign.brandKit}
        onSelectPreset={handleSelectPreset}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
        onOpenExportAll={() => setIsExportOpen(true)}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6 flex-1">
        {/* Product Brief Form */}
        <ProductForm
          product={product}
          onChange={setProduct}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {/* Platform Selector Filter Tabs */}
        {viewMode !== 'ab-matrix' && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setPlatformFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  platformFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                All Networks (6)
              </button>
              {(Object.keys(PLATFORM_SPECS) as PlatformId[]).map((plat) => {
                const spec = PLATFORM_SPECS[plat];
                const isActive = platformFilter === plat;
                return (
                  <button
                    key={plat}
                    onClick={() => setPlatformFilter(plat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{spec.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-slate-400">({spec.aspectRatio})</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tailored Visuals & A/B Copy Active</span>
            </div>
          </div>
        )}

        {/* Content View Modes */}
        {viewMode === 'ab-matrix' ? (
          <ABMatrixView
            adSets={campaign.adSets}
            brandKit={campaign.brandKit}
            onSelectVariant={(platform, variantId) =>
              handleSetActiveVariant(platform as PlatformId, variantId)
            }
          />
        ) : (
          <div className="space-y-8">
            {adSetEntries.map((adSet) => (
              <AdSetCard
                key={adSet.platform}
                adSet={adSet}
                brandKit={campaign.brandKit}
                onUpdateVariant={(variantId, updated) =>
                  handleUpdateVariant(adSet.platform, variantId, updated)
                }
                onSetActiveVariant={(variantId) =>
                  handleSetActiveVariant(adSet.platform, variantId)
                }
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer info bar */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 lg:px-8 text-center text-xs text-slate-500">
        <p>
          Marketing Materials Generator • Tailored visual dimensions & A/B testing ad sets for Facebook, Instagram, LinkedIn, and Twitter • Branded with{' '}
          <strong className="text-slate-400">{campaign.brandKit.logoName}</strong> Brand Kit
        </p>
      </footer>

      {/* Brand Kit Modal */}
      <BrandKitModal
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
        brandKit={campaign.brandKit}
        onSave={handleSaveBrandKit}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        campaign={campaign}
      />
    </div>
  );
}
