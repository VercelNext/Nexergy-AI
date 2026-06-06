import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, Database, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { ContactButton } from './ContactButton'; // Importamos tu componente

export default function OperationalInput() {
  const [step, setStep] = useState<'ingestion' | 'twin'>('ingestion');
  const [sourceName, setSourceName] = useState('');
  const [ingestionId, setIngestionId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const [goalType, setGoalType] = useState('Efficiency Optimization');
  const [goalDescription, setGoalDescription] = useState('');

  const ingestionMutation = trpc.ingestion.submit.useMutation({
    onSuccess: (data) => {
      setIngestionId(data.id);
      setFeedback(data.message);
      setTimeout(() => setStep('twin'), 3000);
    },
  });

  const twinMutation = trpc.digitalTwin.configureGoal.useMutation({
    onSuccess: () => {
      alert('Digital Twin configuration completed successfully!');
    },
  });

  const handleIngestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ingestionMutation.mutate({ sourceName, sourceType: 'Manual', metadata: '' });
  };

  const handleTwinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingestionId) {
      twinMutation.mutate({
        ingestionId,
        goalType,
        description: goalDescription,
      });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0e27]" id="analytics">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {step === 'ingestion' ? 'Data Ingestion' : 'Digital Twin Configuration'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {step === 'ingestion' 
              ? 'Load the context data for digital twin modeling, simulate optimization scenarios, and benchmark the results against your industry peers.' 
              : 'Define optimization goals for your industrial digital twin.'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'ingestion' ? (
            <motion.div
              key="ingestion"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-[rgba(255,255,255,0.03)] border border-[#00BFFF]/20 rounded-2xl p-8 backdrop-blur-sm"
            >
              <form onSubmit={handleIngestionSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Source Name</label>
                  <input
                    type="text"
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                    placeholder="e.g. Refinery Plant A"
                    className="w-full bg-[rgba(10,14,39,0.5)] border border-[#00BFFF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00BFFF] transition-colors"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2 text-[#00BFFF] text-sm italic">
                    <Database className="w-4 h-4" />
                    <span>Cloudflare D1 + R2 Ready</span>
                  </div>
                  
                  {/* AQUÍ ESTÁ EL CAMBIO: Botón que redirige a contacto */}
                  <ContactButton 
                    className="bg-[#00BFFF] text-[#0a0e27] hover:bg-[#00BFFF]/90 px-8 py-6 rounded-xl font-bold flex items-center gap-2 transition-all"
                  >
                    Start Ingestion <Upload className="w-5 h-5" />
                  </ContactButton>
                </div>
              </form>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-[rgba(0,191,255,0.1)] border border-[#00BFFF]/30 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#00BFFF] shrink-0" />
                  <p className="text-sm text-gray-200 leading-relaxed">{feedback}</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* ... (sección twin sin cambios) ... */
            <motion.div key="twin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[rgba(255,255,255,0.03)] border border-[#00BFFF]/20 rounded-2xl p-8 backdrop-blur-sm">
                <form onSubmit={handleTwinSubmit} className="space-y-6">
                    {/* Contenido existente del Twin */}
                    <Button type="submit" disabled={twinMutation.isLoading} className="bg-[#00BFFF] text-[#0a0e27] hover:bg-[#00BFFF]/90 px-8 py-6 rounded-xl font-bold flex items-center gap-2">
                        {twinMutation.isLoading ? 'Configuring...' : 'Deploy Digital Twin'}
                        <Target className="w-5 h-5" />
                    </Button>
                </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
