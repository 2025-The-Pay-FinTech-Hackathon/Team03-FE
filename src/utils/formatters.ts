export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatTime = (value: string) => {
  const numbers = value.replace(/[^0-9]/g, "");
  if (numbers.length <= 2) return numbers;
  return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
};

export const validateTime = (value: string) => {
  const numbers = value.replace(/[^0-9]/g, "");
  if (numbers.length > 4) return false;

  const hours = numbers.slice(0, 2);
  const minutes = numbers.slice(2, 4);

  if (hours && Number(hours) > 23) return false;
  if (minutes && Number(minutes) > 59) return false;

  return true;
};
