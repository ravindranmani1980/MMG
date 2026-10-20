import { TemplateVariant } from '../types/campaign';

/**
 * Loads an image from URL or data URI and returns an HTMLImageElement
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      const fallback = new Image();
      fallback.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>';
      fallback.onload = () => resolve(fallback);
      fallback.onerror = (e) => reject(e);
    };
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export interface RenderTemplateOptions {
  variant: TemplateVariant;
  dimensions: { width: number; height: number; label: string };
  platformName: string;
  brandName?: string;
}

/**
 * Renders a full resolution campaign graphic onto a canvas
 */
export async function renderTemplateToCanvas(
  canvas: HTMLCanvasElement,
  options: RenderTemplateOptions
): Promise<void> {
  const { variant, dimensions, platformName, brandName } = options;
  const { width, height } = dimensions;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { visualConfig } = variant;
  const palette = visualConfig.colorPalette;

  // 1. Draw Background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  if (visualConfig.bgTheme === 'light') {
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.5, palette.bg || '#F8FAFC');
    gradient.addColorStop(1, '#E2E8F0');
  } else if (visualConfig.bgTheme === 'gradient') {
    gradient.addColorStop(0, palette.bg || '#090D16');
    gradient.addColorStop(0.5, palette.primary + '33');
    gradient.addColorStop(1, palette.secondary + '44');
  } else {
    gradient.addColorStop(0, palette.bg || '#090D16');
    gradient.addColorStop(0.7, '#0D1424');
    gradient.addColorStop(1, '#05070B');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Radial ambient lighting
  const radGlow = ctx.createRadialGradient(
    width * 0.8,
    height * 0.2,
    50,
    width * 0.8,
    height * 0.2,
    width * 0.6
  );
  radGlow.addColorStop(0, palette.primary + '33');
  radGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = radGlow;
  ctx.fillRect(0, 0, width, height);

  const radGlow2 = ctx.createRadialGradient(
    width * 0.15,
    height * 0.85,
    40,
    width * 0.15,
    height * 0.85,
    width * 0.5
  );
  radGlow2.addColorStop(0, palette.secondary + '25');
  radGlow2.addColorStop(1, 'transparent');
  ctx.fillStyle = radGlow2;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative grid
  ctx.strokeStyle = visualConfig.bgTheme === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  const step = 80;
  for (let x = step; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = step; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Pre-load images
  let imgElem: HTMLImageElement | null = null;
  if (visualConfig.customImage) {
    try {
      imgElem = await loadImage(visualConfig.customImage);
    } catch {
      imgElem = null;
    }
  }

  let logoElem: HTMLImageElement | null = null;
  if (visualConfig.showLogo && visualConfig.logoUrl) {
    try {
      logoElem = await loadImage(visualConfig.logoUrl);
    } catch {
      logoElem = null;
    }
  }

  const textColor = palette.text || (visualConfig.bgTheme === 'light' ? '#0F172A' : '#FFFFFF');
  const mutedTextColor = visualConfig.bgTheme === 'light' ? '#475569' : '#94A3B8';

  const isVertical = height > width * 1.3;
  const isLandscape = width > height * 1.3;
  const paddingX = Math.round(width * 0.08);
  const paddingY = Math.round(height * 0.08);

  let curY = paddingY;

  // Header row: Brand Logo + Variant Badge
  if (visualConfig.showLogo) {
    const logoH = 36;
    if (logoElem && logoElem.width > 0) {
      const logoAspect = logoElem.width / logoElem.height;
      const logoW = logoH * logoAspect;
      ctx.drawImage(logoElem, paddingX, curY, logoW, logoH);
    } else {
      // Draw Brand Monogram & Name
      const brandInit = (brandName || 'BRAND').slice(0, 2).toUpperCase();
      ctx.beginPath();
      ctx.arc(paddingX + 18, curY + 18, 18, 0, Math.PI * 2);
      ctx.fillStyle = palette.primary;
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(brandInit, paddingX + 18, curY + 18);

      ctx.fillStyle = textColor;
      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText((brandName || 'BRAND').toUpperCase(), paddingX + 46, curY + 18);
    }

    // A/B Variant Indicator Pill on right
    const varText = `TEST VARIANT ${variant.id}`;
    ctx.font = 'bold 13px system-ui, sans-serif';
    const varW = ctx.measureText(varText).width + 24;
    roundRect(ctx, width - paddingX - varW, curY + 4, varW, 28, 14);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.strokeStyle = palette.primary + '66';
    ctx.stroke();

    ctx.fillStyle = palette.primary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(varText, width - paddingX - varW / 2, curY + 18);

    curY += 56;
  }

  // Draw Promo / Category Badge
  if (visualConfig.showBadge && visualConfig.badge) {
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    const badgeText = visualConfig.badge.toUpperCase();
    const textWidth = ctx.measureText(badgeText).width;
    const badgePadX = 24;
    const badgeHeight = 44;
    const badgeWidth = textWidth + badgePadX * 2;

    roundRect(ctx, paddingX, curY, badgeWidth, badgeHeight, 22);
    ctx.fillStyle = palette.primary;
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, paddingX + badgePadX, curY + badgeHeight / 2);

    curY += badgeHeight + 28;
  }

  // Draw Headline
  const maxContentW = isLandscape ? width * 0.52 : width - paddingX * 2;
  const headlineFontSize = isVertical ? 68 : isLandscape ? 52 : 62;
  ctx.font = `800 ${headlineFontSize}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = textColor;
  ctx.textBaseline = 'top';

  const headlineLines = wrapText(ctx, visualConfig.headline, maxContentW);
  headlineLines.forEach((line) => {
    ctx.fillText(line, paddingX, curY);
    curY += headlineFontSize * 1.18;
  });

  curY += 16;

  // Draw Subheadline
  const subheadFontSize = isVertical ? 30 : isLandscape ? 24 : 28;
  ctx.font = `500 ${subheadFontSize}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = mutedTextColor;
  const subheadLines = wrapText(ctx, visualConfig.subheadline, maxContentW);
  subheadLines.slice(0, 3).forEach((line) => {
    ctx.fillText(line, paddingX, curY);
    curY += subheadFontSize * 1.35;
  });

  curY += 24;

  // Draw Bullet Points
  if (visualConfig.showBullets && visualConfig.bulletPoints?.length > 0) {
    const bulletFontSize = isLandscape ? 20 : 25;
    ctx.font = `600 ${bulletFontSize}px system-ui, -apple-system, sans-serif`;

    visualConfig.bulletPoints.slice(0, isVertical ? 4 : 3).forEach((pt) => {
      ctx.beginPath();
      ctx.arc(paddingX + 12, curY + bulletFontSize / 2 + 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = palette.accent || palette.primary;
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✓', paddingX + 12, curY + bulletFontSize / 2 + 2);

      ctx.fillStyle = textColor;
      ctx.textAlign = 'left';
      ctx.font = `600 ${bulletFontSize}px system-ui, -apple-system, sans-serif`;
      const wrappedPt = wrapText(ctx, pt, maxContentW - 42);
      ctx.fillText(wrappedPt[0] || pt, paddingX + 34, curY);
      curY += bulletFontSize * 1.55;
    });

    curY += 18;
  }

  // Draw Social Proof Star Rating
  if (visualConfig.showRating && visualConfig.ratingCount) {
    ctx.font = 'bold 20px system-ui';
    ctx.fillStyle = '#F59E0B';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('★★★★★', paddingX, curY + 12);

    ctx.font = '600 17px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = mutedTextColor;
    ctx.fillText(visualConfig.ratingCount, paddingX + 110, curY + 12);

    curY += 40;
  }

  // Draw Price / Offer Banner
  if (visualConfig.showPrice && visualConfig.priceTag) {
    ctx.font = 'bold 21px system-ui, -apple-system, sans-serif';
    const priceText = visualConfig.priceTag;
    const priceWidth = ctx.measureText(priceText).width;
    const pillW = priceWidth + 40;
    const pillH = 48;

    roundRect(ctx, paddingX, curY, pillW, pillH, 14);
    ctx.fillStyle = palette.cardBg || 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.strokeStyle = palette.primary + '55';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = palette.primary;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(priceText, paddingX + 20, curY + pillH / 2);

    curY += pillH + 24;
  }

  // Draw CTA Button
  const ctaH = isVertical ? 76 : isLandscape ? 58 : 68;
  const ctaW = Math.min(maxContentW, isLandscape ? 310 : 360);
  roundRect(ctx, paddingX, curY, ctaW, ctaH, ctaH / 2);
  const btnGrad = ctx.createLinearGradient(paddingX, curY, paddingX + ctaW, curY + ctaH);
  btnGrad.addColorStop(0, palette.primary);
  btnGrad.addColorStop(1, palette.secondary);
  ctx.fillStyle = btnGrad;
  ctx.fill();

  ctx.shadowColor = palette.primary + '66';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  roundRect(ctx, paddingX, curY, ctaW, ctaH, ctaH / 2);
  ctx.fillStyle = btnGrad;
  ctx.fill();
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${isVertical ? 24 : 20}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${visualConfig.ctaText} →`, paddingX + ctaW / 2, curY + ctaH / 2);

  // 3. Draw Product Image Showcase
  if (imgElem && imgElem.width > 0) {
    let imgX = 0;
    let imgY = 0;
    let imgW = 0;
    let imgH = 0;

    if (isLandscape) {
      imgW = Math.round(width * 0.38);
      imgH = Math.round(height * 0.72);
      imgX = width - imgW - paddingX;
      imgY = (height - imgH) / 2;
    } else if (isVertical) {
      imgW = Math.round(width * 0.76);
      imgH = Math.round(height * 0.38);
      imgX = (width - imgW) / 2;
      imgY = curY + ctaH + 36;
      if (imgY + imgH > height - paddingY) {
        imgY = height - imgH - paddingY - 30;
      }
    } else {
      imgW = Math.round(width * 0.44);
      imgH = Math.round(height * 0.44);
      imgX = width - imgW - paddingX;
      imgY = height - imgH - paddingY;
    }

    roundRect(ctx, imgX - 8, imgY - 8, imgW + 16, imgH + 16, 22);
    ctx.fillStyle = palette.cardBg || 'rgba(255, 255, 255, 0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.save();
    roundRect(ctx, imgX, imgY, imgW, imgH, 18);
    ctx.clip();

    const imgAspect = imgElem.width / imgElem.height;
    const boxAspect = imgW / imgH;
    let renderW = imgW;
    let renderH = imgH;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > boxAspect) {
      renderW = imgH * imgAspect;
      offsetX = (imgW - renderW) / 2;
    } else {
      renderH = imgW / imgAspect;
      offsetY = (imgH - renderH) / 2;
    }

    ctx.drawImage(imgElem, imgX + offsetX, imgY + offsetY, renderW, renderH);

    const imgGrad = ctx.createLinearGradient(imgX, imgY, imgX, imgY + imgH);
    imgGrad.addColorStop(0, 'rgba(0,0,0,0.05)');
    imgGrad.addColorStop(0.7, 'transparent');
    imgGrad.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = imgGrad;
    ctx.fillRect(imgX, imgY, imgW, imgH);
    ctx.restore();

    const tagText = 'OFFICIAL PRODUCT';
    ctx.font = 'bold 11px system-ui';
    const tagW = ctx.measureText(tagText).width + 20;
    roundRect(ctx, imgX + 14, imgY + 14, tagW, 26, 13);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(tagText, imgX + 24, imgY + 27);
  }

  // 4. Platform & Brand Watermark Footer
  ctx.font = '500 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = mutedTextColor + '99';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(
    `${platformName.toUpperCase()} • ${dimensions.label.toUpperCase()} • POWERED BY MARKETING MATERIALS GENERATOR`,
    paddingX,
    height - 20
  );
}

/**
 * Exports a template directly to a downloadable data URL (PNG)
 */
export async function exportTemplateAsDataURL(
  options: RenderTemplateOptions
): Promise<string> {
  const canvas = document.createElement('canvas');
  await renderTemplateToCanvas(canvas, options);
  return canvas.toDataURL('image/png');
}

/**
 * Triggers browser download of the rendered template PNG
 */
export async function downloadTemplatePNG(
  options: RenderTemplateOptions,
  filename?: string
): Promise<void> {
  const dataUrl = await exportTemplateAsDataURL(options);
  const link = document.createElement('a');
  link.download =
    filename ||
    `${options.platformName.toLowerCase().replace(/[^a-z0-9]/g, '_')}-variant-${options.variant.id}.png`;
  link.href = dataUrl;
  link.click();
}
