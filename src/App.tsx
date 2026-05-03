/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Heels } from './pages/Heels';
import { HeelKits } from './pages/HeelKits';
import { Promotions } from './pages/Promotions';
import { Catalog } from './pages/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { PromoPopup } from './components/PromoPopup';
import { StoreProvider } from './context';
import { AuthProvider } from './context/AuthContext';
import { Auth } from './pages/Auth';
import { Account } from './pages/Account';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Truck, Bell } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();

  // Scroll to top on page change or product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProductId]);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) setSelectedProductId(id);
    window.scrollTo(0, 0);
  };

  return (
    <AuthProvider>
    <StoreProvider>
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gold-accent selection:text-white">
        <PromoPopup />
        
        {/* Promo Strip */}
        <div className="bg-[#1A1A1A] py-3 relative overflow-hidden group">
          <div className="max-w-7xl mx-auto flex justify-center items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            <div className="hidden md:flex items-center gap-2 opacity-60">
              <Truck size={12} /> Free Shipping Over RM200
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-gold-accent" />
              Limited Time: 15% OFF First Purchase
            </div>
          </div>
        </div>

        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        
        <main>
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Home onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentPage === 'catalog' && (
              <motion.div
                key="catalog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Catalog onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentPage === 'heels' && (
              <motion.div
                key="heels"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Heels onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentPage === 'heel-kits' && (
              <motion.div
                key="heel-kits"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeelKits onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentPage === 'promotions' && (
              <motion.div
                key="promotions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Promotions />
              </motion.div>
            )}
            
            {currentPage === 'detail' && (
              <motion.div
                key={`detail-${selectedProductId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductDetail productId={selectedProductId || '1'} onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentPage === 'checkout' && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Checkout onBack={() => handleNavigate('home')} />
              </motion.div>
            )}

            {currentPage === 'auth' && (
              <motion.div
                key="auth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Auth onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentPage === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Account onNavigate={handleNavigate} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {currentPage !== 'checkout' && <Footer />}
        <Chatbot />
        <CartDrawer onCheckout={() => handleNavigate('checkout')} />
      </div>
    </StoreProvider>
    </AuthProvider>
  );
}
