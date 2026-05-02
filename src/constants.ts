/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Margaret Signature Heel',
    price: 189,
    description: 'Expertly crafted for the modern woman, this essential stiletto combines timeless elegance with our revolutionary interchangeable heel technology.',
    image: 'https://pashionfootwear.com/cdn/shop/files/margot_coal_heel.webp?v=1756954790&width=1365',
    baseColor: 'Black',
    material: 'Premium Nappa Leather',
    features: ['Interchangeable Heel System', 'Extra Insole Cushioning', 'Anti-slip Floral Sole'],
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
      { name: 'Champagne Gold', hex: '#E2D1B3', image: 'https://images.unsplash.com/photo-1596702994230-a00ef9510f45?auto=format&fit=crop&q=80&w=800' },
      { name: 'Soft Ivory', hex: '#FDFCF6', image: 'https://images.unsplash.com/photo-1595138179431-d138168b4c12?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '2',
    name: 'Elegant Sandal with Switch-Heel',
    price: 165,
    description: 'Transition from day to night effortlessly. Our signature sandal features a versatile design that keeps you comfortable from the boardroom to the ballroom.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    baseColor: 'Beige',
    material: 'Suede Finish',
    features: ['Breathable Mesh Lining', 'Reinforced Block Option', 'Arch Support Tech'],
    colors: [
      { name: 'Sand Beige', hex: '#D2B48C', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800' },
      { name: 'Rose Dust', hex: '#BC8F8F', image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '3',
    name: 'Luxe Shimmer Strappy Mid-Heel',
    price: 210,
    description: 'Make a statement with every step. The Luxe Shimmer collection features light-reflecting materials and a cushioned base for all-night wear.',
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?auto=format&fit=crop&q=80&w=800',
    baseColor: 'Silver',
    material: 'Metallic Finish Leather',
    features: ['Lightweight Construction', 'Stable Mid-Heel Base', 'Luxurious Silk Binding'],
    colors: [
      { name: 'Silver Mist', hex: '#C0C0C0', image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?auto=format&fit=crop&q=80&w=800' },
      { name: 'Stardust Chrome', hex: '#E5E4E2', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

export const HEEL_TYPES = [
  { id: 'stiletto', name: 'Stiletto', height: '10cm', description: 'Classic and sleek for maximum elegance.' },
  { id: 'block', name: 'Block', height: '8cm', description: 'Maximum stability for all-day confidence.' },
  { id: 'flat', name: 'Flat', height: '1cm', description: 'Absolute comfort for effortless movement.' }
];
