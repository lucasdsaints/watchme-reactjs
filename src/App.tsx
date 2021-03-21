import { useState } from 'react';
import { useLoading, ThreeDots } from '@agney/react-loading';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { Genre } from './models/genre.model';

import './styles/global.scss';

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots />
  });

  function handleClickButton(genre: Genre) {
    setSelectedGenre(genre);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar handleSelectGenre={handleClickButton} />
      {selectedGenre.id ? (
        <Content genre={selectedGenre}/>
      ) : (
        <section
          className="loading-section"
          {...containerProps}
        >
          {indicatorEl}
        </section>
      )}
    </div>
  )
}