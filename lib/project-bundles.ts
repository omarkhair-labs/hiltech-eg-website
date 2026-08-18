import type { ProductCategory, ProductItem } from '@/content/products';
import { wixCatalogProducts as products } from '@/content/wix-catalog-products';
import {
  projectBundles,
  type BundleRequirement,
  type ProductId,
  type ProjectBundle,
} from '@/content/project-bundles';

interface BasketItemLike {
  id: string;
  category?: string;
}

export interface BundleCompletion {
  totalRequiredCount: number;
  completedRequiredCount: number;
  completionPercentage: number;
  matchedRequirementIds: string[];
  missingRequirementIds: string[];
}

const normalizeBasket = (basketItems: BasketItemLike[]) => {
  const basketProductIds = new Set<string>();
  const basketCategories = new Set<string>();

  for (const item of basketItems) {
    basketProductIds.add(item.id);
    if (item.category) basketCategories.add(item.category);

    const knownProduct = products.find((product) => product.id === item.id);
    if (knownProduct) basketCategories.add(knownProduct.category);
  }

  return { basketProductIds, basketCategories };
};

const isRequirementCompleted = (requirement: BundleRequirement, basketProductIds: Set<string>) =>
  requirement.completionProductIds.some((productId) => basketProductIds.has(productId));

const hasRequirementIntentSignal = (
  requirement: BundleRequirement,
  basketProductIds: Set<string>,
  basketCategories: Set<string>,
) =>
  requirement.recommendedProductIds.some((productId) => basketProductIds.has(productId)) ||
  requirement.acceptedCategories.some((category) => basketCategories.has(category));

export function getProjectBundleById(bundleId: string): ProjectBundle | null {
  return projectBundles.find((bundle) => bundle.id === bundleId) ?? null;
}

export function getBundleCompletion(bundle: ProjectBundle, basketItems: BasketItemLike[]): BundleCompletion {
  const { basketProductIds } = normalizeBasket(basketItems);
  const requiredRequirements = bundle.requirements.filter((requirement) => requirement.required);
  const matchedRequired = requiredRequirements.filter((requirement) => isRequirementCompleted(requirement, basketProductIds));

  const totalRequiredCount = requiredRequirements.length;
  const completedRequiredCount = matchedRequired.length;
  const completionPercentage =
    totalRequiredCount === 0 ? 100 : Math.round((completedRequiredCount / totalRequiredCount) * 100);

  return {
    totalRequiredCount,
    completedRequiredCount,
    completionPercentage,
    matchedRequirementIds: matchedRequired.map((requirement) => requirement.id),
    missingRequirementIds: requiredRequirements
      .filter((requirement) => !matchedRequired.includes(requirement))
      .map((requirement) => requirement.id),
  };
}

export function getMissingBundleRequirements(bundle: ProjectBundle, basketItems: BasketItemLike[]): BundleRequirement[] {
  const { basketProductIds } = normalizeBasket(basketItems);

  return bundle.requirements.filter(
    (requirement) => requirement.required && !isRequirementCompleted(requirement, basketProductIds),
  );
}

export function getSuggestedProductsForMissingRequirements(
  bundle: ProjectBundle,
  basketItems: BasketItemLike[],
  catalogProducts: ProductItem[],
): ProductItem[] {
  const basketProductIds = new Set(basketItems.map((item) => item.id));
  const suggestions: ProductItem[] = [];
  const suggestionIds = new Set<string>();

  for (const requirement of getMissingBundleRequirements(bundle, basketItems)) {
    for (const productId of requirement.recommendedProductIds) {
      if (basketProductIds.has(productId) || suggestionIds.has(productId)) continue;
      const product = catalogProducts.find((catalogItem) => catalogItem.id === productId);
      if (!product) continue;
      suggestions.push(product);
      suggestionIds.add(productId);
      break;
    }
  }

  return suggestions;
}

export function getBestMatchingBundleForBasket(basketItems: BasketItemLike[]) {
  if (basketItems.length === 0) return null;

  const { basketProductIds, basketCategories } = normalizeBasket(basketItems);
  const scoredBundles = projectBundles.map((bundle) => {
    const completion = getBundleCompletion(bundle, basketItems);
    const intentSignals = bundle.requirements.filter((requirement) =>
      hasRequirementIntentSignal(requirement, basketProductIds, basketCategories),
    ).length;

    return {
      bundle,
      completion,
      score: completion.completedRequiredCount * 100 + intentSignals,
      intentSignals,
    };
  });

  const meaningfulMatches = scoredBundles.filter(({ completion, intentSignals }) =>
    completion.completedRequiredCount > 0 || intentSignals >= 2,
  );
  if (meaningfulMatches.length === 0) return null;

  meaningfulMatches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.completion.completionPercentage - a.completion.completionPercentage;
  });

  const best = meaningfulMatches[0];
  return {
    bundle: best.bundle,
    completion: best.completion,
  };
}

const companionRules: Partial<Record<ProductCategory, ProductId[]>> = {
  'Copper / CAT6 Cabling': [
    'legrand-rj45-socket-category-6-utp-1-module-white',
    'panduit-category-6-utp-patch-cord-1m',
    'conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit',
  ],
  'Fiber Optic Systems': [
    'dema-prolink-z2203190330-optical-distribution-frame-odf',
    'hpe-premier-flex-lclc-multi-mode-om4-2-fiber-2m-cable-qk733a',
    'dema-prolink-d1629-lcummd-lc-multimode-fiber-coupler',
  ],
  'Cabinets / Racks / PDU': [
    'conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit',
    'dema-prolink-z2203190330-optical-distribution-frame-odf',
    'panduit-category-6-utp-patch-cord-1m',
  ],
  'Faceplates / Keystone / RJ45': [
    'legrand-category-6-uutp-lszh-cable-305m-blue',
    'panduit-category-6-utp-patch-cord-1m',
    'leviton-surface-mount-back-box-single-gang-white',
  ],
  'Patch Cords & Connectivity': [
    'legrand-category-6-uutp-lszh-cable-305m-blue',
    'dema-prolink-z2203190330-optical-distribution-frame-odf',
    'conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit',
  ],
};

export function getCompanionRecommendationsForProduct(
  product: ProductItem,
  basketItems: BasketItemLike[],
  catalogProducts: ProductItem[],
  limit = 3,
): ProductItem[] {
  const productIdsInBasket = new Set(basketItems.map((item) => item.id));
  const candidateIds = companionRules[product.category] ?? [];
  const recommendations: ProductItem[] = [];

  for (const candidateId of candidateIds) {
    if (candidateId === product.id || productIdsInBasket.has(candidateId)) continue;
    const candidate = catalogProducts.find((catalogItem) => catalogItem.id === candidateId);
    if (!candidate) continue;
    recommendations.push(candidate);
    if (recommendations.length >= limit) break;
  }

  return recommendations;
}
