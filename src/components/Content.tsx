import { useEffect, useState } from 'react';

import '../styles/content.scss';

import { Genre } from '../models/genre.model';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  genre: Genre;
}

export function Content({ genre }: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!genre.id) {
      return;
    }

    api.get<Movie[]>(`movies/?Genre_id=${genre.id}`).then(response => {
      setMovies(response.data);
    });
  }, [genre]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {genre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key ={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}