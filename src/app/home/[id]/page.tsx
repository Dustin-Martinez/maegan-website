// app/movie/[id]/page.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { getMovieById, Movie } from '@/lib/movie-data/page'; 
import { sampleComments, Comment as CommentType } from '@/lib/movie-data/commentsData'; 
import { useUserLibrary } from '../../../hooks/useUserLibrary'; 
import { useAuth } from '../../../hooks/useAuth'; 

export default function MoviePage() {
  const router = useRouter();
  const params = useParams();
  
  const paramId = typeof params.id === 'string' ? params.id : (Array.isArray(params.id) ? params.id[0] : '');
  const numericMovieId = parseInt(paramId, 10);

  const { user } = useAuth();
  const { 
    addToLibrary, removeFromLibrary, isInLibrary, 
    addToArchive, removeFromArchive, isInArchive,       // <-- Get Archive functions
    addToFavorites, removeFromFavorites, isInFavorites, // <-- Get Favorites functions
    isUserLoggedIn 
  } = useUserLibrary();

  const movie: Movie | undefined = getMovieById(numericMovieId);

  // --- State for UI based on Firebase ---
  const movieIsInWatchlist = isInLibrary(numericMovieId);
  const movieIsInArchive = isInArchive(numericMovieId);     // <-- Check if in Archive
  const movieIsInFavorites = isInFavorites(numericMovieId); // <-- Check if in Favorites

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState<CommentType[]>(() =>
    sampleComments.filter(comment => comment.movieId === numericMovieId)
  );

  if (isNaN(numericMovieId) || !movie) {
    // ... (your existing movie not found logic)
    if (!params.id) {
        return (
             <div className="min-h-screen bg-[#121218] text-white flex items-center justify-center">
                <p>Loading movie details or invalid route...</p>
            </div>
        )
    }
    return (
      <div className="min-h-screen bg-[#121218] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <p className="mb-2 text-gray-400">Could not find movie with ID: {paramId}</p>
          <button 
            onClick={() => router.push('/home')} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddComment = () => { /* ... (same as before) ... */ 
      if (newComment.trim() && movie) {
      const newCommentObj: CommentType = {
        id: comments.length + sampleComments.length + 1, 
        movieId: movie.id,
        user: user?.displayName || "You", 
        avatar: user?.photoURL || "/assets/avatars/default-avatar.png", 
        comment: newComment,
        rating: rating,
        date: new Date().toISOString().split('T')[0]
      };
      setComments(prevComments => [...prevComments, newCommentObj]);
      setNewComment("");
      setRating(5);
    }
  };

  const createToggleHandler = (
    isInList: boolean, 
    addToList: (id: number) => Promise<boolean>, 
    removeFromList: (id: number) => Promise<boolean>,
    listName: string // For alert message
  ) => async () => {
    if (!isUserLoggedIn) {
      alert(`Please log in to manage your ${listName}.`);
      return;
    }
    if (movie) {
      if (isInList) {
        await removeFromList(movie.id);
      } else {
        await addToList(movie.id);
        // Optional: If adding to Archive or Favorites, you might want to remove it from Watchlist
        // if (listName !== 'watchlist' && isInLibrary(movie.id)) {
        //   await removeFromLibrary(movie.id);
        // }
      }
    }
  };
  

  const handleToggleWatchlist = createToggleHandler(movieIsInWatchlist, addToLibrary, removeFromLibrary, 'watchlist');
  const handleToggleArchive = createToggleHandler(movieIsInArchive, addToArchive, removeFromArchive, 'archive');
  const handleToggleFavorites = createToggleHandler(movieIsInFavorites, addToFavorites, removeFromFavorites, 'favorites');

  return (
    <div className="min-h-screen bg-[#121218] text-white">
      {/* ... (Cover photo, back button, poster, movie title/info - same as before) ... */}
      <div className="relative h-96 w-full overflow-hidden">
        {movie.coverSrc && ( /* ... */ <Image src={movie.coverSrc} alt={`${movie.title} Cover`} fill className="object-cover" quality={100} priority /> )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/80 to-transparent" />
        <button onClick={() => router.back()} className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition z-10"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /> </svg> </button>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 lg:-mt-32">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 xl:w-1/4 relative"> <div className="rounded-xl overflow-hidden shadow-2xl lg:transform lg:-translate-y-20 mx-auto lg:mx-0 max-w-[300px] sm:max-w-[350px] lg:max-w-none"> <Image src={movie.src} alt={movie.title} width={400} height={600} className="w-full h-auto object-cover" /> </div> </div>
          <div className="w-full lg:w-2/3 xl:w-3/4 py-4 lg:pt-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6"> <div> <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1> <div className="flex flex-wrap items-center space-x-2 md:space-x-4 text-gray-300 mb-4 text-sm md:text-base"> <span>{movie.year}</span> <span className="hidden md:inline">•</span> <span className="md:hidden block h-2"></span> <span>{movie.duration}</span> <span className="hidden md:inline">•</span> <span className="md:hidden block h-2"></span> <span>{movie.genre.split('/').join(' / ')}</span> </div> </div> <div className="flex items-center space-x-2 mt-4 md:mt-0"> <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold flex items-center text-sm"> <span className="mr-1">★</span> <span>{movie.rating}</span> </div> </div> </div>


            {/* --- Updated Action Buttons --- */}
            <div className="flex flex-wrap gap-3 mb-8">
              {/* Watchlist Button */}
              <button 
                onClick={handleToggleWatchlist}
                disabled={!movie} 
                className={`flex items-center px-4 py-2 rounded-lg transition text-sm ${
                  movieIsInWatchlist 
                  ? 'bg-teal-600 text-white hover:bg-teal-700' 
                  : 'bg-[#1D1D24] text-gray-300 hover:bg-[#282834]'
                } ${(!isUserLoggedIn && movie) ? 'opacity-50 cursor-not-allowed' : ''}`} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                {movieIsInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>

              {/* Favorite Button */}
              <button 
                onClick={handleToggleFavorites} // Use the new handler
                disabled={!movie}
                className={`flex items-center px-4 py-2 rounded-lg transition text-sm ${
                  movieIsInFavorites // Check against Firebase state
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-[#1D1D24] text-gray-300 hover:bg-[#282834]'
                } ${(!isUserLoggedIn && movie) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill={movieIsInFavorites ? "currentColor" : "none"} strokeWidth={movieIsInFavorites ? 0 : 1.5} stroke="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                {movieIsInFavorites ? 'Favorite' : 'Add to Favorites'}
              </button>
              
              {/* Archive Button (New) */}
              <button 
                onClick={handleToggleArchive}
                disabled={!movie}
                className={`flex items-center px-4 py-2 rounded-lg transition text-sm ${
                  movieIsInArchive
                  ? 'bg-gray-600 text-white hover:bg-gray-700' // Style for "In Archive"
                  : 'bg-[#1D1D24] text-gray-300 hover:bg-[#282834]'
                } ${(!isUserLoggedIn && movie) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"> {/* Example Archive Icon */}
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                {movieIsInArchive ? 'Archived' : 'Archive'}
              </button>

              <button 
                onClick={() => alert("Watch Now functionality to be implemented!")}
                className="flex items-center px-4 py-2 rounded-lg transition text-sm bg-sky-500 text-white hover:bg-sky-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                Watch Trailer
              </button>
            </div>
            
            {/* ... (Movie Description, Info Grid, Comments Section - same as before, check add comment button's disabled state) ... */}
            <div className="mb-8"> <h2 className="text-xl font-semibold mb-3">Overview</h2> <p className="text-gray-300 leading-relaxed text-sm md:text-base">{movie.description}</p> </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8"> <div> <h3 className="text-lg font-semibold mb-2">Director</h3> <p className="text-gray-300">{movie.director}</p> </div> <div> <h3 className="text-lg font-semibold mb-2">Cast</h3> <div className="flex flex-wrap gap-2"> {movie.cast.map((actor, index) => ( <span key={index} className="bg-[#1D1D24] text-gray-300 px-3 py-1 rounded-full text-xs"> {actor} </span> ))} </div> </div> {movie.tags && movie.tags.length > 0 && ( <div className="md:col-span-2"> <h3 className="text-lg font-semibold mb-2">Tags</h3> <div className="flex flex-wrap gap-2"> {movie.tags.map((tag, index) => ( <span key={index} className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs"> {tag} </span> ))} </div> </div> )} </div>
            <div className="border-t border-[#282834] pt-8"> <h2 className="text-2xl font-semibold mb-6">Comments ({comments.length})</h2> <div className="mb-8 bg-[#16161c] p-4 sm:p-6 rounded-xl"> <h3 className="text-lg font-semibold mb-3 text-white">Leave a Comment</h3> <div className="flex items-center mb-3"> <span className="mr-2 text-gray-300 text-sm">Your rating:</span> <div className="flex"> {[1, 2, 3, 4, 5].map((star) => ( <button key={star} onClick={() => setRating(star)} className={`text-2xl focus:outline-none transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-400'}`} aria-label={`Rate ${star} stars`} > {star <= rating ? '★' : '☆'} </button> ))} </div> </div> <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share your thoughts about this movie..." className="w-full bg-[#1D1D24] border border-[#282834] rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 text-sm" rows={3} /> <button onClick={handleAddComment} disabled={!newComment.trim() || !isUserLoggedIn} className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium ${!isUserLoggedIn ? 'cursor-not-allowed opacity-50' : ''}`} > Post Comment </button> {!isUserLoggedIn && <p className="text-xs text-gray-400 mt-2">You need to be logged in to post a comment.</p>} </div> <div className="space-y-6"> {comments.length > 0 ? ( comments.slice().reverse().map((comment) => ( <div key={comment.id} className="bg-[#1D1D24] rounded-xl p-4 shadow"> <div className="flex items-start gap-3"> <Image src={comment.avatar || "/assets/avatars/default-avatar.png"} alt={`${comment.user}'s avatar`} width={40} height={40} className="rounded-full mt-1" /> <div className="flex-1"> <div className="flex items-center justify-between mb-1"> <h4 className="font-semibold text-sm text-white">{comment.user}</h4> <div className="flex items-center text-yellow-400 text-xs"> {Array.from({ length: 5 }).map((_, i) => ( <span key={i}>{i < comment.rating ? '★' : '☆'}</span> ))} </div> </div> <p className="text-gray-300 text-sm mb-2">{comment.comment}</p> <p className="text-gray-500 text-xs">{new Date(comment.date).toLocaleDateString()}</p> </div> </div> </div> )) ) : ( <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p> )} </div> </div>

          </div>
        </div>
      </div>
    </div>
  );
}