import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground />

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main headline */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-tight">
            <span className="text-neon-blue">NEXERGY</span>
            <span className="text-white"> OIL</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-bold tracking-wider">
            Operational Intelligence Layer
          </p>
        </motion.div>

        {/* Removed CTA Buttons as per instructions to centralize contact button in header */}
      </motion.div>
    </section>
  );
}
