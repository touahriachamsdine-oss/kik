import type { TravelPackage, Agency, Review } from '@/lib/types';

export const agencies: Agency[] = [
  {
    id: 'agency-1',
    name: 'Sahara Adventures Inc.',
    logoUrl: '/logo-placeholder-1.svg',
    rating: 4.8,
    totalReviews: 124,
  },
  {
    id: 'agency-2',
    name: 'Coastal Dreams Travel',
    logoUrl: '/logo-placeholder-2.svg',
    rating: 4.5,
    totalReviews: 88,
  },
];

export const travelPackages: TravelPackage[] = [
  {
    id: 'pkg-1',
    agencyId: 'agency-1',
    title: 'Mystical Sahara Expedition',
    destination: 'Djanet, Algeria',
    durationDays: 7,
    price: 1200,
    rating: 4.7,
    totalReviews: 45,
    category: 'Adventure',
    description: 'Experience the breathtaking landscapes of the Sahara. This tour includes 4x4 excursions, camping under the stars, and visits to ancient rock art sites.',
    includes: ['Accommodation', '4x4 transportation', 'All meals', 'Local guide'],
    excludes: ['Flights to Djanet', 'Personal expenses', 'Travel insurance'],
    images: ['sahara-desert', 'detail-gallery-1', 'detail-gallery-2'],
    featured: true,
  },
  {
    id: 'pkg-2',
    agencyId: 'agency-2',
    title: 'Algiers Historical Tour',
    destination: 'Algiers, Algeria',
    durationDays: 3,
    price: 450,
    rating: 4.5,
    totalReviews: 62,
    category: 'Family',
    description: 'Discover the rich history of Algiers, from the Casbah to the French colonial architecture. A perfect weekend getaway for the whole family.',
    includes: ['3-star hotel', 'Breakfast', 'Guided city tour', 'Museum tickets'],
    excludes: ['Lunches and dinners', 'Airport transfer'],
    images: ['algiers-casbah', 'detail-gallery-3', 'detail-gallery-1'],
    featured: true,
  },
  {
    id: 'pkg-3',
    agencyId: 'agency-2',
    title: 'Mediterranean Coast Relax',
    destination: 'Tipaza, Algeria',
    durationDays: 5,
    price: 800,
    rating: 4.6,
    totalReviews: 30,
    category: 'Family',
    description: 'Relax on the beautiful Mediterranean coast and explore the ancient Roman ruins of Tipaza. A perfect blend of leisure and history.',
    includes: ['4-star resort', 'Half-board (Breakfast & Dinner)', 'Beach access', 'Tour of ruins'],
    excludes: ['Lunches', 'Water sports'],
    images: ['coastal-city', 'roman-ruins', 'detail-gallery-2'],
    featured: true,
  },
  {
    id: 'pkg-4',
    agencyId: 'agency-1',
    title: 'Constantine, City of Bridges',
    destination: 'Constantine, Algeria',
    durationDays: 4,
    price: 600,
    rating: 4.8,
    totalReviews: 55,
    category: 'Youth',
    description: 'Explore the spectacular city of Constantine, famous for its dramatic gorge and bridges. A journey full of stunning views and rich culture.',
    includes: ['Boutique hotel stay', 'Daily breakfast', 'Guided tours of bridges', 'Palace of Ahmed Bey entrance'],
    excludes: ['Transportation to Constantine', 'Other meals'],
    images: ['detail-gallery-3', 'detail-gallery-1', 'detail-gallery-2'],
  },
  {
    id: 'pkg-5',
    agencyId: 'agency-2',
    title: 'Parisian Dream',
    destination: 'Paris, France',
    durationDays: 6,
    price: 2500,
    rating: 4.9,
    totalReviews: 150,
    category: 'Youth',
    description: 'Experience the magic of Paris. Visit the Eiffel Tower, Louvre Museum, and wander through the charming streets of Montmartre.',
    includes: ['Flights from Algiers', '4-star hotel', 'Daily breakfast', 'Seine river cruise'],
    excludes: ['Visa fees', 'Lunches and dinners', 'Metro tickets'],
    images: ['paris-eiffel', 'detail-gallery-1', 'detail-gallery-3'],
    featured: true,
  },
  {
    id: 'pkg-6',
    agencyId: 'agency-1',
    title: 'Gateway to the Orient: Istanbul',
    destination: 'Istanbul, Turkey',
    durationDays: 8,
    price: 2200,
    rating: 4.8,
    totalReviews: 110,
    category: 'Family',
    description: 'Immerse yourself in the vibrant culture of Istanbul, where East meets West. Explore historic mosques, bustling bazaars, and enjoy delicious Turkish cuisine.',
    includes: ['Round-trip flights', 'Centrally located hotel', 'Bosphorus tour', 'Visits to Blue Mosque and Hagia Sophia'],
    excludes: ['Visa fees', 'Most meals', 'Personal shopping'],
    images: ['istanbul-mosque', 'detail-gallery-2', 'detail-gallery-3'],
  },
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    packageId: 'pkg-1',
    user: { name: 'Karim B.', avatarUrl: 'user-avatar-1' },
    rating: 5,
    comment: 'An absolutely unforgettable experience! The desert landscapes were surreal. The guide was knowledgeable and the food was surprisingly good. Highly recommended!',
    date: '2023-11-15',
  },
  {
    id: 'rev-2',
    packageId: 'pkg-2',
    user: { name: 'Fatima Z.', avatarUrl: 'user-avatar-2' },
    rating: 4,
    comment: 'A great short trip. The Casbah is fascinating. The hotel was okay, but the location was perfect. Good value for the money.',
    date: '2024-02-20',
  },
  {
    id: 'rev-3',
    packageId: 'pkg-1',
    user: { name: 'David L.', avatarUrl: 'user-avatar-3' },
    rating: 5,
    comment: 'Sleeping under the stars in the Sahara is a once-in-a-lifetime experience. The organization by Sahara Adventures was flawless. Every detail was taken care of.',
    date: '2023-12-05',
  },
];

export function getPackageById(id: string): TravelPackage | undefined {
  return travelPackages.find(p => p.id === id);
}

export function getAgencyById(id: string): Agency | undefined {
  return agencies.find(a => a.id === id);
}

export function getReviewsForPackage(packageId: string): Review[] {
  return reviews.filter(r => r.packageId === packageId);
}
