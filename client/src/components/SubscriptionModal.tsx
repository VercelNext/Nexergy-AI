import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Shield, Activity } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  
  const plans = [
    {
      name: "Pilot Plan",
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      description: "Ideal para validaciones iniciales de inteligencia operativa en un solo activo técnico.",
      price: "$299",
      period: "/mes",
      features: [
        "Monitoreo de 1 activo crítico",
        "Ingesta de datos básica",
        "Dashboard operativo estándar",
        "Soporte por correo electrónico"
      ],
      buttonText: "Iniciar Piloto",
      popular: false
    },
    {
      name: "Operational Intelligence",
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      description: "Conexión completa de fuentes de datos, analíticas avanzadas y optimización en tiempo real.",
      price: "$799",
      period: "/mes",
      features: [
        "Activos y fuentes ilimitadas",
        "Análisis predictivo con IA",
        "Integración de Webhooks nativos",
        "Soporte prioritario 24/7",
        "Reportes de eficiencia automatizados"
      ],
      buttonText: "Escalar Operación",
      popular: true
    },
    {
      name: "Enterprise Twin",
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      description: "Arquitectura completa de Gemelo Digital, soporte para agentes autónomos y customización punta a punta.",
      price: "Custom",
      period: "",
      features: [
        "Modelado de Gemelo Digital Completo",
        "Agentes Autónomos de Optimización",
        "Infraestructura dedicada (Cloudflare D1/R2)",
        "Acuerdo de Nivel de Servicio (SLA) corporativo",
        "Consultoría técnica e integración in-situ"
      ],
      buttonText: "Contactar Ventas",
      popular: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop / Fondo opaco difuminado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Contenedor del Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-6xl bg-zinc-950/90 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Efecto de luz de fondo */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Encabezado del Modal */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  NEXERGY <span className="text-emerald-400">OIL</span> SUBSCRIPTION
                </h2>
                <p className="text-zinc-400 mt-1 text-sm md:text-base">
                  Seleccione el nivel de Inteligencia Operativa adecuado para sus activos. Procesado por Optinex SAS vía Stripe.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grilla de Planes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col rounded-xl p-6 bg-zinc-900/60 border transition-all duration-300 hover:translate-y-[-4px] ${
                    plan.popular 
                      ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-gradient-to-b from-zinc-900/80 to-cyan-950/10' 
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 right-4 bg-cyan-500 text-black font-semibold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Recomendado
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
                      {plan.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  </div>

                  <p className="text-sm text-zinc-400 min-h-[60px]">{plan.description}</p>

                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium tracking-wide transition-all duration-200 ${
                      plan.popular
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
                        : plan.name === "Enterprise Twin"
                        ? 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                        : 'bg-emerald-500 text-black hover:bg-emerald-400'
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
};
