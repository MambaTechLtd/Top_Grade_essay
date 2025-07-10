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
    const orderDetails = generateOrderMessage();
    const encodedMessage = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/254717001076?text=${encodedMessage}`, '_blank');
  };

  const generateOrderMessage = () => {
    const disciplineLabel = pricing.discipline === 'tech' ? 'Technical (STEM, Engineering, IT, Math)' : 'Non-Technical (Arts, Business, Literature, History)';
    const urgencyLabel = getUrgencyLabel(pricing.urgency).replace(' (+50%)', '').replace(' (+25%)', '').replace(' (Standard)', '');
    const baseRate = pricing.discipline === 'tech' ? 15 : 8;
    const urgencyMultiplier = pricing.urgency === '48h' ? 1.5 : pricing.urgency === '1w' ? 1.25 : 1;
    const volumeDiscount = pricing.pages > 30 ? 15 : pricing.pages > 20 ? 10 : pricing.pages > 10 ? 5 : 0;
    
    return `🎓 *TOP GRADE ESSAYS ONLINE - ORDER REQUEST*

📋 *ORDER DETAILS:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 Subject Category: ${disciplineLabel}
📄 Number of Pages: ${pricing.pages} pages
⏰ Delivery Timeline: ${urgencyLabel}
💰 Price per Page: $${baseRate} (base rate)
⚡ Urgency Multiplier: ×${urgencyMultiplier}
${volumeDiscount > 0 ? `🎯 Volume Discount: -${volumeDiscount}%` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 *TOTAL INVESTMENT: $${pricing.finalPrice}*
💡 Cost per page: $${(pricing.finalPrice / pricing.pages).toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *WHAT'S INCLUDED:*
• 100% Original, plagiarism-free content
• Unlimited free revisions
• 24/7 customer support
• Money-back guarantee
• Free bibliography & formatting
• Direct communication with writer

📝 *ADDITIONAL REQUIREMENTS:*
Please provide the following details:
• Specific topic/assignment title
• Academic level (High School/College/University/Masters/PhD)
• Citation style (APA/MLA/Chicago/Harvard)
• Specific instructions or requirements
• Any reference materials or sources

🚀 Ready to get started with your premium academic writing service!`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">Top Grade Essays Online</h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Your trusted partner for premium academic writing services with expert writers and guaranteed results
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-mint-400 mr-2" />
              100% Original Content
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-mint-400 mr-2" />
              Expert PhD Writers
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-mint-400 mr-2" />
              On-Time Delivery
            </div>
          </div>
        </div>

        {/* Hero Section with Educational Images */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <img 
              src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Academic books and research"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-white mb-3">Research Excellence</h3>
            <p className="text-gray-300">Our expert writers conduct thorough research using credible academic sources to ensure your papers meet the highest standards.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <img 
              src="https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Student studying with laptop"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-white mb-3">Student Success</h3>
            <p className="text-gray-300">Join thousands of successful students who have achieved their academic goals with our professional writing assistance.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <img 
              src="https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Graduation ceremony"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-white mb-3">Academic Achievement</h3>
            <p className="text-gray-300">From essays to dissertations, we help you achieve the grades you deserve with expertly crafted academic content.</p>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose Our Trusted Writing Team?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-white/10">
              <FileText className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Essays & Papers</h3>
              <p className="text-gray-300 text-sm">Custom essays, research papers, term papers, and argumentative essays crafted by subject experts.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-white/10">
              <BookOpenCheck className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Dissertations</h3>
              <p className="text-gray-300 text-sm">Comprehensive dissertation writing, thesis development, and doctoral-level research assistance.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl p-6 border border-white/10">
              <PenTool className="h-10 w-10 text-amber-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Assignments</h3>
              <p className="text-gray-300 text-sm">Homework help, case studies, lab reports, and specialized academic assignments across all subjects.</p>
            </div>
            
            <div className="bg-gradient-to-br from-mint-600/20 to-teal-600/20 rounded-xl p-6 border border-white/10">
              <Target className="h-10 w-10 text-mint-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Editing & Review</h3>
              <p className="text-gray-300 text-sm">Professional proofreading, editing, formatting, and citation assistance for your existing work.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Expert Writing Team</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-blue-400 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">500+ PhD Writers</h3>
                      <p className="text-gray-300 text-sm">Qualified experts across all academic disciplines with advanced degrees from top universities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Star className="h-6 w-6 text-amber-400 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">98% Success Rate</h3>
                      <p className="text-gray-300 text-sm">Consistently delivering high-quality work that meets or exceeds academic standards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <TrendingUp className="h-6 w-6 text-mint-400 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">10+ Years Experience</h3>
                      <p className="text-gray-300 text-sm">Decade of excellence in academic writing with thousands of satisfied students worldwide.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Professional academic writers team"
                  className="w-full h-80 object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Professional Writers</p>
                  <p className="text-sm text-gray-300">Dedicated to your academic success</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Instant Quote</h2>
            <p className="text-gray-300">Transparent pricing with no hidden fees - see exactly what you'll pay</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Left Side - Controls */}
            <div className="space-y-8">
              
              {/* Discipline Selector */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Subject Category
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleDisciplineChange('tech')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      pricing.discipline === 'tech'
                        ? 'border-amber-500 bg-amber-500/20 shadow-lg shadow-amber-500/25'
                        : 'border-gray-600 bg-gray-800/50 hover:border-amber-400'
                    }`}
                  >
                    <div className="text-center">
                      <Zap className={`h-8 w-8 mx-auto mb-2 ${
                        pricing.discipline === 'tech' ? 'text-amber-400' : 'text-gray-400'
                      }`} />
                      <div className="font-semibold text-white">Technical</div>
                      <div className="text-sm text-gray-300">STEM, Engineering, IT, Math</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleDisciplineChange('non-tech')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      pricing.discipline === 'non-tech'
                        ? 'border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/25'
                        : 'border-gray-600 bg-gray-800/50 hover:border-violet-400'
                    }`}
                  >
                    <div className="text-center">
                      <BookOpen className={`h-8 w-8 mx-auto mb-2 ${
                        pricing.discipline === 'non-tech' ? 'text-violet-400' : 'text-gray-400'
                      }`} />
                      <div className="font-semibold text-white">Non-Technical</div>
                      <div className="text-sm text-gray-300">Arts, Business, Literature, History</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Page Count Slider */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Page Count: <span className="text-blue-400">{pricing.pages}</span>
                </h3>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={pricing.pages}
                    onChange={(e) => handlePagesChange(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, ${
                        pricing.discipline === 'tech' ? '#f97316' : '#8b5cf6'
                      } 0%, ${
                        pricing.discipline === 'tech' ? '#f97316' : '#8b5cf6'
                      } ${(pricing.pages / 50) * 100}%, #374151 ${(pricing.pages / 50) * 100}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>1 page</span>
                    <span>50 pages</span>
                  </div>
                </div>
              </div>

              {/* Urgency Selector */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Delivery Timeline
                </h3>
                <div className="space-y-3">
                  {(['48h', '1w', '1m'] as const).map((urgency) => (
                    <button
                      key={urgency}
                      onClick={() => handleUrgencyChange(urgency)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        pricing.urgency === urgency
                          ? 'border-mint-500 bg-mint-500/20 shadow-lg shadow-mint-500/25'
                          : 'border-gray-600 bg-gray-800/50 hover:border-mint-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">
                            {getUrgencyLabel(urgency)}
                          </div>
                          <div className="text-sm text-gray-300">
                            {urgency === '48h' && 'Rush delivery - Perfect for urgent deadlines'}
                            {urgency === '1w' && 'Priority service - Balanced timeline'}
                            {urgency === '1m' && 'Standard timeline - Best value option'}
                          </div>
                        </div>
                        {pricing.urgency === urgency && (
                          <Check className="h-5 w-5 text-mint-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Price Display */}
            <div className="lg:pl-8">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Your Investment
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-white">
                      <span>Base Rate ({pricing.discipline}):</span>
                      <span>${pricing.discipline === 'tech' ? '15' : '8'}/page</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Pages:</span>
                      <span>{pricing.pages}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Urgency Multiplier:</span>
                      <span>
                        {pricing.urgency === '48h' && '×1.5'}
                        {pricing.urgency === '1w' && '×1.25'}
                        {pricing.urgency === '1m' && '×1.0'}
                      </span>
                    </div>
                    {pricing.pages > 10 && (
                      <div className="flex justify-between text-mint-400">
                        <span>Volume Discount:</span>
                        <span>-{pricing.pages > 30 ? '15' : pricing.pages > 20 ? '10' : '5'}%</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/20 pt-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-300 mb-2">Total Investment</div>
                      <div className={`text-4xl font-bold text-white transition-all duration-300 ${
                        isAnimating ? 'scale-110' : 'scale-100'
                      }`}>
                        ${pricing.finalPrice}
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        ${(pricing.finalPrice / pricing.pages).toFixed(2)} per page
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleWhatsAppClick}
                    className="w-full mt-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    Order Now via WhatsApp
                    <MessageCircle className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Features List */}
                <div className="mt-6 bg-white/5 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-4">What's Included</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-mint-400 mr-2" />
                      100% Original, plagiarism-free content
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-mint-400 mr-2" />
                      Unlimited free revisions
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-mint-400 mr-2" />
                      24/7 customer support
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-mint-400 mr-2" />
                      Money-back guarantee
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-mint-400 mr-2" />
                      Free bibliography & formatting
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-mint-400 mr-2" />
                      Direct communication with writer
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200" 
                  alt="Student testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-white">Sarah M.</h4>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">"Exceptional quality and delivered on time! The research paper exceeded my expectations and helped me achieve an A+ grade."</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200" 
                  alt="Student testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-white">Michael K.</h4>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">"Professional service with excellent communication. The writers are truly experts in their fields and deliver outstanding work."</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200" 
                  alt="Student testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-white">Emma L.</h4>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">"Saved my semester! Fast turnaround, original content, and the customer support team was incredibly helpful throughout."</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            <strong>Academic Integrity Notice:</strong> Our services provide reference materials and guidance only. 
            Users are responsible for ensuring proper citation and adherence to their institution's academic policies.
          </p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div 
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setShowWhatsApp(true)}
        onMouseLeave={() => setShowWhatsApp(false)}
      >
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        
        {showWhatsApp && (
          <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap animate-slide-up">
            <p className="font-semibold">Need Help? Chat with us!</p>
            <p className="text-sm text-gray-600">+254717001076</p>
          </div>
        )}
      </div>
    </div>
  );
}