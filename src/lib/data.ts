
'use server';
import { collection, doc, getDoc, getDocs, query, where, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getSdks } from '@/firebase/server'; // Changed import
import type { TravelPackage, Agency, Review } from './types';
import { PlaceHolderImages } from './placeholder-images';

export async function getPackages(filters: { category?: string; featured?: boolean } = {}) {
  const { firestore } = getSdks();
  const packagesRef = collection(firestore, 'packages');
  
  let q = query(packagesRef);

  if (filters.category) {
    q = query(q, where('category', '==', filters.category));
  }
  if (filters.featured) {
    q = query(q, where('featured', '==', true));
  }

  const querySnapshot = await getDocs(q);
  const packages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TravelPackage));
  return packages;
}

export async function getPackageById(id: string): Promise<TravelPackage | null> {
    const { firestore } = getSdks();
    const docRef = doc(firestore, 'packages', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return { 
            id: docSnap.id, 
            ...data,
            // Convert Timestamps to serializable format
            createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
            updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
        } as TravelPackage;
    } else {
        return null;
    }
}

export async function getAgencyById(id: string): Promise<Agency | null> {
    const { firestore } = getSdks();
    // In our schema, the agency ID is the same as the user ID
    const docRef = doc(firestore, 'agencies', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const agencyData = docSnap.data();
        return { 
            id: docSnap.id,
            businessName: agencyData.businessName,
            logo: agencyData.logo || PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageUrl,
            rating: agencyData.rating,
            totalReviews: agencyData.totalReviews,
            verified: agencyData.verified,
            userId: agencyData.userId,
        } as Agency;
    } else {
        console.warn(`Agency with ID ${id} not found.`);
        return null;
    }
}


export async function getReviewsForPackage(packageId: string): Promise<Review[]> {
    const { firestore } = getSdks();
    const reviewsRef = collection(firestore, 'reviews');
    const q = query(reviewsRef, where('packageId', '==', packageId));
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];

    for (const doc of querySnapshot.docs) {
        const reviewData = doc.data();
        const userDoc = await getDoc(doc(firestore, 'users', reviewData.userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            reviews.push({
                ...reviewData,
                id: doc.id,
                user: {
                    name: userData.name,
                    avatarUrl: userData.profilePicture || ''
                },
                // Convert timestamp
                createdAt: (reviewData.createdAt as Timestamp)?.toDate() || new Date(),
            } as Review);
        }
    }
    return reviews;
}

export async function getPackagesByAgency(agencyId: string) {
  const { firestore } = getSdks();
  const packagesRef = collection(firestore, 'packages');
  const q = query(packagesRef, where('agencyId', '==', agencyId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TravelPackage));
}

type CreatePackageData = Omit<TravelPackage, 'id' | 'agencyId' | 'createdAt' | 'updatedAt' | 'rating' | 'totalReviews'>;


export async function createPackage(agencyId: string, packageData: CreatePackageData) {
    const { firestore } = getSdks();
    try {
        // Ensure image IDs are valid, otherwise use a placeholder
        const validatedImages = packageData.images?.length ? packageData.images : ['detail-gallery-1'];

        const docRef = await addDoc(collection(firestore, 'packages'), {
            ...packageData,
            agencyId: agencyId,
            rating: 0,
            totalReviews: 0,
            images: validatedImages, // use validated images
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating package: ", error);
        return { success: false, error: (error as Error).message };
    }
}
