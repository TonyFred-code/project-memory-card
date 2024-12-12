import useSound from 'use-sound';
import selectSfx from '../assets/select-sound.mp3';

function GameButton({ classNames, sfx, content, func }) {
  const [playBtnClick] = useSound(selectSfx);

  return (
    <button
      type="button"
      className={classNames}
      onClick={() => {
        if (sfx) {
          playBtnClick();
        }

        if (func) {
          func();
        }
      }}
    >
      {content}
    </button>
  );
}

export default GameButton;
