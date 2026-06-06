import { motion } from 'framer-motion';
import { Database, Brain, Zap, BarChart3, Cpu, ArrowRight } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
}

const steps: Step[] = [
  { id: 1, title: 'Data Ingestion', icon: <Database className="w-8 h-8" />, color: '#00BFFF' },
  { id: 2, title: 'AI Analysis', icon: <Brain className="w-8 h-8" />, color: '#00FF7F' },
  { id: 3, title: 'Digital Twin', icon: <Zap className="w-8 h-8" />, color: '#C800FF' },
  { id: 4, title: 'Risk & Efficiency', icon: <BarChart3 className="w-8 h-8" />, color: '#00FFFF' },
  { id: 5, title: 'Business Unit', icon: <Cpu className="w-8 h-8" />, color: '#FF00FF' },
];

export default function Orchestrator() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-[#0a0e27] relative overflow-hidden" id="orchestrator">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Orchestrator & Skills Agents
          </h2>
          <div className="w-24 h-1 bg-[#00BFFF] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div key={step.id} variants={itemVariants} className="relative group">
              <div className="p-8 rounded-2xl border border-[#00BFFF]/10 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm transition-all duration-300 hover:border-[#00BFFF]/40 hover:bg-[rgba(255,255,255,0.05)] text-center h-full flex flex-col items-center justify-center">
                <div 
                  className="mb-6 p-4 rounded-xl inline-block"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}
                >
                  {step.icon}
                </div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {step.title}
                </h3>
                <div className="mt-4 text-xs font-bold opacity-30 text-white">STEP 0{step.id}</div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-[#00BFFF]/20">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
