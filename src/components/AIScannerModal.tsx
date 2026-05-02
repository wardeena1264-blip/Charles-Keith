/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useStore } from '../context';
import { getFitRecommendation } from '../lib/gemini';

interface AIScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScanStep = 'instructions' | 'camera' | 'scanning' | 'results';

export function AIScannerModal({ isOpen, onClose }: AIScannerModalProps) {
  const [scanStep, setScanStep] = useState<ScanStep>('instructions');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { setUserScanData } = useStore();

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setScanStep('camera');
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please ensure you have granted permission.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const runScan = () => {
    setScanStep('scanning');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishScan();
          return 100;
        }
        return prev + 1;
      });
    }, 30) as unknown as number;
  };

  const finishScan = async () => {
    stopCamera();
    // Simulated scan results - in a real app, this would process video frames
    const mockData = {
      length: 24.5,
      width: 9.2,
      archType: 'High Arch',
      recommendedSize: 38,
      confidence: 0.98
    };

    const recommendation = await getFitRecommendation(mockData);
    setUserScanData({ ...mockData, ...recommendation });
    setScanStep('results');
  };

  const handleClose = () => {
    stopCamera();
    setScanStep('instructions');
    setProgress(0);
    setError(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        >
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-[120]"
          >
            <X size={32} />
          </button>

          <div className="max-w-md w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            {scanStep === 'instructions' && (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3">
                  <Info size={28} className="text-black" />
                </div>
                <h3 className="serif text-3xl mb-6 italic">Preparation</h3>
                
                <div className="space-y-4 mb-10 text-left">
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="text-gold-accent font-bold">01</div>
                    <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-wider font-medium">Remove socks and footwear for precision measurement.</p>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="text-gold-accent font-bold">02</div>
                    <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-wider font-medium">Stand on a flat, hard surface with neutral lighting.</p>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="text-gold-accent font-bold">03</div>
                    <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-wider font-medium">Hold your device directly above your foot.</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-tighter">
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                <button 
                  onClick={startCamera}
                  className="w-full bg-black text-white py-5 rounded-2xl text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-gold-accent transition-all shadow-xl"
                >
                  Confirm & Start Camera
                </button>
              </div>
            )}

            {(scanStep === 'camera' || scanStep === 'scanning') && (
              <div className="relative aspect-[3/4] bg-black">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover grayscale opacity-60"
                />
                
                <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
                  <div className="w-full h-full border border-gold-accent/30 relative">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-accent" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-accent" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-accent" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-accent" />
                  </div>
                </div>

                {scanStep === 'camera' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-10 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <p className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-center">Center your foot within the frame</p>
                    <button 
                      onClick={runScan}
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-gold-accent hover:scale-110 transition-transform"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                        <div className="w-4 h-4 bg-gold-accent rounded-full animate-pulse" />
                      </div>
                    </button>
                  </div>
                )}

                {scanStep === 'scanning' && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gold-accent shadow-[0_0_20px_rgba(197,160,89,1)] animate-scan-y" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                      <div className="text-center">
                        <div className="serif text-6xl text-white italic mb-2">{progress}%</div>
                        <div className="text-gold-accent text-[9px] uppercase tracking-[0.4em] font-black">Analyzing Geometries</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {scanStep === 'results' && (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="serif text-3xl mb-2 italic">Scan Complete</h3>
                <p className="text-gray-500 text-sm mb-8 font-light">Your anatomical profile has been successfully mapped.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-6 bg-[#F8F7F5] rounded-2xl border border-border-light text-left">
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Recommended</div>
                    <div className="serif text-3xl italic">38 EU</div>
                  </div>
                  <div className="p-6 bg-[#F8F7F5] rounded-2xl border border-border-light text-left">
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Fit Accuracy</div>
                    <div className="serif text-3xl italic">98%</div>
                  </div>
                </div>

                <button 
                  onClick={handleClose}
                  className="w-full bg-black text-white py-5 rounded-2x text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-gold-accent transition-all shadow-xl"
                >
                  Apply Personal Fit
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-y {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan-y {
          animation: scan-y 2s linear infinite;
        }
      `}} />
    </AnimatePresence>
  );
}
