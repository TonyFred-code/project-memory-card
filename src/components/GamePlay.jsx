import { useEffect, useState } from 'react';
import {
  mdiHome,
  mdiReload,
  mdiCrown,
  mdiClock,
  mdiStar,
  mdiClockOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/GamePlay.css';
import pickRandom from 'pick-random';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import formatDuration from 'format-duration';
import { CountUp } from 'use-count-up';
import ReactFlipCard from 'reactjs-flip-card';

function GamePlay({
  onClose,
  highScore,
  onGameEnd,
  bestTime,
  emojis,
  bestPointsPerSecond,
}) {
  const emojisCode = emojis.map((data) => {
    const { code } = data;

    return code;
  });
  const [viewed, setViewed] = useState([]);
  const [notViewed, setNotViewed] = useState(emojisCode);
  const [playCards, setPlayCards] = useState(
    pickRandom(emojisCode, { count: 4 })
  );
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [gameEndModalOpen, setGameEndModalOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [lastScoreTime, setLastScoreTime] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreIncrease, setScoreIncrease] = useState(0);
  const [isScoreIncrease, setIsScoreIncrease] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isHigherPerformance, setIsHigherPerformance] = useState(false);
  let scoreTimeDiff = time - lastScoreTime;
  if (scoreTimeDiff > 15000) scoreTimeDiff = 15000;
  const bonusScorePercent = 100 - Math.floor((scoreTimeDiff * 100) / 15000);

  const cardPoint = 200;
  const maxBonusScore = 1500;

  useEffect(() => {
    if (gameWon || gameLost || isCardFlipped) {
      return undefined;
    }

    const key = setInterval(() => {
      setTime((t) => 1000 + t);
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, [gameLost, gameWon, isCardFlipped]);

  function handleGameEnd() {
    const gameTime = time > 0 ? time : 1;
    const pts = score / gameTime;

    setIsHigherPerformance(pts > bestPointsPerSecond);
    setGameEndModalOpen(true);

    onGameEnd(score, time);
  }

  function handleGameRestart() {
    setIsCardFlipped(true);

    setTimeout(() => {
      setViewed([]);
      setNotViewed(emojisCode);
      setPlayCards(pickRandom(emojisCode, { count: 4 }));
      setIsScoreIncrease(false);
      setGameWon(false);
      setGameLost(false);
      setGameEndModalOpen(false);
      setIsCardFlipped(false);
      setTime(0);
      setLastScoreTime(0);
      setScore(0);
      setScoreIncrease(0);
    }, 1300);
  }

  function handleCardClick(code) {
    if (gameWon || gameLost) return;

    if (isCardFlipped) return;

    if (viewed.includes(code)) {
      setGameLost(true);
      handleGameEnd();
      return;
    } // game lost

    const updatedUniqueElements = notViewed.filter((d) => d !== code);

    if (updatedUniqueElements.length === 0) {
      setGameWon(true);
      handleGameEnd();
      return;
    }

    const [uniqueElement] = pickRandom(updatedUniqueElements);
    const updatedViewed = [code, ...viewed];

    const temp = updatedUniqueElements.filter((d) => d !== uniqueElement);

    const temp2 = pickRandom([...temp, ...updatedViewed], {
      count: 3,
    });

    const updatedPlayCards = pickRandom([uniqueElement, ...temp2], {
      count: 4,
    });

    let bonusScore = Math.floor((bonusScorePercent / 100) * maxBonusScore);

    if (bonusScore < 0) bonusScore = 0;

    setPlayCards(updatedPlayCards);
    setNotViewed(updatedUniqueElements);
    setViewed(updatedViewed);
    setLastScoreTime(time);
    setScoreIncrease(cardPoint + bonusScore);
    setIsScoreIncrease(true);
    setIsCardFlipped(true);

    setTimeout(() => {
      setIsCardFlipped(false);
    }, 1000);
  }

  function handleCardKeyDown(e, code) {
    if (e.keyCode === 13) {
      handleCardClick(code);
    }
  }

  function handlePageClose() {
    onClose();
  }

  return (
    <div>
      <header className="d-flex__row align-items__center justify-content__space-between padding_1r">
        <button
          type="button"
          className="btn btn-icon d-flex__row gap_1r align-items__center"
          onClick={handleGameRestart}
        >
          <span className="icon-container">
            <Icon path={mdiReload} size={2} />
          </span>
          <span className="icon-text">Restart</span>
        </button>
        <div>
          <div className="d-flex__row gap_1r align-items__center">
            <span className="icon-container">
              <Icon path={mdiCrown} size={2} />
            </span>
            <span>{Number.isFinite(highScore) ? highScore : 0}</span>
          </div>
          <div className="d-flex__row gap_1r align-items__center">
            <span className="icon-container">
              <Icon path={mdiClock} size={2} />
            </span>
            <span>
              {formatDuration(Number.isFinite(bestTime) ? bestTime : 0)}
            </span>
          </div>
        </div>
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
      <div className="game-area padding_2r gap_2r">
        <header className="d-flex__col">
          <div className="d-flex__row align-items__center justify-content__space-between padding-left_1r padding-right_1r">
            <div className="score-container d-flex__row align-items__center">
              <span className="icon-container">
                <Icon path={mdiStar} />
              </span>
              {!isScoreIncrease ? (
                <span>{score}</span>
              ) : (
                <CountUp
                  isCounting={isScoreIncrease}
                  start={score}
                  end={scoreIncrease + score}
                  onComplete={() => {
                    setScore((t) => t + scoreIncrease);
                    setIsScoreIncrease(false);
                  }}
                />
              )}
            </div>
            <div className="timer-container d-flex__row align-items__center">
              <span className="icon-container">
                <Icon path={mdiClockOutline} />
              </span>
              <span>{formatDuration(time, { leading: true })}</span>
            </div>
          </div>
          <div
            className={`bar-container ${(gameLost || gameWon) && 'end-round'}`}
          >
            <div
              className={`bar ${
                bonusScorePercent < 50 && bonusScorePercent > 25 && 'yellow-bar'
              }
                ${bonusScorePercent <= 25 && 'red-bar'}`}
              style={{
                width: `${bonusScorePercent}%`,
              }}
            >
              <div className="inner-bar" />
            </div>
          </div>
        </header>
        <div className="game-cards justify-content__center align-items__center">
          {emojis
            .filter((data) => playCards.includes(data.code))
            .map((data) => {
              const { image, name, code } = data;
              return (
                <div
                  className="card d-flex__col align-items__center justify-content__center cursor__pointer padding_1r"
                  key={code}
                  onClick={() => {
                    handleCardClick(code);
                  }}
                  tabIndex="0"
                  role="button"
                  onKeyDown={(e) => {
                    handleCardKeyDown(e, code);
                  }}
                >
                  <ReactFlipCard
                    frontComponent={
                      isCardFlipped ? (
                        <div />
                      ) : (
                        <img className="card-image" src={image} alt={name} />
                      )
                    }
                    frontCss="card-front d-flex__col align-items__center justify-content__center"
                    backComponent={<div />}
                    backCss="card-back"
                    flipTrigger="disabled"
                    flipByProp={isCardFlipped}
                    containerCss="wrapper"
                  />
                </div>
              );
            })}
        </div>
      </div>
      {/* todo: style Modal */}
      <Modal
        open={gameEndModalOpen}
        center
        showCloseIcon={false}
        blockScroll={false}
      >
        <div className="modal d-flex__col gap_2r padding_1r">
          <header>
            {gameLost && (
              <h1 className="text-transform__capitalize">
                <span>that&apos;s a pity! you lost</span>
              </h1>
            )}

            {gameWon && (
              <h1 className="text-transform__capitalize">
                <span>congratulations! you won</span>
              </h1>
            )}
          </header>
          <div className="d-flex__col align-items__center justify-content__center gap_1r">
            <div>
              <div className="d-flex__row align-items__center gap_d3r">
                <span className="icon-container">
                  <Icon path={mdiStar} />
                </span>
                <div className="d-flex__row  align-items__center gap_1r">
                  <div className="d-flex__row align-items__center">
                    Score:{' '}
                    <CountUp
                      isCounting={gameEndModalOpen}
                      start={0}
                      end={score}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex__row align-items__center gap_d3r">
                <span className="icon-container">
                  <Icon path={mdiClockOutline} />
                </span>
                <div className="d-flex__row align-items__center gap_1r">
                  <span>
                    Time:{' '}
                    <CountUp
                      start={0}
                      end={time}
                      formatter={formatDuration}
                      isCounting={gameEndModalOpen}
                    />
                  </span>
                </div>
              </div>
              {isHigherPerformance && (
                <p>
                  <em>New Record !!!</em>
                </p>
              )}
            </div>
          </div>
          <div className="btn-group d-flex__row gap_2r align-items__center">
            <button
              type="button"
              onClick={() => {
                handleGameRestart();
              }}
            >
              Restart
            </button>
            <button
              type="button"
              onClick={() => {
                setGameEndModalOpen(false);
                handlePageClose();
              }}
            >
              Main Menu
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GamePlay;
