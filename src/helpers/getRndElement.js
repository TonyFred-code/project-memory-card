export function getRndElement(array) {
  const index = Math.floor(Math.random() * array.length);
  const element = array[index];

  return {
    element,
    index,
  };
}

export function getRndNElements(count, array) {
  const copy = [...array];
  const result = [];

  while (count > result.length) {
    const { index } = getRndElement(copy);
    copy.splice(index, 1);
  }

  return result;
}
