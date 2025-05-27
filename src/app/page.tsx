'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/db/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/home');
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]); 

  return null;
}