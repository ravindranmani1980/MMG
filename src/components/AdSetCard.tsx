import React, { useState, useEffect, useRef } from 'react';
import { PlatformAdSet, TemplateVariant, BrandKit } from '../types/campaign';
import {
  renderTemplateToCanvas,
  downloadTemplatePNG,
} from '../utils/canvasRenderer';
import {
  formatCopyForPlatform,
  validatePlatformLimits,
} from '../utils/campaignLogic';
import {
  Download,
  Copy,
  Check,
  SplitSquareVertical,
  Sliders,
  Sparkles,
  Info,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AdSetCardProps {
  adSet: PlatformAdSet;
  brandKit: BrandKit;
  onUpdateVariant: (variantId: 'A' | 'B', updated: TemplateVariant) => void;
  onSetActiveVariant: (variantId: 'A' | 'B') => void;
}

export const AdSetCard: React.FC<AdSetCardProps> = ({
  adSet,
  brandKit,
  onUpdateVariant,
  onSetActiveVariant,
}) => {
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>(adSet.activeVariantId || 'A');
  const [compareMode, setCompareMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showBestPractices, setShowBestPractices] = useState(false);

  const canvasSingleRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRefA = useRef<HTMLCanvasElement | null>(null);
  const canvasRefB = useRef<HTMLCanvasElement | null>(null);

  const currentVariant = adSet.variants[activeVariant];
  const charValidation = validatePlatformLimits(
    adSet.platform,
    formatCopyForPlatform(adSet.platform, currentVariant.copyData)
  );

  // Render canvas when active variant, compareMode, or brand kit changes
  useEffect(() => {
    if (!compareMode && canvasSingleRef.current) {
      renderTemplateToCanvas(canvasSingleRef.current, {
        variant: adSet.variants[activeVariant],
        dimensions: adSet.dimensions,
        platformName: adSet.platformName,
        brandName: brandKit.logoName,
      });
    }

    if (compareMode) {
      if (canvasRefA.current) {
        renderTemplateToCanvas(canvasRefA.current, {
          variant: adSet.variants.A,
          dimensions: adSet.dimensions,
          platformName: adSet.platformName,
          brandName: brandKit.logoName,
        });
      }
      if (canvasRefB.current) {
        renderTemplateToCanvas(canvasRefB.current, {
          variant: adSet.variants.B,
          dimensions: adSet.dimensions,
          platformName: adSet.platformName,
          brandName: brandKit.logoName,
        });
      }
    }
  }, [adSet, brandKit, compareMode, activeVariant]);

  const handleCopy = () => {
    const formatted = formatCopyForPlatform(adSet.platform, currentVariant.copyData);
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (variantId: 'A' | 'B') => {
    downloadTemplatePNG(
      {
        variant: adSet.variants[variantId],
        dimensions: adSet.dimensions,
        platformName: adSet.platformName,
        brandName: brandKit.logoName,
      },
      `${adSet.platform}-ad-variant-${variantId}.png`
    );
  };

  const updateActiveHeadline = (headline: string) => {
    onUpdateVariant(activeVariant, {
      ...currentVariant,
      visualConfig: {
        ...currentVariant.visualConfig,
        headline,
      },
    });
  };

  const updateActiveSubhead = (subheadline: string) => {
    onUpdateVariant(activeVariant, {
      ...currentVariant,
      visualConfig: {
        ...currentVariant.visualConfig,
        subheadline,
      },
    });
  };

  const updateActiveBadge = (badge: string) => {
    onUpdateVariant(activeVariant, {
      ...currentVariant,
      visualConfig: {
        ...currentVariant.visualConfig,
        badge,
      },
    });
  };

  const updateActiveCTA = (ctaText: string) => {
    onUpdateVariant(activeVariant, {
      ...currentVariant,
      visualConfig: {
        ...currentVariant.visualConfig,
        ctaText,
      },
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col text-slate-100 transition-all hover:border-slate-750">
      {/* Platform Header */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold shadow-sm">
            {adSet.platform === 'facebook' && 'Fb'}
            {adSet.platform === 'instagram' && 'Ig'}
            {adSet.platform === 'linkedin' && 'In'}
            {adSet.platform === 'twitter' && '𝕏'}
            {adSet.platform === 'tiktok' && 'Tk'}
            {adSet.platform === 'pinterest' && 'Pin'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                {adSet.platformName}
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {adSet.dimensions.label}
              </span>
            </div>
            <p className="text-xs text-slate-400">{adSet.recommendedPlacement}</p>
          </div>
        </div>

        {/* A/B Controls */}
        <div className="flex items-center gap-2">
          {/* Variant A / B Switcher */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => {
                setActiveVariant('A');
                onSetActiveVariant('A');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeVariant === 'A' && !compareMode
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Variant A
            </button>
            <button
              onClick={() => {
                setActiveVariant('B');
                onSetActiveVariant('B');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeVariant === 'B' && !compareMode
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Variant B
            </button>
          </div>

          {/* Split Mode Toggle */}
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`p-1.5 rounded-xl border transition-all text-xs flex items-center gap-1 ${
              compareMode
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Compare Variant A vs Variant B side-by-side"
          >
            <SplitSquareVertical className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">A/B View</span>
          </button>
        </div>
      </div>

      {/* A/B Hypothesis Bar */}
      <div className="px-5 py-2.5 bg-indigo-950/20 border-b border-indigo-900/30 flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2 text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-white">A/B Hypothesis:</span>
          <span className="text-slate-300 line-clamp-1">{adSet.abTestHypothesis}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
          <span className="text-slate-500">Target Metric:</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
            {adSet.primaryMetric}
          </span>
        </div>
      </div>

      {/* Body: Canvas Preview + Copy Inspector */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Visual Canvas Area */}
        <div className={`space-y-3 ${compareMode ? 'lg:col-span-12' : 'lg:col-span-7'}`}>
          {!compareMode ? (
            /* Single Active Variant View */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {currentVariant.name}
                </span>
                <span className="text-xs text-indigo-400 font-medium">
                  {currentVariant.concept}
                </span>
              </div>

              {/* Canvas Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black/50 shadow-inner flex items-center justify-center p-3 group">
                <canvas
                  ref={canvasSingleRef}
                  className="max-h-[380px] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-transform"
                />

                {/* Quick Hover Download Action */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDownload(activeVariant)}
                    className="p-2 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-white shadow-lg border border-white/10 transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Side-by-Side Comparison Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Variant A */}
              <div className="space-y-2 p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Variant A (Feature Clarity)
                  </span>
                  <button
                    onClick={() => handleDownload('A')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>PNG</span>
                  </button>
                </div>
                <div className="flex items-center justify-center p-2 rounded-xl bg-black/60 min-h-[260px]">
                  <canvas
                    ref={canvasRefA}
                    className="max-h-[260px] w-auto max-w-full rounded-lg object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Headline: "{adSet.variants.A.visualConfig.headline}"
                </p>
              </div>

              {/* Variant B */}
              <div className="space-y-2 p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Variant B (Social Proof & Urgency)
                  </span>
                  <button
                    onClick={() => handleDownload('B')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>PNG</span>
                  </button>
                </div>
                <div className="flex items-center justify-center p-2 rounded-xl bg-black/60 min-h-[260px]">
                  <canvas
                    ref={canvasRefB}
                    className="max-h-[260px] w-auto max-w-full rounded-lg object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Headline: "{adSet.variants.B.visualConfig.headline}"
                </p>
              </div>
            </div>
          )}

          {/* In-Place Quick Customizer Drawer */}
          <div className="border border-slate-800 rounded-xl bg-slate-850 overflow-hidden">
            <button
              onClick={() => setShowEditor(!showEditor)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Customize Visual Layout Elements for Variant {activeVariant}</span>
              </span>
              {showEditor ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showEditor && (
              <div className="p-4 space-y-3 border-t border-slate-800 bg-slate-900/60 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Headline Text</label>
                  <input
                    type="text"
                    value={currentVariant.visualConfig.headline}
                    onChange={(e) => updateActiveHeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Subheadline / Pitch</label>
                  <input
                    type="text"
                    value={currentVariant.visualConfig.subheadline}
                    onChange={(e) => updateActiveSubhead(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={currentVariant.visualConfig.badge}
                      onChange={(e) => updateActiveBadge(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">CTA Button Label</label>
                    <input
                      type="text"
                      value={currentVariant.visualConfig.ctaText}
                      onChange={(e) => updateActiveCTA(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copy & Native Post Preview Panel */}
        <div className={`space-y-4 ${compareMode ? 'lg:col-span-12' : 'lg:col-span-5'}`}>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tailored Network Copy ({activeVariant})
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Post Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Native Post Copy Body */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto">
              {formatCopyForPlatform(adSet.platform, currentVariant.copyData)}
            </div>

            {/* Platform Constraints & Posting Timing */}
            <div className="flex flex-wrap items-center justify-between text-[11px] gap-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>Peak Posting Time:</span>
                <span className="text-slate-200 font-medium">
                  {currentVariant.copyData.recommendedPostTime}
                </span>
              </div>

              <div
                className={`px-2 py-0.5 rounded font-semibold ${
                  charValidation.valid
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {charValidation.note ? `${charValidation.note}: ` : ''}
                {charValidation.charCount} / {charValidation.maxChars} chars
              </div>
            </div>
          </div>

          {/* Best Practices Accordion */}
          <div className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden text-xs">
            <button
              onClick={() => setShowBestPractices(!showBestPractices)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-slate-400 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>{adSet.platformName} Best Practices Applied</span>
              </span>
              {showBestPractices ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showBestPractices && (
              <div className="p-4 pt-1 space-y-1.5 border-t border-slate-800/60 text-slate-300">
                {adSet.bestPractices.map((bp, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px]">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
