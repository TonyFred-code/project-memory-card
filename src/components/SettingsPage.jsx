/* eslint-disable jsx-a11y/label-has-associated-control */
import { mdiContentSave, mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/SettingsPage.css';
import { useState } from 'react';
import useSound from 'use-sound';
import switchSfx from '../assets/pop-sound-effect.mp3';
import GameButton from './GameButton';

function SettingsPage({
  sound,
  updateSound,
  difficulty,
  updateDifficulty,
  onClose,
}) {
  const [activeDifficulty, setActiveDifficulty] = useState({ ...difficulty });
  const [activeSound, setActiveSound] = useState(sound);
  const [updated, setUpdated] = useState(true);

  const [playSwitchSfx] = useSound(switchSfx);

  function updateActiveDifficulty(event) {
    if (activeSound) {
      playSwitchSfx();
    }
    const difficultyKeys = Object.keys(activeDifficulty);
    const nextDifficulty = { ...activeDifficulty };

    difficultyKeys.forEach((d) => {
      if (event.target.value === d) {
        nextDifficulty[d] = event.target.checked;
      } else {
        nextDifficulty[d] = false;
      }
    });

    setActiveDifficulty(nextDifficulty);
  }

  function updateActiveSound(event) {
    if (activeSound) {
      playSwitchSfx();
    }
    setActiveSound(event.target.checked);
  }

  function handlePageClose() {
    onClose();
  }

  function handleUpdateSettings() {
    updateDifficulty(activeDifficulty);
    updateSound(activeSound);
    setUpdated(true);
  }

  return (
    <div className="d-flex__col">
      <header className="d-flex__row align-items__center padding_1r">
        <GameButton
          sfx={activeSound}
          func={handlePageClose}
          classNames="btn btn-icon"
          content={
            <>
              <span className="icon-container">
                <Icon path={mdiHome} size={2} />
              </span>

              <span className="icon-text">Home</span>
            </>
          }
        />

        <h1 className="margin_lr_centering text-transform__uppercase">
          settings
        </h1>

        <GameButton
          sfx={activeSound}
          func={handleUpdateSettings}
          classNames="btn btn-icon"
          disabled={updated}
          content={
            <>
              <span className="icon-container">
                <Icon path={mdiContentSave} size={2} />
              </span>

              <span className="icon-text">Save{updated && 'd'}</span>
            </>
          }
        />
      </header>

      <div
        className="d-flex__col justify-content__center align-items__center"
        style={{ flex: 1 }}
      >
        <div className="game-settings container d-flex__col gap_2r">
          <div className="d-flex__col gap_1r">
            <h2>Sound</h2>
            <form
              onChange={() => {
                setUpdated(false);
              }}
              className="padding-left_1r margin_lr_centering d-flex__col gap_1r"
            >
              <div className="d-flex__row gap_2r justify-content__space-between">
                <span className="text-transform__lowercase">Sound Effects</span>
                <span className="switch cursor__pointer">
                  <input
                    type="checkbox"
                    name="sfx"
                    id="sfx"
                    className="cursor__pointer"
                    onChange={(e) => {
                      updateActiveSound(e);
                    }}
                    checked={activeSound}
                  />
                  <label htmlFor="sfx" />
                </span>
              </div>
            </form>
          </div>
          <hr />
          <div className="d-flex__col gap_1r">
            <h2>Difficulty</h2>
            <form
              onChange={() => {
                setUpdated(false);
              }}
              className="padding-left_1r margin_lr_centering d-flex__col gap_1r"
            >
              <div className="d-flex__row gap_2r justify-content__space-between">
                <span className="text-transform__lowercase">Easy</span>
                <span className="switch cursor__pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value="easy"
                    id="easy"
                    className="cursor__pointer"
                    onChange={(e) => {
                      updateActiveDifficulty(e);
                    }}
                    defaultChecked={activeDifficulty.easy}
                  />
                  <label htmlFor="easy" />
                </span>
              </div>

              <div className="d-flex__row gap_2r justify-content__space-between">
                <span className="text-transform__lowercase">Medium</span>
                <span className="switch cursor__pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    id="medium"
                    value="medium"
                    className="cursor__pointer"
                    onChange={(e) => {
                      updateActiveDifficulty(e);
                    }}
                    defaultChecked={activeDifficulty.medium}
                  />
                  <label htmlFor="medium" />
                </span>
              </div>

              <div className="d-flex__row gap_2r justify-content__space-between">
                <span className="text-transform__lowercase">Hard</span>
                <span className="switch cursor__pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value="hard"
                    id="hard"
                    className="cursor__pointer"
                    onChange={(e) => {
                      updateActiveDifficulty(e);
                    }}
                    defaultChecked={activeDifficulty.hard}
                  />
                  <label htmlFor="hard" />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
