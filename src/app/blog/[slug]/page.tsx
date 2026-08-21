import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return { title: 'Artigo não encontrado' };

  return {
    title: `${post.title} | Dr. Omar Algazal`,
    description: post.excerpt || `Artigo escrito por Dr. Omar Algazal.`,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat('pt-BR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  }).format(post.publishedAt);

  return (
    <main className="min-h-screen bg-bg-main selection:bg-accent/20 selection:text-primary-dark flex flex-col">
      <Header />
      
      <article className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto flex-grow w-full">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-xs font-body uppercase tracking-widest text-primary-dark/60 hover:text-accent transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Voltar para o Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-6 opacity-80 justify-center">
            <span className="w-8 h-[1px] bg-accent/60"></span>
            <span className="text-accent text-xs font-body tracking-[0.2em] uppercase font-light">
              {formattedDate}
            </span>
            <span className="w-8 h-[1px] bg-accent/60"></span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-heading font-light text-primary-dark mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-secondary-dark/80 font-body text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-2xl border border-primary-dark/5">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Body - Using Tailwind Typography (prose) */}
        <div 
          className="prose prose-lg prose-neutral max-w-none mx-auto font-body font-light text-secondary-dark leading-relaxed prose-headings:font-heading prose-headings:font-normal prose-headings:text-primary-dark prose-a:text-accent hover:prose-a:text-primary-dark prose-a:transition-colors prose-img:rounded-xl prose-img:shadow-lg prose-hr:border-primary-dark/10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Author signature */}
        <div className="mt-16 pt-8 border-t border-primary-dark/10 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-dark/5 border border-primary-dark/10 flex-shrink-0">
                <img src="/FOTO GRANDE.png" alt="Dr. Omar Algazal" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="text-primary-dark font-heading text-lg">Dr. Omar Algazal</p>
                <p className="text-secondary-dark/60 font-body text-xs tracking-wider uppercase">Dermatologista - CRM 24117</p>
              </div>
           </div>
        </div>

      </article>

      <Footer />
    </main>
  );
}
