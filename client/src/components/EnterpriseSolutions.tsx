import { motion } from 'framer-motion';
import { TrendingUp, Lightbulb, Zap, BarChart3 } from 'lucide-react';

interface SolutionCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const solutions: SolutionCard[] = [
  {
    id: 1,
    title: 'Evaluación de la madurez digital',
    description: 'Diagnóstico preciso del nivel tecnológico y brechas operativas para la Industria 4.0.',
    icon: <TrendingUp className="w-8 h-8" />,
    color: '#00BFFF',
    glowColor: 'rgba(0, 191, 255, 0.5)',
  },
  {
    id: 2,
    title: 'Hojas de ruta estratégicas',
    description: 'Planes de transformación digital a medida, integrando tecnologías disruptivas.',
    icon: <Lightbulb className="w-8 h-8" />,
    color: '#00FF7F',
    glowColor: 'rgba(0, 255, 127, 0.5)',
  },
  {
    id: 3,
    title: 'Alineación estratégica y mejora de procesos',
    description: 'Optimización de flujos de trabajo organizativos para máxima eficiencia.',
    icon: <Zap className="w-8 h-8" />,
    color: '#C800FF',
    glowColor: 'rgba(200, 0, 255, 0.5)',
  },
  {
    id: 4,
    title: 'Procesos basados en datos',
    description: 'Implementación de modelos de inteligencia para convertir datos en conocimiento ejecutable.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: '#00FFFF',
    glowColor: 'rgba(0, 255, 255, 0.5)',
  },
];

export default function EnterpriseSolutions() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#0a0e27]" id="enterprise-solutions">
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
            <span className="text-white">Enterprise Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Soluciones integrales de transformación digital para empresas de nivel empresarial, diseñadas para maximizar eficiencia y competitividad.
          </p>
        </motion.div>

        {/* Solutions grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {solutions.map((solution) => (
            <motion.div key={solution.id} variants={cardVariants} className="relative group">
              {/* Solution card */}
              <div
                className="p-6 rounded-lg border-2 bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg h-full flex flex-col"
                style={{
                  borderColor: solution.color,
                  boxShadow: `0 0 20px ${solution.glowColor}`,
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 p-3 rounded-lg inline-block"
                  style={{ backgroundColor: solution.glowColor }}
                >
                  <div style={{ color: solution.color }}>{solution.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-neon-blue transition-colors">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 flex-grow">
                  {solution.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-4 h-1 rounded-full transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: solution.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
