"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react';

const diferenciais = [
  {
    number: '01',
    title: 'Dermatologia Raiz',
    text: 'Profundo conhecimento clínico para tratar as doenças de pele, cabelos e unhas antes de qualquer intervenção estética.'
  },
  {
    number: '02',
    title: 'Medicina Baseada em Evidências',
    text: 'Decisões clínicas e tratamentos estéticos pautados em ciência rigorosa, sem modismos ou promessas irreais.'
  },
  {
    number: '03',
    title: 'Atualização Contínua',
    text: 'Constante aperfeiçoamento profissional e técnico para oferecer as melhores e mais seguras práticas da Dermatologia.'
  },
  {
    number: '04',
    title: 'Vínculo e Confiança',
    text: 'Acompanhamento próximo e individualizado, construindo uma relação duradoura baseada no respeito às suas necessidades.'
  }
];

export default function Diferenciais() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !scrollContentRef.current || !scrollWrapperRef.current) return;

    // We only want horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = scrollContentRef.current!.scrollWidth - window.innerWidth;
      
      gsap.to(scrollContentRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top top",
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="diferenciais" ref={containerRef} className="bg-primary-dark text-white overflow-hidden">
      
      {/* Mobile Layout (Vertical) */}
      <div className="lg:hidden py-24 px-6 md:px-12">
        <span className="text-accent font-body text-sm font-bold tracking-widest uppercase mb-4 block">
          Por que escolher
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-16 leading-tight">
          Nossos<br/>Diferenciais
        </h2>
        <div className="flex flex-col gap-12">
          {diferenciais.map((item, idx) => (
            <div key={idx} className="border-l border-accent/30 pl-6 relative">
              <span className="absolute -left-[1px] top-0 w-[2px] h-8 bg-accent"></span>
              <span className="text-accent font-heading font-bold text-lg mb-2 block">{item.number}</span>
              <h3 className="text-2xl font-heading font-semibold mb-3">{item.title}</h3>
              <p className="text-light-gray/80 font-body leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (Horizontal Scroll Pinned) */}
      <div ref={scrollWrapperRef} className="hidden lg:flex h-screen items-center">
        <div ref={scrollContentRef} className="flex px-[10vw] gap-24 items-center">
          
          <div className="w-[40vw] flex-shrink-0">
            <span className="text-accent font-body text-sm font-bold tracking-widest uppercase mb-4 block">
              Por que escolher
            </span>
            <h2 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-[1.1]">
              Nossos<br/>Diferenciais
            </h2>
          </div>

          {diferenciais.map((item, idx) => (
            <div key={idx} className="w-[30vw] flex-shrink-0 border-l border-accent/30 pl-10 relative">
              <span className="absolute -left-[1px] top-0 w-[2px] h-12 bg-accent"></span>
              <span className="text-accent font-heading font-bold text-2xl mb-4 block">{item.number}</span>
              <h3 className="text-3xl font-heading font-semibold mb-6">{item.title}</h3>
              <p className="text-light-gray/80 font-body text-lg leading-relaxed">{item.text}</p>
            </div>
          ))}
          
          {/* Spacer at the end so the last item scrolls past the center */}
          <div className="w-[20vw] flex-shrink-0"></div>

        </div>
      </div>

    </section>
  );
}
