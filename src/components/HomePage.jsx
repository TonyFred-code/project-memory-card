import { mdiHelp, mdiPlay, mdiCog } from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/HomePage.css';
import { useState } from 'react';
import GamePlay from './GamePlay';
import HowToPlay from './HowToPlay';
import SettingsPage from './SettingsPage';

function HomePage({ emojis }) {
  const [pageOpen, setPageOpen] = useState({
    gamePlayPage: false,
    howToPlayPage: false,
    settingsPage: false,
  });

  const [bestPerformance, setBestPerformance] = useState({
    points: 0,
    time: +Infinity,
    pts: -Infinity, // points per second
  });

  const [difficulty, setDifficulty] = useState({
    easy: true,
    medium: false,
    hard: false,
  });
  const [sound, setSound] = useState({
    bg_music: true,
    sfx: true,
  });

  function updateDifficulty(nextDifficulty) {
    setDifficulty({ ...nextDifficulty });
  }

  function updateSound(nextSound) {
    setSound({ ...nextSound });
  }

  function activeDifficulty() {
    const difficultyKeys = Object.keys(difficulty);
    let diff = '';

    difficultyKeys.forEach((d) => {
      if (difficulty[d]) diff = d;
    });

    return diff;
  }

  function updatePerformance(points, time) {
    const floored = Math.floor(time / 1000);
    const gameTime = floored > 0 ? floored : 1;
    const pts = points / gameTime;

    if (Number.isFinite(pts) && pts > bestPerformance.pts) {
      setBestPerformance({
        points,
        time,
        pts,
      });
    }
  }

  function handleOpenPage(name) {
    const pagesKey = Object.keys(pageOpen);
    const nextPages = { ...pageOpen };

    pagesKey.forEach((page) => {
      if (page === name) {
        nextPages[page] = true;
      } else {
        nextPages[page] = false;
      }
    });

    setPageOpen(nextPages);
  }

  function handlePageClose() {
    const pagesKey = Object.keys(pageOpen);
    const nextPages = { ...pageOpen };

    pagesKey.forEach((page) => {
      nextPages[page] = false;
    });

    setPageOpen(nextPages);
  }

  if (pageOpen.gamePlayPage) {
    return (
      <GamePlay
        onClose={handlePageClose}
        highScore={bestPerformance.points}
        bestTime={bestPerformance.time}
        bestPointsPerSecond={bestPerformance.pts}
        emojis={emojis}
        onGameEnd={updatePerformance}
        difficulty={activeDifficulty()}
      />
    );
  }

  if (pageOpen.howToPlayPage) {
    return <HowToPlay onClose={handlePageClose} />;
  }

  if (pageOpen.settingsPage) {
    return (
      <SettingsPage
        onClose={handlePageClose}
        difficulty={difficulty}
        updateDifficulty={updateDifficulty}
        sounds={sound}
        updateSound={updateSound}
      />
    );
  }

  return (
    <div className="home-page d-flex__col gap_2r align-items__center justify-content__center">
      <div>
        <h1 className="text-transform__uppercase">Memory Game</h1>
      </div>
      <div className="home-page-buttons d-flex__col align-items__center justify-content__center padding_2r">
        <ul className="d-flex__col gap_1r ">
          <li className="d-flex__col align-items__center justify-content__space-around">
            <button
              type="button"
              className="btn home-page-btn d-flex__row gap_1r align-items__center"
              onClick={() => {
                handleOpenPage('gamePlayPage');
              }}
            >
              <Icon path={mdiPlay} size={2} />
              <span className="text-transform__capitalize">play</span>
            </button>
          </li>
          <li className="d-flex__col align-items__center justify-content__space-around">
            <button
              type="button"
              className="btn home-page-btn d-flex__row gap_1r align-items__center"
              onClick={() => {
                handleOpenPage('howToPlayPage');
              }}
            >
              <Icon path={mdiHelp} size={2} />
              <span className="text-transform__capitalize">how to play</span>
            </button>
          </li>
          <li className="d-flex__col align-items__center justify-content__space-around">
            <button
              type="button"
              className="btn home-page-btn d-flex__row gap_1r align-items__center"
              onClick={() => {
                handleOpenPage('settingsPage');
              }}
            >
              <Icon path={mdiCog} size={2} />
              <span className="text-transform__capitalize">settings</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
