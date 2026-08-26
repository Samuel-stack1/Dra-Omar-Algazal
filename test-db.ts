import prisma from './src/lib/prisma';

async function main() {
  const posts = await prisma.post.findMany();
  console.log("Total posts:", posts.length);
  if (posts.length > 0) {
    console.log("First post slug:", posts[0].slug);
    console.log("publishedAt type:", typeof posts[0].publishedAt, posts[0].publishedAt);
  }
}

main().catch(console.error);
