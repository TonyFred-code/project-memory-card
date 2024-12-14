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
import useSound from 'use-sound';
import ReactFlipCard from 'reactjs-flip-card';
import DIFFICULTY_SCORING from '../helpers/difficultyScoring';
import cardFlipSfx from '../assets/flipcard.mp3';
import gameWinSfx from '../assets/level-win.mp3';
import uniqueElementPick from '../assets/success_bell.mp3';
import levelLossSfx from '../assets/game-over-arcade.mp3';
import GameButton from '../components/GameButton';
import { calculatePointPerSecond } from '../helpers/scoreHistory';

function GamePlay({
  onClose,
  highScore,
  onGameEnd,
  bestTime,
  emojis,
  bestPointsPerSecond,
  difficulty,
  sound,
}) {
  let playRule = DIFFICULTY_SCORING[difficulty];
  if (!playRule) {
    playRule = DIFFICULTY_SCORING.easy;
  }
  const {
    winCardCount,
    baseCardPoint,
    maxBonusCardPoint,
    cardsPerRound,
    bonusTimeCount,
  } = playRule;

  const emojisCode = emojis.map((data) => {
    const { code } = data;

    return code;
  });
  const [playCardFlip] = useSound(cardFlipSfx);
  const [playLevelWin] = useSound(gameWinSfx);
  const [playUniqueCardPick] = useSound(uniqueElementPick);
  const [playLevelLoss] = useSound(levelLossSfx);

  const [viewed, setViewed] = useState([]);
  const [notViewed, setNotViewed] = useState(emojisCode);
  const [playCards, setPlayCards] = useState(
    pickRandom(emojisCode, { count: cardsPerRound })
  );
  const [requestGameRestart, setRequestGameRestart] = useState(false);
  const [requestGameEnd, setRequestGameEnd] = useState(false);
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
  if (scoreTimeDiff > bonusTimeCount) scoreTimeDiff = bonusTimeCount;
  const bonusScorePercent =
    100 - Math.floor((scoreTimeDiff * 100) / bonusTimeCount);

  const cardPoint = baseCardPoint;
  const maxBonusScore = maxBonusCardPoint;
  const rowCount = Math.sqrt(cardsPerRound);

  useEffect(() => {
    if (
      gameWon ||
      gameLost ||
      isCardFlipped ||
      requestGameEnd ||
      requestGameRestart
    ) {
      return undefined;
    }

    const key = setInterval(() => {
      setTime((t) => 1000 + t);
    }, 1000);

    return () => {
      clearInterval(key);
    };
  }, [gameLost, gameWon, isCardFlipped, requestGameEnd, requestGameRestart]);

  function handleGameEnd(points) {
    const pts = calculatePointPerSecond(points, time);

    setIsHigherPerformance(pts > bestPointsPerSecond);
    setGameEndModalOpen(true);

    onGameEnd(points, time);
  }

  function handleGameRestart() {
    setIsCardFlipped(true);

    setTimeout(() => {
      setViewed([]);
      setNotViewed(emojisCode);
      setPlayCards(pickRandom(emojisCode, { count: cardsPerRound }));
      setIsScoreIncrease(false);
      setGameWon(false);
      setGameLost(false);
      setGameEndModalOpen(false);
      setIsCardFlipped(false);
      setTime(0);
      setLastScoreTime(0);
      setScore(0);
      setScoreIncrease(0);
      setRequestGameRestart(false);
    }, 1300);
  }

  function handleCardClick(code) {
    if (gameWon || gameLost || isCardFlipped) return;

    if (viewed.includes(code)) {
      setGameLost(true);
      handleGameEnd(score);
      if (sound) {
        playLevelLoss();
      }
      return;
    }

    if (sound) {
      playUniqueCardPick();
    }

    const updatedUniqueElements = notViewed.filter((d) => d !== code);

    const [uniqueElement] = pickRandom(updatedUniqueElements);
    const updatedViewed = [code, ...viewed];

    const temp = updatedUniqueElements.filter((d) => d !== uniqueElement);

    const temp2 = pickRandom([...temp, ...updatedViewed], {
      count: cardsPerRound - 1,
    });

    const updatedPlayCards = pickRandom([uniqueElement, ...temp2], {
      count: cardsPerRound,
    });

    let bonusScore = Math.floor((bonusScorePercent / 100) * maxBonusScore);

    if (bonusScore < 0) bonusScore = 0;
    setLastScoreTime(time);
    setScoreIncrease(cardPoint + bonusScore);
    setIsScoreIncrease(true);
    setViewed(updatedViewed);

    if (updatedViewed.length === winCardCount) {
      setGameWon(true);
      handleGameEnd(score + cardPoint + bonusScore);
      if (sound) {
        playLevelWin();
      }
      return;
    }

    setNotViewed(updatedUniqueElements);
    setIsCardFlipped(true);
    setPlayCards(updatedPlayCards);
    if (sound) {
      playCardFlip();
    }

    setTimeout(() => {
      setIsCardFlipped(false);
      if (sound) {
        playCardFlip();
      }
    }, 1000);
  }

  function handleCardKeyDown(e, code) {
    if (e.key === 'Enter') {
      handleCardClick(code);
    }
  }

  function handlePageClose() {
    onClose();
  }

  return (
    <div className="d-flex__col">
      <header className="d-flex__row align-items__center justify-content__space-between padding_1r">
        <GameButton
          classNames="btn btn-icon d-flex__row gap_1r align-items__center"
          sfx={sound}
          func={() => {
            setRequestGameRestart(true);
          }}
          content={
            <>
              <span className="icon-container">
                <Icon path={mdiReload} size={2} />
              </span>
              <span className="icon-text">Restart</span>
            </>
          }
        />
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
        <GameButton
          sfx={sound}
          classNames="btn btn-icon"
          func={() => {
            setRequestGameEnd(true);
          }}
          content={
            <>
              <span className="icon-container">
                <Icon path={mdiHome} size={2} />
              </span>
              <span className="icon-text">Home</span>{' '}
            </>
          }
        />
      </header>
      <div className="game-area padding_1r gap_2r">
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
        <div
          className="game-cards justify-content__center align-items__center"
          style={{
            '--quantity': rowCount,
          }}
        >
          {emojis
            .filter((data) => playCards.includes(data.code))
            .map((data) => {
              const { image, name, code } = data;
              return (
                <div
                  className="card d-flex__col align-items__center justify-content__center cursor__pointer padding_d5r"
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
      <p className="d-flex__col align-items__center card-count">
        {viewed.length} / {winCardCount}
      </p>

      <Modal
        open={gameEndModalOpen}
        center
        showCloseIcon={false}
        blockScroll={false}
        classNames={{ modal: 'modal' }}
      >
        <div className="d-flex__col gap_2r padding_1r">
          <header>
            {gameLost && (
              <h1 className="text-transform__capitalize">
                <span>that&apos;s a pity! you lost</span>
              </h1>
            )}

            {gameWon && (
              <h1 className="text-transform__capitalize">
                <span>yay! you won</span>
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
          <div className="btn-group d-flex__row gap_2r align-items__center justify-content__space-around">
            <GameButton
              func={handleGameRestart}
              classNames=""
              content={<span>Restart</span>}
              sfx={sound}
            />
            <GameButton
              func={() => {
                setGameEndModalOpen(false);
                handlePageClose();
              }}
              classNames=""
              content={<span> Main Menu</span>}
              sfx={sound}
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={requestGameEnd || requestGameRestart}
        center
        showCloseIcon={false}
        blockScroll={false}
        classNames={{ modal: 'modal' }}
      >
        <div className="d-flex__col gap_2r padding_1r">
          <header>
            <h1 className="text-transform__capitalize">
              <span>Confirm Action</span>
            </h1>
          </header>
          <div className="d-flex__col justify-content__center gap_1r">
            {requestGameRestart && (
              <p>Are you sure you want to restart game?</p>
            )}

            {requestGameEnd && <p>Are you sure you want to end game?</p>}
            <p>Progress will be lost. And will not be saved.</p>
          </div>
          <div className="btn-group d-flex__row gap_2r align-items__center justify-content__space-around">
            <GameButton
              func={() => {
                if (requestGameEnd) {
                  setRequestGameEnd(false);
                }

                if (requestGameRestart) {
                  setRequestGameRestart(false);
                }
              }}
              classNames="cancel-action-btn btn"
              content={<span>Cancel</span>}
              sfx={sound}
            />
            <GameButton
              func={() => {
                if (requestGameEnd) {
                  handlePageClose();
                }

                if (requestGameRestart) {
                  handleGameRestart();
                }
              }}
              classNames="confirm-action-btn btn"
              content={<span>Confirm</span>}
              sfx={sound}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GamePlay;
