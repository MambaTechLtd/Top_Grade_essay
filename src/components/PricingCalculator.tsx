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
    baseRate: 25,
    finalPrice: 125
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Updated pricing calculation logic
  const calculatePrice = (discipline: string, pages: number, urgency: string) => {
    const baseRates = { tech: 25, 'non-tech': 20 }; // Updated rates
    const urgencyMultipliers = { '48h': 1.5, '1w': 1.25, '1m': 1 };
    
    let rate = baseRates[discipline as keyof typeof baseRates];
    
    // 10% bonus for projects exceeding 10 pages (instead of discount)
    let bonus = 1;
    if (pages > 10) bonus = 1.1;
    
    const multiplier = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers];
    return Math.round(rate * pages * multiplier * bonus);
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

  const generateOrderMessage = () => {
    const disciplineLabel = pricing.discipline === 'tech' ? 'Technical (STEM, Engineering, IT, Math)' : 'Non-Technical (Arts, Business, Literature, History)';
    const urgencyLabel = getUrgencyLabel(pricing.urgency).replace(' (+50%)', '').replace(' (+25%)', '').replace(' (Standard)', '');
    const baseRate = pricing.discipline === 'tech' ? 25 : 20;
    const urgencyMultiplier = pricing.urgency === '48h' ? 1.5 : pricing.urgency === '1w' ? 1.25 : 1;
    const volumeBonus = pricing.pages > 10 ? 10 : 0;
    
    return `🎓 *GIANT WRITERS - ORDER REQUEST*

📋 *Order Details:*
• Subject: ${disciplineLabel}
• Pages: ${pricing.pages}
• Deadline: ${urgencyLabel}
• Total Cost: $${pricing.finalPrice}

💰 *Pricing Breakdown:*
• Base Rate: $${baseRate}/page
• Urgency Multiplier: ${urgencyMultiplier}x
• Volume Bonus: ${volumeBonus}%
• Final Price: $${pricing.finalPrice}

📞 *Next Steps:*
Please scan the WeChat QR code to discuss your requirements and confirm your order.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Giant Writers
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Premium Academic Writing Services with Expert Writers
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>100% Original Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>On-Time Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Expert Writers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Calculator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Pricing Calculator</h2>
            <p className="text-gray-300 text-lg">Get an instant quote for your academic writing project</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-8">
              {/* Discipline Selection */}
              <div>
                <label className="block text-white font-semibold mb-4 text-lg">Subject Category</label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleDisciplineChange('non-tech')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      pricing.discipline === 'non-tech'
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Non-Technical - $20/page</div>
                        <div className="text-sm opacity-75">Arts, Business, Literature, History</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleDisciplineChange('tech')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      pricing.discipline === 'tech'
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Target className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Technical - $25/page</div>
                        <div className="text-sm opacity-75">STEM, Engineering, IT, Math</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Pages Slider */}
              <div>
                <label className="block text-white font-semibold mb-4 text-lg">
                  Number of Pages: <span className="text-blue-400">{pricing.pages}</span>
                  {pricing.pages > 10 && <span className="text-green-400 ml-2">(+10% Bonus!)</span>}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={pricing.pages}
                    onChange={(e) => handlePagesChange(parseInt(e.target.value))}
                    className="slider w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>1 page</span>
                    <span>50 pages</span>
                  </div>
                </div>
              </div>

              {/* Urgency Selection */}
              <div>
                <label className="block text-white font-semibold mb-4 text-lg">Deadline</label>
                <div className="grid grid-cols-1 gap-3">
                  {(['1m', '1w', '48h'] as const).map((urgency) => (
                    <button
                      key={urgency}
                      onClick={() => handleUrgencyChange(urgency)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        pricing.urgency === urgency
                          ? 'border-green-500 bg-green-500/20 text-white'
                          : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5" />
                          <span className="font-semibold">{getUrgencyLabel(urgency)}</span>
                        </div>
                        {urgency === '48h' && <Zap className="w-5 h-5 text-yellow-400" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Price Display */}
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 text-center border border-white/10">
                <div className="mb-6">
                  <div className="text-gray-300 text-lg mb-2">Total Price</div>
                  <div className={`text-5xl font-bold text-white transition-all duration-300 ${isAnimating ? 'animate-bounce-in' : ''}`}>
                    ${pricing.finalPrice}
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-300 mb-6">
                  <div className="flex justify-between">
                    <span>Base Rate:</span>
                    <span>${pricing.discipline === 'tech' ? '25' : '20'}/page</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pages:</span>
                    <span>{pricing.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgency:</span>
                    <span>{getUrgencyLabel(pricing.urgency)}</span>
                  </div>
                  {pricing.pages > 10 && (
                    <div className="flex justify-between text-green-400">
                      <span>Volume Bonus:</span>
                      <span>+10%</span>
                    </div>
                  )}
                  <hr className="border-gray-600" />
                  <div className="flex justify-between font-semibold text-white">
                    <span>Total:</span>
                    <span>${pricing.finalPrice}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                    <Check className="w-4 h-4" />
                    <span>Free Revisions Included</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-blue-400 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Plagiarism-Free Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section with WeChat QR Code */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Contact Us via WeChat</h3>
            <p className="text-gray-300 text-lg mb-8">Scan the QR code below to get started with your order</p>
            
            {/* WeChat QR Code */}
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-2xl shadow-2xl">
                <img 
                  src="/wechat-qr copy.jpg" 
                  alt="WeChat Contact QR Code" 
                  className="w-64 h-64 mx-auto rounded-lg"
                />
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8">
              <h4 className="text-xl font-semibold text-white mb-4">Our Pricing Structure</h4>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Non-Technical Writing:</span>
                    <span className="text-white font-semibold">$20/page</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Technical Writing:</span>
                    <span className="text-white font-semibold">$25/page</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Volume Bonus (10+ pages):</span>
                    <span className="text-green-400 font-semibold">+10%</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Rush Orders (48h):</span>
                    <span className="text-yellow-400 font-semibold">+50%</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Professional academic writing services • Expert writers • On-time delivery • 100% original content
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose Giant Writers?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We deliver exceptional academic writing services with a commitment to quality, originality, and timely delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Expert Writers",
              description: "Our team consists of qualified professionals with advanced degrees in various fields."
            },
            {
              icon: Shield,
              title: "100% Original",
              description: "Every paper is written from scratch and checked for plagiarism using advanced tools."
            },
            {
              icon: Clock,
              title: "Timely Delivery",
              description: "We respect deadlines and ensure your work is delivered on time, every time."
            },
            {
              icon: Award,
              title: "Quality Guarantee",
              description: "We stand behind our work with unlimited revisions until you're completely satisfied."
            },
            {
              icon: Star,
              title: "Top Grades",
              description: "Our writers are committed to helping you achieve the highest academic standards."
            },
            {
              icon: MessageCircle,
              title: "24/7 Support",
              description: "Our customer support team is available around the clock via WeChat to assist you."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive academic writing solutions for all your educational needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FileText, title: "Essays", description: "Custom essays on any topic" },
            { icon: BookOpenCheck, title: "Research Papers", description: "In-depth research and analysis" },
            { icon: GraduationCap, title: "Dissertations", description: "Comprehensive thesis writing" },
            { icon: PenTool, title: "Assignments", description: "All types of academic tasks" },
            { icon: BookOpen, title: "Case Studies", description: "Detailed case analysis" },
            { icon: Target, title: "Lab Reports", description: "Scientific and technical reports" },
            { icon: TrendingUp, title: "Business Plans", description: "Professional business documents" },
            { icon: Calculator, title: "Math Problems", description: "Complex mathematical solutions" }
          ].map((service, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">
                <service.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-300 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}