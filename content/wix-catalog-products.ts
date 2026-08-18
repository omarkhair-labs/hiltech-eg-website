import type { ProductItem } from './products';

// Snapshot of the 48 live Wix catalog products used as the migration-safe static fallback.
// Product IDs intentionally match the current Wix slugs so legacy product URLs can redirect 1:1.

export const wixCatalogProducts: ProductItem[] = [
  {
    "id": "كابينة-شنايدر-إلكتريك-schneider-electric-enclosure-700-gvbc7",
    "category": "Cabinets / Racks / PDU",
    "name": "كابينة شنايدر إلكتريك - Schneider Electric Enclosure 700-GVBC7",
    "brand": "Schneider Electric",
    "shortSpecs": "Schneider Electric enclosure model 700-GVBC7.",
    "useCase": "Suitable for data centers, industrial installations, network systems, distribution equipment, sensitive power equipment, and UPS battery applications.",
    "image": "https://static.wixstatic.com/media/4491ac_ce4be403b2f044ffb1a2ca4682541b71~mv2.png"
  },
  {
    "id": "fiber-enclosure-24-core-china",
    "category": "Fiber Optic Systems",
    "name": "FIBER ENCLOSURE 24 CORE CHINA",
    "brand": "CHINA",
    "shortSpecs": "24-core fiber enclosure.",
    "useCase": "Designed to protect, organize, and manage fiber terminations and splices in structured cabling installations.",
    "image": "https://static.wixstatic.com/media/16ad8b_60363474deed4af690a6be091d17a104~mv2.jpg"
  },
  {
    "id": "80-meter-ready-cable-sm-lclc-inout-14130646",
    "category": "Patch Cords & Connectivity",
    "name": "80 METER READY CABLE SM LC/LC IN/OUT - 14130646",
    "brand": "FIBER CABLE READY",
    "shortSpecs": "80 m ready single-mode LC/LC fiber cable, part 14130646.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_53594684199a400888a8f3023c9c4a8a~mv2.jpg"
  },
  {
    "id": "60-meter-ready-cable-sm-lclc-inout-14130646",
    "category": "Patch Cords & Connectivity",
    "name": "60 METER READY CABLE SM LC/LC IN/OUT - 14130646",
    "brand": "FIBER CABLE READY",
    "shortSpecs": "60 m ready single-mode LC/LC fiber cable, part 14130646.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_99bd7c219fda4fdd89b8150602fc2c3a~mv2.jpg"
  },
  {
    "id": "coupler-sc-simplex-mm-sm",
    "category": "Fiber Optic Systems",
    "name": "COUPLER SC SIMPLEX MM/SM",
    "brand": "MIX",
    "shortSpecs": "SC simplex MM/SM fiber coupler.",
    "useCase": "Used to connect compatible fiber optic connectors in patch panels, enclosures, and structured cabling systems.",
    "image": "https://static.wixstatic.com/media/16ad8b_4b46eadd077b472c994661ce0abc937f~mv2.jpg"
  },
  {
    "id": "patch-cord-lc-lc-sc-mm-om3-3-meter",
    "category": "Patch Cords & Connectivity",
    "name": "PATCH CORD LC/LC-SC MM OM3 3 METER",
    "brand": "MIX",
    "shortSpecs": "OM3 multimode fiber patch cord, 3 m, LC/LC-SC configuration.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_1838da4d432a4125b1724be75db6f750~mv2.webp"
  },
  {
    "id": "patch-cord-lc-lc-sm-3-meter",
    "category": "Patch Cords & Connectivity",
    "name": "PATCH CORD LC/LC SM 3 METER",
    "brand": "MIX",
    "shortSpecs": "Single-mode LC/LC fiber patch cord, 3 m.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_3177d393843748d2b6d12552df9bdf2d~mv2.webp"
  },
  {
    "id": "ibm-12r9559-om2-lc-lc-fibre-channel-cable-13m",
    "category": "Patch Cords & Connectivity",
    "name": "IBM 12R9559 OM2 LC-LC Fibre Channel Cable 13m",
    "brand": "IBM",
    "shortSpecs": "OM2 LC-LC Fibre Channel cable, 13 m, part 12R9559.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_4cb8d1f65dc5440a94c226dcce6b2f5b~mv2.webp"
  },
  {
    "id": "commscope-fdxlclc42-mxf010-om4-lc-lc-duplex-fiber-patch-cord-10ft",
    "category": "Patch Cords & Connectivity",
    "name": "CommScope FDXLCLC42-MXF010 OM4 LC-LC Duplex Fiber Patch Cord 10ft",
    "brand": "CommScope",
    "shortSpecs": "OM4 LC-LC duplex fiber patch cord, 10 ft, part FDXLCLC42-MXF010.",
    "useCase": "Suitable for professional networking, fiber optic, and structured cabling infrastructure projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_c6e9bd243ee44cc2bae9edee23c32af6~mv2.webp"
  },
  {
    "id": "panduit-nkfpx1bn3nnm001-om3-sc-fiber-optic-cable-1m",
    "category": "Fiber Optic Systems",
    "name": "PANDUIT NKFPX1BN3NNM001 OM3 SC Fiber Optic Cable 1m",
    "brand": "PANDUIT",
    "shortSpecs": "OM3 SC fiber optic cable, 1 m, part NKFPX1BN3NNM001.",
    "useCase": "Suitable for optical backbone and structured cabling links where compatible fiber type and connectors are required.",
    "image": "https://static.wixstatic.com/media/16ad8b_e78ca060d18541aea7cb232a2722de47~mv2.jpg"
  },
  {
    "id": "panduit-nkfpx2ellssm002-om3-lc-lc-duplex-fiber-patch-cord-2m",
    "category": "Patch Cords & Connectivity",
    "name": "PANDUIT NKFPX2ELLSSM002 OM3 LC-LC Duplex Fiber Patch Cord 2m",
    "brand": "PANDUIT",
    "shortSpecs": "OM3 LC-LC duplex fiber patch cord, 2 m, part NKFPX2ELLSSM002.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_ae41b4fb438a4b348639839735363f04~mv2.jpg"
  },
  {
    "id": "hp-original-aj837-63002-15m-multi-mode-om3-lc-lc-fiber",
    "category": "Patch Cords & Connectivity",
    "name": "HP ORIGINAL AJ837-63002 15M MULTI-MODE OM3 LC-LC FIBER",
    "brand": "HPE",
    "shortSpecs": "OM3 multimode LC-LC fiber cable, 15 m, part AJ837-63002.",
    "useCase": "Suitable for professional networking, fiber optic, and structured cabling infrastructure projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_01d0458492c54765807f778629d4eab3~mv2.webp"
  },
  {
    "id": "hpe-premier-flex-lclc-multi-mode-om4-2-fiber-15m-cable-qk735a",
    "category": "Patch Cords & Connectivity",
    "name": "HPE Premier Flex LC/LC Multi‑mode OM4 2 Fiber 15m Cable - QK735A",
    "brand": "HPE",
    "shortSpecs": "Premier Flex OM4 LC/LC multimode 2-fiber cable, 15 m, part QK735A.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_9907c2cd484340bea827240276e6d899~mv2.webp"
  },
  {
    "id": "hpe-premier-flex-lclc-multi-mode-om4-2-fiber-2m-cable-qk733a",
    "category": "Patch Cords & Connectivity",
    "name": "HPE Premier Flex LC/LC Multi‑mode OM4 2 Fiber 2m Cable - QK733A",
    "brand": "HPE",
    "shortSpecs": "Premier Flex OM4 LC/LC multimode 2-fiber cable, 2 m, part QK733A.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_4bd2457d7f3f47ceb19215c6d0d003c1~mv2.webp"
  },
  {
    "id": "dema-prolink-z2203190330-optical-distribution-frame-odf",
    "category": "Fiber Optic Systems",
    "name": "DEMA PROLINK Z2203190330 Optical Distribution Frame (ODF)",
    "brand": "DEMA PROLINK",
    "shortSpecs": "Optical Distribution Frame (ODF), part Z2203190330.",
    "useCase": "Designed to organize and manage fiber terminations and patching in racks and network cabinets.",
    "image": "https://static.wixstatic.com/media/16ad8b_ad1d1401a6f04b4cab2a52982fe4de60~mv2.jpg"
  },
  {
    "id": "dema-prolink-d1329-lculcu7102l2dyw-os2-lc-fiber-patch-cord-10m",
    "category": "Patch Cords & Connectivity",
    "name": "DEMA PROLINK D1329-LCULCU7102L2DYW OS2 LC Fiber Patch Cord 10m",
    "brand": "DEMA PROLINK",
    "shortSpecs": "OS2 LC fiber patch cord, 10 m, part D1329-LCULCU7102L2DYW.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_157d8b4bbf934195a111d213af4f2b20~mv2.webp"
  },
  {
    "id": "dema-prolink-d1329-lculcu752l2dyw-os2-lc-fiber-patch-cord-5m",
    "category": "Patch Cords & Connectivity",
    "name": "DEMA PROLINK D1329-LCULCU752L2DYW OS2 LC Fiber Patch Cord 5m",
    "brand": "DEMA PROLINK",
    "shortSpecs": "OS2 LC fiber patch cord, 5 m, part D1329-LCULCU752L2DYW.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_b377e65a9c4d4e4f94478b12a6db07b0~mv2.webp"
  },
  {
    "id": "dema-prolink-d1329-lculcu2102l0aq-om3-lc-fiber-patch-cord-10m",
    "category": "Patch Cords & Connectivity",
    "name": "DEMA PROLINK D1329-LCULCU2102L0AQ OM3 LC Fiber Patch Cord 10m",
    "brand": "DEMA PROLINK",
    "shortSpecs": "OM3 LC fiber patch cord, 10 m, part D1329-LCULCU2102L0AQ.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_fa1069834364441e8d3a5b5e94e21ac1~mv2.webp"
  },
  {
    "id": "dema-prolink-d1329-lculcu212l0aq-om3-lc-fiber-patch-cord-1m",
    "category": "Patch Cords & Connectivity",
    "name": "DEMA PROLINK D1329-LCULCU212L0AQ OM3 LC Fiber Patch Cord 1m",
    "brand": "DEMA PROLINK",
    "shortSpecs": "OM3 LC fiber patch cord, 1 m, part D1329-LCULCU212L0AQ.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_719cbaec1b834333a419cc6d69fb9ad0~mv2.webp"
  },
  {
    "id": "dema-prolink-d1619-lcu201-lc-multimode-fiber-pigtail",
    "category": "Fiber Optic Systems",
    "name": "DEMA PROLINK D1619-LCU201 LC Multimode Fiber Pigtail",
    "brand": "DEMA PROLINK",
    "shortSpecs": "LC multimode fiber pigtail, part D1619-LCU201.",
    "useCase": "Suitable for splice-to-connector fiber terminations in enclosures, panels, and distribution points.",
    "image": "https://static.wixstatic.com/media/16ad8b_647a3f57792f427cbf428d226c0c0854~mv2.jpg"
  },
  {
    "id": "dema-prolink-d1629-lcummd-lc-multimode-fiber-coupler",
    "category": "Fiber Optic Systems",
    "name": "DEMA PROLINK D1629-LCUMMD LC Multimode Fiber Coupler",
    "brand": "DEMA PROLINK",
    "shortSpecs": "LC multimode fiber coupler, part D1629-LCUMMD.",
    "useCase": "Used to connect compatible fiber optic connectors in patch panels, enclosures, and structured cabling systems.",
    "image": "https://static.wixstatic.com/media/16ad8b_7aa9b10db4594777ac2325fae9fe5d11~mv2.jpg"
  },
  {
    "id": "leviton-1u-patch-panel-fiber-24p-unloaded-001-5r1ul-f03",
    "category": "Fiber Optic Systems",
    "name": "Leviton 1U Patch Panel Fiber 24P Unloaded - 001-5R1UL-F03",
    "brand": "LEVITON",
    "shortSpecs": "1U 24-port unloaded fiber patch panel, part 001-5R1UL-F03.",
    "useCase": "Designed to organize and manage fiber terminations and patching in racks and network cabinets.",
    "image": "https://static.wixstatic.com/media/16ad8b_c9de5a7b76864c8baf36ff25c9ff2c7e~mv2.jpg"
  },
  {
    "id": "leviton-fiber-cord-om3-lc-sc-dplx-3-meter-5ldcl-m03",
    "category": "Patch Cords & Connectivity",
    "name": "Leviton FIBER CORD OM3 LC-SC DPLX 3 METER - 5LDCL-M03",
    "brand": "LEVITON",
    "shortSpecs": "OM3 LC-SC duplex fiber cord, 3 m, part 5LDCL-M03.",
    "useCase": "Designed for optical patching between compatible fiber interfaces in racks, patch panels, and network equipment.",
    "image": "https://static.wixstatic.com/media/16ad8b_709c1c74e7d2456e9520c2cf551c85b2~mv2.jpg"
  },
  {
    "id": "leviton-pigtail-sc-50u-om3-3-mtr-5lpsc-m03",
    "category": "Fiber Optic Systems",
    "name": "Leviton PIGTAIL SC 50U OM3 3 MTR - 5LPSC-M03",
    "brand": "LEVITON",
    "shortSpecs": "SC 50U OM3 fiber pigtail, 3 m, part 5LPSC-M03.",
    "useCase": "Suitable for splice-to-connector fiber terminations in enclosures, panels, and distribution points.",
    "image": "https://static.wixstatic.com/media/16ad8b_2e77f0349d4148a48001a12d090edb41~mv2.jpg"
  },
  {
    "id": "leviton-t5pls-12f-tray-spl-plast-011-t5pls-24f",
    "category": "Fiber Optic Systems",
    "name": "LEVITON T5PLS-12F TRAY SPL PLAST - 011-T5PLS -24F",
    "brand": "LEVITON",
    "shortSpecs": "Leviton fiber splice tray, part 011-T5PLS-24F.",
    "useCase": "Suitable for professional networking, fiber optic, and structured cabling infrastructure projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_a63417fbfcac4e128e46d52736d3b8f1~mv2.jpg"
  },
  {
    "id": "leviton-5f100-2qc-sdx-om3-om4-duplex-sc-fiber-plate-12-fiber",
    "category": "Fiber Optic Systems",
    "name": "Leviton 5F100-2QC SDX OM3/OM4 Duplex SC Fiber Plate 12-Fiber",
    "brand": "LEVITON",
    "shortSpecs": "SDX OM3/OM4 duplex SC 12-fiber plate, part 5F100-2QC.",
    "useCase": "Suitable for presenting and organizing fiber connectivity at network outlet and termination points.",
    "image": "https://static.wixstatic.com/media/16ad8b_b1841d8380734ca393469309a52fec8c~mv2.jpg"
  },
  {
    "id": "leviton-plate-blank-molded-opt-x-5f100-plt",
    "category": "Fiber Optic Systems",
    "name": "Leviton PLATE BLANK MOLDED OPT-X - 5F100-PLT",
    "brand": "LEVITON",
    "shortSpecs": "Opt-X molded blank plate, part 5F100-PLT.",
    "useCase": "Suitable for presenting and organizing fiber connectivity at network outlet and termination points.",
    "image": "https://static.wixstatic.com/media/16ad8b_1cf125db03d74416af2656be6a1d895b~mv2.jpg"
  },
  {
    "id": "fiber-optical-cable-inout-armored-12-core-om3-5llaz-122",
    "category": "Fiber Optic Systems",
    "name": "Fiber Optical Cable IN/OUT ARMORED 12 CORE OM3 - 5LLAZ-122",
    "brand": "LEVITON",
    "shortSpecs": "Armored 12-core OM3 fiber optic cable, part 5LLAZ-122.",
    "useCase": "Suitable for optical backbone and structured cabling links where compatible fiber type and connectors are required.",
    "image": "https://static.wixstatic.com/media/16ad8b_86ff29d8b27f43888628d4e4918635a7~mv2.jpg"
  },
  {
    "id": "conteg-pdu-8-outlet-19-inch-1u-rack-power-distribution-unit",
    "category": "Cabinets / Racks / PDU",
    "name": "CONTEG PDU 8 Outlet 19 Inch 1U Rack Power Distribution Unit",
    "brand": "CONTEG",
    "shortSpecs": "8-outlet 19-inch 1U rack PDU, part DP-RP-08-SCHUS.",
    "useCase": "Built for dependable rack power distribution in professional installations.",
    "image": "https://static.wixstatic.com/media/16ad8b_c20d4f13b82b46b08d46fcd9e57ed988~mv2.jpg"
  },
  {
    "id": "cornet-rj45-connector-box-100-pieces",
    "category": "Faceplates / Keystone / RJ45",
    "name": "CORNET RJ45 Connector Box 100 Pieces",
    "brand": "CORNET",
    "shortSpecs": "RJ45 connector box, 100 pieces, part CORNET-RJ45-BOX-100PC.",
    "useCase": "Suitable for structured cabling, commercial networks, CCTV, BMS, and IT infrastructure projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_7726444bbe7543079d1d32ca4b1103fa~mv2.jpg"
  },
  {
    "id": "point-rj45-connector-box-100-pieces",
    "category": "Faceplates / Keystone / RJ45",
    "name": "POINT RJ45 Connector Box 100 Pieces",
    "brand": "POINT",
    "shortSpecs": "RJ45 connector box, 100 pieces, part POINT-RJ-BOX-100PC.",
    "useCase": "Suitable for structured cabling, commercial networks, CCTV, BMS, and IT infrastructure projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_4935304a6f6a44258e95c028cc0cd2df~mv2.jpg"
  },
  {
    "id": "premium-line-euro-face-plate-1-port-white-shuttered-outlet",
    "category": "Faceplates / Keystone / RJ45",
    "name": "PREMIUM LINE Euro Face Plate 1 Port White Shuttered Outlet",
    "brand": "PREMIUM LINE",
    "shortSpecs": "Euro II 1-port white shuttered faceplate, 86×86, right-angle 45° entry, part 121121210.",
    "useCase": "Suitable for structured cabling, commercial networks, CCTV, BMS, and IT infrastructure projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_739c9f1a1c3e4b6293c169328d686148~mv2.webp"
  },
  {
    "id": "fumo-double-faceplate-white",
    "category": "Faceplates / Keystone / RJ45",
    "name": "FUMO Double Faceplate White",
    "brand": "FUMO",
    "shortSpecs": "White double faceplate, part FUMO-FACEPLATE-DOUBLE.",
    "useCase": "Supports clean and durable wall outlet finishing for structured cabling projects."
  },
  {
    "id": "excel-single-gang-faceplate-with-2-half-blanks-white",
    "category": "Faceplates / Keystone / RJ45",
    "name": "EXCEL Single Gang Faceplate with 2 Half Blanks White",
    "brand": "EXCEL",
    "shortSpecs": "Single-gang white faceplate with 2 half blanks, part 100-270.",
    "useCase": "Supports clean and durable wall outlet finishing for structured cabling projects."
  },
  {
    "id": "leviton-surface-mount-back-box-single-gang-white",
    "category": "Faceplates / Keystone / RJ45",
    "name": "LEVITON Surface Mount Back Box Single Gang White",
    "brand": "LEVITON",
    "shortSpecs": "Single-gang white surface-mount back box, 1.89-inch depth, part 42777-1WA.",
    "useCase": "Supports clean and durable wall outlet finishing for structured cabling projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_2da50538f7af4a5eab43a6c13a30acd2~mv2.jpg"
  },
  {
    "id": "legrand-rj45-socket-category-6-utp-1-module-white",
    "category": "Faceplates / Keystone / RJ45",
    "name": "LEGRAND RJ45 Socket Category 6 UTP 1 Module White",
    "brand": "LEGRAND",
    "shortSpecs": "Category 6 UTP RJ45 socket, 1 module, white, part 572302.",
    "useCase": "Suitable for structured cabling and enterprise networks; designed for reliable voice and data outlet termination.",
    "image": "https://static.wixstatic.com/media/16ad8b_a5754a64d82749249b03decf20b91a1c~mv2.jpg"
  },
  {
    "id": "excel-cat6-utp-keystone-jack-idc-white",
    "category": "Faceplates / Keystone / RJ45",
    "name": "EXCEL Cat6 UTP Keystone Jack IDC White",
    "brand": "EXCEL",
    "shortSpecs": "Cat6 UTP unscreened IDC keystone jack, white, part 100-011-BK.",
    "useCase": "Suitable for structured cabling and enterprise networks; designed for reliable voice and data outlet termination.",
    "image": "https://static.wixstatic.com/media/16ad8b_337b3d91feae4e66bb38b7ed9581b234~mv2.jpg"
  },
  {
    "id": "panduit-tx6a-shielded-field-terminable-plug",
    "category": "Faceplates / Keystone / RJ45",
    "name": "PANDUIT TX6A Shielded Field-Terminable Plug",
    "brand": "PANDUIT",
    "shortSpecs": "IndustrialNet TX6A shielded field-terminable plug, part FPS6X88MTG.",
    "useCase": "Suitable for structured cabling, commercial networks, CCTV, BMS, and IT infrastructure projects.",
    "image": "https://static.wixstatic.com/media/16ad8b_d735c2ab7d4345cfa90ada9db8d1f135~mv2.jpg"
  },
  {
    "id": "prolink-cat6a-rj45-mptl-stp-plug",
    "category": "Faceplates / Keystone / RJ45",
    "name": "PROLINK Cat6A RJ45 MPTL STP Plug",
    "brand": "PROLINK",
    "shortSpecs": "10G RJ45 MPTL Cat6A STP plug, part PL-RJ6AS.",
    "useCase": "Engineered for high-speed Cat6A data transmission; suitable for structured cabling and enterprise networks.",
    "image": "https://static.wixstatic.com/media/16ad8b_493ef6d6a9424cf2ba8b827eaac29739~mv2.jpg"
  },
  {
    "id": "local-rj11-telephone-patch-cord",
    "category": "Patch Cords & Connectivity",
    "name": "LOCAL RJ11 Telephone Patch Cord",
    "brand": "LOCAL",
    "shortSpecs": "RJ11 telephone patch cord, part LOCAL-RJ11-PATCH.",
    "useCase": "Ideal for racks, cabinets, work areas, and patching points where RJ11 connectivity is required.",
    "image": "https://static.wixstatic.com/media/16ad8b_1e84fb4396cf4470a2c0d4b362832fa5~mv2.jpg"
  },
  {
    "id": "blackstone-utp-cat6-cable-3m",
    "category": "Patch Cords & Connectivity",
    "name": "BLACKSTONE UTP Cat6 Cable 3m",
    "brand": "BLACKSTONE",
    "shortSpecs": "UTP Cat6 cable, 3 m, part BLACKSTONE-CAT6-3M.",
    "useCase": "Suitable for structured cabling and enterprise networks.",
    "image": "https://static.wixstatic.com/media/16ad8b_f1f660d93b4d41eb9639d9c86ca18d2b~mv2.png"
  },
  {
    "id": "leviton-cat6-utp-patch-cord-3m-gray",
    "category": "Patch Cords & Connectivity",
    "name": "LEVITON Cat6 UTP Patch Cord 3m Gray",
    "brand": "LEVITON",
    "shortSpecs": "Cat6 UTP patch cord, 3 m (10 ft), gray, part CAT62460-10S.",
    "useCase": "Ideal for racks, cabinets, work areas, and patching points.",
    "image": "https://static.wixstatic.com/media/16ad8b_3333caf3546f445498920f1c4e3d17d6~mv2.jpg"
  },
  {
    "id": "dema-prolink-cat6a-patch-cord-3m-lszh-gray",
    "category": "Patch Cords & Connectivity",
    "name": "DEMA PROLINK Cat6A Patch Cord 3m LSZH Gray",
    "brand": "DEMA PROLINK",
    "shortSpecs": "Cat6A patch cord, 3 m, LSZH, gray, part D0234-UN3LSGY.",
    "useCase": "LSZH jacket helps support safer indoor installations; ideal for racks, cabinets, work areas, and patching points.",
    "image": "https://static.wixstatic.com/media/16ad8b_2b815593141747188ad36021bd30a8e5~mv2.jpg"
  },
  {
    "id": "panduit-category-6-utp-patch-cord-1m",
    "category": "Patch Cords & Connectivity",
    "name": "PANDUIT Category 6 UTP Patch Cord 1m",
    "brand": "PANDUIT",
    "shortSpecs": "NetKey Category 6 UTP patch cord, 1 m, part NK6PC1MY.",
    "useCase": "Suitable for structured cabling and enterprise networks; ideal for racks, cabinets, work areas, and patching points.",
    "image": "https://static.wixstatic.com/media/16ad8b_34838ee6e21042e6ac771103b391d04f~mv2.jpg"
  },
  {
    "id": "legrand-category-6-uutp-lszh-cable-305m-blue",
    "category": "Copper / CAT6 Cabling",
    "name": "LEGRAND Category 6 U/UTP LSZH Cable 305m Blue",
    "brand": "LEGRAND",
    "shortSpecs": "Category 6 U/UTP 4-pair LSZH cable, 305 m, blue, part 032754 D.",
    "useCase": "Suitable for structured cabling and enterprise networks; LSZH jacket helps support safer indoor installations.",
    "image": "https://static.wixstatic.com/media/16ad8b_bdc4ad56114a4ea4a3d62dc993b0c14c~mv2.jpg"
  },
  {
    "id": "leviton-cat6-lszh-network-cable-305m-gray",
    "category": "Copper / CAT6 Cabling",
    "name": "LEVITON Cat6 LSZH Network Cable 305m Gray",
    "brand": "LEVITON",
    "shortSpecs": "Cat6 LSZH network cable, 305 m, gray, part C6U-HF1-Eca-Rlx-305GY.",
    "useCase": "Suitable for structured cabling and enterprise networks; LSZH jacket helps support safer indoor installations.",
    "image": "https://static.wixstatic.com/media/16ad8b_ce5a54441bf64199889d2847cb919dee~mv2.jpg"
  },
  {
    "id": "panduit-category-6a-uutp-copper-cable-305m",
    "category": "Copper / CAT6 Cabling",
    "name": "PANDUIT Category 6A U/UTP Copper Cable 305m",
    "brand": "PANDUIT",
    "shortSpecs": "Pan-Net TX6A Category 6A U/UTP Vari-MaTriX HD copper cable, 305 m, part PUL6AV04WH-EG.",
    "useCase": "Engineered for high-speed Cat6A data transmission; suitable for structured cabling and enterprise networks.",
    "image": "https://static.wixstatic.com/media/16ad8b_45463971a1e444d094f8443ca48d80f4~mv2.jpg"
  },
  {
    "id": "leviton-optic-fiber-cable",
    "category": "Fiber Optic Systems",
    "name": "LEVITON OPTIC FIBER CABLE",
    "brand": "LEVITON",
    "shortSpecs": "Leviton optic fiber cable.",
    "useCase": "Available from HILTECH Egypt for network and IT infrastructure projects; contact HILTECH to confirm specifications and project requirements.",
    "image": "https://static.wixstatic.com/media/4491ac_5a06440e6d884082a8d4c01ecdbb7b6e~mv2.jpg"
  }
];
