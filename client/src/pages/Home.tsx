import { useState } from 'react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import EnterpriseSolutions from '@/components/EnterpriseSolutions';
import Orchestrator from '@/components/Orchestrator';
import OperationalInput from '@/components/OperationalInput';
import TrustGovernance from '@/components/TrustGovernance';
import PlatformArchitecture from '@/components/PlatformArchitecture';
import Footer from '@/components/Footer';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { OnboardingModal } from '@/components/OnboardingModal';

export default function Home() {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Al hacer clic en Join en la navegación
  const handleOpenJoin = () => {
    setIsSubscriptionOpen(true);
  };

  // Al seleccionar "Start for Free" en el modal de suscripción
  const handleSelectStartForFree = () => {
    setIsSubscriptionOpen(false);
    setIsOnboardingOpen(true);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27]">
      <Navigation onOpenJoin={handleOpenJoin} />

      <Hero />

      <EnterpriseSolutions />

      <Orchestrator />

      <div id="analytics">
        <OperationalInput />
      </div>

      <div id="governance">
        <TrustGovernance />
      </div>

      <PlatformArchitecture />

      <Footer />

      {/* 1. Modal con los 3 planes de suscripción */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        onSelectStartForFree={handleSelectStartForFree}
      />

      {/* 2. Modal de Onboarding Corporativo (desplegado tras presionar Start for Free) */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
}