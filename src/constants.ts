/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, HeelType } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Margaret Signature Heel',
    price: 189,
    description: 'Expertly crafted for the modern woman, this essential stiletto combines timeless elegance with our revolutionary interchangeable heel technology.',
    image: 'https://pashionfootwear.com/cdn/shop/files/margot_chocolate_flat.jpg?v=1756422812&width=700',
    baseColor: 'Black',
    material: 'Premium Nappa Leather',
    features: ['Interchangeable Heel System', 'Extra Insole Cushioning', 'Anti-slip Floral Sole'],
    heelPrices: {
      stiletto: 189,
      block: 165,
      flat: 145
    },
    colors: [
      { 
        name: 'Onyx Black', 
        hex: '#1A1A1A', 
        image: 'https://pashionfootwear.com/cdn/shop/files/margot_coal_heel.webp?v=1756954790&width=1365',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/margot_coal_heel.webp?v=1756954790&width=1365', // Main
          'https://pashionfootwear.com/cdn/shop/files/MargotCoalNappaLeather_CoalStiletto4_angle.webp?v=1754585528&width=1400', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/MargotCoalNappaLeather_CoalBlock3_angle.webp?v=1754585360&width=1400', // Block
          'https://pashionfootwear.com/cdn/shop/files/MargotCoalNappaLeather_CoalFlatflat_angle.webp?v=1754585848&width=1920', // Flats
          'https://filebroker-cdn.lazada.com.my/kf/Sfe47aaf226014e0d9f77ccd50750e254b.jpg', // Comfort
          'https://tm-prd-cdn.themarket.co.nz/resizer/view?key=5dd4ecd22e3ed9d475cea1d1fc8e10d5&b=productimages&w=1080&h=1080', // Detail
          'https://pashionfootwear.com/cdn/shop/videos/c/vp/695632ba8bee4d2792821a4e96090a2f/695632ba8bee4d2792821a4e96090a2f.HD-1080p-2.5Mbps-78202830.mp4?v=0' // 360 Video
        ]
      },
      { 
        name: 'Chocolate', 
        hex: '#3E2723', 
        image: 'https://pashionfootwear.com/cdn/shop/files/margot_chocolate_flat.jpg?v=1756422812&width=700',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/margot_chocolate_flat.jpg?v=1756422812&width=700', // Main
          'https://pashionfootwear.com/cdn/shop/files/MargotChocolateSuede_ChocolateStiletto4_angle.webp?v=1754583435&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/MargotChocolateSuede_ChocolateBlock4_angle.webp?v=1754583161&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/MargotChocolateSuede_ChocolateFlatflat_angle.webp?v=1754583687&width=700'  // Flats
        ]
      },
      { 
        name: 'White Checkered', 
        hex: '#FFFFFF', 
        image: 'https://pashionfootwear.com/cdn/shop/files/Bone_Margot_Tweed.png?v=1762562175&width=700',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/Bone_Margot_Tweed.png?v=1762562175&width=700', // Main
          'https://pashionfootwear.com/cdn/shop/files/MargotBoneTweed_BoneStiletto4_angle_ff5f5906-db83-44e7-aea9-e6e0f8568d05.webp?v=1762562079&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/MargotBoneTweed_BoneBlock4_angle_269ed394-91a5-4c45-a57b-d6ad7f0fbdf7.webp?v=1762561962&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/MargotBoneTweed_BoneFlatflat_angle_9b300de8-bc0c-40bc-818f-5ab52a716fa4.webp?v=1762562175&width=700'  // Flats
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Aurora Switch-Sandal',
    price: 165,
    originalPrice: 195,
    description: 'Transition from day to night effortlessly. Our signature sandal features a versatile design that keeps you comfortable from the boardroom to the ballroom.',
    image: 'https://pashionfootwear.com/cdn/shop/files/Shop_By_Style_34.webp?v=1772164212&width=1080',
    baseColor: 'Sand',
    material: 'Suede Finish',
    features: ['Breathable Mesh Lining', 'Reinforced Block Option', 'Arch Support Tech'],
    heelPrices: {
      stiletto: 185,
      block: 165,
      flat: 145
    },
    isLimited: true,
    stockCount: 3,
    colors: [
      { 
        name: 'Matcha Green', 
        hex: '#889E73', 
        image: 'https://pashionfootwear.com/cdn/shop/files/Shop_By_Style_34.webp?v=1772164212&width=1080',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/Shop_By_Style_34.webp?v=1772164212&width=1080', // Main
          'https://pashionfootwear.com/cdn/shop/files/GiaMintLeather_MintFlareStiletto3_angle.webp?v=1769725277&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/GiaMintLeather_MintBlock3_angle.webp?v=1769725179&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/GiaMintLeather_MintFlatflat_angle.webp?v=1769725299&width=700', // Flats
          'https://filebroker-cdn.lazada.com.my/kf/Sfe47aaf226014e0d9f77ccd50750e254b.jpg', // Cushion
          'https://tm-prd-cdn.themarket.co.nz/resizer/view?key=5dd4ecd22e3ed9d475cea1d1fc8e10d5&b=productimages&w=1080&h=1080' // Detail
        ]
      },
      { 
        name: 'Sand Beige', 
        hex: '#D2B48C', 
        image: 'https://pashionfootwear.com/cdn/shop/files/latte_gia_block.webp?v=1772195048&width=700',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/latte_gia_block.webp?v=1772195048&width=700', // Main
          'https://pashionfootwear.com/cdn/shop/files/GiaLatteLeather_LatteFlareStiletto4_angle.webp?v=1776922487&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/GiaLatteLeather_LatteBlock4_angle.webp?v=1769724910&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/GiaLatteLeather_LatteFlatflat_angle_44a7c4e1-d8d2-4516-9b85-ff295afb8caa.webp?v=1769725046&width=700' // Flats
        ]
      },
      { 
        name: 'Onyx Black', 
        hex: '#1A1A1A', 
        image: 'https://pashionfootwear.com/cdn/shop/files/coal_gia_flat.webp?v=1772209456&width=700',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/coal_gia_flat.webp?v=1772209456&width=700', // Main
          'https://pashionfootwear.com/cdn/shop/files/GiaCoalLeather_CoalFlareStiletto3_angle.webp?v=1776921512&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/GiaCoalLeather_CoalBlock3_angle.webp?v=1769725571&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/GiaCoalLeather_CoalFlatflat_angle_bd1d39a7-af16-46d7-98a4-0de1b334886c.webp?v=1769725627&width=700' // Flats
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Diane Slingback',
    price: 210,
    description: 'The ultimate versatile pump. The Diane Slingback offers a sophisticated silhouette with our iconic interchangeable heel technology, perfect for transition from day to evening.',
    image: 'https://decarocalzature.com/wp-content/uploads/2026/04/sandali-alti-eleganti-decollete-spuntate-vera-pelle-nude-de-caro-calzature-4-600x600.jpg',
    baseColor: 'Sand Beige',
    material: 'Premium Nappa Leather',
    features: ['Interchangeable Heel System', 'Adjustable Slingback Strap', 'Padded Insole for Comfort'],
    heelPrices: {
      stiletto: 210,
      block: 190,
      flat: 170
    },
    colors: [
      { 
        name: 'Sand Beige', 
        hex: '#D2B48C', 
        image: 'https://decarocalzature.com/wp-content/uploads/2026/04/sandali-alti-eleganti-decollete-spuntate-vera-pelle-nude-de-caro-calzature-4-600x600.jpg',
        images: [
          'https://decarocalzature.com/wp-content/uploads/2026/04/sandali-alti-eleganti-decollete-spuntate-vera-pelle-nude-de-caro-calzature-4-600x600.jpg', // Main
          'https://pashionfootwear.com/cdn/shop/files/ShaeLatteLeather_LatteStiletto3_angle.webp?v=1769724514&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/ShaeLatteLeather_LatteBlock3_angle.webp?v=1769724465&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/ShaeLatteLeather_LatteBlock1.5_angle.webp?v=1769724524&width=700', // Flats
          'https://filebroker-cdn.lazada.com.my/kf/Sfe47aaf226014e0d9f77ccd50750e254b.jpg', // Comfort
          'https://tm-prd-cdn.themarket.co.nz/resizer/view?key=5dd4ecd22e3ed9d475cea1d1fc8e10d5&b=productimages&w=1080&h=1080' // Anti-slip sole
        ]
      },
      { 
        name: 'Black', 
        hex: '#1A1A1A', 
        image: 'https://pashionfootwear.com/cdn/shop/files/coal_shae_flat.webp?v=1772194547&width=700',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/coal_shae_flat.webp?v=1772194547&width=700', // Main
          'https://pashionfootwear.com/cdn/shop/files/ShaeCoalLeather_CoalStiletto3_angle.webp?v=1769724784&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/ShaeCoalLeather_CoalBlock3_angle.webp?v=1769724744&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/ShaeCoalLeather_CoalBlock1.5_angle.webp?v=1769724794&width=700' // Flats
        ]
      },
      { 
        name: 'Orange', 
        hex: '#E65100', 
        image: 'https://pashionfootwear.com/cdn/shop/files/Shae-Tangerine-Flare.webp?v=1776871466&width=700',
        images: [
          'https://pashionfootwear.com/cdn/shop/files/Shae-Tangerine-Flare.webp?v=1776871466&width=700', // Main
          'https://pashionfootwear.com/cdn/shop/files/ShaeTangerineLeatherMesh_TangerineFlareStiletto3_angle.webp?v=1775060016&width=700', // Stiletto
          'https://pashionfootwear.com/cdn/shop/files/ShaeTangerineLeatherMesh_TangerineBlock3_angle.webp?v=1775059965&width=700', // Block
          'https://pashionfootwear.com/cdn/shop/files/ShaeTangerineLeatherMesh_TangerineBlock1.5_angle.webp?v=1775060030&width=700' // Flats
        ]
      }
    ]
  }
];

