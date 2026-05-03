/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HeelType = 'stiletto' | 'block' | 'flat';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  baseColor: string;
  material: string;
  features: string[];
  colors: { name: string; hex: string; images?: string[]; image: string }[];
  heelPrices?: {
    stiletto: number;
    block: number;
    flat: number;
  };
  isBestseller?: boolean;
  isLimited?: boolean;
  stockCount?: number;
  isHeelKit?: boolean;
  heelType?: HeelType;
  compatibleWith?: string[];
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize: number;
  selectedColor: string;
  selectedHeel: HeelType;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FootScanData {
  length: number;
  width: number;
  archType: string;
  recommendedSize: number;
  confidence: number;
}

export interface Voucher {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  minSpend: number;
}
