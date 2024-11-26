import { mdiHelp, mdiPlay, mdiBookAccount } from '@mdi/js';
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
  const [highScore, setHighScore] = useState(0);
  const [bestTime, setBestTime] = useState(+Infinity);

  function handleUpdateHighScore(score) {
    if (score < highScore) return;

    setHighScore(score);
  }

  function handleUpdateBestTime(time) {
    if (time > bestTime) return;

    setBestTime(time);
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
        handleUpdateBestTime={handleUpdateBestTime}
        handleUpdateHighScore={handleUpdateHighScore}
        highScore={highScore}
        bestTime={bestTime}
        emojis={emojis}
      />
    );
  }

  if (pageOpen.howToPlayPage) {
    return <HowToPlay onClose={handlePageClose} />;
  }

  return (
    <div className="home-page d-flex__col gap_2r align-items__center justify-content__center">
      <div>
        <div className="icon-container icon-container__large">
          {/* <img src={BrainUrl} alt='Brain' className='img' /> */}
        </div>
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
              <Icon path={mdiBookAccount} size={2} />
              <span className="text-transform__capitalize">scores</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
