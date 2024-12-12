import { useState, useEffect } from 'react';
import pickRandom from 'pick-random';
import randomInteger from 'random-int';
import HomePage from './components/HomePage';
import Loader from './components/Loader';
import './styles/Base.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [emojis, setEmojis] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    const CACHE_KEY = 'emoji_cache';
    const CACHE_TIME_KEY = 'emoji_cache_time';
    const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds
    const LOADER_DURATION = randomInteger(1099, 1900);

    async function fetchEmojis() {
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

      const dataObj = JSON.stringify(data);

      if (dataObj.length === 0) throw new Error(`Fetch Failed. API error`);

      // Store data and timestamp in localStorage
      localStorage.setItem(CACHE_KEY, dataObj);
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

      return data;
    }

    function loadCachedEmojis(offline = false) {
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

      if (cachedData && cachedData.length !== 0 && cachedTime) {
        const timeElapsed = Date.now() - parseInt(cachedTime, 10);
        if (timeElapsed < CACHE_EXPIRATION || offline) {
          return cachedData; // Use cached data if it's still valid
        }
      }
      return null; // Cache is invalid or non-existent
    }

    const cachedEmojis = loadCachedEmojis();

    if (cachedEmojis) {
      setEmojis(cachedEmojis);
      setTimeout(() => {
        setIsLoading(false);
      }, LOADER_DURATION);
    } else {
      fetchEmojis()
        .then((data) => {
          setEmojis(data);
          setTimeout(() => {
            setIsLoading(false);
          }, LOADER_DURATION);
        })
        .catch((err) => {
          const backUp = loadCachedEmojis(true);

          if (backUp) {
            setEmojis(backUp);
          } else {
            setError(err.message);
          }
          setTimeout(() => {
            setIsLoading(false);
          }, LOADER_DURATION);
        });
    }
  }, []);

  if (isLoading) return <Loader loading={isLoading} />;
  if (error) return <div>Error: {error}</div>;

  return <HomePage emojis={emojis} />;
}

export default App;
