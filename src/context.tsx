/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { Product, FootScanData, CartItem, HeelType, Voucher } from './types';

interface StoreContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (p: Product, size: number, color: string, heel: HeelType) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  userScanData: FootScanData | null;
  setUserScanData: (d: FootScanData) => void;
  clearCart: () => void;
  claimedVouchers: Voucher[];
  claimVoucher: (v: Voucher) => void;
  appliedVoucher: Voucher | null;
  applyVoucher: (v: Voucher | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userScanData, setUserScanData] = useState<FootScanData | null>(null);
  const [claimedVouchers, setClaimedVouchers] = useState<Voucher[]>([]);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  const claimVoucher = (voucher: Voucher) => {
    setClaimedVouchers(prev => {
      if (prev.find(v => v.id === voucher.id)) return prev;
      return [...prev, voucher];
    });
  };

  const applyVoucher = (voucher: Voucher | null) => {
    setAppliedVoucher(voucher);
  };

  const addToCart = (product: Product, size: number, color: string, heel: HeelType) => {
    const cartId = `${product.id}-${size}-${color}-${heel}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => 
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const itemPrice = product.heelPrices ? product.heelPrices[heel] : product.price;
      return [...prev, { ...product, price: itemPrice, cartId, selectedSize: size, selectedColor: color, selectedHeel: heel, quantity: 1 }];
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{ 
      cart, 
      isCartOpen, 
      setIsCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      userScanData, 
      setUserScanData,
      clearCart,
      claimedVouchers,
      claimVoucher,
      appliedVoucher,
      applyVoucher
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
