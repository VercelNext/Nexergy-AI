import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, Zap, BarChart3, Cpu } from 'lucide-react';

interface OrchestratorStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const steps: OrchestratorStep[] = [
  {
    id: 1,
    title: 'Data Ingestion',
    description: 'Connect operational sources',
    icon: <Database className="w-8 h-8" />,
    color: '#00BFFF',
    glowColor: 'rgba(0, 191, 255, 0.5)',
  },
  {
    id: 2,
    title: 'AI Analysis',
    description: 'Process and understand',
    icon: <Brain className="w-8 h-8" />,
    color: '#00FF7F',
    glowColor: 'rgba(0, 255, 127, 0.5)',
  },
  {
    id: 3,
    title: 'Digital Twin',
    description: 'Simulate & Optimize',
    icon: <Zap className="w-8 h-8" />,
    color: '#C800FF',
    glowColor: 'rgba(200, 0, 255, 0.5)',
  },
  {
    id: 4,
    title: 'Risk & Efficiency',
    description: 'Evaluate outcomes',
    icon: <BarChart3 className="w-8 h-8" />,
    color: '#00FFFF',
    glowColor: 'rgba(0, 255, 255, 0.5)',
  },
  {
    id: 5,
    title: 'Business Unit',
    description: 'Activate intelligence',
    icon: <Cpu className="w-8 h-8" />,
    color: '#FF00FF',
    glowColor: 'rgba(255, 0, 255, 0.5)',
  },
];

export default function OperationalOrchestrator() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#0a0e27]" id="orchestrator">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-blue">Operational</span>
            <span className="text-white"> Orchestrator</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            NEXERGY The operational layer activates the necessary assistance agents for your digital twin modeling.
          </p>
        </motion.div>

        {/* Orchestrator flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          {steps.map((step, index) => (
            <motion.div key={step.id} variants={stepVariants} className="relative">
              {/* Step card */}
              <div
                className="p-6 rounded-lg border-2 bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg group"
                style={{
                  borderColor: step.color,
                  boxShadow: `0 0 20px ${step.glowColor}`,
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 p-3 rounded-lg inline-block"
                  style={{ backgroundColor: step.glowColor }}
                >
                  <div style={{ color: step.color }}>{step.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-neon-blue transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400">{step.description}</p>

                {/* Step number */}
                <div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: step.glowColor,
                    color: step.color,
                  }}
                >
                  {step.id}
                </div>
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:flex absolute top-1/2 -right-8 transform -translate-y-1/2 z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6 text-neon-blue" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
