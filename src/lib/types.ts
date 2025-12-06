export type TravelPackage = {
  id: string;
  agencyId: string;
  title: string;
  destination: string;
  durationDays: number;
  price: number;
  rating: number;
  totalReviews: number;
  category: 'Family' | 'Adventure' | 'Religious' | 'Youth';
  description: string;
  includes: string[];
  excludes: string[];
  images: string[];
  featured?: boolean;
};

export type Agency = {
  id: string;
  name: string;
  logoUrl: string;
  rating: number;
  totalReviews: number;
};

export type Review = {
  id: string;
  packageId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};
