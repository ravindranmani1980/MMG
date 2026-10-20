import React, { useState } from 'react';
import { BrandKit } from '../types/campaign';
import { BRAND_PALETTE_PRESETS, BRAND_FONTS } from '../utils/campaignLogic';
import { X, Sparkles, Palette, Type, Upload, Check, Globe } from 'lucide-react';

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandKit: BrandKit;
  onSave: (updated: BrandKit) => void;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({
  isOpen,
  onClose,
  brandKit,
  onSave,
}) => {
  const [form, setForm] = useState<BrandKit>({ ...brandKit });

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          logoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (preset: (typeof BRAND_PALETTE_PRESETS)[0]) => {
    setForm((prev) => ({
      ...prev,
      primaryColor: preset.colors.primary,
      secondaryColor: preset.colors.secondary,
      accentColor: preset.colors.accent,
      bgColor: preset.colors.bg,
      textColor: preset.colors.text,
      cardBg: preset.colors.cardBg,
      brandVoice: preset.theme,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">Brand Kit Settings</h2>
              <p className="text-xs text-slate-400">
                Colors, fonts, and assets automatically customize all generated ad templates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Brand Kit modal"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Logo & Identity */}
          <div className="space-y-3">
            <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Brand Identity & Logo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  value={form.logoName}
                  onChange={(e) => setForm({ ...form, logoName: e.target.value })}
                  placeholder="e.g. Aura Labs"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Website Domain</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">
                    <Globe className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={form.companyDomain}
                    onChange={(e) => setForm({ ...form, companyDomain: e.target.value })}
                    placeholder="e.g. getaura.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload / Preview */}
            <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-800/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {form.logoUrl ? (
                  <img
                    src={form.logoUrl}
                    alt="Brand logo"
                    className="w-12 h-12 object-contain rounded-lg bg-black/40 p-1 border border-white/10"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md"
                    style={{ backgroundColor: form.primaryColor }}
                  >
                    {form.logoName ? form.logoName.slice(0, 2).toUpperCase() : 'BK'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">
                    {form.logoUrl ? 'Custom Logo Attached' : 'Auto Generated Monogram'}
                  </p>
                  <p className="text-xs text-slate-400">PNG, SVG or JPEG recommended (transparent bg)</p>
                </div>
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Logo</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>
          </div>

          {/* Designer Color Palettes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Designer Color Palettes
              </label>
              <span className="text-xs text-indigo-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 1-Click Themes
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {BRAND_PALETTE_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    form.primaryColor === preset.colors.primary && form.bgColor === preset.colors.bg
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-200 truncate">{preset.name}</span>
                    {form.primaryColor === preset.colors.primary && (
                      <Check className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                  </div>
                  <div className="flex gap-1.5 h-3 rounded-full overflow-hidden">
                    <div className="flex-1" style={{ backgroundColor: preset.colors.primary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.colors.secondary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.colors.accent }} />
                    <div className="w-3" style={{ backgroundColor: preset.colors.bg }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Pickers */}
          <div className="space-y-3">
            <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Custom Hex Codes
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Primary Brand</label>
                <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 p-1.5 rounded-lg">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-full text-xs font-mono bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Secondary Glow</label>
                <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 p-1.5 rounded-lg">
                  <input
                    type="color"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="w-full text-xs font-mono bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Accent Badge</label>
                <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 p-1.5 rounded-lg">
                  <input
                    type="color"
                    value={form.accentColor}
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.accentColor}
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                    className="w-full text-xs font-mono bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Background Base</label>
                <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 p-1.5 rounded-lg">
                  <input
                    type="color"
                    value={form.bgColor}
                    onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={form.bgColor}
                    onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
                    className="w-full text-xs font-mono bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Brand Voice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
                Brand Typography
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500">
                  <Type className="w-4 h-4" />
                </span>
                <select
                  value={form.headingFont}
                  onChange={(e) => setForm({ ...form, headingFont: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {BRAND_FONTS.map((font) => (
                    <option key={font.name} value={font.name}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
                Brand Voice & Tone
              </label>
              <select
                value={form.brandVoice}
                onChange={(e) =>
                  setForm({
                    ...form,
                    brandVoice: e.target.value as BrandKit['brandVoice'],
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="authoritative">Authoritative & Scientific (Premium)</option>
                <option value="conversational">Conversational & Friendly (Community)</option>
                <option value="urgent">Urgent & High-Energy (E-commerce / Drop)</option>
                <option value="minimalist">Minimalist & Editorial (Design/Luxury)</option>
                <option value="playful">Playful & Bold (Consumer Pop)</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Apply Brand Kit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
