"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react';
import { ShieldCheck, FlaskConical, Ear, UserCheck } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Ética e Transparência',
    description: 'Prática guiada pelo respeito e transparência, sem promessas fantasiosas. O foco é a sua saúde e bem-estar reais.',
  },
  {
    icon: FlaskConical,
    title: 'Ciência e Evidência',
    description: 'Medicina baseada em evidências científicas. Tratamentos e procedimentos com indicação real, atualizados constantemente.',
  },
  {
    icon: Ear,
    title: 'Escuta Ativa',
    description: 'Acreditamos que a boa Dermatologia começa pela escuta. Entender sua história e expectativas antes de qualquer intervenção.',
  },
  {
    icon: UserCheck,
    title: 'Autonomia do Paciente',
    description: 'Relação de confiança onde você participa ativamente das decisões sobre seu tratamento, com total conhecimento do processo.',
  },
];

export default function Filosofia() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Background color transition from previous section
    gsap.to('body', {
      backgroundColor: '#1A1D21',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleActions: 'play reverse play reverse',
      }
    });

    // Cards stagger animation
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

  }, { scope: sectionRef });

  return (
    <section id="filosofia" ref={sectionRef} className="py-24 md:py-32 bg-secondary-dark text-white relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-accent font-body text-sm font-bold tracking-widest uppercase mb-4 block">
            Visão e Cultura
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Nossos Pilares
          </h2>
          <p className="text-light-gray font-body text-lg leading-relaxed">
            Minha prática é construída sobre uma base sólida de princípios que garantem o melhor cuidado para você e sua pele.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-primary-dark/20 border border-neutral-gray/10 p-8 rounded-sm hover:border-accent/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-dark rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <pillar.icon className="text-accent" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mb-4">
                {pillar.title}
              </h3>
              <p className="text-light-gray/80 font-body text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