export const HEEL_TYPES = [
  { id: 'stiletto', name: 'Stiletto', height: '10cm', description: 'Classic and sleek for maximum elegance.' },
  { id: 'block', name: 'Block', height: '8cm', description: 'Maximum stability for all-day confidence.' },
  { id: 'flat', name: 'Flat', height: '1cm', description: 'Absolute comfort for effortless movement.' }
];

export const HEEL_KITS: Product[] = [
  {
    id: 'kit-1',
    name: 'The Stiletto Expansion Kit',
    price: 45,
    description: 'Ultra-slim 10cm stiletto profile with reinforced titanium core. Perfect for elevating your evening look.',
    image: 'https://pashionfootwear.com/cdn/shop/files/RoseGoldMetallicStiletto4_636451a2-a3ad-4d98-92cf-b94ffb054bd4.webp?v=1756256706&width=700',
    baseColor: 'Gold',
    material: 'Polished Metal',
    features: ['Titanium Core', 'Ultra-Slim Profile', 'Easy-Lock Mechanism'],
    isHeelKit: true,
    heelType: 'stiletto' as HeelType,
    compatibleWith: ['1', '2', '3'],
    colors: [
      { name: 'Rose Gold', hex: '#E0C0B0', image: 'https://pashionfootwear.com/cdn/shop/files/RoseGoldMetallicStiletto4_636451a2-a3ad-4d98-92cf-b94ffb054bd4.webp?v=1756256706&width=700' },
      { name: 'Merlot', hex: '#7F1734', image: 'https://pashionfootwear.com/cdn/shop/files/MerlotStiletto4.webp?v=1748476072&width=700' },
      { name: 'Limoncello', hex: '#F5F5A7', image: 'https://pashionfootwear.com/cdn/shop/files/Limoncello4s.webp?v=1740433531&width=700' },
      { name: 'Baby Blue', hex: '#89CFF0', image: 'https://pashionfootwear.com/cdn/shop/files/Baby_Blue_Stiletto_4.webp?v=1748467817&width=700' },
      { name: 'Pink', hex: '#FFC0CB', image: 'https://pashionfootwear.com/cdn/shop/files/PinkStiletto4.webp?v=1748476921&width=700' }
    ]
  },
  {
    id: 'kit-2',
    name: 'The Architectural Block Kit',
    price: 35,
    description: 'Geometric 8cm block heel providing maximum stability without compromising on contemporary design.',
    image: 'https://pashionfootwear.com/cdn/shop/files/BlackWoodBlock4_1.webp?v=1748469097&width=700',
    baseColor: 'Beige',
    material: 'Suede Wrap',
    features: ['Wide Stability Base', 'Shock Absorbent', 'Featherlight'],
    isHeelKit: true,
    heelType: 'block' as HeelType,
    compatibleWith: ['1', '2', '3'],
    colors: [
      { name: 'Black Wood', hex: '#2C2C2C', image: 'https://pashionfootwear.com/cdn/shop/files/BlackWoodBlock4_1.webp?v=1748469097&width=700' },
      { name: 'Light Wood', hex: '#F5DEB3', image: 'https://pashionfootwear.com/cdn/shop/files/LightWood4b_1.webp?v=1748530340&width=700' },
      { name: 'Sand Wood', hex: '#DEB887', image: 'https://pashionfootwear.com/cdn/shop/files/SandWood4b_e81e4206-1613-425f-bfe0-4b17c5ce2bf7.webp?v=1748529411&width=700' }
    ]
  },
  {
    id: 'kit-3',
    name: 'The Flat Conversion Kit',
    price: 25,
    description: 'Transform any pair into elegant flats in seconds. Anti-slip sole with ergonomic arch support.',
    image: 'https://pashionfootwear.com/cdn/shop/products/FlatCapsCoal_front.webp?v=1668809126&width=700',
    baseColor: 'Black',
    material: 'Premium Rubber',
    features: ['Ergonomic Arch Support', 'Anti-Slip Sole', 'Ultra-Portable'],
    isHeelKit: true,
    heelType: 'flat' as HeelType,
    compatibleWith: ['1', '2', '3'],
    colors: [
      { name: 'Coal', hex: '#1A1A1A', image: 'https://pashionfootwear.com/cdn/shop/products/FlatCapsCoal_front.webp?v=1668809126&width=700' },
      { name: 'Tan', hex: '#D2B48C', image: 'https://pashionfootwear.com/cdn/shop/products/FlatCapsTan_front.webp?v=1668809165&width=700' }
    ]
  },
  {
    id: 'kit-4',
    name: 'Dainty Block Heels Kit',
    price: 40,
    description: 'A more delicate 6cm block heel designed for a refined, subtle lift while maintaining all-day comfort.',
    image: 'https://pashionfootwear.com/cdn/shop/files/CherryMochaBowCharmBlock3.webp?v=1761413756&width=700',
    baseColor: 'Ivory',
    material: 'Smooth Leather',
    features: ['Low-Profile Stability', 'Ergonomic Arch Support', 'Quick-Snap Tech'],
    isHeelKit: true,
    heelType: 'block' as HeelType,
    compatibleWith: ['1', '2', '3'],
    colors: [
      { name: 'Cherry Mocha Bow', hex: '#6B3E2E', image: 'https://pashionfootwear.com/cdn/shop/files/CherryMochaBowCharmBlock3.webp?v=1761413756&width=700' },
      { name: 'Ivory Pear', hex: '#F5F5F0', image: 'https://pashionfootwear.com/cdn/shop/files/IvoryPearCharmBlock3_1.webp?v=1748475871&width=700' },
      { name: 'Ivory Bee', hex: '#FDF5E6', image: 'https://pashionfootwear.com/cdn/shop/files/IvoryBeeCharmBlock3back.webp?v=1769804524&width=700' },
      { name: 'Ivory Seashell', hex: '#FAFAD2', image: 'https://pashionfootwear.com/cdn/shop/files/Ivory_Linen_Gold_Seashell_Block_3_1.webp?v=1756845844&width=700' }
    ]
  },
  {
    id: 'kit-5',
    name: 'Embroidery Block Kits',
    price: 45,
    description: 'Intricately stitched floral patterns and artisanal embroidery details on a stable 8cm block heel.',
    image: 'https://pashionfootwear.com/cdn/shop/files/WhiteDaisyEmbroideryBlock3.webp?v=1772187258&width=700',
    baseColor: 'Multi',
    material: 'Embroidered Textile',
    features: ['Artisanal Stitching', 'Reinforced Structure', 'Limited Edition Design'],
    isHeelKit: true,
    heelType: 'block' as HeelType,
    compatibleWith: ['1', '2', '3'],
    colors: [
      { name: 'White Daisy', hex: '#FFFFFF', image: 'https://pashionfootwear.com/cdn/shop/files/WhiteDaisyEmbroideryBlock3.webp?v=1772187258&width=700' },
      { name: 'Coal Daisy', hex: '#1A1A1A', image: 'https://pashionfootwear.com/cdn/shop/files/CoalDaisyEmbroideryBlock3back.webp?v=1769801325&width=700' },
      { name: 'Mint Daisy', hex: '#98FF98', image: 'https://pashionfootwear.com/cdn/shop/files/MintDaisyEmbroideryBlock3back.webp?v=1769800557&width=700' }
    ]
  },
  {
    id: 'kit-6',
    name: 'Thick Flat Heels Kit',
    price: 30,
    description: 'Durable, high-traction flat heel kit with a thicker profile for enhanced durability and comfort on varied surfaces.',
    image: 'https://pashionfootwear.com/cdn/shop/files/BlackWoodBlock1.5_1.webp?v=1748468934&width=700',
    baseColor: 'Black',
    material: 'Reinforced Composite',
    features: ['High-Traction Tread', 'Shock-Absorbing Core', 'Extra Durable Construction'],
    isHeelKit: true,
    heelType: 'flat' as HeelType,
    compatibleWith: ['1', '2', '3'],
    colors: [
      { name: 'Black Wood', hex: '#1A1A1A', image: 'https://pashionfootwear.com/cdn/shop/files/BlackWoodBlock1.5_1.webp?v=1748468934&width=700' },
      { name: 'Latte', hex: '#E3D2C3', image: 'https://pashionfootwear.com/cdn/shop/files/LatteBlock1.5.webp?v=1748475489&width=700' },
      { name: 'White', hex: '#FFFFFF', image: 'https://pashionfootwear.com/cdn/shop/files/White_Block_1.5.webp?v=1769116531&width=700' }
    ]
  }
];

