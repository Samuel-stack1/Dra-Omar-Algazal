import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Dr. Omar Algazal - Dermatologista';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  // Ler a imagem do logo para base64
  const logoPath = join(process.cwd(), 'public', 'Símbolo-48.png');
  let logoBase64 = '';
  try {
    const logoData = await readFile(logoPath);
    logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;
  } catch (e) {
    console.error('Error loading logo for OG image');
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1D21', // Fundo escuro premium
          color: 'white',
          padding: '40px',
        }}
      >
        {logoBase64 ? (
          <img src={logoBase64} alt="Logo" width={180} height={180} style={{ marginBottom: '40px', objectFit: 'contain' }} />
        ) : (
          <div style={{ width: 180, height: 180, border: '4px solid #A3804A', borderRadius: '50%', marginBottom: '40px' }} />
        )}
        
        <div style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '20px', color: '#D4C5B0', fontFamily: 'serif' }}>
          Dr. Omar Algazal
        </div>
        <div style={{ fontSize: '36px', color: '#A8A8A8', fontWeight: 'normal' }}>
          Dermatologia Médica & Cosmiatria
        </div>
        <div style={{ fontSize: '28px', color: '#A3804A', marginTop: '30px' }}>
          Dermatologista Titular SBD • RQE 124117
        </div>
      </div>
    ),
    { ...size }
  );
}
