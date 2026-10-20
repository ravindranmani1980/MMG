import React, { useState } from 'react';
import { ProductInput, AudiencePersona } from '../types/campaign';
import { Sparkles, Plus, Trash2, Users, Image as ImageIcon, Tag, Layers, RefreshCw } from 'lucide-react';

interface ProductFormProps {
  product: ProductInput;
  onChange: (updated: ProductInput) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onChange,
  onGenerate,
  isLoading,
}) => {
  const [newBenefit, setNewBenefit] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      onChange({
        ...product,
        keyBenefits: [...product.keyBenefits, newBenefit.trim()],
      });
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (index: number) => {
    onChange({
      ...product,
      keyBenefits: product.keyBenefits.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          ...product,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const currentAudience =
    product.targetAudiences.find((a) => a.id === product.selectedAudienceId) ||
    product.targetAudiences[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden text-slate-100">
      {/* Accordion / Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Product Brief & Campaign Input
            </h2>
            <p className="text-xs text-slate-400">
              Describe your product once — AI adapts it across 4+ ad networks
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {isExpanded ? 'Hide Brief' : 'Edit Brief'}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Product Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => onChange({ ...product, name: e.target.value })}
                placeholder="e.g. AuraPulse Smart Ring"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={product.category}
                onChange={(e) => onChange({ ...product, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="tech">Tech & Hardware</option>
                <option value="saas">SaaS & Productivity</option>
                <option value="food">Food & Beverage</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="wellness">Wellness & Health</option>
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tagline / Core Hook
            </label>
            <input
              type="text"
              value={product.tagline}
              onChange={(e) => onChange({ ...product, tagline: e.target.value })}
              placeholder="e.g. Titanium biometric tracker with 7-day battery life."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Product Overview & Elevator Pitch
            </label>
            <textarea
              rows={3}
              value={product.description}
              onChange={(e) => onChange({ ...product, description: e.target.value })}
              placeholder="Describe the problem, the core mechanics, and why customers love it..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Key Benefits List */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Key Differentiators & Value Propositions
              </label>
              <span className="text-[11px] text-slate-400">
                {product.keyBenefits.length} added
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-2.5">
              {product.keyBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200"
                >
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span>{benefit}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    className="ml-1 text-slate-400 hover:text-red-400"
                    aria-label={`Remove benefit ${benefit}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBenefit();
                  }
                }}
                placeholder="Add another benefit (e.g. 100m water resistant)..."
                className="flex-1 px-3 py-2 text-xs bg-slate-800/70 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Pricing / Offer & Product Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>Launch Deal / Price Offer</span>
              </label>
              <input
                type="text"
                value={product.priceOrOffer}
                onChange={(e) => onChange({ ...product, priceOrOffer: e.target.value })}
                placeholder="e.g. $299 + Free Lifetime Membership"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Product Hero Image</span>
              </label>
              <div className="flex items-center gap-3">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt="Product preview"
                    className="w-10 h-10 object-cover rounded-lg border border-slate-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-xs">
                    Img
                  </div>
                )}
                <label className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                  <span>Upload / Replace Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Audience Persona Segmentation */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-750 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>Target Audience Segment</span>
              </label>
              <span className="text-[11px] text-indigo-400">
                Tailors hook angles & tone per platform
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.targetAudiences.map((aud) => {
                const isSelected = product.selectedAudienceId === aud.id;
                return (
                  <button
                    type="button"
                    key={aud.id}
                    onClick={() => onChange({ ...product, selectedAudienceId: aud.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-white">{aud.name}</p>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{aud.corePainPoint}</p>
                  </button>
                );
              })}
            </div>

            {currentAudience && (
              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <span className="text-slate-500">Active Tone Bias:</span>
                <span className="font-semibold text-slate-300">{currentAudience.toneBias}</span>
              </div>
            )}
          </div>

          {/* Submit Action Button */}
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Generating Tailored Multi-Platform Ad Sets...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Ad Sets & A/B Variations</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
