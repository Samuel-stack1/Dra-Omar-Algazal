import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-main px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        
        {/* Decorative 404 */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-heading font-light text-primary-dark/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
              <span className="text-3xl md:text-4xl text-accent font-heading">?</span>
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary-dark">
            Página não encontrada
          </h2>
          <p className="text-secondary-dark/70 font-body text-base md:text-lg max-w-md mx-auto leading-relaxed">
            A página que você está procurando pode ter sido removida, mudado de nome, ou está temporariamente indisponível.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 bg-primary-dark text-white px-8 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <Home size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            Voltar ao Início
          </Link>
        </div>

      </div>
    </div>
  );
}
