'use client';
import { useState } from 'react'; 
import MovieCard from "@/component/movie-card";

interface Movie {
  id: number;
  title: string;
  genre: string;
  src?: string;
}

interface Library {
  watchlist: Movie[];
  archive: Movie[];
  favorites: Movie[];
}

export default function LibraryPage() {
  const [activeLibraryTab, setActiveLibraryTab] = useState<'watchlist' | 'archive' | 'favorites'>('watchlist');
  const [library, setLibrary] = useState<Library>({
    watchlist: [
      { id: 1, title: "BLACK PANTHER: LONG LIVE THE KING", genre: "Action/Sci-Fi", src: "/assets/BP.jpg" },
      { id: 2, title: "SPIDER-MAN: NO WAY HOME", genre: "Sci-Fi/Action", src: "/assets/spider man main.jpg" }
    ],
    archive: [
      { id: 3, title: "SMILE", genre: "Horror/Mystery", src: "/assets/smile.png" },
      { id: 4, title: "SHADOW BONE", genre: "Fantasy/Horror", src: "/assets/SB.jpg" }
    ],
    favorites: [
      { id: 5, title: "US", genre: "Horror", src: "/assets/us.jpg" },
      { id: 6, title: "AVENGERS: END GAME", genre: "Sci-Fi/Action", src: "/assets/avengers.jpg" }
    ]
  });

  const handleRemoveMovie = (movieId: number) => {
    setLibrary(prev => ({
      ...prev,
      [activeLibraryTab]: prev[activeLibraryTab].filter(movie => movie.id !== movieId)
    }));
  };

  const currentMovies = library[activeLibraryTab];

  return (
    <main className="min-h-screen bg-[#1A1A1A] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-3 mb-6 overflow-x-auto pb-4">
          {(['watchlist', 'archive', 'favorites'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveLibraryTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeLibraryTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#26262F] text-white hover:bg-blue-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold capitalize">
            {activeLibraryTab}
          </h2>
          <p className="text-gray-400">
            {currentMovies.length} {currentMovies.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {currentMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {currentMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <button
                  onClick={() => handleRemoveMovie(movie.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  aria-label={`Remove from ${activeLibraryTab}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
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
              No movies in your {activeLibraryTab}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}