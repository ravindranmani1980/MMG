import React from 'react';
import { PlatformAdSet, BrandKit } from '../types/campaign';
import { SplitSquareVertical, Sparkles, Download, Check } from 'lucide-react';
import { downloadTemplatePNG } from '../utils/canvasRenderer';

interface ABMatrixViewProps {
  adSets: Record<string, PlatformAdSet>;
  brandKit: BrandKit;
  onSelectVariant: (platform: string, variantId: 'A' | 'B') => void;
}

export const ABMatrixView: React.FC<ABMatrixViewProps> = ({
  adSets,
  brandKit,
  onSelectVariant,
}) => {
  const sets = Object.values(adSets);

  const handleDownloadVariant = (adSet: PlatformAdSet, variantId: 'A' | 'B') => {
    downloadTemplatePNG(
      {
        variant: adSet.variants[variantId],
        dimensions: adSet.dimensions,
        platformName: adSet.platformName,
        brandName: brandKit.logoName,
      },
      `${adSet.platform}-variant-${variantId}.png`
    );
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Overview Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-900/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <SplitSquareVertical className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>A/B Testing Variations Matrix</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Performance Optimization
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Each ad network is provisioned with 2 distinct strategic angles to isolate whether feature clarity or social urgency delivers higher ROAS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Brand Kit: <strong className="text-white">{brandKit.logoName}</strong></span>
        </div>
      </div>

      {/* Grid of A/B Comparisons */}
      <div className="grid grid-cols-1 gap-5">
        {sets.map((adSet) => {
          const varA = adSet.variants.A;
          const varB = adSet.variants.B;
          const active = adSet.activeVariantId;

          return (
            <div
              key={adSet.platform}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-750 transition-colors"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                    {adSet.platformName}
                  </span>
                  <span className="text-xs text-slate-400">{adSet.dimensions.label}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Core Test Metric:</span>
                  <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                    {adSet.primaryMetric}
                  </span>
                </div>
              </div>

              {/* Hypothesis */}
              <div className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                <strong className="text-indigo-400">Hypothesis: </strong>
                {adSet.abTestHypothesis}
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Variant A Column */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    active === 'A'
                      ? 'border-indigo-500 bg-indigo-500/5 shadow-md'
                      : 'border-slate-800 bg-slate-950/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Variant A
                      </span>
                      <span className="text-xs font-semibold text-white">Feature & Value Clarity</span>
                    </div>

                    <button
                      onClick={() => onSelectVariant(adSet.platform, 'A')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                        active === 'A'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {active === 'A' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        'Make Primary'
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Visual Headline:</span>
                      <p className="font-semibold text-slate-200">"{varA.visualConfig.headline}"</p>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[11px]">Hook Copy:</span>
                      <p className="text-slate-300 line-clamp-2">{varA.copyData.hookLine}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] text-slate-400">
                        Badge: <strong className="text-slate-200">{varA.visualConfig.badge}</strong>
                      </span>
                      <button
                        onClick={() => handleDownloadVariant(adSet, 'A')}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download PNG</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Variant B Column */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    active === 'B'
                      ? 'border-amber-500 bg-amber-500/5 shadow-md'
                      : 'border-slate-800 bg-slate-950/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Variant B
                      </span>
                      <span className="text-xs font-semibold text-white">Social Proof & Urgency</span>
                    </div>

                    <button
                      onClick={() => onSelectVariant(adSet.platform, 'B')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                        active === 'B'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {active === 'B' ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        'Make Primary'
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Visual Headline:</span>
                      <p className="font-semibold text-slate-200">"{varB.visualConfig.headline}"</p>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[11px]">Hook Copy:</span>
                      <p className="text-slate-300 line-clamp-2">{varB.copyData.hookLine}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] text-slate-400">
                        Badge: <strong className="text-slate-200">{varB.visualConfig.badge}</strong>
                      </span>
                      <button
                        onClick={() => handleDownloadVariant(adSet, 'B')}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download PNG</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
