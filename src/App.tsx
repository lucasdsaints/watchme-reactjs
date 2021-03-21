import { useEffect, useState } from 'react';
import { useLoading, ThreeDots } from '@agney/react-loading';

import { api } from './services/api';
import { MovieCard } from './components/MovieCard';
import { SideBar } from './components/SideBar';
import { Genre } from './models/genre.model';

import './styles/global.scss';
import './styles/content.scss';


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [selectedGenreId, setSelectedGenreId] = useState<number>();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots />
  }); 

  useEffect(() => {
    if (!selectedGenreId) {
      return;
    }

    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar handleSelectGenre={handleClickButton} />

      <div className="container">
        {selectedGenreId ? (
          <>
            <header>
              <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
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
          </>
        ) : (
          <section
            className="loading-section"
            {...containerProps}
          >
            {indicatorEl}
          </section>
        )}
      </div>
    </div>
  )
}