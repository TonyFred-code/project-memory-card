import useSound from 'use-sound';
import selectSfx from '../assets/select-sound.mp3';

function GameButton({ classNames, sfx, content, func, disabled = false }) {
  const [playBtnClick] = useSound(selectSfx);

  function handleBtnClick(event) {
    if (event.target.disabled) return;

    if (sfx) {
      playBtnClick();
    }

    if (func) {
      func();
    }
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames}
      onClick={(e) => {
        handleBtnClick(e);
      }}
    >
      {content}
    </button>
  );
}

export default GameButton;
