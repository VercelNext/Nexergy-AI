import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Send } from 'lucide-react';
import { ContactButton } from './ContactButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envío
    console.log('Contact form submitted:', formData);
    
    toast.success("Recibido correctamente. Activando agentes específicos para completar el flujo de trabajo hacia el Gemelo Digital", {
      duration: 5000,
    });

    setIsContactModalOpen(false);
    setFormData({ name: '', company: '', email: '', message: '' });

    // Transición suave al Digital Twin (sección Orchestrator)
    setTimeout(() => {
      const element = document.getElementById('orchestrator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  const navClasses = isScrolled
    ? 'bg-[rgba(10,14,39,0.95)] backdrop-blur-md border-b border-[#00BFFF]/20'
    : 'bg-transparent';

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

          <div className="hidden md:flex items-center gap-6">
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
            <ContactButton className="ml-4" onClick={() => setIsContactModalOpen(true)}>Contact</ContactButton>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[rgba(0,191,255,0.1)] text-neon-blue"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
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
                <div className="px-4 pb-2">
                  <ContactButton className="w-full text-center block" onClick={() => { setIsOpen(false); setIsContactModalOpen(true); }}>Contact</ContactButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="bg-[#0a0e27] border border-[#00BFFF]/30 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00BFFF]">Contact Us</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name / Company</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00BFFF]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00BFFF] transition-colors"
                placeholder="John Doe / Nexergy Corp"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00BFFF]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00BFFF] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[#00BFFF]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00BFFF] transition-colors min-h-[100px]"
                placeholder="How can we help you?"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#00BFFF] hover:bg-[#00BFFF]/90 text-[#0a0e27] font-bold py-6 rounded-xl flex items-center justify-center gap-2 mt-4"
            >
              Send Message
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
