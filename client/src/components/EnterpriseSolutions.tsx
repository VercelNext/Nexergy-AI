import { motion } from "framer-motion";
import {
  TrendingUp,
  Lightbulb,
  Zap,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -----------------------------
   TYPES
------------------------------*/

interface SolutionCard {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

/* -----------------------------
   DATA (CONSISTENT WITH ORCHESTRATOR)
------------------------------*/

const solutions: SolutionCard[] = [
  {
    id: 1,
    title: "Operational Maturity Assessment",
    description:
      "We evaluate your current operational landscape to identify inefficiencies, gaps, and digital readiness for transformation.",
    icon: TrendingUp,
    color: "#00BFFF",
    glowColor: "rgba(0, 191, 255, 0.15)",
  },
  {
    id: 2,
    title: "Transformation Strategy Design",
    description:
      "We define structured roadmaps aligned with business goals, integrating AI, data, and operational intelligence.",
    icon: Lightbulb,
    color: "#00FF7F",
    glowColor: "rgba(0, 255, 127, 0.15)",
  },
  {
    id: 3,
    title: "Process Optimization",
    description:
      "We redesign workflows to maximize efficiency, reduce friction, and enable scalable operations.",
    icon: Zap,
    color: "#C800FF",
    glowColor: "rgba(200, 0, 255, 0.15)",
  },
  {
    id: 4,
    title: "Data-Driven Decision Systems",
    description:
      "We transform operational data into actionable intelligence for real-time decision-making and forecasting.",
    icon: BarChart3,
    color: "#00FFFF",
    glowColor: "rgba(0, 255, 255, 0.15)",
  },
];

/* -----------------------------
   COMPONENT
------------------------------*/

export default function EnterpriseSolutions() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
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

        {/* HEADER (aligned with Orchestrator narrative) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise Intelligence Layer
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We bridge operational analysis and strategic execution to enable a
            continuous transformation cycle powered by data and AI.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {solutions.map((s) => {
            const Icon = s.icon;

            return (
              <motion.article
                key={s.id}
                variants={item}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col h-full transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
                style={{
                  boxShadow: `0 0 25px ${s.glowColor}`,
                }}
              >
                {/* ICON */}
                <div
                  className="mb-6 p-4 rounded-xl w-fit"
                  style={{ backgroundColor: s.glowColor }}
                >
                  <Icon className="w-8 h-8" style={{ color: s.color }} />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">
                  {s.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed flex-grow">
                  {s.description}
                </p>

                {/* ACCENT LINE */}
                <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
