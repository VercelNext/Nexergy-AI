import { motion } from 'framer-motion';
import { Zap, Brain, Cpu, Shield, User } from 'lucide-react';

export default function PlatformArchitecture() {
  const nodes = [
    { title: 'Real-Time Intelligence', x: 250, y: 50, color: '#00BFFF' },
    { title: 'Predictive Analytics', x: 450, y: 150, color: '#00FF7F' },
    { title: 'Autonomous Execution', x: 250, y: 250, color: '#C800FF' },
    { title: 'Enterprise Governance', x: 50, y: 150, color: '#00FFFF' },
  ];

  return (
    <section className="py-20 px-4 relative bg-[#0a0e27] overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
          NEXERGY <span className="text-[#00BFFF]">Operational Loop</span>
        </h2>

        <div className="relative w-full h-[400px] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 500 300">
            {/* Flechas de flujo principal (círculo) */}
            <motion.path 
              d="M250 50 L450 150 L250 250 L50 150 Z" 
              fill="none" stroke="#333" strokeWidth="2" strokeDasharray="5 5"
            />

            {/* Nodo Central: Human-in-the-Loop */}
            <g className="filter drop-shadow-[0_0_15px_rgba(0,191,255,0.5)]">
              <rect x="175" y="115" width="150" height="70" rx="10" fill="rgba(0,191,255,0.1)" stroke="#00BFFF" strokeWidth="2" />
              <text x="250" y="145" textAnchor="middle" fill="#00BFFF" fontSize="14" fontWeight="bold">SUPERVISOR</text>
              <text x="250" y="165" textAnchor="middle" fill="white" fontSize="10">HUMAN-IN-THE-LOOP</text>
            </g>

            {/* Nodos de Capacidad */}
            {nodes.map((node, i) => (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r="30" fill="rgba(20,30,60,0.8)" stroke={node.color} strokeWidth="2" />
                <text x={node.x} y={node.y + 5} textAnchor="middle" fill={node.color} fontSize="10" fontWeight="bold">
                  {node.title.split(' ')[0]}
                </text>
              </g>
            ))}

            {/* Flechas de Retroalimentación (Feedback) */}
            <motion.line x1="250" y1="115" x2="420" y2="150" stroke="#FF8C00" strokeWidth="2" markerEnd="url(#arrow)" />
            <motion.line x1="250" y1="185" x2="250" y2="220" stroke="#FF8C00" strokeWidth="2" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#FF8C00" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="mt-8 p-6 rounded-lg border border-[#00BFFF]/30 bg-[rgba(0,191,255,0.05)]">
          <p className="text-gray-300 text-sm italic">
            "Human-in-the-Loop: Central supervisor adjusting impact parameters and re-calibrating autonomous agents in real-time."
          </p>
        </div>
      </div>
    </section>
  );
}
