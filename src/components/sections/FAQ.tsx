"use client";
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Vocês atendem por convênio médico?',
    answer: 'Nosso atendimento é realizado na modalidade particular, garantindo consultas mais longas, detalhadas e sem a pressa imposta pelos planos de saúde. Emitimos nota fiscal e recibo para que você possa solicitar o reembolso junto ao seu convênio médico ou utilizar na dedução e restituição do seu Imposto de Renda anual.'
  },
  {
    question: 'Qual a duração média da primeira consulta?',
    answer: 'A primeira consulta tem duração média de 1 hora. Prezamos por um atendimento minucioso, onde realizamos um mapeamento completo do seu histórico, queixas e objetivos, além de uma avaliação física detalhada.'
  },
  {
    question: 'Como funciona a política de retorno?',
    answer: 'O retorno está incluso no valor da consulta e deve ser agendado em até 30 dias após o primeiro atendimento. Esse momento é essencial para avaliarmos a resposta ao tratamento inicial ou analisarmos exames solicitados.'
  },
  {
    question: 'Os tratamentos estéticos (como botox e preenchimento) podem ser feitos no mesmo dia da consulta?',
    answer: 'Sim! Caso haja indicação clínica e você deseje, muitos procedimentos podem ser realizados no mesmo dia da avaliação. Nossa clínica está equipada para realizar intervenções estéticas com total segurança e conforto.'
  }
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from('.faq-header', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      y: 30, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.faq-item', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out'
    });
  }, { scope: sectionRef });

  const toggleAccordion = (idx: number) => {
    const isOpening = activeAccordion !== idx;
    const currentRef = contentRefs.current[activeAccordion ?? -1];
    const newRef = contentRefs.current[idx];

    // Close currently open
    if (activeAccordion !== null && currentRef) {
      gsap.to(currentRef, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut' });
    }

    // Open new
    if (isOpening && newRef) {
      gsap.set(newRef, { height: 'auto' });
      const targetHeight = newRef.offsetHeight;
      gsap.fromTo(newRef, 
        { height: 0, opacity: 0 }, 
        { height: targetHeight, opacity: 1, duration: 0.4, ease: 'power2.inOut' }
      );
      setActiveAccordion(idx);
    } else {
      setActiveAccordion(null);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="text-center mb-16 faq-header">
          <span className="text-accent font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
            Esclareça suas dúvidas
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary-dark leading-tight">
            Perguntas <span className="text-accent italic font-normal">Frequentes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isActive = activeAccordion === idx;
            return (
              <div key={idx} className="faq-item border-b border-neutral-gray/20">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className={`font-heading font-medium text-lg transition-colors duration-300 pr-8 ${isActive ? 'text-accent' : 'text-primary-dark group-hover:text-accent/80'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? 'border-accent bg-accent/5 text-accent' : 'border-neutral-gray/30 text-neutral-gray/60 group-hover:border-accent/50'}`}>
                    {isActive ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <div 
                  ref={el => { contentRefs.current[idx] = el; }}
                  className="overflow-hidden h-0 opacity-0"
                >
                  <div className="pb-8 pr-12 text-secondary-dark/70 font-body text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
