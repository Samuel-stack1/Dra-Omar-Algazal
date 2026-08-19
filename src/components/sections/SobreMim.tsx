"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

export default function SobreMim() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Split text for headers and paragraphs
    const headers = sectionRef.current.querySelectorAll('.split-header');
    const paragraphs = sectionRef.current.querySelectorAll('.split-paragraph');
    
    headers.forEach(header => {
      const split = new SplitType(header as HTMLElement, { types: 'lines,words' });
      gsap.from(split.words, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
      });
    });

    paragraphs.forEach(p => {
      const split = new SplitType(p as HTMLElement, { types: 'lines' });
      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: p,
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    });

    // Image reveal
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scale: 1.1 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Counters animation
    counterRefs.current.forEach((counter) => {
      if (!counter) return;
      const targetValue = parseInt(counter.getAttribute('data-target') || '0', 10);
      
      gsap.fromTo(counter, 
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 90%',
          },
          onUpdate: function() {
            counter.innerHTML = Math.ceil(Number(this.targets()[0].innerText)).toString();
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section id="sobre" ref={sectionRef} className="pt-8 pb-20 md:pt-12 md:pb-28 bg-bg-main relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Image Column */}
          <div className="w-full lg:w-5/12">
            <div className="relative w-full max-w-md mx-auto mt-8 lg:mt-0">
              {/* Decorative Frames */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-accent/40 rounded-t-[200px] rounded-b-[20px] pointer-events-none hidden md:block"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-accent/5 rounded-t-[200px] rounded-b-[20px] pointer-events-none hidden md:block"></div>
              
              {/* The Image Wrapper */}
              <div 
                className="relative aspect-[3/4] overflow-hidden w-full rounded-t-[200px] rounded-b-[20px] shadow-[0_20px_50px_rgba(35,48,74,0.1)]" 
                ref={imageRef}
              >
                <img 
                  src="/Foto Dr.JPG" 
                  alt="Dr. Omar Algazal" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-dark/5 mix-blend-multiply"></div>
              </div>
            </div>
            
            {/* Stats / Timeline minimal */}
            <div className="grid grid-cols-2 gap-8 mt-16 max-w-md mx-auto">
              <div className="border-t border-neutral-gray/30 pt-4">
                <span className="text-accent text-4xl font-heading font-bold flex items-center">
                  +<span ref={el => { counterRefs.current[0] = el; }} data-target="10">0</span>
                </span>
                <span className="text-sm font-body text-secondary-dark mt-1 block">Anos de experiência</span>
              </div>
              <div className="border-t border-neutral-gray/30 pt-4">
                <span className="text-accent text-4xl font-heading font-bold flex items-center">
                  +<span ref={el => { counterRefs.current[1] = el; }} data-target="1000">0</span>
                </span>
                <span className="text-sm font-body text-secondary-dark mt-1 block">Pacientes acompanhados</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-7/12" ref={textRef}>
            <span className="text-accent font-body text-sm font-bold tracking-widest uppercase mb-4 block">
              Sobre Mim
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-primary-dark mb-10 split-header leading-tight">
              A boa Dermatologia começa pela escuta e pelo desejo genuíno de cuidar.
            </h2>
            
            <div className="space-y-6 text-secondary-dark/80 font-body text-lg leading-relaxed">
              <p className="split-paragraph">
                Minha trajetória na Medicina é pautada pelo compromisso com a excelência técnica, atualização científica contínua e compromisso ético. Como dermatologista, dedico-me ao diagnóstico e tratamento das doenças da pele, cabelos e unhas, conciliando a prática clínica com procedimentos dermatológicos e constante aperfeiçoamento profissional.
              </p>
              <p className="split-paragraph">
                Cada consulta representa uma oportunidade de apresentar a Dermatologia como uma especialidade ampla e complexa, estando presente para compreender a história do paciente até a chegada ao consultório, entendendo tratamentos anteriores e expectativas. Reconheço o impacto das doenças de pele na qualidade de vida e luto para que elas deixem de ser um peso para o paciente.
              </p>
              <p className="split-paragraph">
                O cuidado estético é muito importante — sou entusiasta da cosmiatria, um dos pilares da atuação do dermatologista —, mas garantir a saúde da pele em todos os seus aspectos é o que nos torna médicos.
              </p>
            </div>

            <div className="mt-12 pt-10 border-t border-neutral-gray/20">
              <div className="flex items-center gap-6">
                <div>
                  <p className="font-heading font-bold text-primary-dark text-xl">Dr. Omar Algazal</p>
                  <p className="font-body text-sm text-neutral-gray mt-1">Titular SBD | RQE 124117</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
