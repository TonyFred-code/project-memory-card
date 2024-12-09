import { mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import DIFFICULTY_SCORING from '../helpers/difficultyScoring';
import '../styles/HowToPlay.css';

function HowToPlay({ onClose }) {
  const [activeTabKey, setActiveTabKey] = useState(1);
  const difficultyLevels = Object.keys(DIFFICULTY_SCORING);

  const tabItems = [
    {
      key: 1,
      label: <h2>Guide</h2>,
      children: (
        <>
          <p>
            The Memory Card game tests your ability to select unique cards while
            avoiding repeats. Here&apos;s how to play:
          </p>
          <ul className="d-flex__col gap_d3r">
            <li>Select a difficulty level to start the game.</li>
            <li>
              In each round, pick one card from the options presented. Make sure
              it hasn’t been selected earlier in the game.
            </li>
            <li>
              Complete the required number of rounds (unique card selections) to
              win the game. If you repeat a card, the game ends!
            </li>
            <li>Play quickly and strategically to maximize your score!</li>
          </ul>
          <p>
            <em>Speed and focus are your keys to success—good luck!</em>
          </p>
        </>
      ),
    },
    {
      key: 2,
      label: <h2>Scoring</h2>,
      children: (
        <>
          <p>Your score is calculated based on two main components:</p>
          <ul className="d-flex__col gap_d3r">
            <li>
              <strong>Base Points:</strong> Earned for every unique card
              selected during a round. The number of points depends on the
              difficulty level.
            </li>
            <li>
              <strong>Bonus Points:</strong> Awarded based on the speed of your
              selection. The faster you choose, the higher your bonus points.
            </li>
          </ul>
          <p>
            Your ultimate goal is to maximize your performance, measured as{' '}
            <strong>Points per Second</strong>. Keep your selections fast and
            unique to achieve the best score!
          </p>
        </>
      ),
    },
    {
      key: 3,
      label: <h2>Levels</h2>,
      children: (
        <>
          <p>
            Choose from three difficulty levels, each offering a unique
            challenge:
          </p>
          <ul className="d-flex__col gap_d3r">
            {difficultyLevels.map((difficulty) => {
              const {
                winCardCount,
                baseCardPoint,
                maxBonusCardPoint,
                cardsPerRound,
              } = DIFFICULTY_SCORING[difficulty];
              return (
                <li key={difficulty}>
                  <strong className="text-transform__capitalize">
                    {difficulty}:
                  </strong>
                  <br />- Each round presents <em>{cardsPerRound}</em> cards to
                  choose from.
                  <br />- Complete <em>{winCardCount}</em> rounds by selecting
                  unique cards in each to win the game.
                  <br />- Earn <em>{baseCardPoint}</em> base points per unique
                  card.
                  <br /> - Bonus points can reach up to{' '}
                  <em>{maxBonusCardPoint}</em> per unique card, depending on
                  speed.
                </li>
              );
            })}
          </ul>
          <p>
            Be careful not to repeat any card during the game—doing so ends the
            game! Are you ready to prove your memory and speed? Choose your
            difficulty and start playing!
          </p>
        </>
      ),
    },
  ];

  function handlePageClose() {
    onClose();
  }

  return (
    <div className="how-to-play-container d-flex__col">
      <header className="d-flex__row align-items__center padding_1r">
        <h1 className="margin_lr_centering">How to Play</h1>

        <button
          type="button"
          className="btn btn-icon"
          onClick={handlePageClose}
        >
          <span className="icon-container">
            <Icon path={mdiHome} size={2} />
          </span>

          <span className="icon-text">Home</span>
        </button>
      </header>

      <div
        className="container tab-section-container padding_1r"
        style={{ flex: 1 }}
      >
        <div>
          <div className="tabs-container d-flex__row justify-content__space-between">
            {tabItems.map((item) => {
              const { key, label } = item;
              return (
                <div
                  key={key}
                  className={`tab cursor__pointer d-flex__row padding-right_1r padding-left_1r align-items__center ${activeTabKey === key ? 'active-tab' : ''}`}
                  onClick={() => {
                    setActiveTabKey(key);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setActiveTabKey(key);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {label}
                </div>
              );
            })}
          </div>

          <div className="tab-content-container">
            {tabItems.map((item) => {
              const { key, children } = item;
              return (
                <div
                  key={key}
                  className={`tab-content gap_2r padding-left_1r ${activeTabKey === key ? 'd-flex__col' : ''}`}
                >
                  {children}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
