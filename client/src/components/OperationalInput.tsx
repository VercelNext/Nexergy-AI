import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function OperationalInput() {
  const [sourceName, setSourceName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de proceso de ingesta
    console.log('Starting ingestion for:', sourceName);
    
    // Mostrar mensaje de éxito obligatorio
    toast.success("Recibido correctamente. Activando agentes específicos para completar el flujo de trabajo hacia el Gemelo Digital", {
      duration: 5000,
    });

    // Resetear formulario
    setSourceName('');
    setIsSubmitting(false);

    // Transición suave al Digital Twin (sección Orchestrator)
    setTimeout(() => {
      const element = document.getElementById('orchestrator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0e27]" id="analytics">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Data Ingestion</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Load the context data for digital twin modeling, simulate optimization scenarios, and benchmark the results against your industry peers.
          </p>
        </motion.div>

        <motion.div
          className="bg-[rgba(255,255,255,0.03)] border border-[#00BFFF]/20 rounded-2xl p-8 backdrop-blur-sm"
        >
          <form onSubmit={handleStartIngestion} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Source Name</label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g. Refinery Plant A"
                className="w-full bg-[rgba(10,14,39,0.5)] border border-[#00BFFF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00BFFF] transition-colors"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-[#00BFFF] text-sm italic">
                <Database className="w-4 h-4" />
                <span>Cloudflare D1 + R2 Ready</span>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#00BFFF] text-[#0a0e27] hover:bg-[#00BFFF]/90 px-8 py-6 rounded-xl font-bold flex items-center gap-2"
              >
                {isSubmitting ? 'Processing...' : 'Start Ingestion'}
                <Upload className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
