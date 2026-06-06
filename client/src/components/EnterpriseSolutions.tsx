import { motion } from "framer-motion";
import {
  TrendingUp,
  Lightbulb,
  Zap,
  BarChart3,
  Search,
  Code,
  Rocket,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SolutionCard {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

interface MethodologyStep {
  id: number;
  title: string;
  icon: LucideIcon;
}

/* -----------------------------
   DATA
------------------------------*/

const solutions: SolutionCard[] = [
  {
    id: 1,
    title: "Digital Maturity Assessment",
    description:
      "Precise diagnostic of technological readiness and operational gaps for Industry 4.0.",
    icon: TrendingUp,
    color: "#00BFFF",
    glowColor: "rgba(0, 191, 255, 0.15)",
  },
  {
    id: 2,
    title: "Strategic Roadmaps",
    description:
      "Custom digital transformation plans designed to integrate disruptive technologies.",
    icon: Lightbulb,
    color: "#00FF7F",
    glowColor: "rgba(0, 255, 127, 0.15)",
  },
  {
    id: 3,
    title: "Process Alignment & Optimization",
    description:
      "Streamlining organizational workflows to achieve maximum operational efficiency.",
    icon: Zap,
    color: "#C800FF",
    glowColor: "rgba(200, 0, 255, 0.15)",
  },
  {
    id: 4,
    title: "Data-Driven Decision Making",
    description:
      "We transform internal data into strategic assets for innovation and competitiveness.",
    icon: BarChart3,
    color: "#00FFFF",
    glowColor: "rgba(0, 255, 255, 0.15)",
  },
];

const methodologySteps: MethodologyStep[] = [
  { id: 1, title: "Discovery & Diagnosis", icon: Search },
  { id: 2, title: "Solution Design", icon: Code },
  { id: 3, title: "Implementation", icon: Rocket },
  { id: 4, title: "Knowledge Transfer", icon: GraduationCap },
];

/* -----------------------------
   COMPONENT
------------------------------*/

export default function EnterpriseSolutions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const viewport = { once: true, amount: 0.2 };

  return (
    <section
      id="enterprise-solutions"
      className="py-24 px-4 bg-[#0a0e27] text-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise Solutions
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Comprehensive digital transformation to power enterprise efficiency
            and competitiveness.
          </p>
        </motion.div>

        {/* SOLUTIONS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <motion.article
                key={solution.id}
                variants={itemVariants}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col h-full transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
                style={{
                  boxShadow: `0 0 30px ${solution.glowColor}`,
                }}
                aria-label={solution.title}
              >
                {/* ICON */}
                <div
                  className="mb-6 p-4 rounded-xl w-fit"
                  style={{ backgroundColor: solution.glowColor }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: solution.color }}
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">
                  {solution.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed flex-grow">
                  {solution.description}
                </p>

                {/* HOVER LINE */}
                <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* METHODOLOGY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8 }}
          className="border-t border-white/10 pt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Execution Roadmap
            </h3>

            <p className="text-gray-400 max-w-3xl mx-auto">
              Bridging strategy and execution through structured digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {methodologySteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === methodologySteps.length - 1;

              return (
                <div key={step.id} className="relative text-center">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full flex flex-col items-center">
                    <Icon className="w-6 h-6 text-cyan-400 mb-4" />

                    <div className="text-xs font-bold text-cyan-400/60 mb-2 uppercase tracking-widest">
                      Step {String(step.id).padStart(2, "0")}
                    </div>

                    <h4 className="text-white font-semibold text-sm md:text-base">
                      {step.title}
                    </h4>
                  </div>

                  {!isLast && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-cyan-400/20">
                      <Zap className="w-6 h-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
