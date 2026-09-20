import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  Brain,
  Zap,
  BarChart3,
  Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface OrchestratorStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

const steps: OrchestratorStep[] = [
  {
    id: 1,
    title: "Data Ingestion",
    description: "Connect operational sources",
    icon: Database,
    color: "#00BFFF",
    glowColor: "rgba(0, 191, 255, 0.4)",
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "Process and understand",
    icon: Brain,
    color: "#00FF7F",
    glowColor: "rgba(0, 255, 127, 0.4)",
  },
  {
    id: 3,
    title: "Digital Twin",
    description: "Simulate & Optimize",
    icon: Zap,
    color: "#C800FF",
    glowColor: "rgba(200, 0, 255, 0.4)",
  },
  {
    id: 4,
    title: "Risk & Efficiency",
    description: "Evaluate outcomes",
    icon: BarChart3,
    color: "#00FFFF",
    glowColor: "rgba(0, 255, 255, 0.4)",
  },
  {
    id: 5,
    title: "Business Unit Activation",
    description: "Operationalize intelligence",
    icon: Cpu,
    color: "#FF00FF",
    glowColor: "rgba(255, 0, 255, 0.4)",
  },
];

export default function OperationalOrchestrator() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="orchestrator"
      className="py-20 px-4 bg-[#0a0e27] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Agent Orchestration & Skill Layer
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            NEXERGY operational layer orchestrates intelligent agents to enable
            rapid digital twin simulation and operational optimization.
          </p>
        </motion.div>

        {/* FLOW */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="relative"
              >
                <div
                  className="p-6 rounded-lg border bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    borderColor: step.color,
                    boxShadow: `0 0 20px ${step.glowColor}`,
                  }}
                >
                  {/* ICON */}
                  <div
                    className="mb-4 p-3 rounded-lg inline-block"
                    style={{ backgroundColor: step.glowColor }}
                  >
                    <Icon
                      className="w-8 h-8"
                      style={{ color: step.color }}
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-400">
                    {step.description}
                  </p>

                  {/* STEP NUMBER */}
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

                {/* CONNECTOR */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:flex absolute top-1/2 -right-8 -translate-y-1/2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
