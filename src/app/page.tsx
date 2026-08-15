import Hero from '../components/sections/Hero';
import SobreMim from '../components/sections/SobreMim';
import Filosofia from '../components/sections/Filosofia';
import AreasAtuacao from '../components/sections/AreasAtuacao';
import Diferenciais from '../components/sections/Diferenciais';
import InstagramCarouselSection from '../components/sections/InstagramCarousel';
import FAQ from '../components/sections/FAQ';
import Contato from '../components/sections/Contato';

export default function Home() {
  return (
    <>
      <Hero />
      <SobreMim />
      <Filosofia />
      <Diferenciais />
      <AreasAtuacao />
      <InstagramCarouselSection />
      <FAQ />
      <Contato />
    </>
  );
}
