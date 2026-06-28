import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const mailtoUrl = "mailto:contacto@nexergy.ar?subject=Consulta%20NEXERGY%20OIL";

  const plans = [
    {
      name: 'Starter Tier',
      price: '$149',
      period: '/month',
      description: 'Ideal for initial optimization operations and data assessment.',
      features: [
        'Up to 3 connected data sources',
        'Standard Orchestrator access',
        'Next-day support response',
        'Basic Digital Twin modeling'
      ],
      buttonText: 'Subscribe Now',
      action: () => alert('Redirecting to Stripe checkout...')
    },
    {
      name: 'Professional Tier',
      price: '$499',
      period: '/month',
      description: 'Advanced features for scaling industrial operations.',
      features: [
        'Unlimited data ingestion',
        'Full Orchestrator & AI Agents workflow',
        'Priority 24/7 technical support',
        'Real-time Digital Twin optimization goals'
      ],
      buttonText: 'Subscribe Now',
      action: () => alert('Redirecting to Stripe checkout...'),
      popular: true
    },
    {
      name: 'Enterprise Solutions',
      price: 'Custom',
      period: '',
      description: 'Full-scale multi-plant autonomy and dedicated architectural design.',
      features: [
        'Tailored AI Agent development',
        'On-premise / Multi-cloud deployment architecture',
        'Dedicated Solutions Engineer assigned',
        'Full operational maturity roadmap design'
      ],
      buttonText: 'Contact Sales',
      action: () => {
        window.location.href = mailtoUrl;
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container (~15% más pequeño con max-w-3xl) */}
          <motion.div
            className="relative w-full max-w-3xl bg-[#0A0E27] border border-[#00BFFF]/20 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,191,255,0.15)] z-10 overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Choose Your NEXERGY OIL Plan
              </h2>
              <p className="text-sm text-gray-400">
                Unlock autonomous industrial intelligence tailored to your operational scale.
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl p-5 border transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[rgba(0,191,255,0.03)] border-[#00BFFF]/40 shadow-[0_0_20px_rgba(0,191,255,0.05)]'
                      : 'bg-white/[0.01] border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}

                  <div className="mb-4">
                    <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-400 min-h-[32px] line-clamp-2">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{plan.price}</span>
                    <span className="text-xs text-gray-500">{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={plan.action}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : plan.name === 'Enterprise Solutions'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                        : 'bg-zinc-800 text-gray-200 hover:bg-zinc-700'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
