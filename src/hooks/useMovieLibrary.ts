// src/hooks/useMovieLibrary.ts
import { useState, useMemo } from 'react';
// Adjust path to your main movie data source
import { allMoviesData as importedAllMoviesData, Movie } from '@/lib/movie-data/page'; 
import { useUserLibrary } from './useUserLibrary'; // Import the new hook

// Add "My Library" to the genres list
export const genres = ["All", "My Library", "Action", "Horror", "Romance", "Fantasy", "Sci-Fi", "Thriller", "Drama", "Other"];

export function useMovieLibrary() {
  const [activeGenre, setActiveGenre] = useState("All");
  const { libraryMovieIds, isLoadingLibrary, isUserLoggedIn } = useUserLibrary();

  const filteredMovies = useMemo(() => {
    if (activeGenre === "My Library") {
      if (!isUserLoggedIn) return []; // Or show a message to log in
      if (isLoadingLibrary) return []; // Optionally show a loading state for library movies
      return importedAllMoviesData.filter(movie => libraryMovieIds.has(movie.id));
    }
    
    return importedAllMoviesData.filter(movie => 
      activeGenre === "All" || 
      movie.genre.split('/').some(g => 
        g.trim().toLowerCase() === activeGenre.toLowerCase()
      )
    );
  }, [activeGenre, libraryMovieIds, isLoadingLibrary, isUserLoggedIn]);

  // You might not need to split into popularMovies and tvShows if "My Library" is active
  // Or you can adapt this logic
  const popularMovies = useMemo(() => {
    if (activeGenre === "My Library") {
      return filteredMovies.filter(m => m.type === 'movie');
    }
    return filteredMovies.filter(m => m.type === 'movie' && 
      (activeGenre === "All" || m.genre.toLowerCase().includes(activeGenre.toLowerCase()))
    ).slice(0,18); // Original slicing logic for other genres
  }, [filteredMovies, activeGenre]);

  const tvShows = useMemo(() => {
    if (activeGenre === "My Library") {
      return filteredMovies.filter(m => m.type === 'tv-show');
    }
    return filteredMovies.filter(m => m.type === 'tv-show' && 
      (activeGenre === "All" || m.genre.toLowerCase().includes(activeGenre.toLowerCase()))
    ).slice(0,12); // Original slicing logic
  }, [filteredMovies, activeGenre]);


  return {
    genres, // Export the updated genres list
    activeGenre,
    setActiveGenre,
    popularMovies,
    tvShows,
    filteredMovies, // All movies filtered by genre or library
    isLoadingLibrary, // Pass this through for UI
    isUserLoggedIn,
    libraryMovieIds // Expose this if needed directly by UI
  };
}