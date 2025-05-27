// src/hooks/useUserLibrary.ts
import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set, remove, off } from 'firebase/database';
import { database } from '@/db/firebase'; // Assuming this path is correct
import { useAuth } from './useAuth';           // Assuming this path is correct

export function useUserLibrary() {
  const { user } = useAuth();
  const [libraryMovieIds, setLibraryMovieIds] = useState<Set<number>>(new Set());
  const [archiveMovieIds, setArchiveMovieIds] = useState<Set<number>>(new Set());
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<Set<number>>(new Set());
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(true);
  const [isLoadingArchive, setIsLoadingArchive] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  // Listener for Watchlist (Library)
  useEffect(() => {
    if (user) {
      setIsLoadingLibrary(true);
      const userLibraryRef = ref(database, `userLibraries/${user.uid}`);
      const unsubscribe = onValue(userLibraryRef, (snapshot) => {
        const data = snapshot.val();
        const ids = new Set<number>();
        if (data) {
          Object.keys(data).forEach(movieIdStr => {
            if (data[movieIdStr] === true) ids.add(Number(movieIdStr));
          });
        }
        setLibraryMovieIds(ids);
        setIsLoadingLibrary(false);
      }, (error) => {
        console.error("Error fetching user library:", error);
        setIsLoadingLibrary(false);
      });
      return () => {
        if (userLibraryRef) { // Ensure ref exists before calling off
            off(userLibraryRef, 'value', unsubscribe);
        }
      };
    } else {
      setLibraryMovieIds(new Set());
      setIsLoadingLibrary(false);
    }
  }, [user]);

  // Listener for Archive
  // Inside src/hooks/useUserLibrary.ts

// Listener for Archive
useEffect(() => {
    if (user) {
      setIsLoadingArchive(true);
      const userArchiveRef = ref(database, `userArchives/${user.uid}`);
      console.log(`Setting up listener for: userArchives/${user.uid}`); // DEBUG
      const unsubscribe = onValue(userArchiveRef, (snapshot) => {
        const data = snapshot.val();
        console.log(`Archive data for ${user.uid}:`, data); // DEBUG
        const ids = new Set<number>();
        if (data) {
          Object.keys(data).forEach(movieIdStr => {
             if (data[movieIdStr] === true) ids.add(Number(movieIdStr));
          });
        }
        console.log("Setting archiveMovieIds to:", ids); // DEBUG
        setArchiveMovieIds(ids);
        setIsLoadingArchive(false);
      }, (error) => { /* ... error handling ... */ });
      return () => { /* ... cleanup ... */ };
    } else { /* ... */ }
  }, [user]);
  
  // Listener for Favorites
  useEffect(() => {
    if (user) {
      setIsLoadingFavorites(true);
      const userFavoritesRef = ref(database, `userFavorites/${user.uid}`);
      console.log(`Setting up listener for: userFavorites/${user.uid}`); // DEBUG
      const unsubscribe = onValue(userFavoritesRef, (snapshot) => {
        const data = snapshot.val();
        console.log(`Favorites data for ${user.uid}:`, data); // DEBUG
        const ids = new Set<number>();
        if (data) {
          Object.keys(data).forEach(movieIdStr => {
            if (data[movieIdStr] === true) ids.add(Number(movieIdStr));
          });
        }
        console.log("Setting favoriteMovieIds to:", ids); // DEBUG
        setFavoriteMovieIds(ids);
        setIsLoadingFavorites(false);
      }, (error) => { /* ... error handling ... */ });
      return () => { /* ... cleanup ... */ };
    } else { /* ... */ }
  }, [user]);


  // --- Watchlist (Library) Functions ---
  const addToLibrary = useCallback(async (movieId: number): Promise<boolean> => { // <-- Return Promise<boolean>
    if (!user) {
      console.warn("User not logged in. Cannot add to library.");
      return false; // <-- Return false
    }
    try {
      const movieRef = ref(database, `userLibraries/${user.uid}/${movieId}`);
      await set(movieRef, true);
      return true; // <-- Return true on success
    } catch (error) {
      console.error("Error adding to library:", error);
      return false; // <-- Return false on error
    }
  }, [user]);

  const removeFromLibrary = useCallback(async (movieId: number): Promise<boolean> => { // <-- Return Promise<boolean>
    if (!user) {
      console.warn("User not logged in. Cannot remove from library.");
      return false;
    }
    try {
      const movieRef = ref(database, `userLibraries/${user.uid}/${movieId}`);
      await remove(movieRef);
      return true;
    } catch (error) {
      console.error("Error removing from library:", error);
      return false;
    }
  }, [user]);
  
  const isInLibrary = useCallback((movieId: number): boolean => {
    return libraryMovieIds.has(movieId);
  }, [libraryMovieIds]);

  // --- Archive Functions ---
  const addToArchive = useCallback(async (movieId: number): Promise<boolean> => { // <-- Return Promise<boolean>
    if (!user) {
      console.warn("User not logged in. Cannot add to archive.");
      return false;
    }
    try {
      const movieRef = ref(database, `userArchives/${user.uid}/${movieId}`);
      await set(movieRef, true);
      return true;
    } catch (error) {
      console.error("Error adding to archive:", error);
      return false;
    }
  }, [user]);

  const removeFromArchive = useCallback(async (movieId: number): Promise<boolean> => { // <-- Return Promise<boolean>
    if (!user) {
      console.warn("User not logged in. Cannot remove from archive.");
      return false;
    }
    try {
      const movieRef = ref(database, `userArchives/${user.uid}/${movieId}`);
      await remove(movieRef);
      return true;
    } catch (error) {
      console.error("Error removing from archive:", error);
      return false;
    }
  }, [user]);

  const isInArchive = useCallback((movieId: number): boolean => {
    return archiveMovieIds.has(movieId);
  }, [archiveMovieIds]);

  // --- Favorites Functions ---
  const addToFavorites = useCallback(async (movieId: number): Promise<boolean> => { // <-- Return Promise<boolean>
    if (!user) {
      console.warn("User not logged in. Cannot add to favorites.");
      return false;
    }
    try {
      const movieRef = ref(database, `userFavorites/${user.uid}/${movieId}`);
      await set(movieRef, true);
      return true;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      return false;
    }
  }, [user]);

  const removeFromFavorites = useCallback(async (movieId: number): Promise<boolean> => { // <-- Return Promise<boolean>
    if (!user) {
      console.warn("User not logged in. Cannot remove from favorites.");
      return false;
    }
    try {
      const movieRef = ref(database, `userFavorites/${user.uid}/${movieId}`);
      await remove(movieRef);
      return true;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return false;
    }
  }, [user]);

  const isInFavorites = useCallback((movieId: number): boolean => {
    return favoriteMovieIds.has(movieId);
  }, [favoriteMovieIds]);


  return { 
    libraryMovieIds, addToLibrary, removeFromLibrary, isInLibrary, isLoadingLibrary,
    archiveMovieIds, addToArchive, removeFromArchive, isInArchive, isLoadingArchive,
    favoriteMovieIds, addToFavorites, removeFromFavorites, isInFavorites, isLoadingFavorites,
    isUserLoggedIn: !!user 
  };
}