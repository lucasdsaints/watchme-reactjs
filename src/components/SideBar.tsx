import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';

import '../styles/sidebar.scss';
import { Genre } from '../models/genre.model';

interface SideBarProps {
  handleSelectGenre: (id: number) => void;
}

export function SideBar({ handleSelectGenre }: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setselectedGenreId] = useState(0);

  useEffect(() => {
    api.get<Genre[]>('genres').then((response) => {
      console.log(response.data)
      setGenres(response.data);
      setselectedGenreId(response.data[0].id);
      handleSelectGenre(response.data[0].id);
    });
  }, []);

  function handleSelectGenreButton(id: number) {
    setselectedGenreId(id);
    handleSelectGenre(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenreButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}