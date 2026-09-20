import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [domain, setDomain] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [teamEmails, setTeamEmails] = useState({
    it: "",
    maintenance: "",
    engineering: "",
    processes: "",
  });

  const handleDomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) {
      toast.error("Por favor ingresa un dominio corporativo válido");
      return;
    }
    const cleanDomain = domain.replace(/^@/, "").toLowerCase().trim();
    setDomain(cleanDomain);

    const name = cleanDomain.split(".")[0];
    setCompanyName(name.charAt(0).toUpperCase() + name.slice(1));
    setStep(2);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    toast.success("Habilitación completada e invitaciones enviadas.");
  };

  const handleResetAndClose = () => {
    setStep(1);
    setDomain("");
    setTeamEmails({ it: "", maintenance: "", engineering: "", processes: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleResetAndClose}>
      <DialogContent className="sm:max-w-[550px] bg-slate-900 text-white border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="w-5 h-5 text-cyan-400" /> Onboarding Corporativo - Start for Free
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Define el dominio corporativo y habilita los 4 roles clave de tu empresa.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={handleDomainSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="domain">Dominio Principal de la Empresa</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">@</span>
                <Input
                  id="domain"
                  placeholder="polimetalruedas.com.ar"
                  className="pl-8 bg-slate-950 border-slate-800 text-white"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-slate-400">
                Solo usuarios con correo de este dominio podrán acceder a tu organización.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold">
                Continuar <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleFinish} className="space-y-4 py-2">
            <p className="text-xs text-slate-400">
              Habilita las 4 áreas responsables de <strong>{companyName}</strong> (<code>@{domain}</code>) para coordinar los analizadores:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="it" className="text-xs">Líder IT / Sistemas</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <Input
                    id="it"
                    type="email"
                    placeholder={`sistemas@${domain}`}
                    className="pl-9 bg-slate-950 border-slate-800 text-sm text-white"
                    value={teamEmails.it}
                    onChange={(e) => setTeamEmails({ ...teamEmails, it: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="maintenance" className="text-xs">Líder Mantenimiento</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <Input
                    id="maintenance"
                    type="email"
                    placeholder={`mantenimiento@${domain}`}
                    className="pl-9 bg-slate-950 border-slate-800 text-sm text-white"
                    value={teamEmails.maintenance}
                    onChange={(e) => setTeamEmails({ ...teamEmails, maintenance: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="engineering" className="text-xs">Líder Ingeniería</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <Input
                    id="engineering"
                    type="email"
                    placeholder={`ingenieria@${domain}`}
                    className="pl-9 bg-slate-950 border-slate-800 text-sm text-white"
                    value={teamEmails.engineering}
                    onChange={(e) => setTeamEmails({ ...teamEmails, engineering: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="processes" className="text-xs">Líder Procesos</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <Input
                    id="processes"
                    type="email"
                    placeholder={`procesos@${domain}`}
                    className="pl-9 bg-slate-950 border-slate-800 text-sm text-white"
                    value={teamEmails.processes}
                    onChange={(e) => setTeamEmails({ ...teamEmails, processes: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-slate-400 hover:text-white">
                Atrás
              </Button>
              <Button type="submit" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold">
                Habilitar Correos y Finalizar <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold">¡Dominio y Roles Habilitados!</h3>
            <p className="text-sm text-slate-400">
              Las cuentas del equipo <strong>@{domain}</strong> han quedado registradas para acceder al panel de su empresa.
            </p>
            <Button onClick={handleResetAndClose} className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-white">
              Cerrar y Volver
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}