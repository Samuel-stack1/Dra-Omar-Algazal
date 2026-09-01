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
  videoUrl?: string;
}

export default function InstagramCarouselSection({ 
  posts = [], 
  profilePictureUrl = "" 
}: { 
  posts?: InstagramPost[],
  profilePictureUrl?: string 
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeVideoIdx, setActiveVideoIdx] = useState<number | null>(null);

  // Drag & Scroll State
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragged = useRef(false);

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

  // Auto-scroll loop
  React.useEffect(() => {
    let animationFrameId: number;
    const track = trackRef.current;
    if (!track) return;

    const scroll = () => {
      // Pause if hovered, playing video, or dragging
      if (!isHovered && activeVideoIdx === null && !isDragging) {
        track.scrollLeft += 1;
        
        // Infinite loop: if we scroll past half the duplicated content, reset back seamlessly
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 4;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, activeVideoIdx, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    isDragged.current = false;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    if (Math.abs(walk) > 5) isDragged.current = true;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  if (!posts || posts.length === 0) return null;

  // Quadruplicamos a lista para o efeito de rolagem infinita contínua
  const infiniteReels = [...posts, ...posts, ...posts, ...posts];

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-bg-main relative overflow-hidden">
      
      {/* Hide Scrollbar Styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="reels-header flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <a
              href="https://www.instagram.com/omaralgazal.dermato"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-dark/10 hover:bg-primary-dark/20 border border-primary-dark/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary-dark transition-all mb-3"
            >
              <Film className="w-4 h-4 text-accent" />
              <span>@omaralgazal.dermato • Reels Oficiais</span>
            </a>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-primary-dark tracking-tight">
              Acompanhe no Instagram
            </h2>
            <p className="mt-2 text-base text-secondary-dark/75 font-body max-w-xl">
              Arraste para os lados, passe o mouse para pausar ou clique em qualquer Reel para assistir diretamente no site.
            </p>
          </div>

          <div>
            <a
              href="https://www.instagram.com/omaralgazal.dermato"
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
        className="w-full relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div 
          ref={trackRef}
          className={`hide-scrollbar flex gap-6 py-4 overflow-x-auto touch-pan-x select-none cursor-grab active:cursor-grabbing`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); handleMouseUpOrLeave(); }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
        >
          {infiniteReels.map((reel, idx) => {
            const isPlaying = activeVideoIdx === idx;
            
            return (
              <div
                key={`${reel.id}-${idx}`}
                onClick={(e) => {
                  if (isDragged.current) {
                    e.preventDefault();
                    return;
                  }
                  // If it's a video and not playing, play it
                  if (reel.videoUrl && !isPlaying) {
                    setActiveVideoIdx(idx);
                  } else if (!reel.videoUrl) {
                    // If it's an image, just open instagram in new tab
                    window.open(reel.url, '_blank');
                  }
                }}
                className={`shrink-0 w-64 sm:w-72 aspect-[9/16] rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl border border-primary-dark/15 group transition-all duration-300 transform ${isPlaying ? 'scale-105 shadow-2xl z-20 cursor-default' : 'hover:-translate-y-1.5 cursor-pointer z-10'}`}
              >
                {isPlaying && reel.videoUrl ? (
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                    onEnded={() => setActiveVideoIdx(null)}
                  />
                ) : (
                  <img
                    src={reel.image}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Overlays - Hide when playing video */}
                {!isPlaying && (
                  <>
                    {/* Barra superior estilo Instagram */}
                    <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        {profilePictureUrl ? (
                          <img src={profilePictureUrl} alt="Dr Omar" className="w-6 h-6 rounded-full border border-white/40 object-cover" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-white/40 bg-white" />
                        )}
                        <span className="text-white text-xs font-semibold drop-shadow">
                          omaralgazal.dermato
                        </span>
                      </div>
                      <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {reel.tag}
                      </span>
                    </div>

                    {/* Botão de Play Central (somente se for video) */}
                    {reel.tag === 'REEL' && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-14 h-14 rounded-full bg-black/40 group-hover:bg-accent text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all shadow-xl border border-white/20">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Legenda e Ação no rodapé */}
                    <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white space-y-2 z-10">
                      <span className="inline-block bg-accent text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white">
                        {reel.tag === 'REEL' ? 'Dermatologia' : 'Post'}
                      </span>

                      <p className="text-xs sm:text-sm font-medium leading-snug line-clamp-2 text-white/95 font-body">
                        {reel.title}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15 font-semibold">
                        <span className="flex items-center gap-1.5 text-white">
                          {reel.tag === 'REEL' ? (
                            <>
                              <Play className="w-3.5 h-3.5 fill-accent text-accent" />
                              <span>Dar Play no Site</span>
                            </>
                          ) : (
                            <>
                              <InstagramIcon className="w-3.5 h-3.5 text-accent" />
                              <span>Ver no Instagram</span>
                            </>
                          )}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </>
                )}
                
                {/* Botão para fechar o vídeo sem esperar acabar */}
                {isPlaying && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveVideoIdx(null); }}
                    className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-accent text-white p-2 rounded-full backdrop-blur-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
