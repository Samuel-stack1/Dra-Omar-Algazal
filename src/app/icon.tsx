import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1D21',
          color: '#A3804A',
          borderRadius: '50%',
          fontSize: '22px',
          fontWeight: 'bold',
          fontFamily: 'Georgia, serif',
          border: '2px solid #A3804A'
        }}
      >
        O
      </div>
    ),
    { ...size }
  );
}
