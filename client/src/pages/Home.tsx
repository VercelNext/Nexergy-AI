import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import EnterpriseSolutions from '@/components/EnterpriseSolutions';
import Orchestrator from '@/components/Orchestrator';
import OperationalInput from '@/components/OperationalInput';
import TrustGovernance from '@/components/TrustGovernance';
import PlatformArchitecture from '@/components/PlatformArchitecture';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#0a0e27]">
      <Navigation />

      <Hero />

      <EnterpriseSolutions />

      <Orchestrator />

      <div id="analytics">
        <OperationalInput />
      </div>

      <TrustGovernance />

      <PlatformArchitecture />

      <Footer />
    </div>
  );
}
