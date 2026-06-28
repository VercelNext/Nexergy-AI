import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react'; // Asegurando que los iconos estén importados

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1: Marca y Propuesta de Valor */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">NEXERGY OIL</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              "Transformación industrial autónoma liderada por expertos. 
              Conectamos su estrategia operativa con resultados de alta eficiencia."
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos o Navegación */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#enterprise" className="hover:text-white transition-colors">Enterprise Solutions</a></li>
              <li><a href="#ingestion" className="hover:text-white transition-colors">Data Ingestion</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto y Dirección Actualizada */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Blanco Encalada 2311 10 B - CABA - Argentina</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <a href="mailto:info@optinex.sas" className="hover:text-white transition-colors">info@optinex.sas</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-900 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} OPTINEX SAS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
