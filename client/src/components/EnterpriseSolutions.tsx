import { motion } from 'framer-motion';
import { TrendingUp, Lightbulb, Zap, BarChart3, Search, Code, Rocket, GraduationCap } from 'lucide-react';

interface SolutionCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

interface MethodologyStep {
  id: number;
  title: string;
  icon: React.ReactNode;
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
    description: 'Estructuramos los flujos de datos de su empresa para generar información estratégica que se traduzca en una ventaja competitiva. Mapeamos y optimizamos el conocimiento interno, mejorando la toma de decisiones e impulsando la innovación. Con un enfoque basado en datos y evidencia, ofrecemos soluciones prácticas y personalizadas que facilitan el acceso a información relevante, maximizando los resultados y aportando valor al proceso de toma de decisiones.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: '#00FFFF',
    glowColor: 'rgba(0, 255, 255, 0.5)',
  },
];

const methodologySteps: MethodologyStep[] = [
  { id: 1, title: 'Inmersión y diagnóstico', icon: <Search className="w-6 h-6" /> },
  { id: 2, title: 'Desarrollando soluciones innovadoras', icon: <Code className="w-6 h-6" /> },
  { id: 3, title: 'Prototipado e implementación', icon: <Rocket className="w-6 h-6" /> },
  { id: 4, title: 'Transferencia de conocimiento y autonomía', icon: <GraduationCap className="w-6 h-6" /> },
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
    <section className="py-24 px-4 relative overflow-hidden bg-[#0a0e27]" id="enterprise-solutions">
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
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Soluciones integrales de transformación digital para empresas de nivel empresarial, diseñadas para maximizar eficiencia y competitividad.
          </p>
        </motion.div>

        {/* Solutions grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {solutions.map((solution) => (
            <motion.div key={solution.id} variants={cardVariants} className="relative group">
              {/* Solution card */}
              <div
                className="p-8 rounded-2xl border border-[#00BFFF]/20 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm transition-all duration-300 hover:border-[#00BFFF]/50 hover:bg-[rgba(255,255,255,0.05)] h-full flex flex-col"
                style={{
                  boxShadow: `0 0 30px rgba(0, 191, 255, 0.05)`,
                }}
              >
                {/* Icon */}
                <div
                  className="mb-6 p-4 rounded-xl inline-block w-fit"
                  style={{ backgroundColor: solution.glowColor }}
                >
                  <div style={{ color: solution.color }}>{solution.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#00BFFF] transition-colors">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed flex-grow text-sm md:text-base">
                  {solution.description}
                </p>

                {/* Hover accent */}
                <div className="mt-6 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00BFFF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Methodology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-[#00BFFF]/10"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Nuestra metodología</h3>
            <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Nuestras soluciones empresariales se centran en la transformación digital y la innovación, alineadas con las exigencias de la Industria 4.0. Operamos desde el diagnóstico hasta la implementación de soluciones personalizadas, empoderando a los equipos y garantizando la autonomía para la mejora continua, siempre basándonos en la evidencia y las prácticas innovadoras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {methodologySteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="p-6 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all duration-300 text-center h-full flex flex-col items-center">
                  <div className="mb-4 text-[#00BFFF]">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-[#00BFFF]/60 mb-2 uppercase tracking-widest">Paso 0{step.id}</div>
                  <h4 className="text-white font-semibold text-sm md:text-base leading-tight">
                    {step.title}
                  </h4>
                </div>
                {index < methodologySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-[#00BFFF]/20">
                    <Zap className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
