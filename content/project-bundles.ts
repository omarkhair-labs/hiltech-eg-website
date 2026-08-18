import type { ProductCategory, ProductItem } from './products';
import { wixCatalogProducts as products } from './wix-catalog-products';

export type ProductId = ProductItem['id'];

export interface BundleRequirement {
  id: string;
  label: string;
  acceptedCategories: ProductCategory[];
  recommendedProductIds: ProductId[];
  completionProductIds: ProductId[];
  required: boolean;
}

export interface ProjectBundle {
  id: string;
  title: string;
  shortDescription: string;
  useCase: string;
  starterProductIds: ProductId[];
  requirements: BundleRequirement[];
}

const productIds = new Set(products.map((product) => product.id));

const defineBundle = (bundle: ProjectBundle): ProjectBundle => {
  for (const productId of bundle.starterProductIds) {
    if (!productIds.has(productId)) {
      throw new Error(`Unknown starter product id in bundle ${bundle.id}: ${productId}`);
    }
  }

  for (const requirement of bundle.requirements) {
    for (const productId of [...requirement.recommendedProductIds, ...requirement.completionProductIds]) {
      if (!productIds.has(productId)) {
        throw new Error(`Unknown requirement product id in bundle ${bundle.id}/${requirement.id}: ${productId}`);
      }
    }
  }

  return bundle;
};

