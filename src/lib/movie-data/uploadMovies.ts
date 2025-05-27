// uploadMovies.ts
import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';
import * as movieData from './movies.json';

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const db = admin.firestore();

interface Movie {
  id: number;
  title: string;
  genre: string;
  src?: string;
  coverSrc?: string;
  description?: string;
  year?: string;
  director?: string;
  cast?: string[];
  rating?: string;
  duration?: string;
  tags?: string[];
}

const uploadMovies = async () => {
  const moviesCollectionRef = db.collection('movies');

  try {
    // Corrected: Access the movieDetails property from the imported JSON data
    const movieDetails: { [key: string]: Movie } = movieData.movieDetails;

    for (const movieId in movieDetails) {
      if (Object.hasOwnProperty.call(movieDetails, movieId)) {
        const movie = movieDetails[movieId];
        await moviesCollectionRef.doc(String(movie.id)).set(movie);
        console.log(`Uploaded movie: ${movie.title} with ID: ${movie.id}`);
      }
    }
    console.log('All movies uploaded successfully!');
  } catch (error) {
    console.error('Error uploading movies:', error);
  }
};

uploadMovies();
