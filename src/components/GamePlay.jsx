import { mdiHome, mdiReload, mdiCrown, mdiClock } from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/GamePlay.css';

function GamePlay({ onClose }) {
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
            <div className='score-container'>
              <span>728</span>
            </div>
            <div className='timer-container'>
              <span>00:49</span>
            </div>
          </div>
          <div className='bar-container'>
            <div className='bar'>
              <div className='inner-bar'></div>
            </div>
          </div>
        </header>
        <div className='game-cards cards-container'></div>
      </div>
    </div>
  );
}

export default GamePlay;
