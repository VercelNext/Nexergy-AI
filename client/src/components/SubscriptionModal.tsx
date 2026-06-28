import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, MessageSquare, CreditCard, Shield } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const plans = [
    {
      name: 'Starter / Pilot',
      price: 'Contact Us',
      description: 'Evaluate the platform capabilities in controlled environments or initial assets.',
      features: [
        'Access to core connectors (Cloudflare D1/R2)',
        'Initial digital maturity assessment',
        'Up to 2 active autonomous agents',
        'Standard email support (24-48h)'
      ],
      buttonText: 'Contact Sales',
      buttonIcon: MessageSquare,
      isStripe: false,
      popular: false,
      action: () => window.location.href = 'mailto:contacto@nexergy.ar?subject=Inquiry: Starter / Pilot Plan - Nexergy'
    },
    {
      name: 'Scale Pro',
      price: '$299',
      period: '/month',
      description: 'Advanced optimization of energy vectors and scalable operational intelligence.',
      features: [
        'Full Digital Twin architecture integration',
        'Real-time multi-vector orchestration',
        'Unlimited agents with specialized execution skills',
        'Automated post-performance analytics report',
        '24/7 priority support from senior engineers'
      ],
      buttonText: 'Subscribe with Stripe',
      buttonIcon: CreditCard,
      isStripe: true,
      popular: true,
      action: () => {
        // TODO: Develop and integrate Stripe Checkout gateway
        alert('Connecting to Stripe gateway... (Coming Soon)');
      }
    },
    {
      name: 'Enterprise Solutions',
      price: 'Tailored',
      description: 'Dedicated industrial architecture designed for corporations with critical assets.',
      features: [
        'Dedicated deployment or hybrid infrastructure',
        'Custom-tailored Artificial Intelligence models',
        'Strict SLA guarantees signed by Optinex SAS',
        'On-site Industry 4.0 maturity consultancy'
      ],
      buttonText: 'Contact Enterprise',
      buttonIcon: MessageSquare,
      isStripe: false,
      popular: false,
      action: () => window.location.href = 'mailto:contacto@nexergy.ar?subject=Inquiry: Enterprise Solutions - Nexergy'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Background glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-400" />
                  Select your Nexergy Plan
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Accelerate your energy transition and operational intelligence layer.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plans Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/40">
              {plans.map((plan, index) => {
                const Icon = plan.buttonIcon;
                return (
                  <div
                    key={index}
                    className={`relative flex flex-col p-6 rounded-xl border transition-all duration-200 ${
                      plan.popular
                        ? 'bg-slate-900/80 border-blue-500/50 shadow-blue-500/5'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Popular/Recommended Tag for the central plan */}
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      <p className="mt-2 text-xs text-slate-400 min-h-[32px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing Section */}
                    <div className="mb-6 flex items-baseline text-white">
                      <span className="text-3xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="ml-1 text-sm font-semibold text-slate-400">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <button
                      onClick={plan.action}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-all duration-200 ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {plan.buttonText}
                      {plan.popular && <ArrowRight className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Footer Notice */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>All operations under terms and security guidelines of</span>
              <span className="font-semibold text-slate-300">Optinex SAS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
