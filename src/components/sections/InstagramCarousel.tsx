"use client";
import React, { useRef, useState } from 'react';
import { Film, ExternalLink, Play, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

interface InstagramPost {
  id: string;
  title: string;
  tag: string;
  image: string;
  url: string;
  embedUrl: string;
}

export default function InstagramCarouselSection({ 
  posts = [], 
  profilePictureUrl = "" 
}: { 
  posts?: InstagramPost[],
  profilePictureUrl?: string 
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeModalReel, setActiveModalReel] = useState<any>(null);

  useGSAP(() => {
    gsap.fromTo('.reels-header',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        clearProps: 'all',
      }
    );
  }, { scope: sectionRef });

  if (!posts || posts.length === 0) return null;

  // Quadruplicamos a lista para o efeito de rolagem infinita contínua
  const infiniteReels = [...posts, ...posts, ...posts, ...posts];

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-bg-main relative overflow-hidden">
      
      {/* Inline Styles para o Marquee Contínuo */}
      <style>{`
        @keyframes marqueeSeamless {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .reels-marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marqueeSeamless 45s linear infinite;
          will-change: transform;
        }
        .reels-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="reels-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-dark/10 hover:bg-primary-dark/20 border border-primary-dark/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary-dark transition-all mb-3"
            >
              <Film className="w-4 h-4 text-accent" />
              <span>@dr.omaralgazal • Reels Oficiais</span>
            </a>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-primary-dark tracking-tight">
              Acompanhe no Instagram
            </h2>
            <p className="mt-2 text-base text-secondary-dark/75 font-body max-w-xl">
              Passe o mouse para pausar ou clique em qualquer Reel para assistir diretamente no site.
            </p>
          </div>

          <div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-dark hover:bg-accent text-white px-5 py-3 rounded-full text-xs font-medium transition-all shadow-md hover:shadow-lg"
            >
              <InstagramIcon className="w-4 h-4 text-white" />
              <span>Ver Todos no Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Container do Carrossel com efeito de "fade" nas bordas */}
      <div
        className="w-full overflow-hidden relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div className="reels-marquee-track py-4">
          {infiniteReels.map((reel, idx) => (
            <div
              key={`${reel.id}-${idx}`}
              onClick={() => setActiveModalReel(reel)}
              className="shrink-0 w-64 sm:w-72 aspect-[9/16] rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl border border-primary-dark/15 group cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
            >
              <img
                src={reel.image}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Barra superior estilo Instagram */}
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  {profilePictureUrl ? (
                    <img src={profilePictureUrl} alt="Dr Omar" className="w-6 h-6 rounded-full border border-white/40 object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-white/40 bg-white" />
                  )}
                  <span className="text-white text-xs font-semibold drop-shadow">
                    dr.omaralgazal
                  </span>
                </div>
                <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  REELS
                </span>
              </div>

              {/* Botão de Play Central */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full bg-black/40 group-hover:bg-accent text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all shadow-xl border border-white/20">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Legenda e Ação no rodapé */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white space-y-2 z-10">
                <span className="inline-block bg-accent text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white">
                  {reel.tag}
                </span>

                <p className="text-xs sm:text-sm font-medium leading-snug line-clamp-2 text-white/95 font-body">
                  {reel.title}
                </p>

                <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 font-semibold">
                  <span className="flex items-center gap-1.5 text-white">
                    <Play className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span>Dar Play no Site</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para tocar o vídeo diretamente no site */}
      {activeModalReel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            
            <div className="p-4 bg-primary-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Tocando Reels
                </span>
              </div>

              <button
                onClick={() => setActiveModalReel(null)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Iframe do Instagram */}
            <div className="relative w-full h-[520px] bg-black flex items-center justify-center overflow-hidden">
              <iframe
                src={activeModalReel.embedUrl}
                title={activeModalReel.title}
                className="w-full h-full border-0"
                allow="encrypted-media"
              />
            </div>

            <div className="p-4 bg-white flex items-center justify-between border-t border-neutral-gray/10">
              <span className="text-xs text-secondary-dark font-medium truncate max-w-[200px] font-body">
                {activeModalReel.title}
              </span>

              <a
                href={activeModalReel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary-dark hover:bg-accent text-white px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
