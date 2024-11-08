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
import placeHolderData from '../assets/data.js';
import pickRandom from 'pick-random';

function GamePlay({ onClose }) {
  const placeHolderDataCode = placeHolderData.map((data) => {
    const { code } = data;

    return code;
  });
  const [viewed, setViewed] = useState([]);
  const [notViewed, setNotViewed] = useState(placeHolderDataCode);
  const [playCards, setPlayCards] = useState(
    pickRandom(placeHolderDataCode, { count: 4 })
  );
  const [gameEnded, setGameEnded] = useState(false);

  function handleCardClick(code) {
    if (gameEnded) {
      console.log('game won');
      return;
    } // game won

    if (viewed.includes(code)) {
      console.log(' game lost ');
      return;
    } // game lost

    const updatedUniqueElements = notViewed.filter((d) => d !== code);

    if (updatedUniqueElements.length == 0) {
      setGameEnded(true);
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

    setPlayCards(updatedPlayCards);
    setNotViewed(updatedUniqueElements);
    setViewed(updatedViewed);
  }

  function handlePageClose() {
    onClose();
  }

  return (
    <div>
      <header className='d-flex__row align-items__center justify-content__space-between padding_1r'>
        <button
          type='button'
          className='btn btn-icon d-flex__row gap_1r align-items__center'
        >
          <span className='icon-container'>
            <Icon path={mdiReload} size={2} />
          </span>
          <span className='icon-text'>Restart</span>
        </button>
        <div>
          <div className='d-flex__row gap_1r align-items__center'>
            <span className='icon-container'>
              <Icon path={mdiCrown} size={2} />
            </span>
            <span>1234</span>
          </div>
          <div className='d-flex__row gap_1r align-items__center'>
            <span className='icon-container'>
              <Icon path={mdiClock} size={2} />
            </span>
            <span>00:24</span>
          </div>
        </div>
        <button
          type='button'
          className='btn btn-icon'
          onClick={handlePageClose}
        >
          <span className='icon-container'>
            <Icon path={mdiHome} size={2} />
          </span>

          <span className='icon-text'>Home</span>
        </button>
      </header>
      <div className='game-area padding_2r d-flex__col gap_2r'>
        <header className='d-flex__col'>
          <div className='d-flex__row align-items__center justify-content__space-between padding-left_1r padding-right_1r'>
            <div className='score-container d-flex__row align-items__center'>
              <span className='icon-container'>
                <Icon path={mdiStar} />
              </span>
              <span>728</span>
            </div>
            <div className='timer-container d-flex__row align-items__center'>
              <span className='icon-container'>
                <Icon path={mdiClockOutline} />
              </span>
              <span>00:49</span>
            </div>
          </div>
          <div className='bar-container'>
            <div className='bar'>
              <div className='inner-bar'></div>
            </div>
          </div>
        </header>
        <div className='game-cards'>
          {placeHolderData
            .filter((data) => playCards.includes(data.code))
            .map((data) => {
              const { image, name, code } = data;
              return (
                <div
                  className='card d-flex__row align-items__center justify-content__center cursor__pointer padding_2r gap_1r'
                  key={code}
                  onClick={() => {
                    handleCardClick(code);
                  }}
                >
                  <div className='card-image'>
                    <img src={image} alt={name} />
                  </div>
                  <div className='card-text'>{code}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
