import Link from 'next/link';
import prisma from '../../lib/prisma';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Blog | Dr. Omar Algazal',
  description: 'Artigos e novidades sobre dermatologia, saúde da pele e estética avançada.',
};

export default async function BlogPage() {
  // Fetch posts from database, ordered by publish date
  let posts: any[] = [];
  
  try {
    posts = await prisma.post.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      // We only need specific fields for the listing to save bandwidth
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
      }
    });
  } catch (error) {
    console.error("Database connection failed. Showing empty blog state for preview.", error);
    // Continue with empty posts array to show the UI
  }

  return (
    <main className="min-h-screen bg-bg-main selection:bg-accent/20 selection:text-primary-dark">
      <Header />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4 opacity-80 justify-center">
            <span className="w-8 h-[1px] bg-accent/60"></span>
            <span className="text-primary-dark/60 text-xs font-body tracking-[0.3em] uppercase font-light">
              Conteúdo Especializado
            </span>
            <span className="w-8 h-[1px] bg-accent/60"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary-dark mb-6">
            O Diário <span className="italic text-accent">Clínico</span>
          </h1>
          <p className="text-secondary-dark/80 font-body text-base md:text-lg font-light leading-relaxed">
            Informações embasadas na ciência e orientações valiosas para a saúde e beleza da sua pele.
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-primary-dark/10 rounded-2xl bg-white/30 backdrop-blur-sm">
            <p className="text-primary-dark/60 font-body text-lg font-light">Nenhum artigo publicado ainda. Volte em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white/40 backdrop-blur-sm border border-primary-dark/5 hover:border-primary-dark/15 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Cover Image */}
                <div className="aspect-[4/3] relative overflow-hidden bg-primary-dark/5">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-primary-dark/20 text-4xl font-heading font-light">OA</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <span className="text-xs font-body tracking-widest text-accent/80 uppercase mb-3 block">
                    {new Intl.DateTimeFormat('pt-BR', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    }).format(post.publishedAt)}
                  </span>
                  
                  <h2 className="text-xl md:text-2xl font-heading font-normal text-primary-dark mb-4 leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-secondary-dark/75 font-body text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt || 'Leia o artigo completo...'}
                  </p>
                  
                  <div className="mt-auto flex items-center text-xs font-body uppercase tracking-widest text-primary-dark group-hover:text-accent transition-colors">
                    <span>Ler Artigo</span>
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}
