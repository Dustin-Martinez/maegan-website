'use client';

import MovieCard, { useMovieLibrary } from "@/component/movie-card";
import { Header } from "@/component/header";
import { useEffect } from 'react';

export default function HomePage() {
  const {
    genres,
    activeGenre,
    setActiveGenre,
    popularMovies,
    tvShows,
    filteredMovies
  } = useMovieLibrary();

  // Add this effect to close the mobile menu when navigating
  useEffect(() => {
    const handleRouteChange = () => {
      // You might want to add mobile menu close logic here if needed
    };
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1A1A]">
      <Header />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Genre Filter Buttons */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeGenre === genre
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#26262F] text-white hover:bg-blue-500'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Popular Movies Section */}
          {popularMovies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-6">POPULAR</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {popularMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          )}

          {/* TV Shows Section */}
          {tvShows.length > 0 && (
            <section>
              <h2 className="text-white text-2xl font-bold mb-6">TV SHOWS</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {tvShows.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">No movies found in the {activeGenre} genre</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}