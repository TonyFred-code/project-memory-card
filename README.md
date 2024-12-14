# Emoji Flipper

## Project Overview

**Emoji Flipper** is an engaging React-based game that tests your memory and speed. Players aim to select unique cards across multiple rounds while avoiding repeats. The game leverages React hooks for state management and external APIs for fetching emojis to create a dynamic and interactive experience.

## Table of Contents

- [Emoji Flipper](#emoji-flipper)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [How to Play](#how-to-play)
  - [Scoring System](#scoring-system)
  - [Levels](#levels)
  - [Technologies Used](#technologies-used)
  - [Setup Instructions](#setup-instructions)
  - [Live Demo](#live-demo)
  - [Credits](#credits)
  - [License](#license)

## Features

- Interactive gameplay with three difficulty levels (Easy, Medium, Hard).
- Dynamic card shuffling and randomization using an external API.
- Scoreboard to track the current score and "Best Performance" (points per second).
- Bonus points for speed-based gameplay.
- Fully responsive design for mobile and desktop users.

## How to Play

Emoji Flipper is a game that tests your ability to select unique cards while avoiding repeats. Here's how to play:

1. Select a difficulty level to start the game.
2. In each round, pick one card from the options presented. Ensure it hasn’t been selected earlier in the game.
3. Complete the required number of unique selections to win the game.
4. Avoid selecting the same card twice, or the game will end!
5. Play quickly and strategically to maximize your score.

*Speed and focus are your keys to success—good luck!*

## Scoring System

Your score is calculated based on two main components:

- **Base Points**: Earned for every unique card selected during a round. The number of points depends on the difficulty level.
- **Bonus Points**: Awarded based on the speed of your selection. The faster you choose, the higher your bonus points.

Your ultimate goal is to maximize your performance, measured as **Points per Second**. Keep your selections fast and unique to achieve the best score!

## Levels

Choose from three difficulty levels, each offering a unique challenge:

- **Easy**:
  - Each round presents **4 cards** to choose from.
  - Complete **5 unique selections** to win the game.
  - Earn **500 base points** per unique card.
  - Bonus points can reach up to **1,500** per card, depending on speed.

- **Medium**:
  - Each round presents **9 cards** to choose from.
  - Complete **10 unique selections** to win the game.
  - Earn **750 base points** per unique card.
  - Bonus points can reach up to **2,000** per card, depending on speed.

- **Hard**:
  - Each round presents **16 cards** to choose from.
  - Complete **15 unique selections** to win the game.
  - Earn **1,000 base points** per unique card.
  - Bonus points can reach up to **2,500** per card, depending on speed.

*Be careful not to repeat any card during the game—doing so ends the game!*

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build processes.
- **React Hooks**: For state and effect management.
- **API Ninja Emoji**: For fetching emojis dynamically.
- **Fisher-Yates Shuffle**: For shuffling card data.
- **React Spinners**: For loading animations.
- **ESLint**: For code linting.
- **Prettier**: For consistent code formatting.

## Setup Instructions

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/TonyFred-code/project-memory-card.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd emoji-flipper
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Build the project for production**:

   ```bash
   npm run build
   ```

6. **Preview the production build**:

   ```bash
   npm run preview
   ```

## Live Demo

You can view the deployed application live on Vercel: [Emoji Flipper on Vercel](https://top-project-memory-card.vercel.app/)

## Credits

This project was developed as part of a course project to implement React concepts. Special thanks to the following resources:

- **API Ninja Emoji**: For providing emoji data for the game.
- **The Odin Project**: For the [curriculum](https://www.theodinproject.com/lessons/node-path-react-new-memory-card) that guided the development of this project.
- **Material Design Icons**: For the icon library used in the application. Icons can be found at [Material Design Icons](https://pictogrammers.com/library/mdi/).
- **Vercel**: For hosting the application.
- **Sound Effects**: All from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music)
  - [Tab Change](https://pixabay.com/sound-effects/pageturn-102978/)
  - [Button Click](https://pixabay.com/sound-effects/select-sound-121244/)
  - [Settings Switcher](https://pixabay.com/sound-effects/pop-sound-effect-197846/)
  - [Game Over - loss](https://pixabay.com/sound-effects/game-over-arcade-6435/)
  - [Game Over - win](https://pixabay.com/sound-effects/level-win-6416/)
  - [Card Flip](https://pixabay.com/sound-effects/flipcard-91468/)
  - [Unique Card Pick](https://pixabay.com/sound-effects/success-bell-6776/)

- **Favicon**:
  - [App favicon](https://favicon.io/emoji-favicons/) was generated using the following graphics from Twitter Twemoji:
    - **Graphics Title**: 1f9e0.svg
    - **Graphics Author**: Copyright 2020 Twitter, Inc and other contributors ([GitHub](https://github.com/twitter/twemoji))
    - **Graphics Source**: [Twemoji GitHub](https://github.com/twitter/twemoji/blob/master/assets/svg/1f9e0.svg)
    - **Graphics License**: [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details. *Let me know if you'd like further modifications! 🚀*
