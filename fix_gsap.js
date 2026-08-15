import fs from 'fs';
import path from 'path';

const dir = 'src/components/sections';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already registered
  if (content.includes('gsap.registerPlugin(ScrollTrigger)')) return;

  // Only process if it uses scrollTrigger
  if (!content.includes('scrollTrigger:')) return;

  // Add import
  if (content.includes("import gsap from 'gsap';")) {
    content = content.replace("import gsap from 'gsap';", "import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);");
  }

  fs.writeFileSync(filePath, content);
  console.log('Fixed', file);
});
