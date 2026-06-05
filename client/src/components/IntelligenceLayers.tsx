import { motion } from 'framer-motion';
import { Zap, Brain, Cpu, Microscope, Shield } from 'lucide-react';

interface IntelligenceLayer {
  id: string;
  name: string;
  metrics: string[];
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  description: string;
  href?: string;
}

const layers: IntelligenceLayer[] = [
  {
    id: 'industrial',
    name: 'NEXERGY INDUSTRIAL',
    metrics: ['Uptime', 'Efficiency', 'Downtime'],
    icon: <Cpu className="w-8 h-8" />,
    color: '#00BFFF',
    glowColor: 'rgba(0, 191, 255, 0.5)',
    description: 'Predictive maintenance and industrial optimization',
  },
  {
    id: 'energy',
    name: 'NEXERGY ENERGY',
    metrics: ['Efficiency', 'Consumption', 'Sustainability'],
    icon: <Zap className="w-8 h-8" />,
    color: '#00FF7F',
    glowColor: 'rgba(0, 255, 127, 0.5)',
    description: 'Energy efficiency and operational energy intelligence',
  },
  {
    id: 'agents',
    name: 'NEXERGY AGENTS',
    metrics: ['Autonomy', 'Actions', 'Decisions'],
    icon: <Brain className="w-8 h-8" />,
    color: '#C800FF',
    glowColor: 'rgba(200, 0, 255, 0.5)',
    description: 'AI operational orchestration',
  },
  {
    id: 'digital-twin',
    name: 'NEXERGY DIGITAL TWIN',
    metrics: ['Prediction', 'Scenarios', 'Simulation'],
    icon: <Microscope className="w-8 h-8" />,
    color: '#00FFFF',
    glowColor: 'rgba(0, 255, 255, 0.5)',
    description: 'Simulation and predictive modeling',
  },
  {
    id: 'labs',
    name: 'NEXERGY LABS',
    metrics: ['Innovation', 'Research', 'Emerging'],
    icon: <Shield className="w-8 h-8" />,
    color: '#FF00FF',
    glowColor: 'rgba(255, 0, 255, 0.5)',
    description: 'Governance, AI integrity and R&D',
  },
];

export default function IntelligenceLayers() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#0a0e27]" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Intelligence</span>
            <span className="text-neon-blue"> Layers</span>
          </h2>
          <p className="text-gray-400 text-lg">Modular AI capabilities designed for NEXERGY OIL operational intelligence</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {layers.map((layer) => {
            const CardContent = (
              <div
                className="h-full p-6 rounded-lg border-2 bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                style={{
                  borderColor: layer.color,
                  boxShadow: `0 0 20px ${layer.glowColor}`,
                }}
              >
                <div
                  className="mb-4 p-3 rounded-lg inline-block group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: layer.glowColor }}
                >
                  <div style={{ color: layer.color }}>{layer.icon}</div>
                </div>

                <h3 className="text-sm font-bold mb-2 text-white group-hover:text-neon-blue transition-colors leading-tight">
                  {layer.name}
                </h3>

                <p className="text-xs text-gray-400 mb-4 leading-relaxed">{layer.description}</p>

                <div className="space-y-2">
                  {layer.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">• {metric}</span>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded"
                        style={{
                          color: layer.color,
                          backgroundColor: layer.glowColor,
                        }}
                      >
                        {Math.floor(Math.random() * 40 + 60)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );

            return (
              <motion.div key={layer.id} variants={itemVariants} className="h-full">
                {layer.href ? (
                  <a 
                    href={layer.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block h-full no-underline"
                  >
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
