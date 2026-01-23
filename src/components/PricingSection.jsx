import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'Basic',
      monthlyPrice: 20,
      yearlyPrice: 30,
      description: 'Specialize in delivering AI-powered solution revolutionize.',
      badge: '50% off',
      features: [
        'AI-powered tools for businesses',
        '10 hours of tech support',
        'Basic data analysis',
        'Email support',
        'Access to online resources',
        'Reporting & Tutorials',
      ],
      featured: false,
    },
    {
      id: 2,
      name: 'Pro Plan',
      monthlyPrice: 60,
      yearlyPrice: 90,
      description: 'Specialize in delivering AI-powered solution revolutionize.',
      badge: 'Popular',
      features: [
        'Everything in the Basic Plan',
        'Advanced AI solutions',
        '50 hours of tech support',
        'Customizable data dashboards',
        'Priority email & phone',
        'System optimizations',
      ],
      featured: true,
    },
    {
      id: 3,
      name: 'Premium',
      monthlyPrice: 90,
      yearlyPrice: 120,
      description: 'Specialize in delivering AI-powered solution revolutionize.',
      badge: 'Essential',
      features: [
        'Everything in the Pro Plan',
        'Tailored AI solutions',
        'Unlimited tech support',
        'Real-time analytics',
        '24/7 priority support',
        'Full system integration',
      ],
      featured: false,
    },
  ];

  return (
    <section className="section-gap bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="sub-title mb-4">
              <span>💡</span>
              Our Pricing
            </p>
            <h2 className="sec-title mb-6">
              Flexible Pricing, Powerful Tangible Results
            </h2>
            <p className="text-gray-600 mb-8">
              Specialize in delivering AI-powered solution <br /> revolutionize the businesses.
            </p>

            {/* Toggle */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  !isYearly
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  isYearly
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Yearly
              </button>
            </div>
          </motion.div>

          {/* Right Pricing Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className={`relative p-8 rounded-lg border transition-all ${
                  plan.featured
                    ? 'bg-white border-orange-500 shadow-lg scale-105'
                    : 'bg-white border-gray-200'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-6 px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <div className="text-4xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="text-lg font-normal text-gray-600">
                      {isYearly ? '/year' : '/month'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
                </div>

                <Link
                  to="/contact"
                  className="block text-center w-full mb-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Choose Package
                </Link>

                <div className="border-t pt-6">
                  <h6 className="font-bold mb-4">Included:</h6>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                        <span className="text-orange-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;