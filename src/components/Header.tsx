import React from 'react';
import { BrandKit, ProductInput } from '../types/campaign';
import { SAMPLE_PRODUCTS } from '../utils/campaignLogic';
import { Sparkles, Palette, Download, SplitSquareVertical, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  currentProduct: ProductInput;
  brandKit: BrandKit;
  onSelectPreset: (product: ProductInput) => void;
  onOpenBrandKit: () => void;
  onOpenExportAll: () => void;
  viewMode: 'grid' | 'single' | 'ab-matrix';
  onChangeViewMode: (mode: 'grid' | 'single' | 'ab-matrix') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProduct,
  brandKit,
  onSelectPreset,
  onOpenBrandKit,
  onOpenExportAll,
  viewMode,
  onChangeViewMode,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-base">
              M
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">
                  Marketing Materials Generator
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sparkles className="w-3 h-3" /> Multi-Platform & A/B Suite
                </span>
                <a
                  href="https://ravindran.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 transition-colors"
                >
                  <span className="text-slate-400">by</span>
                  <span className="font-semibold text-slate-200">Mani Ravindran</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-indigo-400 hover:underline">ravindran.in</span>
                </a>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Generate tailored ad sets, layout dimensions & A/B copy for Facebook, Instagram, LinkedIn & X
              </p>
            </div>
          </div>
        </div>

        {/* Center / Right Control Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Quick Presets Menu */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <span className="text-[11px] font-medium text-slate-400 px-2 hidden lg:inline">
              Presets:
            </span>
            {SAMPLE_PRODUCTS.map((prod) => (
              <button
                key={prod.name}
                onClick={() => onSelectPreset(prod)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  currentProduct.name === prod.name
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={prod.tagline}
              >
                {prod.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => onChangeViewMode('grid')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>All Ad Sets</span>
            </button>
            <button
              onClick={() => onChangeViewMode('ab-matrix')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'ab-matrix'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-amber-300" />
              <span>A/B Matrix</span>
            </button>
          </div>

          {/* Brand Kit Opener */}
          <button
            onClick={onOpenBrandKit}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-white/20"
              style={{ backgroundColor: brandKit.primaryColor }}
            />
            <span>Brand Kit</span>
            <Palette className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Export All */}
          <button
            onClick={onOpenExportAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Campaign</span>
          </button>
        </div>
      </div>
    </header>
  );
};
