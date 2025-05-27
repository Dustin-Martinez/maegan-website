// app/library/page.tsx (or your path for the library page)
'use client';
import { useState, useMemo, useEffect } from 'react'; 
import MovieCard from "@/component/movie-card"; // Assuming this path is correct for your MovieCard
import { useUserLibrary } from '@/hooks/useUserLibrary'; // ADJUST PATH if needed
import { useAuth } from '@/hooks/useAuth';                 // ADJUST PATH if needed
import { allMoviesData, Movie as MovieType } from '@/lib/movie-data/page'; // ADJUST PATH if needed
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

type LibraryTab = 'watchlist' | 'archive' | 'favorites';

export default function LibraryPage() {
  const [activeLibraryTab, setActiveLibraryTab] = useState<LibraryTab>('watchlist');
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const handleGoBack = () => {
    router.push('/'); // Navigates to the home page (e.g., your main landing page)
  };
  const { 
    // Watchlist related
    libraryMovieIds, 
    removeFromLibrary, 
    isLoadingLibrary, 
    
    // Archive related
    archiveMovieIds, 
    removeFromArchive, 
    isLoadingArchive, 
    
    // Favorites related
    favoriteMovieIds, 
    removeFromFavorites, 
    isLoadingFavorites, 
    
    isUserLoggedIn 
  } = useUserLibrary();

  // Memoize the current movies based on the active tab and Firebase data
  const currentMovies = useMemo(() => {
    // console.log(`[LibraryPage] Recalculating currentMovies. Tab: ${activeLibraryTab}, UserLoggedIn: ${isUserLoggedIn}, AuthLoading: ${authLoading}`);
    if (!isUserLoggedIn || authLoading) {
      // console.log("[LibraryPage] currentMovies: Not logged in or auth loading, returning []");
      return [];
    }

    let idsToFilter: Set<number> | undefined;
    let specificLoadingState = false;

    if (activeLibraryTab === 'watchlist') {
      idsToFilter = libraryMovieIds;
      specificLoadingState = isLoadingLibrary;
      // console.log("[LibraryPage] currentMovies - Watchlist: ids:", idsToFilter, "loading:", specificLoadingState);
    } else if (activeLibraryTab === 'archive') {
      idsToFilter = archiveMovieIds;
      specificLoadingState = isLoadingArchive;
      // console.log("[LibraryPage] currentMovies - Archive: ids:", idsToFilter, "loading:", specificLoadingState);
    } else if (activeLibraryTab === 'favorites') {
      idsToFilter = favoriteMovieIds;
      specificLoadingState = isLoadingFavorites;
      // console.log("[LibraryPage] currentMovies - Favorites: ids:", idsToFilter, "loading:", specificLoadingState);
    }

    if (specificLoadingState || !idsToFilter || idsToFilter.size === 0) { // Also check if idsToFilter is empty
      // console.log(`[LibraryPage] currentMovies: Specific list for '${activeLibraryTab}' loading or no IDs, returning []`);
      return [];
    }
    
    const filtered = allMoviesData.filter(movie => idsToFilter!.has(movie.id));
    // console.log(`[LibraryPage] currentMovies - Filtered result for '${activeLibraryTab}':`, filtered);
    return filtered;
  }, [
    activeLibraryTab, 
    libraryMovieIds, isLoadingLibrary,
    archiveMovieIds, isLoadingArchive,
    favoriteMovieIds, isLoadingFavorites,
    isUserLoggedIn, authLoading,
    // allMoviesData // Only if allMoviesData can change dynamically; if it's a static import, it's not strictly needed here.
  ]);

  // Determine the loading state for the currently active tab
  const isLoadingCurrentTab = useMemo(() => {
    let loading = false;
    if (activeLibraryTab === 'watchlist') loading = isLoadingLibrary;
    else if (activeLibraryTab === 'archive') loading = isLoadingArchive;
    else if (activeLibraryTab === 'favorites') loading = isLoadingFavorites;
    // console.log(`[LibraryPage] isLoadingCurrentTab for '${activeLibraryTab}':`, loading);
    return loading;
  }, [activeLibraryTab, isLoadingLibrary, isLoadingArchive, isLoadingFavorites]);


  const handleRemoveFromActiveLibrary = async (movieId: number) => {
    // console.log(`[LibraryPage] Attempting to remove movie ID ${movieId} from tab '${activeLibraryTab}'`);
    if (activeLibraryTab === 'watchlist') {
      await removeFromLibrary(movieId);
    } else if (activeLibraryTab === 'archive') {
      await removeFromArchive(movieId);
    } else if (activeLibraryTab === 'favorites') {
      await removeFromFavorites(movieId);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#1A1A1A] pt-20 pb-8 flex items-center justify-center">
        <p className="text-white text-xl">Loading user data...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] pt-12 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Tab Buttons */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="flex items-center text-blue-500 hover:text-blue-400 mb-8 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <FiArrowLeft className="text-2xl mr-2" />
            <span className="text-lg">Back to Home</span>
          </motion.button>
        <div className="flex gap-3 mb-6 overflow-x-auto pb-4">
          {(['watchlist', 'archive', 'favorites'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveLibraryTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm sm:text-base ${
                activeLibraryTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#26262F] text-white hover:bg-blue-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Title and Item Count */}
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold capitalize">
            {activeLibraryTab}
          </h2>
          {isUserLoggedIn && !isLoadingCurrentTab && ( // Only show count if logged in and not loading current tab
            <p className="text-gray-400">
              {currentMovies.length} {currentMovies.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>

        {/* Conditional Content Area */}
        {!isUserLoggedIn ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl mb-4">
              Please <Link href="/login" className="text-blue-500 hover:underline">log in</Link> to view your {activeLibraryTab}.
            </p>
          </div>
        ) : isLoadingCurrentTab ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">Loading your {activeLibraryTab}...</p> {/* Loading message for the current tab */}
          </div>
        ) : currentMovies.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {currentMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movieId={movie.id} />
                <button
                    onClick={() => handleRemoveFromActiveLibrary(movie.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                    aria-label={`Remove from ${activeLibraryTab}`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3 w-3 sm:h-4 sm:w-4" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">
              No movies in your {activeLibraryTab}.
              {isUserLoggedIn && ( // Only show "add some" if logged in
                 <> Go <Link href="/home" className="text-blue-500 hover:underline">add some!</Link></>
              )}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}