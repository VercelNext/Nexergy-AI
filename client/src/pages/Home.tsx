import { useState } from 'react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import EnterpriseSolutions from '@/components/EnterpriseSolutions';
import Orchestrator from '@/components/Orchestrator';
import OperationalInput from '@/components/OperationalInput';
import TrustGovernance from '@/components/TrustGovernance';
import PlatformArchitecture from '@/components/PlatformArchitecture';
import Footer from '@/components/Footer';
import { OnboardingModal } from '@/components/OnboardingModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27]">
      {/* Pasamos la función para abrir el modal */}
      <Navigation onOpenJoin={() => setIsModalOpen(true)} />

      <Hero />

      <EnterpriseSolutions />

      <Orchestrator />

      <div id="analytics">
        <OperationalInput />
      </div>

      {/* Agregamos el id="governance" para que funcione el scroll del menú */}
      <div id="governance">
        <TrustGovernance />
      </div>

      <PlatformArchitecture />

      <Footer />

      {/* Renderizamos el modal en la raíz de Home */}
      <OnboardingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}