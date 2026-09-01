import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const logoPath = join(process.cwd(), 'public', 'Símbolo-49.png');
  let logoBase64 = '';
  try {
    const logoData = await readFile(logoPath);
    logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;
  } catch (e) {
    console.error('Error loading logo for apple icon');
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
          backgroundColor: 'white',
          borderRadius: '50%',
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
              transform: 'scale(1.4)'
            }} 
          />
        ) : (
          <div style={{ color: '#A3804A', fontSize: 100 }}>O</div>
        )}
      </div>
    ),
    { ...size }
  );
}
