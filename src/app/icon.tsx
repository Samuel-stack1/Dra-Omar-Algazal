import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const logoPath = join(process.cwd(), 'public', 'Símbolo-48.png');
  let logoBase64 = '';
  try {
    const logoData = await readFile(logoPath);
    logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;
  } catch (e) {
    console.error('Error loading logo for icon');
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1D21', // Fundo escuro para combinar com o site
          overflow: 'hidden',
        }}
      >
        {logoBase64 ? (
          <img 
            src={logoBase64} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              transform: 'scale(1.8)'
            }} 
          />
        ) : (
          <div style={{ color: '#A3804A' }}>O</div>
        )}
      </div>
    ),
    { ...size }
  );
}
