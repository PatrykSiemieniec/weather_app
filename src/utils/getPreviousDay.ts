const getPreviousDay = (date = new Date(), idx: number) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - idx);

  return previous;
};

export default getPreviousDay;
