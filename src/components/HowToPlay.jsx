function HowToPlay() {
  return (
    <div
      className="how-to-play-container"
      style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}
    >
      <h1>How to Play</h1>

      {/* Guide Section */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Guide</h2>
        <p>
          The Memory Card game is all about selecting unique cards without
          repeating any. Here’s how to get started:
        </p>
        <ul>
          <li>Select a difficulty level to start the game.</li>
          <li>
            Click on a card to pick it—avoid selecting the same card twice in a
            round.
          </li>
          <li>
            Successfully select the required number of unique cards to win the
            round. If you repeat a card, the round ends, and your score resets.
          </li>
          <li>
            Try to achieve the highest possible score by selecting cards quickly
            and accurately!
          </li>
        </ul>
        <p>Speed and focus are your keys to success—good luck!</p>
      </section>

      {/* Scoring Section */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Scoring</h2>
        <p>Your score is calculated based on two main components:</p>
        <ul>
          <li>
            <strong>Base Points:</strong> Earned for every unique card selected.
            Base points vary depending on the difficulty level.
          </li>
          <li>
            <strong>Bonus Points:</strong> Extra points awarded for selecting
            cards quickly. The faster your selection, the higher your bonus!
          </li>
        </ul>
        <p>
          Your ultimate goal is to maximize your performance, measured as{' '}
          <strong>Points per Second</strong>. Keep your selections fast and
          unique to achieve the best score!
        </p>
      </section>

      {/* Difficulty Section */}
      <section>
        <h2>Difficulty Levels</h2>
        <p>
          Choose from three difficulty levels, each offering a unique challenge:
        </p>
        <ul>
          <li>
            <strong>Easy:</strong>- Each round presents 4 cards to choose from.
            - Complete 5 rounds by selecting unique cards in each to win the
            game. - Earn 500 base points per unique card. - Bonus points can
            reach up to 1,500 per unique card, depending on speed.
          </li>
          <li>
            <strong>Medium:</strong>- Each round presents 9 cards to choose
            from. - Complete 10 rounds by selecting unique cards in each to win
            the game. - Earn 750 base points per unique card. - Bonus points can
            reach up to 2,000 per unique card, depending on speed.
          </li>
          <li>
            <strong>Hard:</strong>- Each round presents 16 cards to choose from.
            - Complete 15 rounds by selecting unique cards in each to win the
            game. - Earn 1,000 base points per unique card. - Bonus points can
            reach up to 2,500 per unique card, depending on speed.
          </li>
        </ul>
        <p>
          In every round, you must pick a unique card from the options shown. Be
          careful not to repeat any card during the game—doing so ends the game!
          Are you ready to prove your memory and speed? Choose your difficulty
          and start playing!
        </p>
      </section>
    </div>
  );
}

export default HowToPlay;
