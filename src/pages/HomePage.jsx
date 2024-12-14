import { mdiHelp, mdiPlay, mdiCog, mdiCrownCircle } from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/HomePage.css';
import { useState } from 'react';
import useLocalStorage from 'use-local-storage';
import GamePlay from './GamePlay';
import HowToPlay from './HowToPlay';
import SettingsPage from './SettingsPage';
import GameButton from '../components/GameButton';
import ScoreHistory from './ScoreHistory';
import {
  scoreHistoryData,
  calculatePointPerSecond,
} from '../helpers/scoreHistory';

function HomePage({ emojis }) {
  const [pageOpen, setPageOpen] = useState({
    gamePlayPage: false,
    howToPlayPage: false,
    settingsPage: false,
    scoreHistoryPage: false,
  });

  const [scoreHistory, setScoreHistory] = useLocalStorage(
    'score_history',
    scoreHistoryData
  );

  const [difficulty, setDifficulty] = useLocalStorage('difficulty_settings', {
    easy: true,
    medium: false,
    hard: false,
  });
  const [sfx, setSfx] = useLocalStorage('sfx', true);

  function updateDifficulty(nextDifficulty) {
    setDifficulty({ ...nextDifficulty });
  }

  function updateSound(nextSound) {
    setSfx(nextSound);
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
    const activeDifficultyScoreHistory = [
      { points, time },
      ...scoreHistory[activeDifficulty()],
    ];
    const activeDifficultyNextScoreHistory = activeDifficultyScoreHistory
      .sort((performanceA, performanceB) => {
        const ptsA = calculatePointPerSecond(
          performanceA.points,
          performanceA.time
        );

        const ptsB = calculatePointPerSecond(
          performanceB.points,
          performanceB.time
        );

        if (ptsA > ptsB) return -1;
        if (ptsA < ptsB) return 1;
        return 0;
      })
      .slice(0, 5);
    const updatedScoreHistory = {
      ...scoreHistory,
      [activeDifficulty()]: activeDifficultyNextScoreHistory,
    };

    setScoreHistory(updatedScoreHistory);
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
    const difficultyMode = activeDifficulty();
    const difficultyBestPerformances = scoreHistory[difficultyMode];

    const [difficultyBestPerformance] = difficultyBestPerformances;

    return (
      <GamePlay
        onClose={handlePageClose}
        highScore={difficultyBestPerformance.points}
        bestTime={difficultyBestPerformance.time}
        bestPointsPerSecond={calculatePointPerSecond(
          difficultyBestPerformance.points,
          difficultyBestPerformance.time
        )}
        emojis={emojis}
        onGameEnd={updatePerformance}
        difficulty={difficultyMode}
        sound={sfx}
      />
    );
  }

  if (pageOpen.howToPlayPage) {
    return <HowToPlay onClose={handlePageClose} sfx={sfx} />;
  }

  if (pageOpen.settingsPage) {
    return (
      <SettingsPage
        onClose={handlePageClose}
        difficulty={difficulty}
        updateDifficulty={updateDifficulty}
        sound={sfx}
        updateSound={updateSound}
      />
    );
  }

  if (pageOpen.scoreHistoryPage) {
    return (
      <ScoreHistory
        onClose={handlePageClose}
        sfx={sfx}
        scoreHistory={scoreHistory}
        activeDifficulty={activeDifficulty()}
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
            <GameButton
              func={() => {
                handleOpenPage('gamePlayPage');
              }}
              classNames="btn home-page-btn d-flex__row gap_1r align-items__center"
              content={
                <>
                  <Icon path={mdiPlay} size={2} />
                  <span className="text-transform__capitalize">play</span>
                </>
              }
              sfx={sfx}
            />
          </li>
          <li className="d-flex__col align-items__center justify-content__space-around">
            <GameButton
              func={() => {
                handleOpenPage('howToPlayPage');
              }}
              classNames="btn home-page-btn d-flex__row gap_1r align-items__center"
              content={
                <>
                  <Icon path={mdiHelp} size={2} />
                  <span className="text-transform__capitalize">
                    how to play
                  </span>
                </>
              }
              sfx={sfx}
            />
          </li>
          <li className="d-flex__col align-items__center justify-content__space-around">
            <GameButton
              func={() => {
                handleOpenPage('settingsPage');
              }}
              classNames="btn home-page-btn d-flex__row gap_1r align-items__center"
              content={
                <>
                  <Icon path={mdiCog} size={2} />
                  <span className="text-transform__capitalize">settings</span>
                </>
              }
              sfx={sfx}
            />
          </li>
          <li className="d-flex__col align-items__center justify-content__space-around">
            <GameButton
              func={() => {
                handleOpenPage('scoreHistoryPage');
              }}
              classNames="btn home-page-btn d-flex__row gap_1r align-items__center"
              content={
                <>
                  <Icon path={mdiCrownCircle} size={2} />
                  <span className="text-transform__capitalize">Scores</span>
                </>
              }
              sfx={sfx}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