export const projectBundles: ProjectBundle[] = [
  defineBundle({
    id: 'office-network-setup',
    title: 'Office Network Setup Starter',
    shortDescription: 'Starter RFQ scope for a floor-level office network rollout using products from the live HILTECH catalog.',
    useCase: 'New office floors, fit-outs, and expansion projects that need structured endpoint-ready connectivity.',
    starterProductIds: [
      'legrand-category-6-uutp-lszh-cable-305m-blue',
      'legrand-rj45-socket-category-6-utp-1-module-white',
      'panduit-category-6-utp-patch-cord-1m',
      'conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit',
    ],
    requirements: [
      {
        id: 'office-copper-backbone',
        label: 'Copper/CAT6 horizontal cabling',
        acceptedCategories: ['Copper / CAT6 Cabling'],
        recommendedProductIds: [
          'legrand-category-6-uutp-lszh-cable-305m-blue',
          'leviton-cat6-lszh-network-cable-305m-gray',
        ],
        completionProductIds: [
          'legrand-category-6-uutp-lszh-cable-305m-blue',
          'leviton-cat6-lszh-network-cable-305m-gray',
          'panduit-category-6a-uutp-copper-cable-305m',
        ],
        required: true,
      },
      {
        id: 'office-endpoint-termination',
        label: 'Endpoint faceplate/keystone termination',
        acceptedCategories: ['Faceplates / Keystone / RJ45'],
        recommendedProductIds: [
          'legrand-rj45-socket-category-6-utp-1-module-white',
          'excel-cat6-utp-keystone-jack-idc-white',
        ],
        completionProductIds: [
          'legrand-rj45-socket-category-6-utp-1-module-white',
          'excel-cat6-utp-keystone-jack-idc-white',
          'premium-line-euro-face-plate-1-port-white-shuttered-outlet',
          'fumo-double-faceplate-white',
          'excel-single-gang-faceplate-with-2-half-blanks-white',
        ],
        required: true,
      },
      {
        id: 'office-patching',
        label: 'Patch connectivity for work areas and cabinet links',
        acceptedCategories: ['Patch Cords & Connectivity'],
        recommendedProductIds: [
          'panduit-category-6-utp-patch-cord-1m',
          'leviton-cat6-utp-patch-cord-3m-gray',
        ],
        completionProductIds: [
          'panduit-category-6-utp-patch-cord-1m',
          'leviton-cat6-utp-patch-cord-3m-gray',
          'dema-prolink-cat6a-patch-cord-3m-lszh-gray',
          'blackstone-utp-cat6-cable-3m',
        ],
        required: true,
      },
      {
        id: 'office-rack-support',
        label: 'Basic rack power / enclosure readiness',
        acceptedCategories: ['Cabinets / Racks / PDU'],
        recommendedProductIds: [
          'conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit',
          'كابينة-شنايدر-إلكتريك-schneider-electric-enclosure-700-gvbc7',
        ],
        completionProductIds: [
          'conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit',
          'كابينة-شنايدر-إلكتريك-schneider-electric-enclosure-700-gvbc7',
        ],
        required: false,
      },
    ],
  }),
  defineBundle({
    id: 'rack-room-preparation',
    title: 'Rack Room Preparation Starter',
    shortDescription: 'Starter RFQ scope for rack and data-room infrastructure readiness using current HILTECH catalog items.',
    useCase: 'Server room preparation and expansion where enclosure, power, fiber organization, and patching need alignment.',
    starterProductIds: [
      'كابينة-شنايدر-إلكتريك-schneider-electric-enclosure-700-gvbc7',
      'conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit',
      'dema-prolink-z2203190330-optical-distribution-frame-odf',
      'panduit-category-6-utp-patch-cord-1m',
    ],
    requirements: [
      {
        id: 'rack-cabinet',
        label: 'Rack/cabinet foundation',
        acceptedCategories: ['Cabinets / Racks / PDU'],
        recommendedProductIds: ['كابينة-شنايدر-إلكتريك-schneider-electric-enclosure-700-gvbc7'],
        completionProductIds: ['كابينة-شنايدر-إلكتريك-schneider-electric-enclosure-700-gvbc7'],
        required: true,
      },
      {
        id: 'rack-power-distribution',
        label: 'PDU and rack power distribution',
        acceptedCategories: ['Cabinets / Racks / PDU'],
        recommendedProductIds: ['conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit'],
        completionProductIds: ['conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit'],
        required: true,
      },
      {
        id: 'rack-fiber-organization',
        label: 'Fiber termination / patch organization',
        acceptedCategories: ['Fiber Optic Systems'],
        recommendedProductIds: [
          'dema-prolink-z2203190330-optical-distribution-frame-odf',
          'leviton-1u-patch-panel-fiber-24p-unloaded-001-5r1ul-f03',
        ],
        completionProductIds: [
          'dema-prolink-z2203190330-optical-distribution-frame-odf',
          'leviton-1u-patch-panel-fiber-24p-unloaded-001-5r1ul-f03',
          'fiber-enclosure-24-core-china',
        ],
        required: true,
      },
      {
        id: 'rack-patch-connectivity',
        label: 'Copper or fiber patch connectivity',
        acceptedCategories: ['Patch Cords & Connectivity'],
        recommendedProductIds: [
          'panduit-category-6-utp-patch-cord-1m',
          'hpe-premier-flex-lclc-multi-mode-om4-2-fiber-2m-cable-qk733a',
        ],
        completionProductIds: [
          'panduit-category-6-utp-patch-cord-1m',
          'leviton-cat6-utp-patch-cord-3m-gray',
          'hpe-premier-flex-lclc-multi-mode-om4-2-fiber-2m-cable-qk733a',
          'panduit-nkfpx2ellssm002-om3-lc-lc-duplex-fiber-patch-cord-2m',
        ],
        required: true,
      },
    ],
  }),
  defineBundle({
    id: 'fiber-backbone-scope',
    title: 'Fiber Backbone Scope Starter',
    shortDescription: 'Starter RFQ scope for fiber backbone deployment and termination using live HILTECH fiber products.',
    useCase: 'Inter-floor, campus, and data-room links that require fiber transport and organized terminations.',
    starterProductIds: [
      'fiber-optical-cable-inout-armored-12-core-om3-5llaz-122',
      'dema-prolink-z2203190330-optical-distribution-frame-odf',
      'hpe-premier-flex-lclc-multi-mode-om4-2-fiber-2m-cable-qk733a',
      'dema-prolink-d1629-lcummd-lc-multimode-fiber-coupler',
    ],
    requirements: [
      {
        id: 'fiber-cable',
        label: 'Fiber backbone cable',
        acceptedCategories: ['Fiber Optic Systems'],
        recommendedProductIds: [
          'fiber-optical-cable-inout-armored-12-core-om3-5llaz-122',
          'leviton-optic-fiber-cable',
        ],
        completionProductIds: [
          'fiber-optical-cable-inout-armored-12-core-om3-5llaz-122',
          'leviton-optic-fiber-cable',
          'panduit-nkfpx1bn3nnm001-om3-sc-fiber-optic-cable-1m',
        ],
        required: true,
      },
      {
        id: 'fiber-termination-odf',
        label: 'ODF / fiber termination frame',
        acceptedCategories: ['Fiber Optic Systems'],
        recommendedProductIds: [
          'dema-prolink-z2203190330-optical-distribution-frame-odf',
          'leviton-1u-patch-panel-fiber-24p-unloaded-001-5r1ul-f03',
        ],
        completionProductIds: [
          'dema-prolink-z2203190330-optical-distribution-frame-odf',
          'leviton-1u-patch-panel-fiber-24p-unloaded-001-5r1ul-f03',
          'fiber-enclosure-24-core-china',
        ],
        required: true,
      },
      {
        id: 'fiber-patching',
        label: 'Fiber patch connectivity',
        acceptedCategories: ['Patch Cords & Connectivity'],
        recommendedProductIds: [
          'hpe-premier-flex-lclc-multi-mode-om4-2-fiber-2m-cable-qk733a',
          'panduit-nkfpx2ellssm002-om3-lc-lc-duplex-fiber-patch-cord-2m',
        ],
        completionProductIds: [
          'hpe-premier-flex-lclc-multi-mode-om4-2-fiber-2m-cable-qk733a',
          'hpe-premier-flex-lclc-multi-mode-om4-2-fiber-15m-cable-qk735a',
          'panduit-nkfpx2ellssm002-om3-lc-lc-duplex-fiber-patch-cord-2m',
          'dema-prolink-d1329-lculcu2102l0aq-om3-lc-fiber-patch-cord-10m',
        ],
        required: true,
      },
      {
        id: 'fiber-accessories',
        label: 'Fiber accessories (couplers/pigtails)',
        acceptedCategories: ['Fiber Optic Systems'],
        recommendedProductIds: [
          'dema-prolink-d1629-lcummd-lc-multimode-fiber-coupler',
          'dema-prolink-d1619-lcu201-lc-multimode-fiber-pigtail',
        ],
        completionProductIds: [
          'dema-prolink-d1629-lcummd-lc-multimode-fiber-coupler',
          'dema-prolink-d1619-lcu201-lc-multimode-fiber-pigtail',
          'leviton-pigtail-sc-50u-om3-3-mtr-5lpsc-m03',
          'coupler-sc-simplex-mm-sm',
        ],
        required: true,
      },
    ],
  }),
];
