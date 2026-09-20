import React, { useState } from 'react';
import { Network, Server, Cpu, Activity, ShieldCheck, CheckCircle2, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export function IntegrationGuide() {
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  const endpointUrl = "mqtt.nexergy.ar:8883";

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl);
    setCopiedEndpoint(true);
    toast.success("Endpoint copiado al portapapeles");
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  const steps = [
    {
      role: 'Líder IT / Sistemas',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      icon: Network,
      title: '1. Conectividad y Reglas de Firewall',
      description: 'Configuración de red para habilitar la salida de datos desde la planta hacia la nube.',
      tasks: [
        'Habilitar tráfico saliente (outbound) en el firewall hacia mqtt.nexergy.ar:8883',
        'Asignar una IP local fija/estática al Analizador de Red o IoT Gateway',
        'Importar el Certificado CA SSL/TLS de Nexergy en el dispositivo'
      ]
    },
    {
      role: 'Líder Mantenimiento',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      icon: Server,
      title: '2. Instalación e Inspección Física',
      description: 'Verificación de cableado, transformadores de corriente y secuencia de fases.',
      tasks: [
        'Verificar relación de transformación de los TI (ej. 500/5A o 1000/1A)',
        'Comprobar correcta secuencia de fases (L1, L2, L3) y conexión de neutro',
        'Registrar Marca, Modelo e ID de esclavo Modbus (Slave ID / Unit Identifier)'
      ]
    },
    {
      role: 'Líder Ingeniería',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: Cpu,
      title: '3. Mapeo de Registros Modbus / Telemetría',
      description: 'Definición de las direcciones de memoria para lectura de variables energéticas.',
      tasks: [
        'Mapear parámetros clave: Potencia Activa (kW), Reactiva (kVAR) y Factor de Potencia (PF)',
        'Mapear calidad de energía: THD de Tensión y Corriente, desequilibrio de fases',
        'Ajustar la tasa de refresco (Polling rate recomendado: 5 a 15 segundos)'
      ]
    },
    {
      role: 'Líder Procesos',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      icon: Activity,
      title: '4. Vinculación con KPIs Operativos',
      description: 'Asociación del analizador con las líneas de producción y alertas inteligentes.',
      tasks: [
        'Asignar el analizador a la subestación, máquina o celda de proceso correspondiente',
        'Configurar umbrales de potencia máxima para prevención de penalizaciones',
        'Validar la recepción de datos en tiempo real en los paneles analíticos'
      ]
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-10 px-4 text-white">
      {/* Encabezado Principal */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/10 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-wider">
                Despliegue Técnico
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Encriptación TLS v1.3
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Guía de Integración para Analizadores de Red
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Protocolo unificado para que las áreas de IT, Mantenimiento, Ingeniería y Procesos sincronicen los analizadores físicos con la IA de Nexergy.
            </p>
          </div>

          {/* Caja con Endpoint para IT */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shrink-0">
            <span className="text-xs font-medium text-slate-400 block mb-1">
              Broker MQTT / Endpoint Primario:
            </span>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-xs text-cyan-400">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span>{endpointUrl}</span>
              <button 
                onClick={handleCopy} 
                className="ml-2 text-slate-400 hover:text-white transition-colors"
                title="Copiar Endpoint"
              >
                {copiedEndpoint ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas por Rol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx} 
              className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${step.badgeColor}`}>
                    {step.role}
                  </span>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{step.description}</p>

                <ul className="space-y-2.5 mb-6">
                  {step.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px] text-slate-500">
                  Modbus TCP / MQTT / OPC-UA
                </span>
                <a 
                  href="https://linktr.ee/nexergy.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 font-semibold flex items-center gap-1 hover:underline"
                >
                  Soporte Técnico <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}