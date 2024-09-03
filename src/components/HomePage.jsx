import { mdiHelp, mdiPlay, mdiBookAccount, mdiBrain } from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/HomePage.css';
// import BrainUrl from '/brain.jpeg';

function HomePage() {
  return (
    <div className='home-page d-flex__col gap_2r align-items__center justify-content__center'>
      <div>
        <div className='icon-container icon-container__large'>
          {/* <img src={BrainUrl} alt='Brain' className='img' /> */}
        </div>
        <h1 className='text-transform__uppercase'>Memory Game</h1>
      </div>
      <div className='home-page-buttons d-flex__col align-items__center justify-content__center padding_2r'>
        <ul className='d-flex__col gap_1r '>
          <li className='d-flex__col align-items__center justify-content__space-around'>
            <button
              type='button'
              className='btn home-page-btn d-flex__row gap_1r align-items__center'
            >
              <Icon path={mdiPlay} size={2} />
              <span className='text-transform__capitalize'>play</span>
            </button>
          </li>
          <li className='d-flex__col align-items__center justify-content__space-around'>
            <button
              type='button'
              className='btn home-page-btn d-flex__row gap_1r align-items__center'
            >
              <Icon path={mdiHelp} size={2} />
              <span className='text-transform__capitalize'>how to play</span>
            </button>
          </li>
          <li className='d-flex__col align-items__center justify-content__space-around'>
            <button
              type='button'
              className='btn home-page-btn d-flex__row gap_1r align-items__center'
            >
              <Icon path={mdiBookAccount} size={2} />
              <span className='text-transform__capitalize'>scores</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
