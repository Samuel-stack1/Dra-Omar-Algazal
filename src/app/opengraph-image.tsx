import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dr. Omar Algazal - Dermatologista';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
          backgroundColor: '#1A1D21',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            border: '4px solid #A3804A',
            borderRadius: '50%',
            width: '180px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '100px',
            color: '#A3804A',
            fontWeight: 'bold',
            fontFamily: 'Georgia, serif',
            marginBottom: '40px',
          }}
        >
          O
        </div>
        <div style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '20px', color: '#D4C5B0' }}>
          Dr. Omar Algazal
        </div>
        <div style={{ fontSize: '36px', color: '#A8A8A8' }}>
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
