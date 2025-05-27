'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const genres = ["All", "Action", "Horror", "Romance", "Fantasy", "Sci-Fi", "Thriller", "Drama", "Other"];

const movies = [
  // Popular Movies (18 items)
  { 
    id: 1, 
    title: "BLACK PANTHER: LONG LIVE THE KING", 
    genre: "Action/Sci-Fi", 
    src: "/assets/BP.jpg" 
  },
  { 
    id: 2, 
    title: "SPIDER-MAN: NO WAY HOME", 
    genre: "Sci-Fi/Action", 
    src: "/assets/spider man main.jpg" 
  },
  { 
    id: 3, 
    title: "SMILE", 
    genre: "Horror/Mystery",
    src: "/assets/smile.png" 
  },
  { 
    id: 4, 
    title: "SHADOW BONE", 
    genre: "Fantasy/Horror",
    src: "/assets/SB.jpg" 
  },
  { 
    id: 5, 
    title: "US", 
    genre: "Horror",
    src: "/assets/us.jpg" 
  },
  { 
    id: 6, 
    title: "AVENGERS: END GAME", 
    genre: "Sci-Fi/Action",
    src: "/assets/avengers.jpg" 
  },
  { 
    id: 7, 
    title: "JOHN WICK 4", 
    genre: "Action/Thriller",
    src: "/assets/johnwick.jpg"
  },
  { 
    id: 8, 
    title: "DUNE", 
    genre: "Sci-Fi/Adventure",
    src:"/assets/dune.jpg" 
  },
  { 
    id: 9, 
    title: "THE BATMAN", 
    genre: "Action/Crime",
    src: "/assets/batman.jpg"
  },
  {
    id: 10,
    title: "TOP GUN: MAVERICK",
    genre: "Action/Drama",
    src: "/assets/topgun.jpg"
  },
  {
    id: 11,
    title: "BLACK ADAM",
    genre: "Action/Fantasy",
    src:"/assets/blackadam.jpg"
  },
  {
    id: 12,
    title: "DOCTOR STRANGE 2",
    genre: "Fantasy/Action",
    src: "/assets/doctorstrange 2.jpg"
  },
  {
    id: 13,
    title: "JURASSIC WORLD",
    genre: "Sci-Fi/Adventure",
    src:  "/assets/jurassic world.jpg"
  },
  {
    id: 14,
    title: "THE NORTHMAN",
    genre: "Action/Adventure",
    src: "/assets/northman.png"
  },
  {
    id: 15,
    title: "BULLET TRAIN",
    genre: "Action/Comedy",
    src: "/assets/bullettrain.jpg"
  },
  {
    id: 16,
    title: "NOPE",
    genre: "Horror/Sci-Fi",
    src:"/assets/nope.jpg"
  },
  {
    id: 17,
    title: "THE LOST CITY",
    genre: "Action/Comedy",
    src: "/assets/thelostcity.jpg"
  },
  {
    id: 18,
    title: "AMSTERDAM",
    genre: "Drama/Comedy",
    src: "/assets/amsterdam.jpg"
  },
  
  // TV Shows (12 items)
  { 
    id: 19, 
    title: "DEXTER SEASON 2", 
    genre: "Thriller/Drama",
    src: "/assets/Dexter.png" 
  },
  { 
    id: 20, 
    title: "THE WALKING DEAD", 
    genre: "Horror",
    src: "/assets/TheWalkingDeadPoster.jpg" 
  },
  { 
    id: 21, 
    title: "PRISON BREAK", 
    genre: "Action",
    src: "/assets/PB.jpg" 
  },
  {
    id: 22,
    title: "THE WITCHER: BLOOD OF ELVES",
    genre: "Fantasy/Action",
    src: "/assets/TW.jfif"
  },
  {
    id: 23,
    title: "STRANGER THINGS",
    genre: "Sci-Fi/Horror",
    src: "/assets/St.jpg"
  },
  {
    id: 24,
    title: "GAME OF THRONES",
    genre: "Fantasy/Drama",
    src: "/assets/GOT.jpg"
  },
  {
    id: 25,
    title: "BREAKING BAD",
    genre: "Drama/Crime",
    src: "/assets/breakingbad.jpg"
  },
  {
    id: 26,
    title: "PEAKY BLINDERS",
    genre: "Drama/Crime",
    src: "/assets/peakyblinders.jpg"
  },
  {
    id: 27,
    title: "MONEY HEIST",
    genre: "Thriller/Crime",
    src: "/assets/moneyheist.jpg"
  },
  {
    id: 28,
    title: "THE MANDALORIAN",
    genre: "Sci-Fi/Action",
    src: "/assets/mandalorian.jpg"
  },
  {
    id: 29,
    title: "LUCIFER",
    genre: "Fantasy/Crime",
    src: "/assets/lucifer.jpg"
  },
  {
    id: 30,
    title: "THE BOYS",
    genre: "Action/Sci-Fi",
    src: "/assets/theboys.jpg"
  }
];

interface MovieCardProps {
  movie: {
    id: number | string;
    title: string;
    genre: string;
    src?: string;
  };
}

export function useMovieLibrary() {
  const [activeGenre, setActiveGenre] = useState("All");

  const filteredMovies = movies.filter(movie => 
    activeGenre === "All" || 
    movie.genre.split('/').some(g => 
      g.trim().toLowerCase() === activeGenre.toLowerCase()
    )
  );

  // First 18 items are Popular Movies, last 12 are TV Shows
  const popularMovies = filteredMovies.slice(0, 18);
  const tvShows = filteredMovies.slice(18, 30);

  return {
    genres,
    activeGenre,
    setActiveGenre,
    popularMovies,
    tvShows,
    filteredMovies
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const parent = target.parentElement;
    
    if (parent) {
      parent.style.backgroundColor = '#1a1a23';
      const fallback = document.createElement('div');
      fallback.className = 'absolute inset-0 flex items-center justify-center p-4';
      fallback.innerHTML = `
        <div class="text-center">
          <h3 class="text-white font-medium text-lg mb-1">${movie.title}</h3>
          <p class="text-gray-300 text-sm">${movie.genre}</p>
        </div>
      `;
      parent.appendChild(fallback);
    }
  };

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
                  priority={Number(movie.id) <= 6}
                />
                {/* Single Overlay with Gradient */}
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
                  <p className="text-gray-300 text-sm">{movie.genre}</p>
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

        {/* Subtle Glow Effect */}
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