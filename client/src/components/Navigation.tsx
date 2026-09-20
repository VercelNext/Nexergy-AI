import { useState } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onOpenJoin?: () => void;
}

export default function Navigation({ onOpenJoin }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenJoin) {
      onOpenJoin();
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-white">
              NEXERGY <span className="text-cyan-400">AI</span>
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#enterprise-solutions" className="text-slate-300 hover:text-white transition-colors text-sm">
              Capabilities
            </a>
            <a href="#orchestrator" className="text-slate-300 hover:text-white transition-colors text-sm">
              Orchestrator
            </a>
            <a href="#analytics" className="text-slate-300 hover:text-white transition-colors text-sm">
              Analytics
            </a>
            <a href="#governance" className="text-slate-300 hover:text-white transition-colors text-sm">
              Governance
            </a>

            {/* BOTÓN JOIN / START FOR FREE */}
            <Button
              onClick={handleJoinClick}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm gap-2 transition-all shadow-md shadow-cyan-500/20"
            >
              <Building2 className="w-4 h-4" /> Join
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0e27] border-b border-white/10 px-4 pt-2 pb-4 space-y-3">
          <a
            href="#enterprise-solutions"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white text-sm py-1"
          >
            Capabilities
          </a>
          <a
            href="#orchestrator"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white text-sm py-1"
          >
            Orchestrator
          </a>
          <a
            href="#analytics"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white text-sm py-1"
          >
            Analytics
          </a>
          <a
            href="#governance"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white text-sm py-1"
          >
            Governance
          </a>
          <Button
            onClick={handleJoinClick}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-lg text-sm gap-2 mt-2"
          >
            <Building2 className="w-4 h-4" /> Join
          </Button>
        </div>
      )}
    </nav>
  );
}