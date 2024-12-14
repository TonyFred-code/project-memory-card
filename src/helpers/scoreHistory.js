function calculatePointPerSecond(points, time) {
  const gameTime = Math.floor(time / 1000);
  if (gameTime === 0) return points / 1;

  return points / gameTime;
}

const performanceLayout = {
  points: 0,
  time: 0,
};

const scoreHistoryData = {
  easy: Array(5).fill(performanceLayout),
  medium: Array(5).fill(performanceLayout),
  hard: Array(5).fill(performanceLayout),
};

export { scoreHistoryData, calculatePointPerSecond };
