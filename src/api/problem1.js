export const getArray = () => {
  const storedArray = localStorage.getItem('array');
  return storedArray ? JSON.parse(storedArray) : [];
}

export const updateArray = (array) => {
  localStorage.setItem('array', JSON.stringify(array));
}

export const addToArray = (value) => {
  const array = getArray();
  array.push(value);
  updateArray(array);
}