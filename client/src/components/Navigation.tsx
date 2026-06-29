import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SubscriptionModal } from './SubscriptionModal'; // Importamos el nuevo modal

interface NavItem {
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'Enterprise Solutions', id: 'enterprise-solutions' },
  { label: 'Orchestrator', id: 'orchestrator' },
  { label: 'Data Ingestion', id: 'analytics' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal de suscripción
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClasses = isScrolled
    ? 'bg-[rgba(10,14,39,0.95)] backdrop-blur-md border-b border-[#00BFFF]/20'
    : 'bg-transparent';

  // Mailto estructurado con Asunto para el Header
  const mailtoUrl = "mailto:contacto@nexergy.ar?subject=Consulta%20NEXERGY%20OIL";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer' }}
          >
            <div className="text-2xl font-bold text-white">
              NEXERGY
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-neon-blue bg-[rgba(0,191,255,0.1)]'
                      : 'text-gray-400 hover:text-neon-blue'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Botón de Suscripción "Join" Desktop */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] text-sm"
            >
              Join
            </button>

            {/* Botón de Contacto Desktop Nativo Mailto */}
            <a
              href={mailtoUrl}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white font-medium rounded-lg border border-zinc-800 transition-all duration-200 text-sm"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[rgba(0,191,255,0.1)] text-neon-blue"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Open */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-[rgba(10,14,39,0.95)] border-t border-[#00BFFF]/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-neon-blue bg-[rgba(0,191,255,0.1)]'
                        : 'text-gray-400 hover:text-neon-blue'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* Botones de Acción Mobile */}
              <div className="grid grid-cols-1 gap-2 px-4 pb-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full text-center block px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold rounded-lg text-sm"
                >
                  Join
                </button>
                <a
                  href={mailtoUrl}
                  className="w-full text-center block px-4 py-2 bg-zinc-900 border border-zinc-800 text-gray-300 font-medium rounded-lg text-sm"
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Renderizado global del modal controlado por estado */}
      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
