import React, { useState, useEffect } from 'react';
import { Calculator, BookOpen, Clock, Zap, Check, ArrowRight, Users, Award, Shield, Star, MessageCircle, GraduationCap, FileText, PenTool, BookOpenCheck, Target, TrendingUp } from 'lucide-react';

interface PricingState {
  discipline: 'tech' | 'non-tech';
  pages: number;
  urgency: '48h' | '1w' | '1m';
  baseRate: number;
  finalPrice: number;
}

export default function PricingCalculator() {
  const [pricing, setPricing] = useState<PricingState>({
    discipline: 'tech',
    pages: 5,
    urgency: '1m',
    baseRate: 15,
    finalPrice: 75
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // Pricing calculation logic
  const calculatePrice = (discipline: string, pages: number, urgency: string) => {
    const baseRates = { tech: 15, 'non-tech': 8 };
    const urgencyMultipliers = { '48h': 1.5, '1w': 1.25, '1m': 1 };
    
    let rate = baseRates[discipline as keyof typeof baseRates];
    
    // Volume discounts
    if (pages > 10) rate *= 0.95;
    if (pages > 20) rate *= 0.90;
    if (pages > 30) rate *= 0.85;
    
    const multiplier = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers];
    return Math.round(rate * pages * multiplier);
  };

  // Update pricing when any parameter changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    
    const newPrice = calculatePrice(pricing.discipline, pricing.pages, pricing.urgency);
    setPricing(prev => ({ ...prev, finalPrice: newPrice }));
    
    return () => clearTimeout(timer);
  }, [pricing.discipline, pricing.pages, pricing.urgency]);

  const handleDisciplineChange = (discipline: 'tech' | 'non-tech') => {
    setPricing(prev => ({ ...prev, discipline }));
  };

  const handlePagesChange = (pages: number) => {
    setPricing(prev => ({ ...prev, pages }));
  };

  const handleUrgencyChange = (urgency: '48h' | '1w' | '1m') => {
    setPricing(prev => ({ ...prev, urgency }));
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels = {
      '48h': '48 Hours (+50%)',
      '1w': '1 Week (+25%)',
      '1m': '1 Month (Standard)'
    };
    return labels[urgency as keyof typeof labels];
  };

  const handleWhatsAppClick = () => {
    // Contact through WeChat only
    alert('Please scan the WeChat QR code to contact us');
  };

  const generateOrderMessage = () => {
    const disciplineLabel = pricing.discipline === 'tech' ? 'Technical (STEM, Engineering, IT, Math)' : 'Non-Technical (Arts, Business, Literature, History)';
    const urgencyLabel = getUrgencyLabel(pricing.urgency).replace(' (+50%)', '').replace(' (+25%)', '').replace(' (Standard)', '');
    const baseRate = pricing.discipline === 'tech' ? 15 : 8;
    const urgencyMultiplier = pricing.urgency === '48h' ? 1.5 : pricing.urgency === '1w' ? 1.25 : 1;
    const volumeDiscount = pricing.pages > 30 ? 15 : pricing.pages > 20 ? 10 : pricing.pages > 10 ? 5 : 0;
    
    return `🎓 *GIANT WRITERS - ORDER REQUEST*`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Rest of the JSX code... */}
    </div>
  );
}