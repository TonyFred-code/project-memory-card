const difficultyScore = {
  easy: {
    winCardCount: 5,
    baseCardPoint: 500,
    maxBonusCardPoint: 1500,
    cardsPerRound: 4,
    bonusTimeCount: 25000,
  },
  medium: {
    winCardCount: 10,
    baseCardPoint: 750,
    maxBonusCardPoint: 2000,
    cardsPerRound: 9,
    bonusTimeCount: 15000,
  },
  hard: {
    winCardCount: 15,
    baseCardPoint: 1000,
    maxBonusCardPoint: 2500,
    cardsPerRound: 16,
    bonusTimeCount: 10000,
  },
};

export default difficultyScore;
