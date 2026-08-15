"use client";
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react';
import { Sparkles, Activity, ShieldCheck, Fingerprint, Droplets, Sun, ScanLine, Syringe } from 'lucide-react';

const areas = {
  clinica: {
    id: 'clinica',
    title: 'Dermatologia Clínica',
    subtitle: 'Precisão diagnóstica e cuidado embasado na ciência',
    items: [
      {
        icon: Activity,
        title: 'Doenças de Pele',
        content: 'Tratamento de acne, rosácea, psoríase, dermatites, vitiligo e outras condições inflamatórias ou autoimunes.'
      },
      {
        icon: ShieldCheck,
        title: 'Doenças Crônicas',
        content: 'Manejo contínuo e acolhedor para garantir a qualidade de vida a pacientes com condições crônicas de pele.'
      },
      {
        icon: Fingerprint,
        title: 'Couro Cabeludo',
        content: 'Investigação aprofundada e tratamento de alopecias (quedas de cabelo), caspa severa e infecções.'
      },
      {
        icon: ScanLine,
        title: 'Mapeamento',
        content: 'Exame minucioso de pintas e lesões suspeitas para prevenção e diagnóstico precoce do câncer de pele.'
      }
    ]
  },
  estetica: {
    id: 'estetica',
    title: 'Estética & Cosmiatria',
    subtitle: 'Resultados naturais que respeitam a sua anatomia',
    items: [
      {
        icon: Syringe,
        title: 'Toxina Botulínica',
        content: 'Suavização de rugas dinâmicas e linhas de expressão de forma estratégica, mantendo a naturalidade.'
      },
      {
        icon: Droplets,
        title: 'Bioestimuladores',
        content: 'Restauração de volume, contorno facial e estímulo profundo de colágeno para firmeza da pele.'
      },
      {
        icon: Sun,
        title: 'Tecnologias',
        content: 'Tratamentos avançados com lasers e ultrassom para manchas, cicatrizes, textura e flacidez.'
      },
      {
        icon: Sparkles,
        title: 'Peelings Químicos',
        content: 'Renovação celular inteligente para tratamento de manchas, acne e melhora geral da qualidade da pele.'
      }
    ]
  }
};

export default function AreasAtuacao() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'clinica' | 'estetica'>('clinica');

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Background color morph
    gsap.to('body', {
      backgroundColor: '#FAFAFA',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleActions: 'play reverse play reverse',
      }
    });

    // Initial reveal
    gsap.from('.header-reveal', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
    });

  }, { scope: sectionRef });

  // Animate cards on tab change
  useGSAP(() => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.children;
      
      // Reset state for animation
      gsap.set(cards, { y: 20, opacity: 0, scale: 0.98 });
      
      // Animate in
      gsap.to(cards, {
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }, { dependencies: [activeTab], scope: sectionRef });

  const currentArea = areas[activeTab];

  return (
    <section id="atuacao" ref={sectionRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="header-reveal text-accent font-body text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Áreas de Atuação
          </span>
          <h2 className="header-reveal text-4xl md:text-5xl font-heading font-light text-primary-dark mb-6 leading-tight">
            Especialidade <span className="font-bold italic">Ampla e Complexa</span>
          </h2>
          <p className="header-reveal text-secondary-dark/70 font-body text-[15px] leading-relaxed">
            Não limito minha prática apenas a procedimentos estéticos: aqui você encontra a verdadeira dermatologia — que domina as doenças e que também se dedica à estética com absoluta consciência anatômica.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="header-reveal flex justify-center mb-12 md:mb-16">
          <div className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-neutral-gray/10 shadow-sm relative">
            
            {/* Active Indicator (CSS logic for sliding background) */}
            <div 
              className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-transform duration-500 ease-out border border-neutral-gray/5"
              style={{ transform: activeTab === 'clinica' ? 'translateX(0)' : 'translateX(100%)' }}
            ></div>

            <button
              onClick={() => setActiveTab('clinica')}
              className={`relative z-10 px-4 sm:px-6 md:px-10 py-3 rounded-full font-heading text-[13px] sm:text-sm md:text-base font-medium transition-colors duration-300 w-32 sm:w-40 md:w-56 ${activeTab === 'clinica' ? 'text-primary-dark' : 'text-secondary-dark/50 hover:text-primary-dark/70'}`}
            >
              Clínica
            </button>
            <button
              onClick={() => setActiveTab('estetica')}
              className={`relative z-10 px-4 sm:px-6 md:px-10 py-3 rounded-full font-heading text-[13px] sm:text-sm md:text-base font-medium transition-colors duration-300 w-32 sm:w-40 md:w-56 ${activeTab === 'estetica' ? 'text-primary-dark' : 'text-secondary-dark/50 hover:text-primary-dark/70'}`}
            >
              Estética
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex flex-col items-center">
          
          <div className="text-center mb-10 transition-opacity duration-300" key={`title-${activeTab}`}>
            <h3 className="text-2xl font-heading font-semibold text-primary-dark mb-2">{currentArea.title}</h3>
            <p className="text-accent font-body text-sm tracking-wide">{currentArea.subtitle}</p>
          </div>

          {/* Bento Grid */}
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {currentArea.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(35,48,74,0.03)] border border-white hover:border-accent/20 transition-all duration-500 group hover:shadow-[0_15px_50px_rgba(212,175,55,0.05)] relative overflow-hidden"
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-x-10 -translate-y-10"></div>
                  
                  <div className="flex flex-col h-full relative z-10">
                    <div className="w-12 h-12 bg-bg-main rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                      <Icon size={20} className="text-primary-dark group-hover:text-accent transition-colors duration-500" />
                    </div>
                    
                    <h4 className="text-xl font-heading font-medium text-primary-dark mb-3">
                      {item.title}
                    </h4>
                    
                    <p className="font-body text-secondary-dark/70 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
