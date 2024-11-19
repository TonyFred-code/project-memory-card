import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import Loader from './components/Loader.jsx';
import './styles/Base.css';
import pickRandom from 'pick-random';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [emojis, setEmojis] = useState([]);
  const [error, setError] = useState(null);

  const groups = [
    'people_body',
    'component',
    'smileys_emotion',
    'animals_nature',
    'food_drink',
    'travel_places',
    'activities',
    'objects',
    'symbols',
    'flags',
  ];

  useEffect(() => {
    async function fetchEmojis() {
      try {
        const baseUrl = 'https://api.api-ninjas.com/v1/emoji?';
        const [group] = pickRandom(groups);
        const offset = 10;

        const url = `${baseUrl}group=${group}&offset=${offset}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-API-Key': 'e+54iau6M600oDTT3LBh3w==bVb76eh0D03vSEEz',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEmojis(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchEmojis();
  }, []);

  if (isLoading) return <Loader loading={isLoading} />;
  if (error) return <div>Error: {error}</div>;

  return <HomePage emojis={emojis} />;
}

export default App;
