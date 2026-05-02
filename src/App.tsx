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
import { CartDrawer } from './components/CartDrawer';
import { StoreProvider } from './context';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page);
    if (id) setSelectedProductId(id);
  };

  return (
    <StoreProvider>
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gold-accent selection:text-white">
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
            
            {currentPage === 'detail' && (
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductDetail productId={selectedProductId || '1'} />
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
          </AnimatePresence>
        </main>

        {currentPage !== 'checkout' && <Footer />}
        <Chatbot />
        <CartDrawer onCheckout={() => handleNavigate('checkout')} />
      </div>
    </StoreProvider>
  );
}
