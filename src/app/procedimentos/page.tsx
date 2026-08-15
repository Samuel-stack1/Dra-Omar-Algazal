import Diferenciais from '../../components/sections/Diferenciais';

export default function ProcedimentosPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 pt-12 pb-8">
        <h1 className="text-primary-dark text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4">
          Nossos Procedimentos
        </h1>
        <p className="text-secondary-dark/80 text-base md:text-lg max-w-2xl font-body">
          Tecnologia avançada e protocolos exclusivos para resultados naturais e duradouros, sempre focando na saúde integral da sua pele.
        </p>
      </div>
      <Diferenciais />
    </div>
  );
}
