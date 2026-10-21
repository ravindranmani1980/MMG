import React, { useState } from 'react';
import { CampaignResult } from '../types/campaign';
import { downloadTemplatePNG } from '../utils/canvasRenderer';
import { formatCopyForPlatform } from '../utils/campaignLogic';
import { X, Download, FileText, Check, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignResult;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  const [copiedDoc, setCopiedDoc] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);

  if (!isOpen) return null;

  const sets = Object.values(campaign.adSets);

  const generateMarkdownReport = () => {
    let md = `# Marketing Campaign & Ad Sets: ${campaign.productName}\n`;
    md += `**Author**: Mani Ravindran ([ravindran.in](https://ravindran.in))\n`;
    md += `**Brand Kit**: ${campaign.brandKit.logoName} (${campaign.brandKit.companyDomain})\n`;
    md += `**Generated**: ${new Date(campaign.timestamp).toLocaleDateString()}\n`;
    md += `**Strategy Summary**: ${campaign.summary}\n\n`;

    sets.forEach((set) => {
      const active = set.variants[set.activeVariantId || 'A'];
      md += `## ${set.platformName} (${set.dimensions.label})\n`;
      md += `- **Placement**: ${set.recommendedPlacement}\n`;
      md += `- **A/B Hypothesis**: ${set.abTestHypothesis}\n`;
      md += `- **Target Metric**: ${set.primaryMetric}\n`;
      md += `\n### Active Creative (Variant ${active.id})\n`;
      md += `**Visual Headline**: ${active.visualConfig.headline}\n`;
      md += `**Subheadline**: ${active.visualConfig.subheadline}\n`;
      md += `**Badge**: ${active.visualConfig.badge}\n`;
      md += `**CTA Button**: ${active.visualConfig.ctaText}\n\n`;
      md += `**Ad Copy Body**:\n\`\`\`\n${formatCopyForPlatform(set.platform, active.copyData)}\n\`\`\`\n\n`;
      md += `---\n\n`;
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  const handleDownloadAllPNGs = async () => {
    setDownloadingAll(true);
    for (const set of sets) {
      const active = set.variants[set.activeVariantId || 'A'];
      await downloadTemplatePNG(
        {
          variant: active,
          dimensions: set.dimensions,
          platformName: set.platformName,
          brandName: campaign.brandKit.logoName,
        },
        `${set.platform}-campaign-asset-${active.id}.png`
      );
      // Brief pause between browser downloads
      await new Promise((r) => setTimeout(r, 400));
    }
    setDownloadingAll(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Export Campaign & Ad Assets
              </h2>
              <p className="text-xs text-slate-400">
                Download high-resolution image templates and copy-paste ready ad copy briefs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close export modal"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Download className="w-4 h-4" />
                <span>Batch Image Export</span>
              </div>
              <p className="text-slate-400">
                Download all {sets.length} platform ad graphics rendered at their native resolutions (1080x1080, 1200x628, 1080x1920, etc.).
              </p>
              <button
                onClick={handleDownloadAllPNGs}
                disabled={downloadingAll}
                className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {downloadingAll ? (
                  <span>Exporting PNGs...</span>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download All Active Graphics</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-800/40 space-y-3">
              <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Campaign Strategy Document</span>
              </div>
              <p className="text-slate-400">
                Copy full formatted markdown containing all ad copy, headlines, hashtags, and A/B testing hypotheses for Notion or Slack.
              </p>
              <button
                onClick={handleCopyMarkdown}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                {copiedDoc ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Markdown Brief Copied!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>Copy Full Markdown Brief</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* List of included platforms */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Included Ad Sets in Package
            </span>
            <div className="space-y-2">
              {sets.map((set) => {
                const active = set.variants[set.activeVariantId || 'A'];
                return (
                  <div
                    key={set.platform}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{set.platformName}</span>
                        <span className="text-slate-400 text-[11px]">({set.dimensions.label})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic line-clamp-1">
                        Active: Variant {active.id} - "{active.visualConfig.headline}"
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        downloadTemplatePNG(
                          {
                            variant: active,
                            dimensions: set.dimensions,
                            platformName: set.platformName,
                            brandName: campaign.brandKit.logoName,
                          },
                          `${set.platform}-variant-${active.id}.png`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>PNG</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ready for Meta Ads Manager, LinkedIn Campaign Manager & X Ads</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
