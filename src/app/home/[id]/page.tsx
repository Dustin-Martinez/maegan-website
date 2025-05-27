// app/movie/[id]/page.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { movieDetails, sampleComments } from '@/lib/movie-data/page';

export default function MoviePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const movieId = parseInt(params.id);
  const movie = movieDetails[movieId as keyof typeof movieDetails];
  
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState(
    sampleComments.filter(comment => comment.movieId === movieId)
  );

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#121218] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        movieId: movie.id,
        user: "You",
        avatar: "/assets/default-avatar.jpg",
        comment: newComment,
        rating: rating,
        date: new Date().toISOString().split('T')[0]
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
      setRating(5);
    }
  };

  return (
    <div className="min-h-screen bg-[#121218] text-white">
      {/* Cover Photo with Back Button */}
      <div className="relative h-96 w-full overflow-hidden">
        {movie.coverSrc && (
          <Image
            src={movie.coverSrc}
            alt={`${movie.title} Cover`}
            fill
            className="object-cover"
            quality={100}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/80 to-transparent" />
        
        {/* Back Button - positioned top left */}
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Movie Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-full lg:w-1/3 xl:w-1/4 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl transform -translate-y-20">
              <Image
                src={movie.src}
                alt={movie.title}
                width={400}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className="w-full lg:w-2/3 xl:w-3/4 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300 mb-4">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <span>{movie.genre}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold flex items-center">
                  <span className="mr-1">★</span>
                  <span>{movie.rating}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button 
                onClick={() => setIsInWatchlist(!isInWatchlist)}
                className={`flex items-center px-4 py-2 rounded-lg transition ${isInWatchlist ? 'bg-blue-600 text-white' : 'bg-[#1D1D24] text-gray-300 hover:bg-[#282834]'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center px-4 py-2 rounded-lg transition ${isFavorite ? 'bg-red-600 text-white' : 'bg-[#1D1D24] text-gray-300 hover:bg-[#282834]'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {isFavorite ? 'Favorite' : 'Add to Favorites'}
              </button>
              <button 
                onClick={() => {}}
                className="flex items-center px-4 py-2 rounded-lg transition bg-blue-600 text-white hover:bg-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Now
              </button>
            </div>

            {/* Movie Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>

            {/* Movie Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="bg-[#1D1D24] text-gray-300 px-3 py-1 rounded-full text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.tags?.map((tag, index) => (
                    <span key={index} className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-[#282834] pt-8">
              <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
              
              {/* Add Comment */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <span className="mr-2 text-gray-300">Your rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                      >
                        {star <= rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this movie..."
                  className="w-full bg-[#1D1D24] border border-[#282834] rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  rows={3}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-[#1D1D24] rounded-xl p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={comment.avatar}
                            alt={comment.user}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{comment.user}</h4>
                            <div className="flex items-center text-yellow-400 text-sm">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>{i < comment.rating ? '★' : '☆'}</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300 mb-2">{comment.comment}</p>
                          <p className="text-gray-500 text-sm">{comment.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}