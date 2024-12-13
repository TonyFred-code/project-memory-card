import { mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import useSound from 'use-sound';
import formatDuration from 'format-duration';
import { CountUp } from 'use-count-up';
import GameButton from './GameButton';
import pageFlipSfx from '../assets/pageturn.mp3';

function ScoreHistory({ onClose, sfx, scoreHistory, activeDifficulty }) {
  const [activeTabKey, setActiveTabKey] = useState(activeDifficulty);
  const scoreHistoryKeys = Object.keys(scoreHistory);

  const [playPageFlip] = useSound(pageFlipSfx);

  const tabItems = scoreHistoryKeys.map((key) => {
    const diffScore = scoreHistory[key];
    return {
      key,
      label: <h2 className="text-transform__capitalize">{key}</h2>,
      children: (
        <table>
          <thead>
            <tr>
              <th
                scope="col"
                className="text-align__center text-transform__capitalize padding_1r"
              >
                Position
              </th>
              <th
                scope="col"
                className="text-align__center text-transform__capitalize padding_1r"
              >
                Points
              </th>
              <th
                scope="col"
                className="text-align__center text-transform__capitalize padding_1r"
              >
                time
              </th>
            </tr>
          </thead>
          <tbody>
            {diffScore.map((score, i) => {
              const { points, time } = score;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={i + 1}>
                  <th className="text-align__center padding_d5r" scope="row">
                    {i + 1}
                  </th>
                  <td className="text-align__center padding_d5r">
                    <CountUp isCounting={points > 0} start={0} end={points} />
                  </td>
                  <td className="text-align__center padding_d5r">
                    <CountUp
                      isCounting={time > 0}
                      formatter={formatDuration}
                      start={0}
                      end={time}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ),
    };
  });

  function handleTabChange(key) {
    if (sfx && key !== activeTabKey) {
      playPageFlip();
    }
    setActiveTabKey(key);
  }

  function handlePageClose() {
    onClose();
  }

  return (
    <div className="how-to-play-container d-flex__col">
      <header className="d-flex__row align-items__center padding_1r">
        <h1 className="margin_lr_centering text-transform__capitalize">
          score history
        </h1>

        <GameButton
          classNames="btn btn-icon"
          func={handlePageClose}
          content={
            <>
              <span className="icon-container">
                <Icon path={mdiHome} size={2} />
              </span>

              <span className="icon-text">Home</span>
            </>
          }
          sfx={sfx}
        />
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
                    handleTabChange(key);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTabChange(key);
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

export default ScoreHistory;
