import Hero from '../components/sections/Hero';
import SobreMim from '../components/sections/SobreMim';
import Filosofia from '../components/sections/Filosofia';
import AreasAtuacao from '../components/sections/AreasAtuacao';
import Diferenciais from '../components/sections/Diferenciais';
import InstagramCarouselSection from '../components/sections/InstagramCarousel';
import FAQ from '../components/sections/FAQ';
import Contato from '../components/sections/Contato';

export const revalidate = 86400; // Cache for 24 hours to stay within Behold API rate limit

export default async function Home() {
  let instagramPosts = [];

  try {
    const res = await fetch('https://feeds.behold.so/pb1uleK39vkTEyv9OYUj');
    if (res.ok) {
      const data = await res.json();
      if (data && data.posts) {
        instagramPosts = data.posts.map((post: any) => ({
          id: post.id,
          title: post.prunedCaption || post.caption || '',
          tag: post.mediaType === 'VIDEO' ? 'REEL' : 'POST',
          image: post.thumbnailUrl || post.sizes?.large?.mediaUrl || post.mediaUrl,
          url: post.permalink,
          embedUrl: post.permalink + 'embed/',
        }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch Instagram posts from Behold API:", error);
  }

  return (
    <>
      <Hero />
      <SobreMim />
      <Filosofia />
      <Diferenciais />
      <AreasAtuacao />
      <InstagramCarouselSection posts={instagramPosts} />
      <FAQ />
      <Contato />
    </>
  );
}
