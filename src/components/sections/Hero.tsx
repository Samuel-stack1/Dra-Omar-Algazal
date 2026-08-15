"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  
  // Silk Mesh Refs
  const silk1Ref = useRef<HTMLDivElement>(null);
  const silk2Ref = useRef<HTMLDivElement>(null);
  const silk3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headlineRef.current || !sublineRef.current) return;

    // Split text setup
    const splitHeadline = new SplitType(headlineRef.current, { types: 'lines,words' });
    const splitSubline = new SplitType(sublineRef.current, { types: 'lines' });

    // Initial setup
    gsap.set(splitHeadline.words, { y: 20, opacity: 0 });
    gsap.set(splitSubline.lines, { y: 15, opacity: 0 });
    gsap.set(ctaRef.current, { y: 15, opacity: 0 });
    if (imageFrameRef.current) {
      gsap.set(imageFrameRef.current, { y: 40, opacity: 0 });
    }

    // Silk Animation (Liquid Mesh)
    if (silk1Ref.current && silk2Ref.current && silk3Ref.current) {
      gsap.to(silk1Ref.current, {
        x: '10vw', y: '5vh', rotation: 10, scale: 1.1,
        duration: 8, yoyo: true, repeat: -1, ease: 'sine.inOut'
      });
      gsap.to(silk2Ref.current, {
        x: '-8vw', y: '-10vh', rotation: -15, scale: 1.15,
        duration: 10, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1
      });
      gsap.to(silk3Ref.current, {
        x: '5vw', y: '-5vh', rotation: 5, scale: 1.05,
        duration: 9, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2
      });
    }

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(imageFrameRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.6,
      ease: 'power2.out',
    })
    .to(splitHeadline.words, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.04,
      ease: 'power2.out',
    }, "-=1.2")
    .to(splitSubline.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: 'power2.out',
    }, "-=1.0")
    .to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, "-=0.8");

    return () => {
      splitHeadline.revert();
      splitSubline.revert();
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-bg-main min-h-[100svh] lg:h-screen lg:min-h-[640px] flex flex-col lg:flex-row lg:items-center pt-20 lg:pt-16 pb-8 lg:pb-0 overflow-hidden"
    >
      {/* Delicate Liquid Silk Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          ref={silk1Ref} 
          className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/60 rounded-full blur-[80px] lg:blur-[120px]"
        ></div>
        <div 
          ref={silk2Ref} 
          className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-accent/15 rounded-full blur-[80px] lg:blur-[120px]"
        ></div>
        <div 
          ref={silk3Ref} 
          className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary-dark/5 rounded-full blur-[70px] lg:blur-[100px]"
        ></div>
      </div>

      {/* Floating Image (Top Background on Mobile, Bottom-Right on Desktop) */}
      <div className="absolute top-24 left-0 w-full h-[70svh] lg:h-auto lg:bottom-0 lg:top-auto lg:right-[1%] xl:right-[3%] lg:left-auto lg:w-auto z-10 pointer-events-none flex items-start lg:items-end justify-center lg:justify-end">
        <div ref={imageFrameRef} className="relative w-full h-full lg:w-auto lg:h-auto origin-bottom translate-y-0 flex items-start lg:items-end justify-center">
          <img 
            src="/FOTO GRANDE.png" 
            alt="Dr. Omar Algazal - Dermatologista" 
            className="block w-full h-full lg:w-auto lg:h-auto lg:max-h-[94vh] xl:max-h-[96vh] max-w-[100vw] lg:max-w-[620px] xl:max-w-[720px] object-cover object-top lg:object-contain lg:object-bottom drop-shadow-[0_20px_40px_rgba(35,48,74,0.12)] pointer-events-auto"
          />
          {/* Gradient shadow for mobile text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent lg:hidden"></div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-30 flex flex-col justify-end lg:justify-center pt-[45vh] lg:pt-0 mt-auto lg:mt-0 pb-6 lg:pb-0">
        <div className="w-full lg:w-7/12 xl:w-6/12 relative">
          
          <div className="inline-flex items-center gap-3 mb-4 opacity-80">
            <span className="w-8 h-[1px] bg-accent/60"></span>
            <span className="text-primary-dark/60 text-xs font-body tracking-[0.3em] uppercase font-light">Dermatologia & Cuidado</span>
          </div>

          <h1 
            ref={headlineRef}
            className="text-primary-dark text-3xl md:text-4xl lg:text-[3.25rem] font-heading font-light leading-[1.15] tracking-tight mb-5 drop-shadow-sm lg:drop-shadow-none"
          >
            Saúde, ciência e a <span className="text-accent italic font-normal">sensibilidade</span> <br className="hidden lg:block"/>
            de um cuidado exclusivo.
          </h1>
          
          <p 
            ref={sublineRef}
            className="text-secondary-dark/85 text-sm md:text-base max-w-md font-body font-medium lg:font-light leading-relaxed mb-8 drop-shadow-sm lg:drop-shadow-none"
          >
            Muito além da estética, desenvolvemos um projeto integral para a sua pele. Oferecemos um diagnóstico meticuloso e tratamentos de ponta para quem não abre mão da excelência em cada detalhe.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/contato"
              className="group relative px-7 py-3.5 overflow-hidden bg-primary-dark text-white font-body font-light text-xs md:text-sm tracking-[0.15em] uppercase transition-all text-center rounded-full hover:shadow-[0_10px_30px_rgba(35,48,74,0.15)] hover:-translate-y-0.5 w-full sm:w-auto block shadow-xl"
            >
              <span className="relative z-10">Agendar Consulta</span>
            </Link>
            
            <Link 
              href="/sobre"
              className="px-7 py-3.5 bg-white/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none text-primary-dark border border-primary-dark/20 font-body font-light text-xs md:text-sm tracking-[0.15em] uppercase hover:bg-white/80 transition-all text-center rounded-full w-full sm:w-auto block shadow-sm lg:shadow-none"
            >
              Conhecer a Clínica
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