export const AVAILABLE_VOUCHERS = [
  {
    id: 'v1',
    code: 'WELCOME15',
    discount: 15,
    type: 'percentage' as const,
    description: 'Get 15% OFF your first purchase with no minimum spend.',
    minSpend: 0
  },
  {
    id: 'v2',
    code: 'STYLE50',
    discount: 50,
    type: 'fixed' as const,
    description: 'RM50 OFF on orders above RM400. Elevate your collection.',
    minSpend: 400
  },
  {
    id: 'v3',
    code: 'FREESHIP',
    discount: 15,
    type: 'fixed' as const,
    description: 'RM15 OFF standard shipping. Applied as shipping credit.',
    minSpend: 200
  }
];

export const REVIEWS = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    role: 'Fashion Consultant',
    content: 'Literally a life saver. I can walk into a meeting in stilettos and walk out in flats. The mechanism is so smooth and sturdy.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    author: 'Elena Rodriguez',
    role: 'Wedding Photographer',
    content: 'I shoot weddings for 10 hours straight. These shoes are the only way I can stay on my feet while still looking professional.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    author: 'Michelle Wong',
    role: 'Tech Executive',
    content: 'The archival scanning for fit is genius. First time I\'ve bought shoes online that didn\'t require a break-in period.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  }
];
