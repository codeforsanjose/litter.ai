export const capitalizeList = (list) => (
  Object.keys(list).map(
    (key) => [key.charAt(0).toUpperCase() + key.slice(1), list[key]],
  )
);

export const capitalizeWord = (word) => (
  word.charAt(0).toUpperCase() + word.slice(1)
);
