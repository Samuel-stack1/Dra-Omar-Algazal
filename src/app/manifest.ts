import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dr. Omar Algazal - Dermatologista',
    short_name: 'Dr. Omar',
    description: 'Dermatologia Médica & Cosmiatria em São José do Rio Preto - SP.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F9FA',
    theme_color: '#23304A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
