'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// Adjust the import path based on your project structure
// e.g., '../data/moviesData' or '@/data/moviesData' if using path aliases
import { allMoviesData as importedAllMoviesData, Movie as MovieType, getMovieById } from '@/lib/movie-data/page'; 

// Genres can remain here or be moved to the data file as well if preferred
const genres = ["All", "Action", "Horror", "Romance", "Fantasy", "Sci-Fi", "Thriller", "Drama", "Other"];

interface MovieCardProps {
  movieId: number | string; // Expects an ID
}

export function useMovieLibrary() {
  const [activeGenre, setActiveGenre] = useState("All");

  const filteredMovies = importedAllMoviesData.filter(movie => 
    activeGenre === "All" || 
    movie.genre.split('/').some(g => 
      g.trim().toLowerCase() === activeGenre.toLowerCase()
    )
  );

  const popularMovies = filteredMovies.filter(m => m.type === 'movie');
  const tvShows = filteredMovies.filter(m => m.type === 'tv-show');

  return {
    genres,
    activeGenre,
    setActiveGenre,
    popularMovies,
    tvShows,
    filteredMovies
  };
}

export default function MovieCard({ movieId }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const movie = getMovieById(movieId);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none'; 
    const parent = target.parentElement;
    
    if (parent && movie) { 
      parent.style.backgroundColor = '#1a1a23'; 
      if (!parent.querySelector('.fallback-text-container')) {
        const fallback = document.createElement('div');
        fallback.className = 'fallback-text-container absolute inset-0 flex items-center justify-center p-4';
        fallback.innerHTML = `
          <div class="text-center">
            <h3 class="text-white font-medium text-lg mb-1">${movie.title}</h3>
            <p class="text-gray-300 text-sm">${movie.genre}</p>
          </div>
        `;
        parent.appendChild(fallback);
      }
    }
  };

  if (!movie) {
    return (
      <div className="relative group w-full p-4 bg-[#1D1D24] rounded-xl shadow-lg text-white text-center h-[550px] flex items-center justify-center">
        <p>Movie with ID: {String(movieId)} not found.</p>
      </div>
    );
  }

  return (
    <div 
      className="relative group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/home/${movie.id}`} className="block">
        <div 
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out'
          }}
          className={`
            bg-[#1D1D24] rounded-xl overflow-hidden shadow-lg
            ${isHovered ? 'shadow-xl shadow-black/40' : ''}
          `}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden" style={{ width: '100%', height: '450px' }}>
            {movie.src ? (
              <div className="w-full h-full">
                <Image
                  src={movie.src}
                  alt={movie.title}
                  fill
                  style={{
                    objectFit: 'cover'
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={handleImageError}
                  priority={movie.id <= 6} // movie.id is already a number here
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-[#1a1a23] flex items-center justify-center p-4">
                <div className="text-center">
                  <h3 className="text-white font-medium text-lg mb-1">{movie.title}</h3>
                  <p className="text-gray-300 text-sm">${movie.genre}</p>
                </div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className={`
            p-4 transition-colors duration-300 h-[100px]
            ${isHovered ? 'bg-[#282834]' : 'bg-[#1D1D24]'}
          `}>
            <h3 
              style={{
                color: isHovered ? '#60A5FA' : 'white',
                transition: 'color 0.3s ease-in-out'
              }}
              className="font-medium text-lg mb-1 line-clamp-2"
            >
              {movie.title}
            </h3>
            <p 
              style={{
                color: isHovered ? '#93C5FD' : '#9CA3AF',
                transition: 'color 0.3s ease-in-out'
              }}
              className="text-sm line-clamp-1"
            >
              {movie.genre}
            </p>
          </div>
        </div>

        {isHovered && (
          <div className="
            absolute inset-0 rounded-xl
            bg-blue-500/10 pointer-events-none
            transition-opacity duration-500
          " />
        )}
      </Link>
    </div>
  );
}