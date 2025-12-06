'use server';

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getSdks } from '@/firebase';

type UserProfile = {
    name: string;
    email: string;
    phone: string;
    role: 'traveler' | 'agency' | 'admin';
    profilePicture: string;
}

export async function createUserProfile(uid: string, data: UserProfile) {
    const { firestore } = getSdks();
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        try {
            await setDoc(userRef, {
                ...data,
                id: uid,
                verified: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            console.log(`User profile created for UID: ${uid}`);

            if (data.role === 'agency') {
                const agencyRef = doc(firestore, 'agencies', uid);
                await setDoc(agencyRef, {
                    id: uid,
                    userId: uid,
                    businessName: data.name,
                    // Default values for a new agency
                    licenseNumber: '',
                    address: '',
                    city: '',
                    wilaya: '',
                    country: 'Algeria',
                    description: '',
                    logo: data.profilePicture || '',
                    rating: 0,
                    totalReviews: 0,
                    verified: false,
                    verificationDocuments: [],
                    createdAt: serverTimestamp(),
                })
                console.log(`Agency profile created for UID: ${uid}`);
            }

        } catch (error) {
            console.error("Error creating user profile or agency:", error);
            throw new Error("Failed to create user profile.");
        }
    } else {
        console.log(`User profile for UID: ${uid} already exists.`);
    }
}
