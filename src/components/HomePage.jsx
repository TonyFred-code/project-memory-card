import { mdiHelp, mdiPlay, mdiCog } from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/HomePage.css';
import { useState } from 'react';
import GamePlay from './GamePlay';
import HowToPlay from './HowToPlay';

function HomePage({ emojis }) {
  const [pageOpen, setPageOpen] = useState({
    gamePlayPage: false,
    howToPlayPage: false,
  });
  const [bestPerformance, setBestPerformance] = useState({
    points: 0,
    time: +Infinity,
    pts: -Infinity, // points per second
  });

  function updatePerformance({ points, time }) {
    const gameTime = time > 0 ? time : 1;
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
      />
    );
  }

  if (pageOpen.howToPlayPage) {
    return <HowToPlay onClose={handlePageClose} />;
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
