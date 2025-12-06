
import { Timestamp } from 'firebase/firestore';

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
  status: 'active' | 'inactive' | 'draft';
  createdAt: string | Timestamp; // Allow string for serialized, Timestamp for Firestore
  updatedAt: string | Timestamp;
};

export type Agency = {
  id: string;
  userId: string;
  businessName: string;
  logo: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
};

export type Review = {
  id: string;
  packageId: string;
  userId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  createdAt: Date; // Use Date object for easier handling in components
};
