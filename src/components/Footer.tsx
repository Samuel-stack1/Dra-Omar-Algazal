import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-secondary-dark text-white pt-20 pb-10 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen bg-repeat bg-center"
        style={{ backgroundImage: `url('/Pattern-62.png')`, backgroundSize: '350px' }}
      ></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="font-heading font-bold text-2xl tracking-tight mb-2 text-accent">
              DR. OMAR ALGAZAL
            </h3>
            <p className="font-body text-xs text-neutral-gray tracking-[0.2em] uppercase font-medium mb-6">
              Dermatologista
            </p>
            <p className="font-body text-sm text-light-gray/80 mb-2">
              Titular SBD
            </p>
            <p className="font-body text-sm text-light-gray/80">
              RQE 124117
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Links Rápidos</h4>
            <ul className="space-y-4">
              <li><Link href="/sobre" className="font-body text-sm text-light-gray hover:text-accent transition-colors">Sobre o Doutor</Link></li>
              <li><Link href="/procedimentos" className="font-body text-sm text-light-gray hover:text-accent transition-colors">Procedimentos</Link></li>
              <li><Link href="/contato" className="font-body text-sm text-light-gray hover:text-accent transition-colors">Agendamento</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-accent mt-1 mr-3 flex-shrink-0" />
                <span className="font-body text-sm text-light-gray">
                  Av. José Munia, 7301<br />
                  <span className="text-xs text-neutral-gray mt-0.5 block">4º andar, salas 401 e 402</span>
                  <span className="text-xs text-neutral-gray block">São José do Rio Preto - SP</span>
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-accent mr-3 flex-shrink-0" />
                <span className="font-body text-sm text-light-gray">
                  (17) 99228-5084
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/omaralgazal.dermato" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-neutral-gray/30 flex items-center justify-center text-light-gray hover:bg-accent hover:border-accent hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-gray/20 mb-8"></div>

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="font-body text-xs text-neutral-gray/60 max-w-2xl">
            As informações contidas neste site têm caráter exclusivamente informativo e educacional, não substituindo a consulta médica presencial. Em caso de dúvidas, procure um médico dermatologista. <br/> Respeitamos as normas do Conselho Federal de Medicina (Resolução CFM nº 1.974/2011).
          </p>
          <p className="font-body text-xs text-neutral-gray/80 whitespace-nowrap">
            &copy; {new Date().getFullYear()} Dr. Omar Algazal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
