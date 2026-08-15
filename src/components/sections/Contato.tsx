"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react';

export default function Contato() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="contato" ref={sectionRef} className="py-20 md:py-28 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
            Atendimento Exclusivo
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-light text-primary-dark leading-tight">
            Vamos cuidar da <span className="text-accent italic font-normal">sua pele</span> juntos?
          </h2>
        </div>

        {/* Editorial Grid */}
        <div ref={containerRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          
          {/* Column 1: Direct Contact (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="bg-bg-main p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-gray/10 h-full flex flex-col justify-center text-center items-center">
              
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <MessageCircle size={28} className="text-accent" />
              </div>

              <h3 className="text-2xl font-heading font-medium text-primary-dark mb-4">
                Atendimento Rápido
              </h3>
              
              <p className="font-body text-sm text-secondary-dark/70 leading-relaxed mb-10 px-2">
                Esqueça formulários longos. Nossa equipe está pronta para te atender agora mesmo pelo WhatsApp com toda a atenção que você merece.
              </p>

              <a 
                href="https://wa.me/5517999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-primary-dark text-white rounded-full font-body text-[11px] md:text-xs tracking-[0.15em] uppercase hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                Falar no WhatsApp
              </a>
              
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-body text-[10px] text-secondary-dark/50 uppercase tracking-widest font-medium">Equipe Online</span>
              </div>

            </div>
          </div>

          {/* Column 2: Clinic Photo (Cols 5-8) */}
          <div className="lg:col-span-4 flex justify-center items-center relative">
            <div className="w-[280px] sm:w-[320px] lg:w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-4 border-white transform lg:scale-105 z-10 bg-white">
              <img 
                src="/clinica hoos.jpg" 
                alt="Clínica Honos - Recepção" 
                className="w-full h-auto block object-contain"
              />
            </div>
          </div>

          {/* Column 3: Location & Map (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="bg-bg-main p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-gray/10 h-full flex flex-col justify-between">
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-2xl font-heading font-light text-primary-dark mb-2">Nosso Espaço</h3>
                  <p className="font-body text-xs text-secondary-dark/60 leading-relaxed">
                    Ambiente sofisticado e acolhedor, projetado para o seu máximo conforto.
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="mt-1"><MapPin size={18} className="text-accent" /></div>
                    <div>
                      <h4 className="font-heading font-medium text-primary-dark text-sm mb-1">Endereço</h4>
                      <p className="font-body text-secondary-dark/80 text-xs leading-relaxed">
                        Av. José Munia, 7301<br/>
                        4º andar, salas 401 e 402<br/>
                        São José do Rio Preto - SP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1"><Clock size={18} className="text-accent" /></div>
                    <div>
                      <h4 className="font-heading font-medium text-primary-dark text-sm mb-1">Horário de Atendimento</h4>
                      <p className="font-body text-secondary-dark/80 text-xs">Segunda a Sexta, 08h às 19h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Map */}
              <div className="rounded-xl overflow-hidden relative border border-white shadow-sm group bg-white h-[180px] w-full">
                <div className="absolute inset-0 border-2 border-white/50 rounded-xl z-10 pointer-events-none mix-blend-overlay"></div>
                <iframe 
                  title="Mapa Espaço Honos"
                  src="https://maps.google.com/maps?q=Avenida%20Jose%20Munia,%207301,%20Sao%20Jose%20do%20Rio%20Preto%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full absolute inset-0 border-0 grayscale-[80%] sepia-[20%] opacity-80 group-hover:grayscale-0 group-hover:sepia-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                  loading="lazy"
                ></iframe>
                
                <a 
                  href="https://maps.google.com/?q=Avenida+Jose+Munia+7301+Sao+Jose+do+Rio+Preto+SP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center justify-center gap-1.5 border border-white z-20 hover:scale-105 transition-transform duration-300"
                >
                  <Navigation size={12} className="text-accent" />
                  <span className="font-body text-[10px] text-primary-dark font-medium uppercase tracking-widest">Rotas</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
