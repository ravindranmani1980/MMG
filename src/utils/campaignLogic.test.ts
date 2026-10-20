import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeHashtags,
  validatePlatformLimits,
  formatCopyForPlatform,
  calculateResponsiveScale,
  generateFallbackCampaign,
  PLATFORM_SPECS,
  SAMPLE_PRODUCTS,
} from './campaignLogic';

test('normalizeHashtags strips invalid punctuation and ensures # prefix', () => {
  const input = ['#TechNews!', 'ai productivity', 'marketing,tips', '##trending'];
  const result = normalizeHashtags(input);
  assert.deepEqual(result, ['#TechNews', '#aiproductivity', '#marketingtips', '#trending']);
});

test('validatePlatformLimits correctly enforces limits for Twitter (280 chars)', () => {
  const shortText = 'Short punchy update for X followers.';
  const shortCheck = validatePlatformLimits('twitter', shortText);
  assert.equal(shortCheck.valid, true);
  assert.equal(shortCheck.maxChars, 280);
  assert.equal(shortCheck.remainingChars, 280 - shortText.length);

  const longText = 'A'.repeat(281);
  const longCheck = validatePlatformLimits('twitter', longText);
  assert.equal(longCheck.valid, false);
  assert.equal(longCheck.remainingChars, -1);
});

test('validatePlatformLimits handles Facebook and LinkedIn correctly', () => {
  const checkFb = validatePlatformLimits('facebook', 'High conversion ad copy');
  assert.equal(checkFb.maxChars, 5000);
  assert.equal(checkFb.valid, true);

  const checkLi = validatePlatformLimits('linkedin', 'Professional update');
  assert.equal(checkLi.maxChars, 3000);
  assert.equal(checkLi.valid, true);
});

test('formatCopyForPlatform formats Facebook, Twitter, and LinkedIn appropriately', () => {
  const copy = {
    hookLine: 'The ultimate smart ring launch.',
    bodyParagraph: 'Engineered for seamless health telemetry.',
    callToAction: 'Shop now at getaura.com',
    hashtags: ['Tech', 'Wearables'],
    threadOrSlideCopy: ['Key benefit 1', 'Key benefit 2'],
  };

  const fbFormatted = formatCopyForPlatform('facebook', copy);
  assert.match(fbFormatted, /Click below to claim yours today/);

  const twitterFormatted = formatCopyForPlatform('twitter', copy);
  assert.match(twitterFormatted, /THREAD FOLLOW-UP/);

  const linkedinFormatted = formatCopyForPlatform('linkedin', copy);
  assert.match(linkedinFormatted, /🔹 Key benefit 1/);
});

test('generateFallbackCampaign creates complete ad sets with A/B variants for all platforms', () => {
  const sample = SAMPLE_PRODUCTS[0];
  const campaign = generateFallbackCampaign(sample);

  assert.ok(campaign.id.startsWith('campaign-'));
  assert.equal(campaign.productName, sample.name);
  assert.equal(campaign.brandKit.logoName, sample.brandKit.logoName);

  const platforms = ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'pinterest'] as const;
  for (const plat of platforms) {
    const adSet = campaign.adSets[plat];
    assert.ok(adSet, `Ad set for ${plat} should exist`);
    assert.equal(adSet.platform, plat);
    assert.ok(adSet.dimensions.width > 0);
    assert.ok(adSet.dimensions.height > 0);
    assert.ok(adSet.bestPractices.length >= 3);
    assert.ok(adSet.abTestHypothesis.length > 0);

    // Verify Variant A
    const varA = adSet.variants.A;
    assert.equal(varA.id, 'A');
    assert.ok(varA.visualConfig.headline.length > 0);
    assert.ok(varA.copyData.hookLine.length > 0);
    assert.equal(varA.visualConfig.colorPalette.primary, sample.brandKit.primaryColor);

    // Verify Variant B
    const varB = adSet.variants.B;
    assert.equal(varB.id, 'B');
    assert.ok(varB.visualConfig.headline.length > 0);
    assert.ok(varB.copyData.hookLine.length > 0);
    assert.notEqual(varA.visualConfig.headline, varB.visualConfig.headline);
  }
});
