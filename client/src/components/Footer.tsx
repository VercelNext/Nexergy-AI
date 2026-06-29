import React from 'react';
import { Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // URLs de los documentos legales oficiales en inglés alojados de forma segura
  const PRIVACY_POLICY_URL = "https://docs.google.com/document/d/1WhBxO8WpyxtgpYV5lnzyXMzLeZWcEPWnfIu0cwPHFIc/edit?usp=sharing";
  const TERMS_OF_SERVICE_URL = "https://docs.google.com/document/d/1EZPhDsHbHOL12oTgN1f0CQIEQngGhw5nWlw24vRpuL0/edit?usp=sharing";

  return (
    <footer className="bg-black text-white border-t border-zinc-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Strategy Statement */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            NEXERGY OIL
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
            "Operational intelligence architecture. We empower your leadership team with customized industrial solutions and specialized technical support."
          </p>
        </div>

        {/* Quick Links & Actions */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Solutions
          </h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <a href="#enterprise" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                Enterprise Solutions <ArrowUpRight className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                SaaS Subscription Plans
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Contact Us
          </h4>
          <p className="text-sm text-zinc-400">
            Need specialized advice? Connect with our technical team:
          </p>
          <a 
            href="mailto:contacto@nexergy.ar" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-sm border border-zinc-800 rounded-full px-4 py-2 bg-zinc-950 hover:bg-zinc-900"
          >
            <Mail className="w-4 h-4" />
            contacto@nexergy.ar
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span>
            &copy; {currentYear} NEXERGY OIL. All rights reserved. Powered by Optinex SAS.
          </span>
          <span className="hidden sm:inline text-zinc-800">|</span>
          <span className="flex items-center gap-1 text-zinc-400 bg-zinc-950 px-2 py-0.5 border border-zinc-900 rounded">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Compliance & Security SOC 2
          </span>
        </div>
        <div className="flex gap-6 font-medium">
          <a 
            href={PRIVACY_POLICY_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-zinc-300 transition-colors underline decoration-zinc-800 underline-offset-4 hover:decoration-zinc-500"
          >
            Privacy Policy
          </a>
          <a 
            href={TERMS_OF_SERVICE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-zinc-300 transition-colors underline decoration-zinc-800 underline-offset-4 hover:decoration-zinc-500"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
