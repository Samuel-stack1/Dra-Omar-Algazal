import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-bg-main px-6 text-center">
      
      <span className="text-accent font-body text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 block">
        Erro 404
      </span>
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-light text-primary-dark mb-6">
        Página não encontrada
      </h1>
      
      <p className="text-secondary-dark/70 font-body text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
        A página que você tentou acessar pode ter sido removida ou o endereço foi digitado incorretamente.
      </p>

      <Link 
        href="/"
        className="inline-flex items-center gap-3 bg-primary-dark text-white px-8 py-4 rounded-full font-body text-xs tracking-[0.15em] uppercase hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg group"
      >
        <Home size={16} className="group-hover:-translate-y-0.5 transition-transform" />
        Voltar à Página Inicial
      </Link>

    </div>
  );
}
