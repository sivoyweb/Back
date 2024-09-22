export const categorizedDisabilities = [
  {
    category: 'Físicas',
    disabilities: [
      'Paraplejia',
      'Tetraplejia',
      'Amputación de miembro superior',
      'Amputación de miembro inferior',
      'Distrofia muscular',
      'Esclerosis múltiple',
      'Parálisis cerebral',
      'Espina bífida',
    ],
  },
  {
    category: 'Sensoriales',
    disabilities: [
      'Ceguera total',
      'Baja visión',
      'Sordera total',
      'Hipoacusia',
    ],
  },
  {
    category: 'Cognitivas',
    disabilities: [
      'Autismo',
      'Síndrome de Down',
      'Discapacidad cognitiva leve',
      'Afasia',
      'Dislexia',
    ],
  },
  {
    category: 'Psicosociales',
    disabilities: [
      'Discapacidad psicosocial (ansiedad, depresión severa)',
      'Parkinson',
      'Alzheimer',
    ],
  },
];

export const travelsMock = [
  {
    name: 'Tropical Paradise Adventure',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    date: new Date('2024-12-01'),
    price: 1500,
    description:
      'Explore the beautiful beaches of Rio and the vibrant culture of Brazil.',
    serviceType: 'Vacation Package',
    accesibilitySeal: 'Wheelchair Accessible',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZxAZ1pwAa_Lhf5XGcvy4Yl--cpwib67fHQ&s',
        publicID: 'imagen1',
      },
    ],
    stars: 5,
    available: true,
  },
  {
    name: 'Alpine Skiing Experience',
    country: 'Switzerland',
    city: 'Zermatt',
    date: new Date('2025-01-15'),
    price: 2500,
    description:
      'Ski through the snowy peaks of the Alps in this exclusive travel experience.',
    serviceType: 'Adventure Package',
    accesibilitySeal: 'Not Accessible',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZxAZ1pwAa_Lhf5XGcvy4Yl--cpwib67fHQ&s',
        publicID: 'imagen1',
      },
    ],
    stars: 4,
    available: true,
  },
  {
    name: 'Safari in the Serengeti',
    country: 'Tanzania',
    city: 'Serengeti',
    date: new Date('2024-11-20'),
    price: 3500,
    description:
      'Witness the majestic wildlife in its natural habitat with our guided safaris.',
    serviceType: 'Wildlife Tour',
    accesibilitySeal: 'Limited Accessibility',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZxAZ1pwAa_Lhf5XGcvy4Yl--cpwib67fHQ&s',
        publicID: 'imagen1',
      },
    ],
    stars: 5,
    available: true,
  },
  {
    name: 'Cultural Journey through Japan',
    country: 'Japan',
    city: 'Kyoto',
    date: new Date('2025-03-05'),
    price: 1800,
    description:
      'Discover the rich history and cultural treasures of Japan in this immersive tour.',
    serviceType: 'Cultural Tour',
    accesibilitySeal: 'Wheelchair Accessible',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZxAZ1pwAa_Lhf5XGcvy4Yl--cpwib67fHQ&s',
        publicID: 'imagen1',
      },
    ],
    stars: 5,
    available: true,
  },
  {
    name: 'Mediterranean Cruise',
    country: 'Italy',
    city: 'Venice',
    date: new Date('2024-09-10'),
    price: 2200,
    description:
      'Sail through the Mediterranean and visit iconic cities like Venice and Barcelona.',
    serviceType: 'Cruise',
    accesibilitySeal: 'Wheelchair Accessible',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZxAZ1pwAa_Lhf5XGcvy4Yl--cpwib67fHQ&s',
        publicID: 'imagen1',
      },
    ],
    stars: 4,
    available: true,
  },
];
